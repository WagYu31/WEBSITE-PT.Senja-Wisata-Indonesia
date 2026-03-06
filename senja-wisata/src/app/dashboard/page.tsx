"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { tours as staticTours } from "@/lib/data";
import {
    Package, Heart, Star, Calendar, Clock, MapPin, CheckCircle,
    Loader2, TrendingUp, ArrowRight, Compass, Award, CreditCard, Users
} from "lucide-react";

type Booking = {
    id: number;
    booking_code: string;
    tour_id: number;
    tour_title?: string;
    tour_location?: string;
    tour_date: string;
    guests: number;
    total_price: number;
    status: string;
    payment_status: string;
    created_at: string;
};

const statusStyle: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: "bg-emerald-50", text: "text-emerald-600" },
    pending: { bg: "bg-amber-50", text: "text-amber-600" },
    completed: { bg: "bg-blue-50", text: "text-blue-600" },
    cancelled: { bg: "bg-red-50", text: "text-red-500" },
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
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!user?.id) { setLoading(false); return; }
        try {
            const res = await fetch(`/api/booking?userId=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setBookings(data.bookings || []);
            }
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const confirmedBookings = bookings.filter(b => b.status === "confirmed");
    const completedBookings = bookings.filter(b => b.status === "completed");
    const upcomingBookings = bookings.filter(
        (b) => b.status === "confirmed" && new Date(b.tour_date) > new Date()
    );
    const upcomingBooking = upcomingBookings[0] || null;
    const totalSpent = bookings
        .filter(b => b.status === "confirmed" || b.status === "completed")
        .reduce((s, b) => s + b.total_price, 0);

    const getHourGreeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Selamat Pagi";
        if (h < 15) return "Selamat Siang";
        if (h < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    const statItems = [
        { label: "Total Trip", value: String(bookings.length), icon: Package, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { label: "Trip Selesai", value: String(completedBookings.length), icon: Award, gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
        { label: "Menunggu", value: String(confirmedBookings.length), icon: Clock, gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        { label: "Total Spend", value: totalSpent > 0 ? formatPrice(totalSpent) : "Rp 0", icon: CreditCard, gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    ];

    // Quick actions
    const quickActions = [
        { label: "Jelajahi Tour", href: "/tours", icon: Compass, desc: "Temukan destinasi impian" },
        { label: "My Trips", href: "/dashboard/trips", icon: Package, desc: "Cek status booking" },
        { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart, desc: "Tour favorit kamu" },
        { label: "Edit Profil", href: "/dashboard/profile", icon: Users, desc: "Kelola akun" },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Hero */}
            <div className="rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #05073C 0%, #0f2027 30%, #2BBEE8 100%)" }}>
                <div className="absolute right-0 top-0 w-72 h-72 opacity-10">
                    <svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="100" fill="white" /></svg>
                </div>
                <div className="absolute right-8 bottom-0 opacity-5">
                    <Compass size={200} />
                </div>
                <div className="relative z-10">
                    <p className="text-white/60 text-sm mb-1">{getHourGreeting()},</p>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white">{user?.name} 👋</h2>
                    <p className="text-white/50 mt-1 text-sm">Siap untuk petualangan berikutnya?</p>
                    <div className="flex items-center gap-3 mt-5">
                        <Link href="/tours" className="px-5 py-2.5 bg-white text-primary rounded-xl font-semibold text-sm hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg">
                            <Compass size={16} /> Jelajahi Tour
                        </Link>
                        {bookings.length > 0 && (
                            <Link href="/dashboard/trips" className="px-5 py-2.5 bg-white/10 text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-sm">
                                <Package size={16} /> Lihat Trips
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {statItems.map((s) => (
                    <div key={s.label} className="card p-4 lg:p-5 hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform" style={{ background: s.gradient }}>
                                <s.icon size={18} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-lg lg:text-xl font-bold truncate">{loading ? "-" : s.value}</div>
                                <div className="text-xs text-slate-400">{s.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#2BBEE8]" /> Aksi Cepat
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {quickActions.map((a) => (
                        <Link key={a.href} href={a.href} className="card p-4 hover:shadow-md transition-all group border border-transparent hover:border-[#2BBEE8]/30">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ background: "linear-gradient(135deg, #2BBEE8, #05073C)" }}>
                                <a.icon size={16} className="text-white" />
                            </div>
                            <p className="font-semibold text-sm">{a.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{a.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Two Column: Upcoming Trip + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Upcoming Trip */}
                <div>
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <Calendar size={16} className="text-emerald-500" /> Trip Mendatang
                    </h3>
                    {loading ? (
                        <div className="card p-10 text-center">
                            <Loader2 size={24} className="animate-spin mx-auto text-slate-300" />
                        </div>
                    ) : upcomingBooking ? (
                        <div className="card overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-32 relative overflow-hidden">
                                <img
                                    src={(() => { const t = staticTours.find(t => t.id === Number(upcomingBooking.tour_id)); return t?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"; })()}
                                    alt={upcomingBooking.tour_title || "Tour"}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-3 left-4 right-4">
                                    <h4 className="font-bold text-white text-sm">{upcomingBooking.tour_title || `Tour #${upcomingBooking.tour_id}`}</h4>
                                </div>
                                <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-semibold ${statusStyle[upcomingBooking.status]?.bg || "bg-slate-100"} ${statusStyle[upcomingBooking.status]?.text || "text-slate-500"}`}>
                                    <CheckCircle size={11} className="inline mr-1" />{statusLabel[upcomingBooking.status]}
                                </span>
                            </div>
                            <div className="p-4 space-y-2">
                                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {upcomingBooking.tour_date}</span>
                                    {upcomingBooking.tour_location && (
                                        <span className="flex items-center gap-1"><MapPin size={12} /> {upcomingBooking.tour_location}</span>
                                    )}
                                    <span className="flex items-center gap-1"><Users size={12} /> {upcomingBooking.guests} orang</span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                    <div>
                                        <div className="text-[10px] text-slate-400">Total</div>
                                        <div className="font-bold text-accent text-sm">{formatPrice(upcomingBooking.total_price)}</div>
                                    </div>
                                    <Link href="/dashboard/trips" className="text-xs font-semibold text-[#2BBEE8] flex items-center gap-1 hover:gap-2 transition-all">
                                        Detail <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card p-8 text-center">
                            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center">
                                <Calendar size={24} className="text-slate-300" />
                            </div>
                            <p className="font-semibold text-sm text-slate-500">Belum ada trip mendatang</p>
                            <Link href="/tours" className="text-[#2BBEE8] text-sm font-semibold hover:underline mt-2 inline-flex items-center gap-1">
                                Cari tour <ArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Recent Bookings Preview */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-sm flex items-center gap-2">
                            <Package size={16} className="text-violet-500" /> Riwayat Booking
                        </h3>
                        {bookings.length > 0 && (
                            <Link href="/dashboard/trips" className="text-xs font-semibold text-[#2BBEE8] hover:underline flex items-center gap-1">
                                Semua <ArrowRight size={12} />
                            </Link>
                        )}
                    </div>
                    <div className="card overflow-hidden">
                        {loading ? (
                            <div className="p-10 text-center">
                                <Loader2 size={24} className="animate-spin mx-auto text-slate-300" />
                            </div>
                        ) : bookings.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {bookings.slice(0, 4).map((b) => {
                                    const st = statusStyle[b.status] || statusStyle.pending;
                                    return (
                                        <div key={b.booking_code} className="px-4 py-3 hover:bg-slate-50/50 transition-colors flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #2BBEE8, #05073C)" }}>
                                                <Package size={14} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm truncate">{b.tour_title || `Tour #${b.tour_id}`}</p>
                                                <p className="text-xs text-slate-400">{b.tour_date}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${st.bg} ${st.text}`}>
                                                    {statusLabel[b.status] || b.status}
                                                </span>
                                                <p className="text-xs font-bold text-accent mt-0.5">{formatPrice(b.total_price)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center">
                                    <Package size={24} className="text-slate-300" />
                                </div>
                                <p className="font-semibold text-sm text-slate-500">Belum ada riwayat booking</p>
                                <p className="text-xs text-slate-400 mt-1">Mulai petualangan pertamamu!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Full Booking History Table */}
            {bookings.length > 4 && (
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-sm flex items-center gap-2">
                            <Star size={16} className="text-amber-500" /> Semua Booking
                        </h3>
                    </div>
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="text-left p-3 font-semibold text-slate-500 text-xs">Tour</th>
                                        <th className="text-left p-3 font-semibold text-slate-500 text-xs hidden sm:table-cell">Tanggal</th>
                                        <th className="text-left p-3 font-semibold text-slate-500 text-xs hidden md:table-cell">Tamu</th>
                                        <th className="text-left p-3 font-semibold text-slate-500 text-xs hidden md:table-cell">Total</th>
                                        <th className="text-left p-3 font-semibold text-slate-500 text-xs">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((b, i) => {
                                        const st = statusStyle[b.status] || statusStyle.pending;
                                        return (
                                            <tr key={b.booking_code} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === bookings.length - 1 ? "border-0" : ""}`}>
                                                <td className="p-3">
                                                    <div className="font-semibold text-sm">{b.tour_title || `Tour #${b.tour_id}`}</div>
                                                    <div className="text-xs text-slate-400 font-mono">{b.booking_code}</div>
                                                </td>
                                                <td className="p-3 hidden sm:table-cell text-slate-500 text-xs">{b.tour_date}</td>
                                                <td className="p-3 hidden md:table-cell text-slate-500 text-xs">{b.guests} orang</td>
                                                <td className="p-3 hidden md:table-cell font-bold text-accent text-xs">{formatPrice(b.total_price)}</td>
                                                <td className="p-3">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${st.bg} ${st.text}`}>
                                                        {statusLabel[b.status] || b.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
