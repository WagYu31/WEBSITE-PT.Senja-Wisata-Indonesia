import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

// GET: Monthly revenue report from bookings data
export async function GET() {
    try {
        // Get monthly aggregated data for the last 12 months
        const [rows] = await db.query<RowDataPacket[]>(`
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as month_key,
                DATE_FORMAT(created_at, '%M %Y') as month_label,
                COUNT(*) as total_bookings,
                COALESCE(SUM(CASE WHEN status IN ('confirmed', 'completed') THEN total_price ELSE 0 END), 0) as revenue,
                COUNT(CASE WHEN status IN ('confirmed', 'completed') THEN 1 END) as paid_bookings
            FROM bookings
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
            GROUP BY month_key, month_label
            ORDER BY month_key DESC
            LIMIT 12
        `);

        // Calculate growth MoM
        const data = rows.map((row, i) => {
            const prevRevenue = i < rows.length - 1 ? Number(rows[i + 1].revenue) : null;
            const currentRevenue = Number(row.revenue);
            let growth: number | null = null;
            if (prevRevenue !== null && prevRevenue > 0) {
                growth = Math.round(((currentRevenue - prevRevenue) / prevRevenue) * 1000) / 10;
            }
            return {
                monthKey: row.month_key,
                month: row.month_label,
                bookings: Number(row.total_bookings),
                paidBookings: Number(row.paid_bookings),
                revenue: currentRevenue,
                growth,
            };
        });

        const totalRevenue = data.reduce((sum, m) => sum + m.revenue, 0);
        const totalBookings = data.reduce((sum, m) => sum + m.bookings, 0);

        return NextResponse.json({
            data,
            totalRevenue,
            totalBookings,
            months: data.length,
        });
    } catch (err) {
        console.error("[Reports] Error:", err);
        // Return empty data if table doesn't exist yet
        return NextResponse.json({
            data: [],
            totalRevenue: 0,
            totalBookings: 0,
            months: 0,
            error: String(err),
        });
    }
}
