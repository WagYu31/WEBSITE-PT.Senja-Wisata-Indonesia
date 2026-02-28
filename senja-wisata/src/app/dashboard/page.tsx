"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { Package, Heart, Star, Calendar, Clock, MapPin, CheckCircle, Loader2 } from "lucide-react";

type Booking = {
    id: string;
    tourTitle: string;
    date: string;
    duration: string;
    guests: number;
    total: number;
    status: string;
    destination: string;
};

const statusStyle: Record<string, string> = {
    confirmed: "badge-success",
    pending: "badge-warning",
    completed: "bg-blue/10 text-blue",
    cancelled: "bg-red-100 text-red-600",
};

const statusLabel: Record<string, string> = {
    confirmed: "Terkonfirmasi",
    pending: "Pending",
    completed: "Selesai",
    cancelled: "Dibatalkan",
};

export default function UserDashboard() {
    const { user } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [stats, setStats] = useState({ totalTrips: 0, upcomingTrips: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!user?.id) return;
        try {
            const res = await fetch(`/api/user/bookings?userId=${user.id}`);
            const data = await res.json();
            if (data.success) {
                setBookings(data.bookings || []);
                setStats(data.stats || { totalTrips: 0, upcomingTrips: 0 });
            }
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const upcomingBooking = bookings.find(
        (b) => b.status === "confirmed" && new Date(b.date) > new Date()
    ) || bookings[0];

    const statItems = [
        { label: "Total Trip", value: String(stats.totalTrips), icon: Package, color: "text-blue bg-blue/10" },
        { label: "Wishlist", value: "0", icon: Heart, color: "text-accent bg-accent/10" },
        { label: "Ulasan Dibuat", value: "0", icon: Star, color: "text-amber-500 bg-amber-50" },
        { label: "Trip Mendatang", value: String(stats.upcomingTrips), icon: Calendar, color: "text-emerald-600 bg-emerald-50" },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-primary to-blue rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full -translate-x-8 translate-y-8" />
                <div className="relative">
                    <p className="text-white/70 text-sm mb-1">Selamat datang kembali,</p>
                    <h2 className="text-2xl font-bold">{user?.name} 👋</h2>
                    <p className="text-white/60 mt-1 text-sm">Siap petualangan berikutnya?</p>
                    <Link href="/tours" className="btn btn-sm bg-white text-primary mt-4 hover:bg-white/90">
                        Jelajahi Tour
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statItems.map((s) => (
                    <div key={s.label} className="card p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                            <s.icon size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-primary">{loading ? "-" : s.value}</div>
                            <div className="text-xs text-slate-400">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Trip */}
            <div>
                <h3 className="font-bold text-lg text-primary mb-4">Trip Mendatang</h3>
                {loading ? (
                    <div className="card p-10 text-center">
                        <Loader2 size={24} className="animate-spin mx-auto text-slate-300" />
                    </div>
                ) : upcomingBooking ? (
                    <div className="card p-5 flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-32 h-28 sm:h-auto bg-gradient-to-br from-blue/20 to-accent/20 rounded-xl flex items-center justify-center">
                            <MapPin size={32} className="text-blue" />
                        </div>
                        <div className="flex-1">
                            <div className={`badge ${statusStyle[upcomingBooking.status] || statusStyle.pending} mb-2`}>
                                <CheckCircle size={12} /> {statusLabel[upcomingBooking.status] || upcomingBooking.status}
                            </div>
                            <h4 className="font-bold text-primary text-lg mb-1">{upcomingBooking.tourTitle}</h4>
                            <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-3">
                                <span className="flex items-center gap-1"><Calendar size={13} /> {upcomingBooking.date}</span>
                                <span className="flex items-center gap-1"><Clock size={13} /> {upcomingBooking.duration}</span>
                                {upcomingBooking.destination && (
                                    <span className="flex items-center gap-1"><MapPin size={13} /> {upcomingBooking.destination}</span>
                                )}
                            </div>
                            <div className="font-bold text-accent">{formatPrice(upcomingBooking.total)}</div>
                        </div>
                        <div className="sm:text-right">
                            <div className="text-xs text-slate-400 mb-1">Booking ID</div>
                            <div className="font-mono font-bold text-sm text-primary">{upcomingBooking.id}</div>
                            <Link href="/dashboard/trips" className="btn btn-outline btn-sm mt-3 text-xs">Lihat Detail</Link>
                        </div>
                    </div>
                ) : (
                    <div className="card p-10 text-center text-slate-400">
                        <Calendar size={32} className="mx-auto mb-2 opacity-30" />
                        <p className="font-semibold">Belum ada trip mendatang</p>
                        <Link href="/tours" className="text-accent text-sm hover:underline mt-1 inline-block">Cari tour sekarang →</Link>
                    </div>
                )}
            </div>

            {/* Booking History */}
            <div>
                <h3 className="font-bold text-lg text-primary mb-4">Riwayat Booking</h3>
                <div className="card overflow-hidden">
                    {loading ? (
                        <div className="p-10 text-center">
                            <Loader2 size={24} className="animate-spin mx-auto text-slate-300" />
                        </div>
                    ) : bookings.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-slate-500">Tour</th>
                                    <th className="text-left p-4 font-semibold text-slate-500 hidden sm:table-cell">Tanggal</th>
                                    <th className="text-left p-4 font-semibold text-slate-500 hidden md:table-cell">Total</th>
                                    <th className="text-left p-4 font-semibold text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b, i) => (
                                    <tr key={b.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === bookings.length - 1 ? "border-0" : ""}`}>
                                        <td className="p-4">
                                            <div className="font-semibold text-primary">{b.tourTitle}</div>
                                            <div className="text-xs text-slate-400">{b.id}</div>
                                        </td>
                                        <td className="p-4 hidden sm:table-cell text-slate-500">{b.date}</td>
                                        <td className="p-4 hidden md:table-cell font-semibold text-accent">{formatPrice(b.total)}</td>
                                        <td className="p-4">
                                            <span className={`badge ${statusStyle[b.status] || statusStyle.pending}`}>
                                                {statusLabel[b.status] || b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-10 text-center text-slate-400">
                            <Package size={32} className="mx-auto mb-2 opacity-30" />
                            <p className="font-semibold">Belum ada riwayat booking</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
