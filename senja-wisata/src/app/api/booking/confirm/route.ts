import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingStore } from "@/lib/bookingStore";

// Called directly from client after Midtrans onSuccess callback
// (since webhook can't reach localhost in dev)
export async function POST(req: NextRequest) {
    try {
        const { orderId, bookingCode } = await req.json();

        if (!orderId && !bookingCode) {
            return NextResponse.json({ error: "orderId atau bookingCode diperlukan" }, { status: 400 });
        }

        // Update in-memory store
        if (orderId) {
            bookingStore.updateStatus(orderId, "confirmed", "paid");
        } else if (bookingCode) {
            const booking = bookingStore.getByCode(bookingCode);
            if (booking) {
                bookingStore.updateStatus(booking.midtrans_order_id, "confirmed", "paid");
            }
        }

        // Also try DB update
        try {
            if (orderId) {
                await db.query(
                    `UPDATE bookings SET status = 'confirmed', payment_status = 'paid', paid_at = NOW(), updated_at = NOW() WHERE midtrans_order_id = ?`,
                    [orderId]
                );
            } else if (bookingCode) {
                await db.query(
                    `UPDATE bookings SET status = 'confirmed', payment_status = 'paid', paid_at = NOW(), updated_at = NOW() WHERE booking_code = ?`,
                    [bookingCode]
                );
            }
        } catch {
            // DB not available in dev — store update is enough
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[Payment Confirm] Error:", error);
        return NextResponse.json({ error: "Gagal mengkonfirmasi pembayaran" }, { status: 500 });
    }
}
