import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
    try {
        const role = req.nextUrl.searchParams.get("role") || "user";
        const userId = req.nextUrl.searchParams.get("userId");
        const limit = 20;

        interface Notification {
            id: string;
            type: string;
            title: string;
            message: string;
            time: string;
            link?: string;
        }

        const notifications: Notification[] = [];

        if (role === "user" && userId) {
            // User notifications: booking status changes
            try {
                const [bookings] = await db.query<RowDataPacket[]>(
                    `SELECT id, booking_id, tour_title, status, created_at
                     FROM bookings WHERE user_id = ?
                     ORDER BY created_at DESC LIMIT ?`,
                    [userId, limit]
                );

                for (const b of bookings) {
                    const bkId = b.booking_id || `BK${String(b.id).padStart(3, "0")}`;
                    const time = b.created_at;

                    if (b.status === "confirmed") {
                        notifications.push({
                            id: `booking-confirmed-${b.id}`,
                            type: "booking_confirmed",
                            title: "Booking Dikonfirmasi ✅",
                            message: `Booking ${bkId} untuk ${b.tour_title} telah dikonfirmasi!`,
                            time: new Date(time).toISOString(),
                            link: "/dashboard/trips",
                        });
                    } else if (b.status === "completed") {
                        notifications.push({
                            id: `booking-completed-${b.id}`,
                            type: "booking_completed",
                            title: "Trip Selesai 🎉",
                            message: `Trip ${b.tour_title} sudah selesai. Terima kasih!`,
                            time: new Date(time).toISOString(),
                            link: "/dashboard/trips",
                        });
                    } else if (b.status === "cancelled") {
                        notifications.push({
                            id: `booking-cancelled-${b.id}`,
                            type: "booking_cancelled",
                            title: "Booking Dibatalkan",
                            message: `Booking ${bkId} untuk ${b.tour_title} telah dibatalkan.`,
                            time: new Date(time).toISOString(),
                            link: "/dashboard/trips",
                        });
                    } else if (b.status === "pending") {
                        notifications.push({
                            id: `booking-pending-${b.id}`,
                            type: "booking_pending",
                            title: "Menunggu Pembayaran 💳",
                            message: `Booking ${bkId} untuk ${b.tour_title} menunggu pembayaran.`,
                            time: new Date(time).toISOString(),
                            link: "/dashboard/trips",
                        });
                    }
                }
            } catch (err) {
                console.error("User notifications query error:", err);
            }
        } else if (role === "admin" || role === "owner") {
            // Admin notifications: new bookings
            try {
                const [bookings] = await db.query<RowDataPacket[]>(
                    `SELECT id, booking_id, tour_title, status, total_price, created_at
                     FROM bookings ORDER BY created_at DESC LIMIT ?`,
                    [limit]
                );

                for (const b of bookings) {
                    const bkId = b.booking_id || `BK${String(b.id).padStart(3, "0")}`;
                    notifications.push({
                        id: `admin-booking-${b.id}`,
                        type: "new_booking",
                        title: `Booking Baru: ${bkId}`,
                        message: `${b.tour_title} - Rp ${Number(b.total_price).toLocaleString("id-ID")} (${b.status})`,
                        time: new Date(b.created_at).toISOString(),
                        link: "/admin/bookings",
                    });
                }
            } catch (err) {
                console.error("Admin booking notifications error:", err);
            }

            // Admin notifications: new users
            try {
                const [users] = await db.query<RowDataPacket[]>(
                    `SELECT id, name, email, created_at FROM users
                     ORDER BY created_at DESC LIMIT ?`,
                    [10]
                );

                for (const u of users) {
                    notifications.push({
                        id: `admin-user-${u.id}`,
                        type: "new_user",
                        title: "User Baru Terdaftar 👤",
                        message: `${u.name} (${u.email}) baru bergabung.`,
                        time: new Date(u.created_at).toISOString(),
                        link: "/admin/users",
                    });
                }
            } catch (err) {
                console.error("Admin user notifications error:", err);
            }

            // Sort by time descending
            notifications.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        }

        return NextResponse.json({ success: true, notifications: notifications.slice(0, limit) });
    } catch (error) {
        console.error("Notifications error:", error);
        return NextResponse.json({ success: false, notifications: [], error: String(error) }, { status: 500 });
    }
}
