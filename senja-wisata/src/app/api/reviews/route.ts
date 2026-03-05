import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

// In-memory fallback store for reviews (uses globalThis to survive Next.js hot-reloads)
type ReviewRecord = {
    id: number;
    user_id: number;
    user_name: string;
    tour_id: number;
    tour_title: string;
    booking_id: string;
    rating: number;
    comment: string;
    created_at: string;
};

const g = globalThis as typeof globalThis & { __reviewStore?: ReviewRecord[]; __reviewNextId?: number };
if (!g.__reviewStore) g.__reviewStore = [];
if (!g.__reviewNextId) g.__reviewNextId = 1;
const reviewStore = g.__reviewStore;

// Ensure reviews table exists
async function ensureTable() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                user_name VARCHAR(255) NOT NULL,
                tour_id INT NOT NULL,
                tour_title VARCHAR(255) NOT NULL,
                booking_id VARCHAR(50) NOT NULL,
                rating TINYINT NOT NULL,
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY unique_booking_review (booking_id)
            )
        `);
        return true;
    } catch {
        return false;
    }
}

// GET: Fetch reviews (optionally filtered by tourId or userId, or latest for admin)
export async function GET(req: NextRequest) {
    const tourId = req.nextUrl.searchParams.get("tourId");
    const userId = req.nextUrl.searchParams.get("userId");
    const bookingId = req.nextUrl.searchParams.get("bookingId");
    const latest = req.nextUrl.searchParams.get("latest"); // for admin widget

    try {
        await ensureTable();

        let query = "SELECT * FROM reviews";
        const params: (string | number)[] = [];
        const conditions: string[] = [];

        if (tourId) {
            conditions.push("tour_id = ?");
            params.push(Number(tourId));
        }
        if (userId) {
            conditions.push("user_id = ?");
            params.push(Number(userId));
        }
        if (bookingId) {
            conditions.push("booking_id = ?");
            params.push(String(bookingId));
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY created_at DESC";

        if (latest) {
            query += ` LIMIT ${parseInt(latest)}`;
        }

        const [rows] = await db.query<RowDataPacket[]>(query, params);
        return NextResponse.json({ reviews: rows });
    } catch {
        // DB fallback
        let filtered = [...reviewStore];
        if (tourId) filtered = filtered.filter(r => r.tour_id === Number(tourId));
        if (userId) filtered = filtered.filter(r => r.user_id === Number(userId));
        if (bookingId) filtered = filtered.filter(r => r.booking_id === String(bookingId));
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        if (latest) filtered = filtered.slice(0, parseInt(latest));
        return NextResponse.json({ reviews: filtered });
    }
}

// POST: Create a new review
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, userName, tourId, tourTitle, bookingId, rating, comment } = body;

        if (!userId || !tourId || !bookingId || !rating) {
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating harus 1-5" }, { status: 400 });
        }

        await ensureTable();

        // Check if review already exists for this booking
        const [existing] = await db.query<RowDataPacket[]>(
            "SELECT id FROM reviews WHERE booking_id = ?",
            [String(bookingId)]
        );
        if (existing.length > 0) {
            return NextResponse.json({ error: "Review untuk booking ini sudah ada" }, { status: 409 });
        }

        await db.query(
            `INSERT INTO reviews (user_id, user_name, tour_id, tour_title, booking_id, rating, comment)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, userName || "Guest", tourId, tourTitle || "", String(bookingId), rating, comment || ""]
        );

        return NextResponse.json({ success: true, message: "Review berhasil disimpan" });
    } catch (error: unknown) {
        console.error("[Reviews] POST Error:", error);
        const message = error instanceof Error ? error.message : "Gagal menyimpan review";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// PUT: Update an existing review
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { bookingId, rating, comment } = body;

        if (!bookingId || !rating) {
            return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating harus 1-5" }, { status: 400 });
        }

        try {
            await ensureTable();
            await db.query(
                `UPDATE reviews SET rating = ?, comment = ? WHERE booking_id = ?`,
                [rating, comment || "", bookingId]
            );
            return NextResponse.json({ success: true, message: "Review berhasil diperbarui" });
        } catch {
            // In-memory fallback
            const existing = reviewStore.find(r => r.booking_id === String(bookingId));
            if (existing) {
                existing.rating = Number(rating);
                existing.comment = comment || "";
                return NextResponse.json({ success: true, message: "Review berhasil diperbarui" });
            }
            return NextResponse.json({ error: "Review tidak ditemukan" }, { status: 404 });
        }
    } catch (error: unknown) {
        console.error("[Reviews] PUT Error:", error);
        const message = error instanceof Error ? error.message : "Gagal memperbarui review";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
