import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// GET: List all tours from DB + merge with static data
export async function GET() {
    try {
        const [rows] = await db.query<RowDataPacket[]>(
            "SELECT * FROM tours ORDER BY id DESC"
        );
        return NextResponse.json({ tours: rows });
    } catch (err) {
        console.error("[Tours] GET error:", err);
        return NextResponse.json({ tours: [] });
    }
}

// POST: Create new tour
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, slug, location, duration, price, category, description, image, departureTime } = body;

        if (!title || !location || !price) {
            return NextResponse.json({ error: "title, location, price diperlukan" }, { status: 400 });
        }

        const tourSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

        const [result] = await db.query<ResultSetHeader>(
            `INSERT INTO tours (title, slug, description, price, duration, location, category, image, departure_time, max_pax, is_active)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 20, 1)`,
            [title, tourSlug, description || "", price, duration || "", location, category || "Adventure", image || "", departureTime || "08:00 WIB"]
        );

        return NextResponse.json({
            success: true,
            tour: { id: result.insertId, title, slug: tourSlug, location, duration, price, category, description, image },
            message: "Tour berhasil ditambahkan"
        });
    } catch (err) {
        console.error("[Tours] POST error:", err);
        return NextResponse.json({ error: "Gagal menambahkan tour", detail: String(err) }, { status: 500 });
    }
}

// PUT: Update existing tour
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, title, location, duration, price, category, description, image, departureTime } = body;

        if (!id) {
            return NextResponse.json({ error: "id diperlukan" }, { status: 400 });
        }

        const tourSlug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : undefined;

        await db.query(
            `UPDATE tours SET title=?, slug=?, description=?, price=?, duration=?, location=?, category=?, image=?, departure_time=?
             WHERE id=?`,
            [title, tourSlug, description || "", price, duration || "", location, category || "Adventure", image || "", departureTime || "08:00 WIB", id]
        );

        return NextResponse.json({ success: true, message: "Tour berhasil diperbarui" });
    } catch (err) {
        console.error("[Tours] PUT error:", err);
        return NextResponse.json({ error: "Gagal memperbarui tour", detail: String(err) }, { status: 500 });
    }
}

// DELETE: Delete tour
export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "id diperlukan" }, { status: 400 });
        }

        await db.query("DELETE FROM tours WHERE id = ?", [id]);

        return NextResponse.json({ success: true, message: "Tour berhasil dihapus" });
    } catch (err) {
        console.error("[Tours] DELETE error:", err);
        return NextResponse.json({ error: "Gagal menghapus tour", detail: String(err) }, { status: 500 });
    }
}
