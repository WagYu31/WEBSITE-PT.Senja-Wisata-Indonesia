import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

async function ensureTable() {
    await db.query(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active TINYINT(1) DEFAULT 1,
            INDEX idx_email (email),
            INDEX idx_active (is_active)
        )
    `);
}

// POST: Subscribe email
export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Email tidak valid" }, { status: 400 });
        }

        await ensureTable();

        // Check if already exists
        const [existing] = await db.query<RowDataPacket[]>(
            "SELECT id, is_active FROM newsletter_subscribers WHERE email = ?",
            [email.toLowerCase().trim()]
        );

        if (existing.length > 0) {
            if (!existing[0].is_active) {
                // Re-subscribe
                await db.query(
                    "UPDATE newsletter_subscribers SET is_active = 1, subscribed_at = NOW() WHERE email = ?",
                    [email.toLowerCase().trim()]
                );
                return NextResponse.json({ success: true, message: "Berhasil berlangganan kembali!" });
            }
            return NextResponse.json({ success: true, message: "Email sudah terdaftar!" });
        }

        await db.query(
            "INSERT INTO newsletter_subscribers (email) VALUES (?)",
            [email.toLowerCase().trim()]
        );

        return NextResponse.json({ success: true, message: "Berhasil berlangganan! 🎉" });
    } catch (err) {
        console.error("[Newsletter] Subscribe error:", err);
        return NextResponse.json({ error: "Gagal mendaftar newsletter" }, { status: 500 });
    }
}

// GET: List subscribers (admin)
export async function GET() {
    try {
        await ensureTable();
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT id, email, subscribed_at, is_active FROM newsletter_subscribers ORDER BY subscribed_at DESC"
        );
        return NextResponse.json({ subscribers: rows });
    } catch (err) {
        console.error("[Newsletter] GET error:", err);
        return NextResponse.json({ subscribers: [] });
    }
}

// DELETE: Unsubscribe
export async function DELETE(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
        }

        await ensureTable();
        await db.query(
            "UPDATE newsletter_subscribers SET is_active = 0 WHERE email = ?",
            [email.toLowerCase().trim()]
        );

        return NextResponse.json({ success: true, message: "Berhasil berhenti berlangganan" });
    } catch (err) {
        console.error("[Newsletter] Unsubscribe error:", err);
        return NextResponse.json({ error: "Gagal berhenti berlangganan" }, { status: 500 });
    }
}
