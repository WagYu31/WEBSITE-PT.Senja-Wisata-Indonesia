import { NextResponse } from "next/server";

// ── In-memory SSE clients store ───────────────────────────────────────────────
// Menyimpan fungsi "send" tiap client admin yang sedang connect

type SSEClient = (data: object) => void;
const clients = new Set<SSEClient>();

export function notifyClients(data: object) {
    clients.forEach((sendFn) => sendFn(data));
}

// ── GET /api/chat/stream — Server-Sent Events ─────────────────────────────────

export async function GET() {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // Send heartbeat pingkiri setiap 20 detik agar koneksi tidak timeout
    const heartbeat = setInterval(() => {
        writer.write(encoder.encode(`: ping\n\n`)).catch(() => cleanup());
    }, 20_000);

    function send(data: object) {
        writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`)).catch(() => cleanup());
    }

    function cleanup() {
        clearInterval(heartbeat);
        clients.delete(send);
        writer.close().catch(() => { });
    }

    clients.add(send);

    // Send initial connected event
    writer.write(encoder.encode(`data: ${JSON.stringify({ type: "connected" })}\n\n`));

    return new NextResponse(readable, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
        },
    });
}
