import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// One-time endpoint to fix demo user passwords in the database.
// After running, DELETE this file for security.
const DEMO_USERS = [
    { email: "owner@senja.com", password: "owner123" },
    { email: "admin@senja.com", password: "admin123" },
    { email: "user@senja.com", password: "user123" },
];

export async function GET() {
    try {
        const results = [];

        for (const user of DEMO_USERS) {
            const hashed = await bcrypt.hash(user.password, 10);
            const [result] = await db.query(
                "UPDATE users SET password = ? WHERE email = ?",
                [hashed, user.email]
            );
            results.push({ email: user.email, updated: (result as any).affectedRows > 0 });
        }

        return NextResponse.json({ success: true, results });
    } catch (err) {
        console.error("Fix passwords error:", err);
        return NextResponse.json({ error: "Failed to fix passwords", detail: String(err) }, { status: 500 });
    }
}
