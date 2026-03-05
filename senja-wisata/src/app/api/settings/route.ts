import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

async function ensureTable() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS site_settings (
                id INT PRIMARY KEY DEFAULT 1,
                settings_json LONGTEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CHECK (id = 1)
            )
        `);
        return true;
    } catch {
        return false;
    }
}

// GET: Fetch settings
export async function GET() {
    try {
        await ensureTable();
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT settings_json FROM site_settings WHERE id = 1"
        );
        if (rows.length > 0) {
            return NextResponse.json({ settings: JSON.parse(rows[0].settings_json) });
        }
        return NextResponse.json({ settings: null });
    } catch (err) {
        console.error("[Settings] GET error:", err);
        return NextResponse.json({ settings: null });
    }
}

// POST: Save settings
export async function POST(req: NextRequest) {
    try {
        const { settings } = await req.json();
        if (!settings) {
            return NextResponse.json({ error: "Settings diperlukan" }, { status: 400 });
        }

        await ensureTable();
        const json = JSON.stringify(settings);

        // Upsert: insert or update
        await db.query(
            `INSERT INTO site_settings (id, settings_json) VALUES (1, ?)
             ON DUPLICATE KEY UPDATE settings_json = VALUES(settings_json)`,
            [json]
        );

        return NextResponse.json({ success: true, message: "Settings berhasil disimpan" });
    } catch (err) {
        console.error("[Settings] POST error:", err);
        return NextResponse.json({ error: "Gagal menyimpan settings", detail: String(err) }, { status: 500 });
    }
}
