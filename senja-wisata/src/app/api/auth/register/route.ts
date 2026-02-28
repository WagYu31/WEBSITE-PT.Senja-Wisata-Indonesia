import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

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
