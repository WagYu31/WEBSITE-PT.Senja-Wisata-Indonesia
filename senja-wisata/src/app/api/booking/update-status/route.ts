import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingStore } from "@/lib/bookingStore";
import { RowDataPacket } from "mysql2";
import { createTransporter, SMTP_FROM } from "@/lib/email";
import { bookingStatusEmail } from "@/lib/emailTemplates";

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

        // Send status change email (non-blocking)
        if (status !== "pending") {
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
                    const emailData = bookingStatusEmail({
                        userName: b.user_name || "Guest",
                        bookingCode: b.booking_code,
                        tourTitle: b.tour_title || "Tour",
                        status,
                    });
                    const transporter = createTransporter();
                    transporter.sendMail({
                        from: SMTP_FROM,
                        to: b.user_email,
                        subject: emailData.subject,
                        html: emailData.html,
                    }).catch(err => console.error("[Update Status] Email failed:", err));
                }
            } catch (emailErr) {
                console.error("[Update Status] Email query failed:", emailErr);
            }
        }

        console.log(`[Update Status] ${bookingCode || orderId} → ${status}`);
        return NextResponse.json({ success: true, status });
    } catch (error: unknown) {
        console.error("[Update Status] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal update status";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
