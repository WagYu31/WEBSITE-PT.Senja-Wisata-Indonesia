module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mysql2/promise.js [app-route] (ecmascript)");
;
// Singleton connection pool — reused across requests in Next.js
const globalForDb = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const db = globalForDb.dbPool ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool({
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "senja",
    password: process.env.DB_PASSWORD ?? "senja123",
    database: process.env.DB_NAME ?? "senja_wisata",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: "+07:00"
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDb.dbPool = db;
}
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[project]/src/lib/midtrans.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateRefund",
    ()=>calculateRefund,
    "generateBookingCode",
    ()=>generateBookingCode,
    "generateOrderId",
    ()=>generateOrderId,
    "snap",
    ()=>snap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$midtrans$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/midtrans-client/index.js [app-route] (ecmascript)");
;
// Midtrans Snap client (singleton)
const globalForMidtrans = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const snap = globalForMidtrans.snap ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$midtrans$2d$client$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY ?? ""
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForMidtrans.snap = snap;
}
function generateOrderId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `SW-${y}${m}${d}-${rand}`;
}
function generateBookingCode() {
    const now = new Date();
    const y = now.getFullYear();
    const seq = Math.floor(Math.random() * 999) + 1;
    return `BK-${y}-${String(seq).padStart(3, "0")}`;
}
function calculateRefund(tourDate, totalPrice) {
    const now = new Date();
    const diffMs = tourDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    let deductionPercent;
    let label;
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
        label
    };
}
}),
"[project]/src/app/api/booking/cancel/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$midtrans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/midtrans.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { bookingCode, reason } = body;
        if (!bookingCode) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Booking code diperlukan"
            }, {
                status: 400
            });
        }
        // Find booking
        const [rows] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query("SELECT * FROM bookings WHERE booking_code = ?", [
            bookingCode
        ]);
        const booking = rows[0];
        if (!booking) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Booking tidak ditemukan"
            }, {
                status: 404
            });
        }
        if (booking.status === "cancelled") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Booking sudah dibatalkan"
            }, {
                status: 400
            });
        }
        if (booking.status === "completed") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Booking yang sudah selesai tidak bisa dibatalkan"
            }, {
                status: 400
            });
        }
        // Calculate refund
        const tourDate = new Date(booking.tour_date);
        const totalPrice = Number(booking.total_price);
        const refund = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$midtrans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRefund"])(tourDate, totalPrice);
        // Update booking
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query(`UPDATE bookings SET 
                status = 'cancelled',
                payment_status = IF(payment_status = 'paid', 'refunded', 'cancelled'),
                cancelled_at = NOW(),
                cancel_reason = ?,
                refund_amount = ?,
                refund_percentage = ?,
                updated_at = NOW()
             WHERE booking_code = ?`, [
            reason || "Dibatalkan oleh pengguna",
            refund.refundAmount,
            refund.refundPercent,
            bookingCode
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Booking berhasil dibatalkan",
            refund: {
                totalPrice,
                refundPercent: refund.refundPercent,
                deductionPercent: refund.deductionPercent,
                refundAmount: refund.refundAmount,
                deductionAmount: totalPrice - refund.refundAmount,
                daysBeforeTrip: refund.diffDays,
                policyLabel: refund.label
            }
        });
    } catch (error) {
        console.error("[Cancel Booking] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal membatalkan booking";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
async function GET(req) {
    const bookingCode = req.nextUrl.searchParams.get("bookingCode");
    const tourDateParam = req.nextUrl.searchParams.get("tourDate");
    const totalPriceParam = req.nextUrl.searchParams.get("totalPrice");
    // Allow preview calculation without DB
    if (tourDateParam && totalPriceParam) {
        const refund = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$midtrans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRefund"])(new Date(tourDateParam), Number(totalPriceParam));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            refundPercent: refund.refundPercent,
            deductionPercent: refund.deductionPercent,
            refundAmount: refund.refundAmount,
            deductionAmount: Number(totalPriceParam) - refund.refundAmount,
            daysBeforeTrip: refund.diffDays,
            policyLabel: refund.label
        });
    }
    if (!bookingCode) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "bookingCode diperlukan"
        }, {
            status: 400
        });
    }
    try {
        const [rows] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query("SELECT tour_date, total_price, status FROM bookings WHERE booking_code = ?", [
            bookingCode
        ]);
        const booking = rows[0];
        if (!booking) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Booking tidak ditemukan"
        }, {
            status: 404
        });
        const refund = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$midtrans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRefund"])(new Date(booking.tour_date), Number(booking.total_price));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            refundPercent: refund.refundPercent,
            deductionPercent: refund.deductionPercent,
            refundAmount: refund.refundAmount,
            deductionAmount: Number(booking.total_price) - refund.refundAmount,
            daysBeforeTrip: refund.diffDays,
            policyLabel: refund.label,
            currentStatus: booking.status
        });
    } catch (error) {
        console.error("[Cancel Preview] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Gagal memuat data"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e5afd42d._.js.map