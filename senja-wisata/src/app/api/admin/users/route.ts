import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT u.id, u.name, u.email, u.role, u.phone, u.created_at,
                    (SELECT COUNT(*) FROM bookings WHERE user_id = u.id) as totalBookings
             FROM users u ORDER BY u.created_at DESC`
        );

        const users = rows.map((row) => ({
            id: row.id,
            name: row.name || "User",
            email: row.email,
            role: row.role || "user",
            phone: row.phone || "",
            totalBookings: Number(row.totalBookings) || 0,
            joined: row.created_at
                ? new Date(row.created_at).toISOString().split("T")[0]
                : "N/A",
            avatar: (row.name || "U").charAt(0).toUpperCase(),
        }));

        return NextResponse.json({ success: true, users });
    } catch (err) {
        console.error("Fetch users error:", err);
        return NextResponse.json(
            { success: false, error: "Gagal memuat data users" },
            { status: 500 }
        );
    }
}

// POST: Create new user
export async function POST(req: NextRequest) {
    try {
        const { name, email, password, role } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, error: "Nama, email, dan password wajib diisi" }, { status: 400 });
        }

        // Check duplicate email
        const [existing] = await db.query<RowDataPacket[]>("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return NextResponse.json({ success: false, error: "Email sudah terdaftar" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || "user";

        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, userRole]
        );

        return NextResponse.json({
            success: true,
            user: { id: result.insertId, name, email, role: userRole },
            message: "User berhasil ditambahkan"
        });
    } catch (err) {
        console.error("Create user error:", err);
        return NextResponse.json({ success: false, error: "Gagal menambahkan user" }, { status: 500 });
    }
}
