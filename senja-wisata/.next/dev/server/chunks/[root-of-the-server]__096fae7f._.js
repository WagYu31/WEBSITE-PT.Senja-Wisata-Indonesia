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
"[project]/src/app/api/booking/check-status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/bookingStore.ts [app-route] (ecmascript)");
;
;
;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const MidtransClient = __turbopack_context__.r("[project]/node_modules/midtrans-client/index.js [app-route] (ecmascript)");
// Core API client for checking transaction status
const coreApi = new MidtransClient.CoreApi({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY ?? ""
});
async function POST(req) {
    try {
        const body = await req.json();
        const { orderId } = body;
        if (!orderId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "orderId diperlukan"
            }, {
                status: 400
            });
        }
        // Query Midtrans for current transaction status
        let transactionStatus;
        let paymentType = "";
        try {
            const status = await coreApi.transaction.status(orderId);
            transactionStatus = status.transaction_status;
            paymentType = status.payment_type || "";
            console.log(`[Status Check] Order ${orderId}: ${transactionStatus} (${paymentType})`);
        } catch (err) {
            console.error("[Status Check] Midtrans API error:", err);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Gagal cek status ke Midtrans"
            }, {
                status: 502
            });
        }
        // Map Midtrans status to internal status
        let paymentStatus;
        let bookingStatus;
        if (transactionStatus === "capture" || transactionStatus === "settlement") {
            paymentStatus = "paid";
            bookingStatus = "confirmed";
        } else if (transactionStatus === "pending") {
            paymentStatus = "pending";
            bookingStatus = "pending";
        } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "expire") {
            paymentStatus = transactionStatus === "expire" ? "expired" : "cancelled";
            bookingStatus = "cancelled";
        } else if (transactionStatus === "refund" || transactionStatus === "partial_refund") {
            paymentStatus = "refunded";
            bookingStatus = "cancelled";
        } else {
            paymentStatus = "pending";
            bookingStatus = "pending";
        }
        // Update DB
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].query(`UPDATE bookings SET 
                    payment_status = ?, 
                    status = ?, 
                    payment_method = COALESCE(NULLIF(?, ''), payment_method),
                    paid_at = IF(? = 'paid', COALESCE(paid_at, NOW()), paid_at),
                    updated_at = NOW()
                 WHERE midtrans_order_id = ?`, [
                paymentStatus,
                bookingStatus,
                paymentType,
                paymentStatus,
                orderId
            ]);
        } catch  {
            console.warn("[Status Check] DB update skipped — using in-memory fallback");
        }
        // Update in-memory store (dev fallback)
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookingStore"].updateStatus(orderId, bookingStatus, paymentStatus);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            orderId,
            transactionStatus,
            paymentStatus,
            bookingStatus
        });
    } catch (error) {
        console.error("[Status Check] Error:", error);
        const message = error instanceof Error ? error.message : "Gagal cek status";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__096fae7f._.js.map