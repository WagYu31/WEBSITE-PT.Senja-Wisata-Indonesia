import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { bookingStore } from "@/lib/bookingStore";
import { tours } from "@/lib/data";

// Helper: check if a confirmed booking should be auto-completed
// Logic: 2 hours after departure time on the trip date
function shouldAutoComplete(tourDate: string | Date, tourTitle?: string): boolean {
    const tripDate = new Date(tourDate);
    // Find departure time from static tours data
    const tour = tours.find(t => t.title === tourTitle);
    const depTimeStr = tour?.departureTime || "08:00 WIB"; // default 08:00
    const hourMatch = depTimeStr.match(/(\d{1,2}):(\d{2})/);
    const depHour = hourMatch ? parseInt(hourMatch[1]) : 8;
    const depMin = hourMatch ? parseInt(hourMatch[2]) : 0;
    // Set trip completion time = trip date + departure hour + 2 hours buffer
    tripDate.setHours(depHour + 2, depMin, 0, 0);
    return new Date() > tripDate;
}

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

        // Auto-complete: confirmed bookings past departure time + 2h → completed
        const toAutoComplete = (rows as RowDataPacket[]).filter(r => {
            if (r.status !== "confirmed") return false;
            return shouldAutoComplete(r.tour_date, r.tour_title);
        });

        if (toAutoComplete.length > 0) {
            const ids = toAutoComplete.map(r => r.id);
            await db.query(
                `UPDATE bookings SET status = 'completed' WHERE id IN (${ids.map(() => '?').join(',')})`,
                ids
            );
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
