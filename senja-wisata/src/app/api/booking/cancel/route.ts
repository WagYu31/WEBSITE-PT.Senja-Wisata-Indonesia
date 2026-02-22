import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateRefund } from "@/lib/midtrans";
import { RowDataPacket } from "mysql2";
import { bookingStore } from "@/lib/bookingStore";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { bookingCode, reason } = body;

        if (!bookingCode) {
            return NextResponse.json({ error: "Booking code diperlukan" }, { status: 400 });
        }

        // Try DB first
        let booking: Record<string, unknown> | null = null;
        let fromStore = false;

        try {
            const [rows] = await db.query<RowDataPacket[]>(
                "SELECT * FROM bookings WHERE booking_code = ?",
                [bookingCode]
            );
            if (rows[0]) booking = rows[0] as Record<string, unknown>;
        } catch { /* DB not available */ }

        // Fallback to in-memory store
        if (!booking) {
            const memBooking = bookingStore.getByCode(bookingCode);
            if (memBooking) {
                booking = memBooking as unknown as Record<string, unknown>;
                fromStore = true;
            }
        }

        if (!booking) {
            return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });
        }

        if (booking.status === "cancelled") {
            return NextResponse.json({ error: "Booking sudah dibatalkan" }, { status: 400 });
        }

        if (booking.status === "completed") {
            return NextResponse.json({ error: "Booking yang sudah selesai tidak bisa dibatalkan" }, { status: 400 });
        }

        // Calculate refund
        const tourDate = new Date(booking.tour_date as string);
        const totalPrice = Number(booking.total_price);
        const refund = calculateRefund(tourDate, totalPrice);

        if (fromStore) {
            // Update in-memory store
            bookingStore.cancel(bookingCode);
        } else {
            // Update DB
            try {
                await db.query(
                    `UPDATE bookings SET 
                        status = 'cancelled',
                        payment_status = IF(payment_status = 'paid', 'refunded', 'cancelled'),
                        cancelled_at = NOW(),
                        cancel_reason = ?,
                        refund_amount = ?,
                        refund_percentage = ?,
                        updated_at = NOW()
                     WHERE booking_code = ?`,
                    [reason || "Dibatalkan oleh pengguna", refund.refundAmount, refund.refundPercent, bookingCode]
                );
            } catch {
                // DB failed — also cancel in store if exists
                bookingStore.cancel(bookingCode);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Booking berhasil dibatalkan",
            refund: {
                totalPrice,
                refundPercent: refund.refundPercent,
                deductionPercent: refund.deductionPercent,
                refundAmount: refund.refundAmount,
                deductionAmount: totalPrice - refund.refundAmount,
                daysBeforeTrip: refund.diffDays,
                policyLabel: refund.label,
            },
        });
    } catch (error: unknown) {
        console.error("[Cancel Booking] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal membatalkan booking";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// GET: Preview refund amount before confirming
export async function GET(req: NextRequest) {
    const bookingCode = req.nextUrl.searchParams.get("bookingCode");
    const tourDateParam = req.nextUrl.searchParams.get("tourDate");
    const totalPriceParam = req.nextUrl.searchParams.get("totalPrice");

    // Allow preview calculation without DB
    if (tourDateParam && totalPriceParam) {
        const refund = calculateRefund(new Date(tourDateParam), Number(totalPriceParam));
        return NextResponse.json({
            refundPercent: refund.refundPercent,
            deductionPercent: refund.deductionPercent,
            refundAmount: refund.refundAmount,
            deductionAmount: Number(totalPriceParam) - refund.refundAmount,
            daysBeforeTrip: refund.diffDays,
            policyLabel: refund.label,
        });
    }

    if (!bookingCode) {
        return NextResponse.json({ error: "bookingCode diperlukan" }, { status: 400 });
    }

    try {
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT tour_date, total_price, status FROM bookings WHERE booking_code = ?",
            [bookingCode]
        );
        const booking = rows[0];
        if (!booking) return NextResponse.json({ error: "Booking tidak ditemukan" }, { status: 404 });

        const refund = calculateRefund(new Date(booking.tour_date), Number(booking.total_price));
        return NextResponse.json({
            refundPercent: refund.refundPercent,
            deductionPercent: refund.deductionPercent,
            refundAmount: refund.refundAmount,
            deductionAmount: Number(booking.total_price) - refund.refundAmount,
            daysBeforeTrip: refund.diffDays,
            policyLabel: refund.label,
            currentStatus: booking.status,
        });
    } catch (error: unknown) {
        console.error("[Cancel Preview] Error:", error);
        return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 });
    }
}
