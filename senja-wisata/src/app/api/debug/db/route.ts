import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
    const results: Record<string, unknown> = {};

    // Test 1: DB connection
    try {
        const [rows] = await db.query<RowDataPacket[]>("SELECT 1 as ok");
        results.connection = { ok: true, result: rows[0] };
    } catch (err) {
        results.connection = { ok: false, error: String(err) };
    }

    // Test 2: Users table
    try {
        const [rows] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM users");
        results.users = { ok: true, count: rows[0].count };
    } catch (err) {
        results.users = { ok: false, error: String(err) };
    }

    // Test 3: Bookings table
    try {
        const [rows] = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM bookings");
        results.bookings = { ok: true, count: rows[0].count };
    } catch (err) {
        results.bookings = { ok: false, error: String(err) };
    }

    // Test 4: List bookings
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT id, booking_code, user_id, tour_id, status, created_at FROM bookings ORDER BY id DESC LIMIT 10"
        );
        results.recentBookings = rows;
    } catch (err) {
        results.recentBookings = { error: String(err) };
    }

    // Test 5: DB env info
    results.dbConfig = {
        host: process.env.DB_HOST || "(default: localhost)",
        database: process.env.DB_NAME || "(default: senja_wisata)",
        user: process.env.DB_USER || "(default: senja)",
        hasDatabaseUrl: !!process.env.DATABASE_URL,
    };

    return NextResponse.json(results);
}
