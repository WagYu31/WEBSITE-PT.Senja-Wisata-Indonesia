import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";

// ── Helper ──────────────────────────────────────────────────────────────────

function timeStr() {
    return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

const BOT_GREETING = (name: string) =>
    `Halo ${name}! 👋 Selamat datang di **Senja Wisata**. Saya Senja Assistant, siap membantu Anda.\n\nAda yang bisa saya bantu?`;

// ── POST /api/chat/session — Buat sesi baru ──────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const { visitorName, visitorEmail } = await req.json();
        if (!visitorName?.trim()) {
            return NextResponse.json({ error: "visitorName wajib diisi" }, { status: 400 });
        }

        const sessionId = randomUUID();
        const msgId = randomUUID();
        const greetingText = BOT_GREETING(visitorName.trim());

        await db.execute(
            `INSERT INTO chat_sessions (id, visitor_name, visitor_email, status, unread_by_admin) VALUES (?, ?, ?, 'bot', 0)`,
            [sessionId, visitorName.trim(), visitorEmail ?? null]
        );

        await db.execute(
            `INSERT INTO chat_messages (id, session_id, sender, sender_name, text) VALUES (?, ?, 'bot', 'Senja Assistant', ?)`,
            [msgId, sessionId, greetingText]
        );

        return NextResponse.json({ sessionId, greetingText }, { status: 201 });
    } catch (err) {
        console.error("[POST /api/chat/session]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// ── GET /api/chat/session — List semua sesi (admin) ─────────────────────────

export async function GET() {
    try {
        const [rows] = await db.execute(
            `SELECT 
                s.id, s.visitor_name, s.visitor_email, s.status,
                s.unread_by_admin, s.created_at, s.updated_at,
                m.text AS last_message_text,
                m.sender AS last_message_sender
             FROM chat_sessions s
             LEFT JOIN chat_messages m ON m.id = (
                SELECT id FROM chat_messages WHERE session_id = s.id ORDER BY created_at DESC LIMIT 1
             )
             ORDER BY s.updated_at DESC`
        );
        return NextResponse.json({ sessions: rows });
    } catch (err) {
        console.error("[GET /api/chat/session]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
