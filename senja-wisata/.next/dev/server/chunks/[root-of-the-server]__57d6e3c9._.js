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
// eslint-disable-next-line @typescript-eslint/no-require-imports
const MidtransClient = __turbopack_context__.r("[project]/node_modules/midtrans-client/index.js [app-route] (ecmascript)");
// Midtrans Snap client (singleton)
const globalForMidtrans = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const snap = globalForMidtrans.snap ?? new MidtransClient.Snap({
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
"[project]/src/lib/bookingStore.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * In-memory booking store (dev fallback when DB is not available).
 * Uses globalThis to persist across hot-reloads in Next.js dev mode.
 */ __turbopack_context__.s([
    "bookingStore",
    ()=>bookingStore
]);
// Use globalThis to survive Next.js hot reloads
const g = globalThis;
if (!g.__bookingStore) g.__bookingStore = [];
const bookingStore = {
    add (booking) {
        // avoid duplicates
        if (!g.__bookingStore.find((b)=>b.booking_code === booking.booking_code)) {
            g.__bookingStore.unshift(booking);
        }
    },
    getAll () {
        return [
            ...g.__bookingStore
        ];
    },
    getByUserId (userId) {
        return g.__bookingStore.filter((b)=>b.user_id === userId);
    },
    getByCode (code) {
        return g.__bookingStore.find((b)=>b.booking_code === code);
    },
    updateStatus (orderId, status, paymentStatus) {
        const b = g.__bookingStore.find((b)=>b.midtrans_order_id === orderId || b.booking_code === orderId);
        if (b) {
            b.status = status;
            b.payment_status = paymentStatus;
        }
    },
    cancel (bookingCode) {
        const b = g.__bookingStore.find((b)=>b.booking_code === bookingCode);
        if (b) {
            b.status = "cancelled";
            b.payment_status = b.payment_status === "paid" ? "refunded" : "cancelled";
        }
        return b;
    },
    saveVA (orderId, vaNumber, vaBank) {
        const b = g.__bookingStore.find((b)=>b.midtrans_order_id === orderId);
        if (b) {
            b.va_number = vaNumber;
            b.va_bank = vaBank;
        }
    }
};
}),
"[project]/src/app/api/booking/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/bookingStore.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(req) {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "userId diperlukan"
    }, {
        status: 400
    });
    try {
        const [rows] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query(`SELECT b.*, t.title as tour_title, t.location as tour_location 
             FROM bookings b 
             LEFT JOIN tours t ON b.tour_id = t.id 
             WHERE b.user_id = ? 
             ORDER BY b.created_at DESC`, [
            userId
        ]);
        // Merge: DB results first, then any in-memory bookings not already in DB
        const dbCodes = new Set(rows.map((r)=>r.booking_code));
        const memBookings = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookingStore"].getByUserId(Number(userId)).filter((b)=>!dbCodes.has(b.booking_code));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            bookings: [
                ...rows,
                ...memBookings
            ]
        });
    } catch  {
        // DB unavailable — return only in-memory bookings
        const memBookings = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookingStore"].getByUserId(Number(userId));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            bookings: memBookings
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const { tourId, tourDate, adults, children, userId, userName, userEmail, userPhone } = body;
        if (!tourId || !tourDate || !adults || !userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Data tidak lengkap"
            }, {
                status: 400
            });
        }
        // Get tour info
        const [tours] = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query("SELECT id, title, price FROM tours WHERE id = ? AND is_active = TRUE", [
            tourId
        ]);
        let tour = tours[0];
        let tourTitle = "";
        let tourPrice = 0;
        if (tour) {
            tourTitle = tour.title;
            tourPrice = Number(tour.price);
        } else {
            // Fallback: get tour from static data if DB doesn't have it
            const { tours: staticTours } = await __turbopack_context__.A("[project]/src/lib/data.ts [app-route] (ecmascript, async loader)");
            const staticTour = staticTours.find((t)=>t.id === Number(tourId));
            if (!staticTour) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Tour tidak ditemukan"
                }, {
                    status: 404
                });
            }
            tourTitle = staticTour.title;
            tourPrice = staticTour.price;
        }
        const totalGuests = Number(adults) + Number(children || 0);
        const totalPrice = tourPrice * (Number(adults) + Number(children || 0) * 0.5);
        const orderId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$midtrans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateOrderId"])();
        const bookingCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$midtrans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateBookingCode"])();
        // Create Midtrans Snap transaction
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalPrice
            },
            item_details: [
                {
                    id: `tour-${tourId}`,
                    price: tourPrice,
                    quantity: Number(adults),
                    name: `${tourTitle} (Dewasa)`
                },
                ...Number(children || 0) > 0 ? [
                    {
                        id: `tour-${tourId}-child`,
                        price: Math.floor(tourPrice * 0.5),
                        quantity: Number(children),
                        name: `${tourTitle} (Anak)`
                    }
                ] : []
            ],
            customer_details: {
                first_name: userName || "Guest",
                email: userEmail || "",
                phone: userPhone || ""
            },
            callbacks: {
                finish: `${("TURBOPACK compile-time value", "http://192.168.0.243:3000") || "http://localhost:3000"}/dashboard/trips?payment=success`
            }
        };
        const snapResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$midtrans$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["snap"].createTransaction(parameter);
        // Insert booking into DB
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query(`INSERT INTO bookings 
                 (booking_code, user_id, tour_id, tour_date, guests, adults, children, total_price, 
                  status, payment_status, midtrans_order_id, snap_token) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', ?, ?)`, [
                bookingCode,
                userId,
                tourId,
                tourDate,
                totalGuests,
                adults,
                children || 0,
                totalPrice,
                orderId,
                snapResponse.token
            ]);
        } catch  {
            // DB might not exist in dev — save to in-memory store as fallback
            console.warn("[Booking] DB insert skipped — saving to in-memory store");
            const { tours: staticTours } = await __turbopack_context__.A("[project]/src/lib/data.ts [app-route] (ecmascript, async loader)");
            const staticTour = staticTours.find((t)=>t.id === Number(tourId));
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookingStore"].add({
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
                created_at: new Date().toISOString()
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            bookingCode,
            orderId,
            snapToken: snapResponse.token,
            redirectUrl: snapResponse.redirect_url,
            totalPrice
        });
    } catch (error) {
        console.error("[Booking] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal membuat booking";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__57d6e3c9._.js.map