import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;
    if (!code) return NextResponse.json({ error: "Kode booking diperlukan" }, { status: 400 });

    try {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT b.booking_code, b.tour_date, b.guests, b.adults, b.children, 
                    b.total_price, b.status, b.payment_status, b.created_at,
                    t.title as tour_title, t.location as tour_location
             FROM bookings b 
             LEFT JOIN tours t ON b.tour_id = t.id 
             WHERE b.booking_code = ?`,
            [code]
        );

        if (!rows[0]) {
            // Try mock data as fallback (for dev/demo)
            const mockBooking = getMockBooking(code);
            if (mockBooking) return NextResponse.json({ booking: mockBooking });
            return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json({ booking: rows[0] });
    } catch {
        // DB not available — try mock data fallback
        const mockBooking = getMockBooking(code);
        if (mockBooking) return NextResponse.json({ booking: mockBooking });
        return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
    }
}

// Mock data fallback (matches demo data shown in trips page)
function getMockBooking(code: string) {
    const mock: Record<string, object> = {
        "BK001": {
            booking_code: "BK001",
            tour_title: "Raja Ampat Paradise",
            tour_location: "Papua Barat, Indonesia",
            tour_date: "2025-03-15",
            guests: 2,
            adults: 2,
            children: 0,
            total_price: 17000000,
            status: "confirmed",
            payment_status: "paid",
            created_at: "2025-01-02T00:00:00.000Z",
        },
        "BK002": {
            booking_code: "BK002",
            tour_title: "Bali Complete Experience",
            tour_location: "Bali, Indonesia",
            tour_date: "2025-04-20",
            guests: 2,
            adults: 2,
            children: 0,
            total_price: 8500000,
            status: "pending",
            payment_status: "pending",
            created_at: "2025-01-15T00:00:00.000Z",
        },
        "BK-2025-047": {
            booking_code: "BK-2025-047",
            tour_title: "Raja Ampat Paradise",
            tour_location: "Papua Barat, Indonesia",
            tour_date: "2025-03-15",
            guests: 2,
            adults: 2,
            children: 0,
            total_price: 17000000,
            status: "pending",
            payment_status: "pending",
            created_at: "2025-02-18T00:00:00.000Z",
        },
    };
    return mock[code] || null;
}
