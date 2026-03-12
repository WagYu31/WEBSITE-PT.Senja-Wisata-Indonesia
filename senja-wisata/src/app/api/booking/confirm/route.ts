import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingStore } from "@/lib/bookingStore";
import { RowDataPacket } from "mysql2";
import { createTransporter, SMTP_FROM } from "@/lib/email";
import { paymentSuccessEmail } from "@/lib/emailTemplates";

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

        // Send payment success email (non-blocking)
        try {
            const field = bookingCode ? "booking_code" : "midtrans_order_id";
            const value = bookingCode || orderId;
            const [rows] = await db.query<RowDataPacket[]>(
                `SELECT b.*, u.email as user_email, u.name as user_name, t.title as tour_title
                 FROM bookings b
                 LEFT JOIN users u ON b.user_id = u.id
                 LEFT JOIN tours t ON b.tour_id = t.id
                 WHERE b.${field} = ?`,
                [value]
            );
            if (rows[0] && rows[0].user_email) {
                const b = rows[0];
                const emailData = paymentSuccessEmail({
                    userName: b.user_name || "Guest",
                    bookingCode: b.booking_code,
                    tourTitle: b.tour_title || "Tour",
                    tourDate: b.tour_date,
                    adults: b.adults || 1,
                    children: b.children || 0,
                    totalPrice: Number(b.total_price),
                    paymentMethod: b.payment_method || "Online",
                    transactionId: b.midtrans_transaction_id || orderId,
                });
                const transporter = createTransporter();
                transporter.sendMail({
                    from: SMTP_FROM,
                    to: b.user_email,
                    subject: emailData.subject,
                    html: emailData.html,
                }).catch(err => console.error("[Payment Confirm] Email failed:", err));
            }
        } catch (emailErr) {
            console.error("[Payment Confirm] Email query failed:", emailErr);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[Payment Confirm] Error:", error);
        return NextResponse.json({ error: "Gagal mengkonfirmasi pembayaran" }, { status: 500 });
    }
}
