import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
    try {
        // 1. Review stats: average rating, total reviews, rating distribution
        const [reviewStats] = await db.query<RowDataPacket[]>(
            `SELECT 
                COUNT(*) as total_reviews,
                ROUND(AVG(rating), 1) as avg_rating,
                SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as stars_5,
                SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as stars_4,
                SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as stars_3,
                SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as stars_2,
                SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as stars_1
             FROM reviews`
        );

        const stats = reviewStats[0] || {};
        const totalReviews = Number(stats.total_reviews) || 0;
        const avgRating = Number(stats.avg_rating) || 0;

        // 2. Repeat customer: users with more than 1 booking
        let repeatCustomerPct = 0;
        try {
            const [bookingStats] = await db.query<RowDataPacket[]>(
                `SELECT 
                    COUNT(DISTINCT user_id) as total_customers,
                    SUM(CASE WHEN booking_count > 1 THEN 1 ELSE 0 END) as repeat_customers
                 FROM (
                    SELECT user_id, COUNT(*) as booking_count
                    FROM bookings
                    WHERE status != 'cancelled'
                    GROUP BY user_id
                 ) as user_bookings`
            );
            const bStats = bookingStats[0];
            if (bStats && Number(bStats.total_customers) > 0) {
                repeatCustomerPct = Math.round(
                    (Number(bStats.repeat_customers) / Number(bStats.total_customers)) * 100
                );
            }
        } catch {
            // bookings table might not exist yet
        }

        // 3. NPS Score: calculated from ratings
        // Rating 4-5 = Promoter, 3 = Passive, 1-2 = Detractor
        // NPS = ((Promoters - Detractors) / Total) * 100
        let npsScore = 0;
        if (totalReviews > 0) {
            const promoters = Number(stats.stars_5 || 0) + Number(stats.stars_4 || 0);
            const detractors = Number(stats.stars_1 || 0) + Number(stats.stars_2 || 0);
            npsScore = Math.round(((promoters - detractors) / totalReviews) * 100);
        }

        return NextResponse.json({
            avgRating,
            totalReviews,
            repeatCustomerPct,
            npsScore,
            distribution: {
                5: Number(stats.stars_5) || 0,
                4: Number(stats.stars_4) || 0,
                3: Number(stats.stars_3) || 0,
                2: Number(stats.stars_2) || 0,
                1: Number(stats.stars_1) || 0,
            },
        });
    } catch (err) {
        console.error("[Reviews Stats] Error:", err);
        // Return zeros if DB unavailable
        return NextResponse.json({
            avgRating: 0,
            totalReviews: 0,
            repeatCustomerPct: 0,
            npsScore: 0,
            distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        });
    }
}
