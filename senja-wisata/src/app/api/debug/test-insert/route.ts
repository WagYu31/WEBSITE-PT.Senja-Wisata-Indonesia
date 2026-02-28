import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
    const results: Record<string, unknown> = {};

    // Step 1: Check tours table structure
    try {
        const [cols] = await db.query<RowDataPacket[]>("DESCRIBE tours");
        results.toursStructure = (cols as RowDataPacket[]).map(c => `${c.Field}:${c.Type}:${c.Null}:${c.Default}`);
    } catch (err) {
        results.toursStructure = { error: String(err) };
    }

    // Step 2: Check if any tours exist
    try {
        const [rows] = await db.query<RowDataPacket[]>("SELECT id, title FROM tours LIMIT 5");
        results.existingTours = rows;
    } catch (err) {
        results.existingTours = { error: String(err) };
    }

    // Step 3: Try inserting a test tour
    try {
        const [result] = await db.query(
            `INSERT IGNORE INTO tours (id, title, slug, description, price, duration, location, category, rating, review_count, max_group, is_active)
             VALUES (9999, 'Test Tour', 'test-tour', 'Test', 1000000, '3 Days', 'Test Location', 'adventure', 4.5, 0, 20, TRUE)`
        );
        results.tourInsert = { ok: true, result };
    } catch (err) {
        results.tourInsert = { ok: false, error: String(err), message: err instanceof Error ? err.message : "" };
    }

    // Step 4: Try inserting a test booking
    try {
        const [result] = await db.query(
            `INSERT INTO bookings 
             (booking_code, user_id, tour_id, tour_date, guests, adults, children, total_price,
              status, special_request, payment_method, payment_status, midtrans_order_id, midtrans_transaction_id, snap_token)
             VALUES ('TEST-999', 1, 9999, '2026-12-31', 1, 1, 0, 1000000, 
                     'pending', '', 'midtrans', 'pending', 'TEST-ORDER-999', '', 'test-token')`
        );
        results.bookingInsert = { ok: true, result };
    } catch (err) {
        results.bookingInsert = { ok: false, error: String(err), message: err instanceof Error ? err.message : "" };
    }

    // Step 5: Verify the test booking was inserted
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM bookings WHERE booking_code = 'TEST-999'"
        );
        results.verifyBooking = { found: rows.length > 0, data: rows[0] || null };
    } catch (err) {
        results.verifyBooking = { error: String(err) };
    }

    // Step 6: Clean up test data
    try {
        await db.query("DELETE FROM bookings WHERE booking_code = 'TEST-999'");
        await db.query("DELETE FROM tours WHERE id = 9999");
        results.cleanup = "ok";
    } catch (err) {
        results.cleanup = { error: String(err) };
    }

    return NextResponse.json(results);
}
