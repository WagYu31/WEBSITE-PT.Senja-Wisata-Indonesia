import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingStore } from "@/lib/bookingStore";

// POST: Update booking status (for admin use)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { bookingCode, orderId, status } = body;

        const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
        if (!status || !validStatuses.includes(status)) {
            return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
        }

        if (!bookingCode && !orderId) {
            return NextResponse.json({ error: "bookingCode atau orderId diperlukan" }, { status: 400 });
        }

        // Update in DB
        try {
            const field = bookingCode ? "booking_code" : "midtrans_order_id";
            const value = bookingCode || orderId;

            await db.query(
                `UPDATE bookings SET 
                    status = ?,
                    updated_at = NOW()
                 WHERE ${field} = ?`,
                [status, value]
            );
        } catch {
            console.warn("[Update Status] DB update skipped");
        }

        // Update in-memory store
        const storeKey = orderId || bookingCode;
        if (storeKey) {
            bookingStore.updateStatus(storeKey, status, status === "completed" ? "paid" : "pending");
        }

        console.log(`[Update Status] ${bookingCode || orderId} → ${status}`);
        return NextResponse.json({ success: true, status });
    } catch (error: unknown) {
        console.error("[Update Status] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal update status";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
