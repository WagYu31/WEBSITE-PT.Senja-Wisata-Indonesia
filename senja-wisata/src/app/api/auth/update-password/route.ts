import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { userId, oldPassword, newPassword } = await req.json();

        if (!userId || !oldPassword || !newPassword) {
            return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
        }

        if (newPassword.length < 8) {
            return NextResponse.json({ error: "Password baru minimal 8 karakter" }, { status: 400 });
        }

        // Get current user
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT id, password FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
        }

        const user = rows[0];

        // Check old password (bcrypt or plaintext)
        const isValidBcrypt = await bcrypt.compare(oldPassword, user.password);
        const isValidPlain = oldPassword === user.password;

        if (!isValidBcrypt && !isValidPlain) {
            return NextResponse.json({ error: "Password lama salah" }, { status: 401 });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

        return NextResponse.json({ success: true, message: "Password berhasil diperbarui" });
    } catch (err) {
        console.error("Update password error:", err);
        return NextResponse.json({ error: "Gagal memperbarui password" }, { status: 500 });
    }
}
