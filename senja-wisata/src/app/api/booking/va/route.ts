import { NextRequest, NextResponse } from "next/server";
import { bookingStore } from "@/lib/bookingStore";

// Called from client when Midtrans onPending fires with VA number
export async function POST(req: NextRequest) {
    try {
        const { orderId, vaNumber, vaBank } = await req.json();
        if (!orderId || !vaNumber) {
            return NextResponse.json({ error: "orderId dan vaNumber diperlukan" }, { status: 400 });
        }
        bookingStore.saveVA(orderId, vaNumber, vaBank || "");
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Gagal menyimpan VA" }, { status: 500 });
    }
}
