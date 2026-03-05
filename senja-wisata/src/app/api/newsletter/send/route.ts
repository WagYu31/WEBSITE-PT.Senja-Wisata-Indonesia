import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import nodemailer from "nodemailer";

function createTransporter() {
    const host = process.env.SMTP_HOST || "mail.fluentlya.com";
    const port = Number(process.env.SMTP_PORT) || 465;
    const user = process.env.SMTP_USER || "adminsenja@fluentlya.com";
    // Strip surrounding quotes from env var if present
    const rawPass = process.env.SMTP_PASS || "";
    const pass = rawPass.replace(/^['"]|['"]$/g, "");

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
    });
}

// POST: Send newsletter to all active subscribers
export async function POST(req: NextRequest) {
    try {
        const { subject, content } = await req.json();

        if (!subject || !content) {
            return NextResponse.json({ error: "Subject dan konten diperlukan" }, { status: 400 });
        }

        // Get active subscribers
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT email FROM newsletter_subscribers WHERE is_active = 1"
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Tidak ada subscriber aktif", sent: 0 }, { status: 400 });
        }

        const transporter = createTransporter();

        // Verify SMTP connection first
        try {
            await transporter.verify();
            console.log("[SMTP] Connection verified OK");
        } catch (verifyErr) {
            console.error("[SMTP] Verify failed:", verifyErr);
            return NextResponse.json({
                error: "SMTP connection gagal: " + String(verifyErr),
                smtpHost: process.env.SMTP_HOST,
                smtpPort: process.env.SMTP_PORT,
                smtpUser: process.env.SMTP_USER,
            }, { status: 500 });
        }

        const emails = rows.map((r) => r.email);
        let sent = 0;
        let failed = 0;
        const errors: string[] = [];

        // Send in batches of 10
        for (let i = 0; i < emails.length; i += 10) {
            const batch = emails.slice(i, i + 10);
            const promises = batch.map(async (email) => {
                try {
                    await transporter.sendMail({
                        from: `"Senja Wisata Indonesia" <${process.env.SMTP_USER}>`,
                        to: email,
                        subject,
                        html: `
                            <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;">
                                <div style="background:#05073C;padding:30px;text-align:center;border-radius:12px 12px 0 0;">
                                    <h1 style="color:white;margin:0;font-size:24px;">✈️ Senja Wisata</h1>
                                    <p style="color:rgba(255,255,255,0.6);margin:5px 0 0;font-size:14px;">PT. Senja Wisata Indonesia</p>
                                </div>
                                <div style="padding:30px;background:#ffffff;border:1px solid #e5e7eb;border-top:0;">
                                    <h2 style="color:#05073C;margin:0 0 15px;">${subject}</h2>
                                    <div style="color:#4b5563;line-height:1.8;font-size:15px;">
                                        ${content}
                                    </div>
                                </div>
                                <div style="padding:20px;background:#f8fafc;text-align:center;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;">
                                    <p style="color:#94a3b8;font-size:12px;margin:0;">
                                        Anda menerima email ini karena berlangganan newsletter Senja Wisata.
                                        <br/>
                                        <a href="https://fluentlya.com" style="color:#2BBEE8;">Kunjungi Website</a>
                                    </p>
                                </div>
                            </div>
                        `,
                    });
                    sent++;
                } catch (err) {
                    failed++;
                    errors.push(`${email}: ${String(err)}`);
                    console.error(`[SMTP] Send failed to ${email}:`, err);
                }
            });
            await Promise.all(promises);
        }

        // Log the send
        try {
            await db.query(`
                CREATE TABLE IF NOT EXISTS newsletter_logs (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    subject VARCHAR(500) NOT NULL,
                    content LONGTEXT,
                    total_recipients INT DEFAULT 0,
                    sent_count INT DEFAULT 0,
                    failed_count INT DEFAULT 0,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            await db.query(
                "INSERT INTO newsletter_logs (subject, content, total_recipients, sent_count, failed_count) VALUES (?, ?, ?, ?, ?)",
                [subject, content, emails.length, sent, failed]
            );
        } catch { /* log failure is non-critical */ }

        return NextResponse.json({
            success: sent > 0,
            message: `Newsletter terkirim ke ${sent} subscriber${failed > 0 ? `, ${failed} gagal` : ""}`,
            sent,
            failed,
            total: emails.length,
            errors: errors.length > 0 ? errors : undefined,
        });
    } catch (err) {
        console.error("[Newsletter] Send error:", err);
        return NextResponse.json({ error: "Gagal mengirim newsletter: " + String(err) }, { status: 500 });
    }
}

// GET: List send history
export async function GET() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS newsletter_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                subject VARCHAR(500) NOT NULL,
                content LONGTEXT,
                total_recipients INT DEFAULT 0,
                sent_count INT DEFAULT 0,
                failed_count INT DEFAULT 0,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM newsletter_logs ORDER BY sent_at DESC LIMIT 20"
        );
        return NextResponse.json({ logs: rows });
    } catch {
        return NextResponse.json({ logs: [] });
    }
}
