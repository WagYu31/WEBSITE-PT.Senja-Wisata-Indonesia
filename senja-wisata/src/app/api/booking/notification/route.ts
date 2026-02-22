import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";
import { bookingStore } from "@/lib/bookingStore";


// Midtrans sends payment notifications here
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { order_id, status_code, gross_amount, signature_key, transaction_status, payment_type, transaction_id } = body;

        // Verify signature
        const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
        const expectedSignature = crypto
            .createHash("sha512")
            .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
            .digest("hex");

        if (signature_key !== expectedSignature) {
            console.warn("[Midtrans Webhook] Invalid signature for order:", order_id);
            return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
        }

        // Map Midtrans transaction status to our internal status
        let paymentStatus: string;
        let bookingStatus: string;

        if (transaction_status === "capture" || transaction_status === "settlement") {
            paymentStatus = "paid";
            bookingStatus = "confirmed";
        } else if (transaction_status === "pending") {
            paymentStatus = "pending";
            bookingStatus = "pending";
        } else if (transaction_status === "deny" || transaction_status === "cancel" || transaction_status === "expire") {
            paymentStatus = transaction_status === "expire" ? "expired" : "cancelled";
            bookingStatus = "cancelled";
        } else if (transaction_status === "refund" || transaction_status === "partial_refund") {
            paymentStatus = "refunded";
            bookingStatus = "cancelled";
        } else {
            paymentStatus = "pending";
            bookingStatus = "pending";
        }

        try {
            await db.query(
                `UPDATE bookings SET 
                    payment_status = ?, 
                    status = ?, 
                    payment_method = ?,
                    midtrans_transaction_id = ?,
                    paid_at = IF(? = 'paid', NOW(), paid_at),
                    updated_at = NOW()
                 WHERE midtrans_order_id = ?`,
                [paymentStatus, bookingStatus, payment_type, transaction_id, paymentStatus, order_id]
            );
        } catch {
            console.warn("[Midtrans Webhook] DB update skipped");
        }

        // Also update in-memory store (dev fallback)
        bookingStore.updateStatus(order_id, bookingStatus, paymentStatus);

        console.log(`[Midtrans Webhook] Order ${order_id}: ${transaction_status} → payment=${paymentStatus}, booking=${bookingStatus}`);

        return NextResponse.json({ status: "ok" });
    } catch (error: unknown) {
        console.error("[Midtrans Webhook] Error:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
