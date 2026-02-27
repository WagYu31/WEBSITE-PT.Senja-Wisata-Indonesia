import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { bookingStore } from "@/lib/bookingStore";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const MidtransClient = require("midtrans-client");

// Core API client for checking transaction status
const coreApi = new MidtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY ?? "",
});

// POST: Check & sync payment status from Midtrans
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { orderId } = body;

        if (!orderId) {
            return NextResponse.json({ error: "orderId diperlukan" }, { status: 400 });
        }

        // Query Midtrans for current transaction status
        let transactionStatus: string;
        let paymentType: string = "";

        try {
            const status = await coreApi.transaction.status(orderId);
            transactionStatus = status.transaction_status;
            paymentType = status.payment_type || "";
            console.log(`[Status Check] Order ${orderId}: ${transactionStatus} (${paymentType})`);
        } catch (err: unknown) {
            console.error("[Status Check] Midtrans API error:", err);
            return NextResponse.json({ error: "Gagal cek status ke Midtrans" }, { status: 502 });
        }

        // Map Midtrans status to internal status
        let paymentStatus: string;
        let bookingStatus: string;

        if (transactionStatus === "capture" || transactionStatus === "settlement") {
            paymentStatus = "paid";
            bookingStatus = "confirmed";
        } else if (transactionStatus === "pending") {
            paymentStatus = "pending";
            bookingStatus = "pending";
        } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "expire") {
            paymentStatus = transactionStatus === "expire" ? "expired" : "cancelled";
            bookingStatus = "cancelled";
        } else if (transactionStatus === "refund" || transactionStatus === "partial_refund") {
            paymentStatus = "refunded";
            bookingStatus = "cancelled";
        } else {
            paymentStatus = "pending";
            bookingStatus = "pending";
        }

        // Update DB
        try {
            await db.query(
                `UPDATE bookings SET 
                    payment_status = ?, 
                    status = ?, 
                    payment_method = COALESCE(NULLIF(?, ''), payment_method),
                    paid_at = IF(? = 'paid', COALESCE(paid_at, NOW()), paid_at),
                    updated_at = NOW()
                 WHERE midtrans_order_id = ?`,
                [paymentStatus, bookingStatus, paymentType, paymentStatus, orderId]
            );
        } catch {
            console.warn("[Status Check] DB update skipped — using in-memory fallback");
        }

        // Update in-memory store (dev fallback)
        bookingStore.updateStatus(orderId, bookingStatus, paymentStatus);

        return NextResponse.json({
            success: true,
            orderId,
            transactionStatus,
            paymentStatus,
            bookingStatus,
        });
    } catch (error: unknown) {
        console.error("[Status Check] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal cek status";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
