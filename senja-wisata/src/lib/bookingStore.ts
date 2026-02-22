/**
 * In-memory booking store (dev fallback when DB is not available).
 * Uses globalThis to persist across hot-reloads in Next.js dev mode.
 */

export type BookingRecord = {
    booking_code: string;
    user_id: number;
    tour_id: number;
    tour_title: string;
    tour_location: string;
    tour_date: string;
    guests: number;
    adults: number;
    children: number;
    total_price: number;
    status: string;
    payment_status: string;
    midtrans_order_id: string;
    snap_token: string;
    created_at: string;
    va_number?: string;
    va_bank?: string;
};

// Use globalThis to survive Next.js hot reloads
const g = globalThis as typeof globalThis & { __bookingStore?: BookingRecord[] };
if (!g.__bookingStore) g.__bookingStore = [];

export const bookingStore = {
    add(booking: BookingRecord) {
        // avoid duplicates
        if (!g.__bookingStore!.find(b => b.booking_code === booking.booking_code)) {
            g.__bookingStore!.unshift(booking);
        }
    },
    getByUserId(userId: number): BookingRecord[] {
        return g.__bookingStore!.filter(b => b.user_id === userId);
    },
    getByCode(code: string): BookingRecord | undefined {
        return g.__bookingStore!.find(b => b.booking_code === code);
    },
    updateStatus(orderId: string, status: string, paymentStatus: string) {
        const b = g.__bookingStore!.find(b => b.midtrans_order_id === orderId);
        if (b) {
            b.status = status;
            b.payment_status = paymentStatus;
        }
    },
    cancel(bookingCode: string) {
        const b = g.__bookingStore!.find(b => b.booking_code === bookingCode);
        if (b) {
            b.status = "cancelled";
            b.payment_status = b.payment_status === "paid" ? "refunded" : "cancelled";
        }
        return b;
    },
    saveVA(orderId: string, vaNumber: string, vaBank: string) {
        const b = g.__bookingStore!.find(b => b.midtrans_order_id === orderId);
        if (b) {
            b.va_number = vaNumber;
            b.va_bank = vaBank;
        }
    },
};
