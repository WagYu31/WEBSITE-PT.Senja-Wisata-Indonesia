import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

// Demo accounts (fallback when DB is not available)
const DEMO_USERS = [
    { id: "1", name: "Pak Bowo", email: "owner@senja.com", password: "owner123", role: "owner" },
    { id: "2", name: "Admin Senja", email: "admin@senja.com", password: "admin123", role: "admin" },
    { id: "3", name: "Budi Santoso", email: "user@senja.com", password: "user123", role: "user" },
];

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
        }

        // Try DB login first
        try {
            const [rows] = await db.query<RowDataPacket[]>(
                "SELECT id, name, email, password, role, phone, avatar FROM users WHERE email = ?",
                [email]
            );

            if (rows.length > 0) {
                const user = rows[0];
                const isValid = await bcrypt.compare(password, user.password);

                if (isValid) {
                    return NextResponse.json({
                        success: true,
                        user: {
                            id: String(user.id),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            phone: user.phone,
                            avatar: user.avatar,
                        },
                    });
                }

                // Also try plain-text comparison for demo accounts
                if (password === user.password) {
                    return NextResponse.json({
                        success: true,
                        user: {
                            id: String(user.id),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            phone: user.phone,
                            avatar: user.avatar,
                        },
                    });
                }

                return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
            }
        } catch {
            // DB not available, fall through to demo
        }

        // Fallback: demo accounts
        const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
        if (found) {
            const { password: _, ...user } = found;
            return NextResponse.json({ success: true, user });
        }

        return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
