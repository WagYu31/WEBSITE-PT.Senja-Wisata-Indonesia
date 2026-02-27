import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { bookingStore } from "@/lib/bookingStore";

// GET: Fetch ALL bookings (for admin use)
export async function GET() {
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT b.*, 
                    t.title as tour_title, 
                    t.location as tour_location,
                    u.name as user_name,
                    u.email as user_email
             FROM bookings b 
             LEFT JOIN tours t ON b.tour_id = t.id 
             LEFT JOIN users u ON b.user_id = u.id
             ORDER BY b.created_at DESC`
        );

        // Merge DB rows with in-memory bookings
        const dbCodes = new Set((rows as RowDataPacket[]).map(r => r.booking_code));
        const memBookings = bookingStore.getAll().filter(b => !dbCodes.has(b.booking_code));

        return NextResponse.json({ bookings: [...rows, ...memBookings] });
    } catch {
        // DB unavailable — return only in-memory bookings
        const memBookings = bookingStore.getAll();
        return NextResponse.json({ bookings: memBookings });
    }
}
