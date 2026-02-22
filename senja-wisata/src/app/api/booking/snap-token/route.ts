import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookingStore } from "@/lib/bookingStore";
import { RowDataPacket } from "mysql2";

// GET snap_token for a booking (to re-open Midtrans Snap)
export async function GET(req: NextRequest) {
    const bookingCode = req.nextUrl.searchParams.get("bookingCode");
    if (!bookingCode) return NextResponse.json({ error: "bookingCode diperlukan" }, { status: 400 });

    // Try in-memory store first
    const memBooking = bookingStore.getByCode(bookingCode);
    if (memBooking?.snap_token) {
        return NextResponse.json({ snapToken: memBooking.snap_token });
    }

    // Try DB
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT snap_token FROM bookings WHERE booking_code = ?",
            [bookingCode]
        );
        if (rows[0]?.snap_token) {
            return NextResponse.json({ snapToken: rows[0].snap_token });
        }
    } catch { /* DB not available */ }

    return NextResponse.json({ error: "Snap token tidak ditemukan" }, { status: 404 });
}
