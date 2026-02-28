import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
