import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = Number(id);

        if (!userId) {
            return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
        }

        // Prevent deleting owner
        const [rows] = await db.query<import("mysql2").RowDataPacket[]>(
            "SELECT role FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
        }

        if (rows[0].role === "owner") {
            return NextResponse.json({ error: "Tidak bisa menghapus akun Owner" }, { status: 403 });
        }

        await db.query("DELETE FROM users WHERE id = ?", [userId]);

        return NextResponse.json({ success: true, message: "User berhasil dihapus" });
    } catch (err) {
        console.error("Delete user error:", err);
        return NextResponse.json({ error: "Gagal menghapus user" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = Number(id);
        const body = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
        }

        // Check user exists
        const [rows] = await db.query<import("mysql2").RowDataPacket[]>(
            "SELECT id FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
        }

        if (body.action === "reset-password") {
            const { password } = body;

            if (!password || password.length < 6) {
                return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

            return NextResponse.json({ success: true, message: "Password berhasil diubah" });
        }

        return NextResponse.json({ error: "Action tidak valid" }, { status: 400 });
    } catch (err) {
        console.error("Update user error:", err);
        return NextResponse.json({ error: "Gagal mengubah data user" }, { status: 500 });
    }
}
