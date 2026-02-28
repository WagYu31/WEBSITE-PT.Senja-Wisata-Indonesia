import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, email, phone, password } = await req.json();

        if (!firstName || !email || !password) {
            return NextResponse.json(
                { error: "Nama, email, dan password wajib diisi" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password minimal 8 karakter" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const [existing] = await db.query<RowDataPacket[]>(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return NextResponse.json(
                { error: "Email sudah terdaftar. Silakan login atau gunakan email lain." },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = lastName ? `${firstName} ${lastName}` : firstName;

        // Insert user
        await db.query(
            "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)",
            [name, email, phone || null, hashedPassword, "user"]
        );

        // Send welcome email
        try {
            const smtpUser = "adminsenja@fluentlya.com";
            const smtpPass = "SenjaWisata2026";
            const transporter = nodemailer.createTransport({
                host: "mail.fluentlya.com",
                port: 465,
                secure: true,
                auth: { user: smtpUser, pass: smtpPass },
            });

            await transporter.sendMail({
                from: `"Senja Wisata" <${smtpUser}>`,
                to: email,
                subject: "Selamat Datang di Senja Wisata Indonesia! 🌅",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; padding: 20px 0;">
                            <h1 style="color: #1e3a5f; margin: 0;">✈️ Senja Wisata</h1>
                            <p style="color: #64748b; margin-top: 5px;">Indonesia Travel Agency</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #1e3a5f, #2d5a8e); color: white; padding: 30px; border-radius: 16px; text-align: center;">
                            <h2 style="margin: 0 0 10px;">Selamat Datang, ${firstName}! 🎉</h2>
                            <p style="margin: 0; opacity: 0.9;">Akun Anda telah berhasil dibuat</p>
                        </div>
                        <div style="padding: 30px 0; text-align: center;">
                            <p style="color: #334155; line-height: 1.6;">
                                Terima kasih telah bergabung dengan <strong>Senja Wisata Indonesia</strong>! 
                                Jelajahi paket wisata terbaik dari Raja Ampat hingga Bali dengan harga terbaiknya.
                            </p>
                            <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: left;">
                                <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">📋 Detail Akun Anda:</p>
                                <p style="margin: 4px 0; color: #334155;"><strong>Nama:</strong> ${name}</p>
                                <p style="margin: 4px 0; color: #334155;"><strong>Email:</strong> ${email}</p>
                                <p style="margin: 4px 0; color: #334155;"><strong>Password:</strong> ${password}</p>
                            </div>
                            <a href="https://fluentlya.com/login" 
                               style="display: inline-block; background: #ef4444; color: white; padding: 14px 32px; 
                                      border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px;
                                      margin: 20px 0;">
                                🚀 Mulai Jelajahi Wisata
                            </a>
                        </div>
                        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
                            <p>&copy; 2026 Senja Wisata Indonesia. All rights reserved.</p>
                        </div>
                    </div>
                `,
            });
        } catch (emailErr) {
            console.error("Welcome email failed:", emailErr);
            // Still return success — registration is done even if email fails
        }

        return NextResponse.json({
            success: true,
            message: "Registrasi berhasil! Silakan login.",
        });
    } catch (err) {
        console.error("Register error:", err);
        return NextResponse.json(
            { error: "Terjadi kesalahan server. Coba lagi nanti." },
            { status: 500 }
        );
    }
}
