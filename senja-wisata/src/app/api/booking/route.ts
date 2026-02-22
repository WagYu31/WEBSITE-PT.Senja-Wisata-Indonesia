import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { snap, generateOrderId, generateBookingCode } from "@/lib/midtrans";
import { RowDataPacket } from "mysql2";
import { bookingStore } from "@/lib/bookingStore";

// GET: Fetch bookings for a specific user
export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId diperlukan" }, { status: 400 });
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT b.*, t.title as tour_title, t.location as tour_location 
             FROM bookings b 
             LEFT JOIN tours t ON b.tour_id = t.id 
             WHERE b.user_id = ? 
             ORDER BY b.created_at DESC`,
            [userId]
        );
        // Merge: DB results first, then any in-memory bookings not already in DB
        const dbCodes = new Set((rows as RowDataPacket[]).map((r) => r.booking_code));
        const memBookings = bookingStore.getByUserId(Number(userId)).filter(b => !dbCodes.has(b.booking_code));
        return NextResponse.json({ bookings: [...rows, ...memBookings] });
    } catch {
        // DB unavailable — return only in-memory bookings
        const memBookings = bookingStore.getByUserId(Number(userId));
        return NextResponse.json({ bookings: memBookings });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { tourId, tourDate, adults, children, userId, userName, userEmail, userPhone } = body;

        if (!tourId || !tourDate || !adults || !userId) {
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
        }

        // Get tour info
        const [tours] = await db.query<RowDataPacket[]>(
            "SELECT id, title, price FROM tours WHERE id = ? AND is_active = TRUE",
            [tourId]
        );

        let tour = tours[0];
        let tourTitle = "";
        let tourPrice = 0;

        if (tour) {
            tourTitle = tour.title;
            tourPrice = Number(tour.price);
        } else {
            // Fallback: get tour from static data if DB doesn't have it
            const { tours: staticTours } = await import("@/lib/data");
            const staticTour = staticTours.find(t => t.id === Number(tourId));
            if (!staticTour) {
                return NextResponse.json({ error: "Tour tidak ditemukan" }, { status: 404 });
            }
            tourTitle = staticTour.title;
            tourPrice = staticTour.price;
        }

        const totalGuests = Number(adults) + Number(children || 0);
        const totalPrice = tourPrice * (Number(adults) + Number(children || 0) * 0.5);

        const orderId = generateOrderId();
        const bookingCode = generateBookingCode();

        // Create Midtrans Snap transaction
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalPrice,
            },
            item_details: [
                {
                    id: `tour-${tourId}`,
                    price: tourPrice,
                    quantity: Number(adults),
                    name: `${tourTitle} (Dewasa)`,
                },
                ...(Number(children || 0) > 0
                    ? [
                        {
                            id: `tour-${tourId}-child`,
                            price: Math.floor(tourPrice * 0.5),
                            quantity: Number(children),
                            name: `${tourTitle} (Anak)`,
                        },
                    ]
                    : []),
            ],
            customer_details: {
                first_name: userName || "Guest",
                email: userEmail || "",
                phone: userPhone || "",
            },
            callbacks: {
                finish: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/trips?payment=success`,
            },
        };

        const snapResponse = await snap.createTransaction(parameter);

        // Insert booking into DB
        try {
            await db.query(
                `INSERT INTO bookings 
                 (booking_code, user_id, tour_id, tour_date, guests, adults, children, total_price, 
                  status, payment_status, midtrans_order_id, snap_token) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', ?, ?)`,
                [bookingCode, userId, tourId, tourDate, totalGuests, adults, children || 0, totalPrice, orderId, snapResponse.token]
            );
        } catch {
            // DB might not exist in dev — save to in-memory store as fallback
            console.warn("[Booking] DB insert skipped — saving to in-memory store");
            const { tours: staticTours } = await import("@/lib/data");
            const staticTour = staticTours.find(t => t.id === Number(tourId));
            bookingStore.add({
                booking_code: bookingCode,
                user_id: Number(userId),
                tour_id: Number(tourId),
                tour_title: tourTitle,
                tour_location: staticTour?.location || "",
                tour_date: tourDate,
                guests: totalGuests,
                adults: Number(adults),
                children: Number(children || 0),
                total_price: totalPrice,
                status: "pending",
                payment_status: "pending",
                midtrans_order_id: orderId,
                snap_token: snapResponse.token,
                created_at: new Date().toISOString(),
            });
        }

        return NextResponse.json({
            success: true,
            bookingCode,
            orderId,
            snapToken: snapResponse.token,
            redirectUrl: snapResponse.redirect_url,
            totalPrice,
        });
    } catch (error: unknown) {
        console.error("[Booking] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal membuat booking";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
