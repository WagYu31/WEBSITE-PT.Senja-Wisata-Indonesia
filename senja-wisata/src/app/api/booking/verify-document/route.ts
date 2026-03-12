import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { createTransporter, SMTP_FROM } from "@/lib/email";
import { documentVerificationEmail } from "@/lib/emailTemplates";

// POST: Admin verifies or rejects a document
export async function POST(req: NextRequest) {
    try {
        const { bookingCode, status, documentType, reason } = await req.json();

        if (!bookingCode || !status) {
            return NextResponse.json({ error: "bookingCode dan status diperlukan" }, { status: 400 });
        }

        if (!["verified", "rejected"].includes(status)) {
            return NextResponse.json({ error: "Status harus 'verified' atau 'rejected'" }, { status: 400 });
        }

        // Update document status in DB
        try {
            await db.query(
                `UPDATE bookings SET 
                    document_status = ?,
                    document_note = ?,
                    updated_at = NOW()
                 WHERE booking_code = ?`,
                [status, reason || null, bookingCode]
            );
        } catch (dbErr) {
            console.warn("[Verify Document] DB update skipped:", dbErr);
        }

        // Get booking and user data for email
        try {
            const [rows] = await db.query<RowDataPacket[]>(
                `SELECT b.*, u.email as user_email, u.name as user_name, t.title as tour_title
                 FROM bookings b
                 LEFT JOIN users u ON b.user_id = u.id
                 LEFT JOIN tours t ON b.tour_id = t.id
                 WHERE b.booking_code = ?`,
                [bookingCode]
            );

            if (rows[0] && rows[0].user_email) {
                const b = rows[0];
                const emailData = documentVerificationEmail({
                    userName: b.user_name || "Guest",
                    bookingCode: b.booking_code,
                    tourTitle: b.tour_title || "Tour",
                    status: status as "verified" | "rejected",
                    documentType: documentType || "Dokumen Perjalanan",
                    reason: reason,
                });
                const transporter = createTransporter();
                transporter.sendMail({
                    from: SMTP_FROM,
                    to: b.user_email,
                    subject: emailData.subject,
                    html: emailData.html,
                }).catch(err => console.error("[Verify Document] Email failed:", err));
            }
        } catch (emailErr) {
            console.error("[Verify Document] Email query failed:", emailErr);
        }

        console.log(`[Verify Document] ${bookingCode} → ${status}`);
        return NextResponse.json({ success: true, status });
    } catch (error: unknown) {
        console.error("[Verify Document] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal verifikasi dokumen";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
