import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "userId required" }, { status: 400 });
        }

        // Get bookings for this user
        const [bookings] = await db.query<RowDataPacket[]>(
            `SELECT b.id, b.booking_id, b.tour_title, b.travel_date, b.duration,
                    b.guests, b.total_price, b.status, b.created_at,
                    b.destination
             FROM bookings b WHERE b.user_id = ? ORDER BY b.created_at DESC`,
            [userId]
        );

        // Get stats
        const totalTrips = bookings.length;
        const upcomingTrips = bookings.filter(
            (b: RowDataPacket) => b.status === "confirmed" && new Date(b.travel_date) > new Date()
        ).length;

        return NextResponse.json({
            success: true,
            bookings: bookings.map((b: RowDataPacket) => ({
                id: b.booking_id || `BK${String(b.id).padStart(3, "0")}`,
                tourTitle: b.tour_title || "Tour",
                date: b.travel_date ? new Date(b.travel_date).toISOString().split("T")[0] : "N/A",
                duration: b.duration || "N/A",
                guests: b.guests || 1,
                total: Number(b.total_price) || 0,
                status: b.status || "pending",
                destination: b.destination || "",
            })),
            stats: {
                totalTrips,
                upcomingTrips,
            },
        });
    } catch (err) {
        console.error("User bookings error:", err);
        return NextResponse.json(
            { success: false, error: "Gagal memuat data booking" },
            { status: 500 }
        );
    }
}
