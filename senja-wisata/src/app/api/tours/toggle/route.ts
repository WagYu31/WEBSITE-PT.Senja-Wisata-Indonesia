import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tours as staticTours } from "@/lib/data";
import { RowDataPacket } from "mysql2";

export async function POST(req: NextRequest) {
    try {
        const { id, is_active } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "id diperlukan" }, { status: 400 });
        }

        // Check if tour exists in DB
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT id FROM tours WHERE id = ?", [id]
        );

        if (rows.length === 0) {
            // Tour is static-only, insert it into DB first
            const staticTour = staticTours.find(t => t.id === id);
            if (staticTour) {
                const slug = staticTour.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                await db.query(
                    `INSERT INTO tours (id, title, slug, description, price, duration, location, category, image, departure_time, max_pax, is_active)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        staticTour.id, staticTour.title, slug,
                        staticTour.description || "", staticTour.price,
                        staticTour.duration || "", staticTour.location,
                        staticTour.category || "Adventure", staticTour.image || "",
                        staticTour.departureTime || "08:00 WIB",
                        staticTour.maxPax || 20,
                        is_active ? 1 : 0
                    ]
                );
            } else {
                return NextResponse.json({ error: "Tour tidak ditemukan" }, { status: 404 });
            }
        } else {
            // Tour exists in DB, just update
            await db.query(
                "UPDATE tours SET is_active = ? WHERE id = ?",
                [is_active ? 1 : 0, id]
            );
        }

        return NextResponse.json({ success: true, message: is_active ? "Tour diaktifkan" : "Tour dinonaktifkan" });
    } catch (err) {
        console.error("[Tours] Toggle error:", err);
        return NextResponse.json({ error: "Gagal mengubah status tour", detail: String(err) }, { status: 500 });
    }
}
