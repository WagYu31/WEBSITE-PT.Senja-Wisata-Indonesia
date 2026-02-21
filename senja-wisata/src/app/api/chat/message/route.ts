import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import { notifyClients } from "@/app/api/chat/stream/route";

// ── POST /api/chat/message — Kirim pesan ─────────────────────────────────────

export async function POST(req: NextRequest) {
    try {
        const { sessionId, sender, text, senderName } = await req.json();

        if (!sessionId || !sender || !text?.trim()) {
            return NextResponse.json({ error: "sessionId, sender, text wajib diisi" }, { status: 400 });
        }

        const msgId = randomUUID();

        await db.execute(
            `INSERT INTO chat_messages (id, session_id, sender, sender_name, text) VALUES (?, ?, ?, ?, ?)`,
            [msgId, sessionId, sender, senderName ?? null, text.trim()]
        );

        // Update session: timestamp + unread count
        if (sender === "user") {
            // Hanya tambah unread kalau status bukan bot (sudah ada interaksi admin)
            await db.execute(
                `UPDATE chat_sessions SET updated_at = NOW(),
                    unread_by_admin = CASE WHEN status != 'bot' THEN unread_by_admin + 1 ELSE unread_by_admin END
                 WHERE id = ?`,
                [sessionId]
            );
        } else if (sender === "admin") {
            // Admin balas → status jadi live
            await db.execute(
                `UPDATE chat_sessions SET updated_at = NOW(), status = 'live' WHERE id = ?`,
                [sessionId]
            );
        } else {
            await db.execute(`UPDATE chat_sessions SET updated_at = NOW() WHERE id = ?`, [sessionId]);
        }

        const msg = {
            id: msgId,
            sessionId,
            sender,
            senderName: senderName ?? null,
            text: text.trim(),
            createdAt: new Date().toISOString(),
        };

        // Broadcast ke semua tab admin via SSE
        notifyClients({ type: "new_message", message: msg });

        return NextResponse.json({ message: msg }, { status: 201 });
    } catch (err) {
        console.error("[POST /api/chat/message]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
