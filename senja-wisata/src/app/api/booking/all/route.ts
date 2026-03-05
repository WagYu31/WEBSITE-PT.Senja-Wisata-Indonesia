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

        // Auto-complete: update confirmed bookings with past trip dates to "completed"
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const toAutoComplete = (rows as RowDataPacket[]).filter(r => {
            if (r.status !== "confirmed") return false;
            const tripDate = new Date(r.tour_date);
            tripDate.setHours(23, 59, 59, 999);
            return tripDate < now;
        });

        if (toAutoComplete.length > 0) {
            const ids = toAutoComplete.map(r => r.id);
            await db.query(
                `UPDATE bookings SET status = 'completed' WHERE id IN (${ids.map(() => '?').join(',')})`,
                ids
            );
            // Update the rows in memory too
            for (const row of rows as RowDataPacket[]) {
                if (toAutoComplete.some(r => r.id === row.id)) {
                    row.status = "completed";
                }
            }
        }

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
