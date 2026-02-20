"use client";

import { useAuthStore } from "@/store/auth";
import { formatPrice } from "@/lib/utils";
import { TrendingUp, Users, Package, BookOpen, ArrowUpRight, Star, Crown } from "lucide-react";
import Link from "next/link";

const monthlyRevenue = [
    { month: "Sep", value: 180, label: "180 Jt" },
    { month: "Okt", value: 210, label: "210 Jt" },
    { month: "Nov", value: 195, label: "195 Jt" },
    { month: "Des", value: 320, label: "320 Jt" },
    { month: "Jan", value: 260, label: "260 Jt" },
    { month: "Feb", value: 284, label: "284 Jt" },
];

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

const kpiCards = [
    { label: "Revenue Total (YTD)", value: "Rp 1,449 Jt", change: "+18% vs tahun lalu", icon: TrendingUp, color: "from-amber-400 to-orange-500", up: true },
    { label: "Total Booking", value: "312", change: "+47 bulan ini", icon: BookOpen, color: "from-blue to-primary", up: true },
    { label: "User Terdaftar", value: "1.240", change: "+24 bulan ini", icon: Users, color: "from-emerald-400 to-teal-500", up: true },
    { label: "Rating Rata-rata", value: "4.87 ★", change: "Dari 847 ulasan", icon: Star, color: "from-violet-400 to-purple-500", up: true },
];

const topTours = [
    { title: "Raja Ampat Paradise", revenue: 425000000, bookings: 50, pct: 29 },
    { title: "Bali Complete Experience", revenue: 374400000, bookings: 72, pct: 26 },
    { title: "Komodo Island Adventure", revenue: 288000000, bookings: 40, pct: 20 },
    { title: "Lombok & Gili Islands", revenue: 192000000, bookings: 40, pct: 13 },
    { title: "Bromo Sunrise Trekking", revenue: 108000000, bookings: 60, pct: 7 },
];

const recentActivity = [
    { type: "booking", msg: "Booking baru: Reza Firmansyah — Raja Ampat (Rp 17 Jt)", time: "5 menit lalu", color: "bg-blue text-blue" },
    { type: "user", msg: "User baru terdaftar: melati_putri@gmail.com", time: "23 menit lalu", color: "bg-emerald-500 text-emerald-600" },
    { type: "booking", msg: "Booking BK-2025-044 selesai — Bromo Trekking", time: "1 jam lalu", color: "bg-slate-400 text-slate-500" },
    { type: "review", msg: "Ulasan baru: ⭐⭐⭐⭐⭐ dari Ahmad Fajar untuk Komodo Tour", time: "3 jam lalu", color: "bg-amber-400 text-amber-500" },
];

export default function OwnerDashboard() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div className="rounded-2xl p-6 text-white relative overflow-hidden bg-[#1a1040]">
                <div className="absolute right-0 top-0 w-72 h-72 bg-amber-400/10 rounded-full translate-x-20 -translate-y-20" />
                <div className="absolute right-32 bottom-0 w-40 h-40 bg-blue/10 rounded-full translate-y-10" />
                <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                        <Crown size={20} className="text-amber-400" />
                        <span className="text-amber-400 text-sm font-semibold">Owner Dashboard</span>
                    </div>
                    <p className="text-white/70 text-sm mb-1">Selamat datang,</p>
                    <h2 className="text-2xl font-bold">{user?.name} 👑</h2>
                    <p className="text-white/60 mt-1 text-sm">Ringkasan performa bisnis PT. Senja Wisata Indonesia</p>
                    <div className="flex gap-3 mt-4">
                        <Link href="/admin" className="btn btn-sm bg-amber-400 text-[#1a1040] hover:bg-amber-300 font-bold">
                            Kelola Admin
                        </Link>
                        <Link href="/admin/bookings" className="btn btn-sm bg-white/10 text-white hover:bg-white/20">
                            Lihat Booking
                        </Link>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map((k) => (
                    <div key={k.label} className="card p-5 relative overflow-hidden">
                        <div className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br ${k.color} rounded-full opacity-10`} />
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.color} flex items-center justify-center text-white`}>
                                <k.icon size={18} />
                            </div>
                            <ArrowUpRight size={14} className="text-emerald-500" />
                        </div>
                        <div className="text-xl font-bold text-primary">{k.value}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-tight">{k.label}</div>
                        <div className="text-xs text-emerald-600 font-semibold mt-1">{k.change}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-primary">Revenue Bulanan</h3>
                            <p className="text-xs text-slate-400">6 bulan terakhir (dalam juta rupiah)</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">Rp 284 Jt</div>
                            <div className="text-xs text-emerald-600 font-semibold flex items-center justify-end gap-0.5">
                                <ArrowUpRight size={12} /> +8% vs bulan lalu
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="flex items-end gap-3 h-44">
                        {monthlyRevenue.map((m, i) => {
                            const pct = (m.value / maxRevenue) * 100;
                            const isLast = i === monthlyRevenue.length - 1;
                            return (
                                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="text-xs font-semibold text-slate-500">{m.label}</div>
                                    <div className="w-full flex items-end" style={{ height: "100px" }}>
                                        <div
                                            className={`w-full rounded-t-lg transition-all ${isLast
                                                ? "bg-gradient-to-t from-amber-400 to-orange-400"
                                                : "bg-gradient-to-t from-primary/60 to-blue/60"
                                                }`}
                                            style={{ height: `${pct}%` }}
                                        />
                                    </div>
                                    <div className={`text-xs font-semibold ${isLast ? "text-amber-500" : "text-slate-400"}`}>{m.month}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card p-6">
                    <h3 className="font-bold text-primary mb-4">Aktivitas Terbaru</h3>
                    <div className="flex flex-col gap-4">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="flex gap-3">
                                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.color.split(" ")[0]}`} />
                                <div>
                                    <p className="text-sm text-slate-600 leading-snug">{a.msg}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Tours */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-primary">Tour Terlaris</h3>
                    <Link href="/admin/tours" className="text-sm text-accent font-semibold hover:underline flex items-center gap-1">
                        Kelola Tour <ArrowUpRight size={14} />
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    {topTours.map((t, i) => (
                        <div key={t.title} className="flex items-center gap-4">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                                {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-primary truncate">{t.title}</span>
                                    <span className="text-sm font-bold text-accent ml-2 shrink-0">{formatPrice(t.revenue)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                                        <div
                                            className="h-1.5 rounded-full bg-gradient-to-r from-primary to-blue"
                                            style={{ width: `${t.pct}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400 shrink-0">{t.bookings} booking</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
