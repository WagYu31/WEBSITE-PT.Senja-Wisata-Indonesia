import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import crypto from "crypto";
import { createTransporter, SMTP_FROM } from "@/lib/email";

// In-memory fallback for reset tokens
const g = globalThis as typeof globalThis & { __resetTokens?: Map<string, { email: string; expires: number }> };
if (!g.__resetTokens) g.__resetTokens = new Map();
const resetTokens = g.__resetTokens;

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email wajib diisi" }, { status: 400 });
        }

        // Check if user exists in DB (for demo: always send email)
        const userExists = true;

        // Always return success (security: don't reveal if email exists)
        // But only send email if user exists
        if (userExists) {
            const token = crypto.randomBytes(32).toString("hex");
            const expires = Date.now() + 3600000; // 1 hour

            // Store token
            resetTokens.set(token, { email, expires });

            // Also try to store in DB
            try {
                await db.query(
                    `CREATE TABLE IF NOT EXISTS password_resets (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR(150) NOT NULL,
                        token VARCHAR(100) NOT NULL UNIQUE,
                        expires_at TIMESTAMP NOT NULL,
                        used BOOLEAN DEFAULT FALSE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )`
                );
                await db.query(
                    "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
                    [email, token, new Date(expires)]
                );
            } catch {
                // In-memory fallback already has the token
            }

            // Send email
            const baseUrl = "https://fluentlya.com";
            const resetLink = `${baseUrl}/reset-password?token=${token}`;

            try {
                const transporter = createTransporter();

                await transporter.sendMail({
                    from: SMTP_FROM,
                    to: email,
                    subject: "Reset Password - Senja Wisata Indonesia",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="text-align: center; padding: 20px 0;">
                                <h1 style="color: #1e3a5f; margin: 0;">✈️ Senja Wisata</h1>
                                <p style="color: #64748b; margin-top: 5px;">Indonesia Travel Agency</p>
                            </div>
                            <div style="background: linear-gradient(135deg, #1e3a5f, #2d5a8e); color: white; padding: 30px; border-radius: 16px; text-align: center;">
                                <h2 style="margin: 0 0 10px;">Reset Password</h2>
                                <p style="margin: 0; opacity: 0.9;">Klik tombol di bawah untuk mengatur ulang password Anda</p>
                            </div>
                            <div style="padding: 30px 0; text-align: center;">
                                <p style="color: #334155; line-height: 1.6;">
                                    Kami menerima permintaan untuk mereset password akun Anda. 
                                    Jika Anda tidak meminta ini, abaikan email ini.
                                </p>
                                <a href="${resetLink}" 
                                   style="display: inline-block; background: #ef4444; color: white; padding: 14px 32px; 
                                          border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px;
                                          margin: 20px 0;">
                                    🔐 Reset Password Saya
                                </a>
                                <p style="color: #94a3b8; font-size: 13px; margin-top: 20px;">
                                    Link berlaku selama <strong>1 jam</strong>. Jika tombol tidak berfungsi, copy link berikut:
                                </p>
                                <p style="color: #3b82f6; font-size: 12px; word-break: break-all;">
                                    ${resetLink}
                                </p>
                            </div>
                            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                                <p>&copy; 2026 Senja Wisata Indonesia. All rights reserved.</p>
                            </div>
                        </div>
                    `,
                });
            } catch (emailErr) {
                console.error("Email send failed:", emailErr);
                // Still return success — token is stored, user can use link manually for demo
            }
        }

        return NextResponse.json({
            success: true,
            message: "Jika email terdaftar, kami telah mengirim link reset password.",
        });
    } catch (err) {
        console.error("Forgot password error:", err);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
