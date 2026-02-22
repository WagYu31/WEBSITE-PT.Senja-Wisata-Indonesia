// eslint-disable-next-line @typescript-eslint/no-require-imports
const MidtransClient = require("midtrans-client");

// Midtrans Snap client (singleton)
const globalForMidtrans = global as typeof global & { snap?: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const snap: any =
    globalForMidtrans.snap ??
    new MidtransClient.Snap({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
        serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
        clientKey: process.env.MIDTRANS_CLIENT_KEY ?? "",
    });

if (process.env.NODE_ENV !== "production") {
    globalForMidtrans.snap = snap;
}

// Generate unique order ID
export function generateOrderId(): string {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SW-${y}${m}${d}-${rand}`;
}

// Generate booking code
export function generateBookingCode(): string {
    const now = new Date();
    const y = now.getFullYear();
    const seq = Math.floor(Math.random() * 999) + 1;
    return `BK-${y}-${String(seq).padStart(3, "0")}`;
}

/**
 * Kebijakan refund bertingkat:
 *   ≥ 7 hari  → potongan 10% (refund 90%)
 *   3–6 hari  → potongan 50% (refund 50%)
 *   1–2 hari  → potongan 75% (refund 25%)
 *   < 1 hari  → potongan 100% (tidak ada refund)
 */
export function calculateRefund(tourDate: Date, totalPrice: number) {
    const now = new Date();
    const diffMs = tourDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    let deductionPercent: number;
    let label: string;

    if (diffDays >= 7) {
        deductionPercent = 10;
        label = "≥ 7 hari sebelum trip";
    } else if (diffDays >= 3) {
        deductionPercent = 50;
        label = "3–6 hari sebelum trip";
    } else if (diffDays >= 1) {
        deductionPercent = 75;
        label = "1–2 hari sebelum trip";
    } else {
        deductionPercent = 100;
        label = "Hari H / kurang dari 24 jam";
    }

    const refundPercent = 100 - deductionPercent;
    const refundAmount = Math.floor(totalPrice * (refundPercent / 100));

    return {
        diffDays,
        deductionPercent,
        refundPercent,
        refundAmount,
        label,
    };
}
