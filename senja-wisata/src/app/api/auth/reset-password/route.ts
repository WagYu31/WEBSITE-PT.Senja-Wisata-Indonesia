import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";

// In-memory fallback for reset tokens
const g = globalThis as typeof globalThis & { __resetTokens?: Map<string, { email: string; expires: number }> };
if (!g.__resetTokens) g.__resetTokens = new Map();
const resetTokens = g.__resetTokens;

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: "Token dan password baru wajib diisi" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
        }

        let email: string | null = null;

        // Check token in DB first
        try {
            const [rows] = await db.query<RowDataPacket[]>(
                "SELECT email FROM password_resets WHERE token = ? AND used = FALSE AND expires_at > NOW()",
                [token]
            );
            if (rows.length > 0) {
                email = rows[0].email;
                // Mark token as used
                await db.query("UPDATE password_resets SET used = TRUE WHERE token = ?", [token]);
            }
        } catch {
            // Fallback to in-memory
        }

        // Fallback: check in-memory tokens
        if (!email) {
            const stored = resetTokens.get(token);
            if (stored && stored.expires > Date.now()) {
                email = stored.email;
                resetTokens.delete(token);
            }
        }

        if (!email) {
            return NextResponse.json({ error: "Link reset tidak valid atau sudah kedaluwarsa" }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password in DB
        try {
            const [result] = await db.query<RowDataPacket[]>(
                "UPDATE users SET password = ? WHERE email = ?",
                [hashedPassword, email]
            );
            return NextResponse.json({
                success: true,
                message: "Password berhasil direset! Silakan login dengan password baru.",
            });
        } catch {
            return NextResponse.json({ error: "Gagal update password" }, { status: 500 });
        }
    } catch (err) {
        console.error("Reset password error:", err);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
