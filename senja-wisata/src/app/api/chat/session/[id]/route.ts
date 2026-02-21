import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifyClients } from "@/app/api/chat/stream/route";

// ── GET /api/chat/session/[id] — Detail sesi + pesan ────────────────────────

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [[session]] = await db.execute(
            `SELECT id, visitor_name, visitor_email, status, unread_by_admin, created_at, updated_at FROM chat_sessions WHERE id = ?`,
            [id]
        ) as any;

        if (!session) return NextResponse.json({ error: "Sesi tidak ditemukan" }, { status: 404 });

        const [messages] = await db.execute(
            `SELECT id, sender, sender_name, text, created_at FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC`,
            [id]
        );

        return NextResponse.json({ session, messages });
    } catch (err) {
        console.error("[GET /api/chat/session/:id]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// ── PATCH /api/chat/session/[id] — Update status ────────────────────────────

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status, unreadByAdmin } = await req.json();

        const updates: string[] = [];
        const values: unknown[] = [];

        if (status) { updates.push("status = ?"); values.push(status); }
        if (typeof unreadByAdmin === "number") { updates.push("unread_by_admin = ?"); values.push(unreadByAdmin); }

        if (updates.length === 0) return NextResponse.json({ error: "Tidak ada perubahan" }, { status: 400 });

        values.push(id);
        await db.execute(`UPDATE chat_sessions SET ${updates.join(", ")} WHERE id = ?`, values);

        notifyClients({ type: "session_updated", sessionId: id, status });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[PATCH /api/chat/session/:id]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// ── DELETE /api/chat/session/[id] — Hapus sesi ──────────────────────────────

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await db.execute(`DELETE FROM chat_sessions WHERE id = ?`, [id]);
        notifyClients({ type: "session_deleted", sessionId: id });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[DELETE /api/chat/session/:id]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
