import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { id, is_active } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "id diperlukan" }, { status: 400 });
        }

        await db.query(
            "UPDATE tours SET is_active = ? WHERE id = ?",
            [is_active ? 1 : 0, id]
        );

        return NextResponse.json({ success: true, message: is_active ? "Tour diaktifkan" : "Tour dinonaktifkan" });
    } catch (err) {
        console.error("[Tours] Toggle error:", err);
        return NextResponse.json({ error: "Gagal mengubah status tour", detail: String(err) }, { status: 500 });
    }
}
