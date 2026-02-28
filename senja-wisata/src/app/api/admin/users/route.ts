import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

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
