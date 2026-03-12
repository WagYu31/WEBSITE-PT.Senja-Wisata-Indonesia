import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for auth endpoints
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // max requests
const RATE_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();

    // ── ISO 27001: Security Headers ──────────────────────────────
    // Prevent clickjacking
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    // Prevent MIME type sniffing
    response.headers.set("X-Content-Type-Options", "nosniff");
    // XSS Protection (legacy browsers)
    response.headers.set("X-XSS-Protection", "1; mode=block");
    // Referrer Policy
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    // Permissions Policy (restrict dangerous APIs)
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(self), payment=(self)"
    );
    // Content Security Policy
    response.headers.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com https://app.midtrans.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https://images.unsplash.com https://randomuser.me https://*.midtrans.com",
            "connect-src 'self' https://app.sandbox.midtrans.com https://app.midtrans.com https://*.googleapis.com",
            "frame-src https://app.sandbox.midtrans.com https://app.midtrans.com https://www.google.com https://maps.google.com",
        ].join("; ")
    );
    // Strict Transport Security (HTTPS only)
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    // ── ISO 27001: Rate Limiting for Auth Endpoints ──────────────
    if (pathname.startsWith("/api/auth/")) {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
            || request.headers.get("x-real-ip")
            || "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Terlalu banyak percobaan. Coba lagi dalam 1 menit." },
                { status: 429 }
            );
        }
    }

    return response;
}

export const config = {
    matcher: [
        // Apply to all routes except static files and images
        "/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js).*)",
    ],
};
