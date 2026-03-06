import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

// GET: Comprehensive financial report
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const months = Number(searchParams.get("months")) || 12;

        // 1. Monthly revenue data
        const [monthly] = await db.query<RowDataPacket[]>(`
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as month_key,
                DATE_FORMAT(created_at, '%M %Y') as month_label,
                COUNT(*) as total_bookings,
                COALESCE(SUM(CASE WHEN status IN ('confirmed', 'completed') THEN total_price ELSE 0 END), 0) as revenue,
                COUNT(CASE WHEN status IN ('confirmed', 'completed') THEN 1 END) as paid_bookings,
                COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_bookings,
                COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_bookings
            FROM bookings
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? MONTH)
            GROUP BY month_key, month_label
            ORDER BY month_key DESC
        `, [months]);

        // Calculate growth MoM
        const monthlyData = monthly.map((row, i) => {
            const prevRevenue = i < monthly.length - 1 ? Number(monthly[i + 1].revenue) : null;
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
                cancelledBookings: Number(row.cancelled_bookings),
                pendingBookings: Number(row.pending_bookings),
                revenue: currentRevenue,
                growth,
            };
        });

        // 2. Status breakdown (all time)
        const [statusRows] = await db.query<RowDataPacket[]>(`
            SELECT 
                status,
                COUNT(*) as count,
                COALESCE(SUM(total_price), 0) as total_value
            FROM bookings
            GROUP BY status
        `);

        // 3. Top tours by revenue
        const [topTours] = await db.query<RowDataPacket[]>(`
            SELECT 
                b.tour_name,
                COUNT(*) as total_bookings,
                COALESCE(SUM(CASE WHEN b.status IN ('confirmed', 'completed') THEN b.total_price ELSE 0 END), 0) as revenue,
                COUNT(CASE WHEN b.status IN ('confirmed', 'completed') THEN 1 END) as paid_bookings
            FROM bookings b
            WHERE b.created_at >= DATE_SUB(NOW(), INTERVAL ? MONTH)
            GROUP BY b.tour_name
            ORDER BY revenue DESC
            LIMIT 5
        `, [months]);

        // 4. Year comparison
        const currentYear = new Date().getFullYear();
        const [yearCompare] = await db.query<RowDataPacket[]>(`
            SELECT 
                YEAR(created_at) as year,
                COUNT(*) as total_bookings,
                COALESCE(SUM(CASE WHEN status IN ('confirmed', 'completed') THEN total_price ELSE 0 END), 0) as revenue,
                COUNT(CASE WHEN status IN ('confirmed', 'completed') THEN 1 END) as paid_bookings
            FROM bookings
            WHERE YEAR(created_at) >= ?
            GROUP BY YEAR(created_at)
            ORDER BY year DESC
        `, [currentYear - 1]);

        // Summaries
        const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
        const totalBookings = monthlyData.reduce((sum, m) => sum + m.bookings, 0);
        const totalPaid = monthlyData.reduce((sum, m) => sum + m.paidBookings, 0);
        const avgBookingValue = totalPaid > 0 ? Math.round(totalRevenue / totalPaid) : 0;

        return NextResponse.json({
            monthly: monthlyData,
            statusBreakdown: statusRows.map(r => ({
                status: r.status,
                count: Number(r.count),
                totalValue: Number(r.total_value),
            })),
            topTours: topTours.map(t => ({
                name: t.tour_name || "Tour",
                bookings: Number(t.total_bookings),
                revenue: Number(t.revenue),
                paidBookings: Number(t.paid_bookings),
            })),
            yearComparison: yearCompare.map(y => ({
                year: Number(y.year),
                bookings: Number(y.total_bookings),
                revenue: Number(y.revenue),
                paidBookings: Number(y.paid_bookings),
            })),
            summary: {
                totalRevenue,
                totalBookings,
                totalPaid,
                avgBookingValue,
                months: monthlyData.length,
            },
        });
    } catch (err) {
        console.error("[Reports] Error:", err);
        return NextResponse.json({
            monthly: [],
            statusBreakdown: [],
            topTours: [],
            yearComparison: [],
            summary: { totalRevenue: 0, totalBookings: 0, totalPaid: 0, avgBookingValue: 0, months: 0 },
        });
    }
}
