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
    getByUserId (userId) {
        return g.__bookingStore.filter((b)=>b.user_id === userId);
    },
    getByCode (code) {
        return g.__bookingStore.find((b)=>b.booking_code === code);
    },
    updateStatus (orderId, status, paymentStatus) {
        const b = g.__bookingStore.find((b)=>b.midtrans_order_id === orderId);
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
"[project]/src/app/api/booking/va/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/bookingStore.ts [app-route] (ecmascript)");
;
;
async function POST(req) {
    try {
        const { orderId, vaNumber, vaBank } = await req.json();
        if (!orderId || !vaNumber) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "orderId dan vaNumber diperlukan"
            }, {
                status: 400
            });
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$bookingStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bookingStore"].saveVA(orderId, vaNumber, vaBank || "");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Gagal menyimpan VA"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b1330a6c._.js.map