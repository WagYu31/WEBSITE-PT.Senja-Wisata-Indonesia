import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

// GET: Fetch user's wishlist
export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId diperlukan" }, { status: 400 });

    try {
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT w.id, w.tour_id, w.created_at,
                    t.title, t.slug, t.location, t.duration, t.price, t.image, t.category
             FROM wishlists w
             LEFT JOIN tours t ON w.tour_id = t.id
             WHERE w.user_id = ?
             ORDER BY w.created_at DESC`,
            [userId]
        );
        return NextResponse.json({ wishlists: rows });
    } catch (err) {
        console.error("[Wishlist] GET error:", err);
        return NextResponse.json({ wishlists: [] });
    }
}

// POST: Add tour to wishlist
export async function POST(req: NextRequest) {
    try {
        const { userId, tourId } = await req.json();
        if (!userId || !tourId) {
            return NextResponse.json({ error: "userId dan tourId diperlukan" }, { status: 400 });
        }

        // Ensure tour exists in DB (auto-insert from static data if needed)
        const [existingTours] = await db.query<RowDataPacket[]>(
            "SELECT id FROM tours WHERE id = ?", [tourId]
        );
        if ((existingTours as RowDataPacket[]).length === 0) {
            const { tours: staticTours } = await import("@/lib/data");
            const staticTour = staticTours.find(t => t.id === Number(tourId));
            if (staticTour) {
                await db.query(
                    `INSERT IGNORE INTO tours (id, title, slug, description, price, duration, location, category, image, max_pax, is_active)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
                    [staticTour.id, staticTour.title, staticTour.slug, staticTour.description || "",
                    staticTour.price, staticTour.duration, staticTour.location, staticTour.category || "adventure",
                    staticTour.image || "", 20]
                );
            }
        }

        // Check if already in wishlist
        const [existing] = await db.query<RowDataPacket[]>(
            "SELECT id FROM wishlists WHERE user_id = ? AND tour_id = ?",
            [userId, tourId]
        );
        if ((existing as RowDataPacket[]).length > 0) {
            return NextResponse.json({ success: true, message: "Sudah ada di wishlist" });
        }

        await db.query(
            "INSERT INTO wishlists (user_id, tour_id) VALUES (?, ?)",
            [userId, tourId]
        );

        return NextResponse.json({ success: true, message: "Ditambahkan ke wishlist" });
    } catch (err) {
        console.error("[Wishlist] POST error:", err);
        return NextResponse.json({ error: "Gagal menambahkan ke wishlist" }, { status: 500 });
    }
}

// DELETE: Remove from wishlist
export async function DELETE(req: NextRequest) {
    try {
        const { userId, tourId } = await req.json();
        if (!userId || !tourId) {
            return NextResponse.json({ error: "userId dan tourId diperlukan" }, { status: 400 });
        }

        await db.query(
            "DELETE FROM wishlists WHERE user_id = ? AND tour_id = ?",
            [userId, tourId]
        );

        return NextResponse.json({ success: true, message: "Dihapus dari wishlist" });
    } catch (err) {
        console.error("[Wishlist] DELETE error:", err);
        return NextResponse.json({ error: "Gagal menghapus dari wishlist" }, { status: 500 });
    }
}
