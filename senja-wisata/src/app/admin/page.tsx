"use client";

import { useAuthStore } from "@/store/auth";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import {
    BookOpen, TrendingUp, Users, Package, Clock,
    Star, AlertCircle, ChevronRight, CheckCircle,
    ArrowUpRight, ArrowDownRight, Plus, Eye
} from "lucide-react";
import LiveVisitorWidget from "@/components/admin/LiveVisitorWidget";

const kpiCards = [
    {
        label: "Booking Bulan Ini",
        value: "47",
        growth: "+12%",
        up: true,
        icon: BookOpen,
        color: "bg-blue/10 text-blue",
    },
    {
        label: "Revenue Bulan Ini",
        value: "Rp 284 Jt",
        growth: "+8%",
        up: true,
        icon: TrendingUp,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        label: "Total Users",
        value: "1.240",
        growth: "+24 baru",
        up: true,
        icon: Users,
        color: "bg-violet-100 text-violet-600",
    },
    {
        label: "Tour Aktif",
        value: "18",
        growth: "2 draft",
        up: null,
        icon: Package,
        color: "bg-amber-100 text-amber-600",
    },
];

const revenueData = [
    { month: "Sep", value: 180, label: "180 Jt" },
    { month: "Okt", value: 210, label: "210 Jt" },
    { month: "Nov", value: 195, label: "195 Jt" },
    { month: "Des", value: 320, label: "320 Jt" },
    { month: "Jan", value: 260, label: "260 Jt" },
    { month: "Feb", value: 284, label: "284 Jt" },
];
const maxRevenue = Math.max(...revenueData.map((d) => d.value));

const recentBookings = [
    { id: "BK-2025-047", name: "Reza Firmansyah", tour: "Raja Ampat Paradise", total: 17000000, status: "pending", date: "21 Feb" },
    { id: "BK-2025-046", name: "Dewi Lestari", tour: "Bali Complete Experience", total: 15600000, status: "confirmed", date: "20 Feb" },
    { id: "BK-2025-045", name: "Ahmad Fajar", tour: "Komodo Island Adventure", total: 28800000, status: "confirmed", date: "20 Feb" },
    { id: "BK-2025-044", name: "Sari Wulandari", tour: "Bromo Sunrise Trek", total: 5400000, status: "done", date: "19 Feb" },
    { id: "BK-2025-043", name: "Budi Santoso", tour: "Lombok Paradise", total: 12500000, status: "cancelled", date: "18 Feb" },
];

const topTours = [
    { name: "Raja Ampat Paradise", bookings: 34, revenue: 578000000, rating: 4.9 },
    { name: "Bali Complete Experience", bookings: 28, revenue: 436800000, rating: 4.8 },
    { name: "Komodo Island Adventure", bookings: 21, revenue: 604800000, rating: 4.9 },
    { name: "Bromo Sunrise Trek", bookings: 45, revenue: 243000000, rating: 4.7 },
];

const alerts = [
    { type: "warning", msg: "5 booking menunggu konfirmasi", href: "/admin/bookings" },
    { type: "info", msg: "8 review baru butuh moderasi", href: "/admin/users" },
    { type: "success", msg: "2 tour berhasil dipublikasikan hari ini", href: "/admin/tours" },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
    pending: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
    confirmed: { label: "Dikonfirmasi", cls: "bg-blue/10 text-blue" },
    done: { label: "Selesai", cls: "bg-emerald-100 text-emerald-700" },
    cancelled: { label: "Dibatalkan", cls: "bg-red-100 text-red-600" },
};

export default function AdminDashboard() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-primary">Dashboard Admin</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Overview performa bisnis bulan ini</p>
                </div>
                <Link href="/admin/tours" className="btn btn-primary btn-sm gap-2 self-start sm:self-auto">
                    <Plus size={15} /> Tour Baru
                </Link>
            </div>

            {/* Alerts */}
            <div className="space-y-2">
                {alerts.map((a, i) => (
                    <Link key={i} href={a.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90 ${a.type === "warning" ? "bg-amber-50 border border-amber-200 text-amber-800" :
                        a.type === "info" ? "bg-blue/5 border border-blue/20 text-blue" :
                            "bg-emerald-50 border border-emerald-200 text-emerald-800"
                        }`}>
                        {a.type === "warning" ? <AlertCircle size={15} /> :
                            a.type === "info" ? <Clock size={15} /> :
                                <CheckCircle size={15} />}
                        <span className="flex-1">{a.msg}</span>
                        <ChevronRight size={14} />
                    </Link>
                ))}
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map((kpi) => (
                    <div key={kpi.label} className="card p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.color}`}>
                                <kpi.icon size={17} />
                            </div>
                            <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.up === true ? "text-emerald-600" :
                                kpi.up === false ? "text-red-500" :
                                    "text-slate-400"
                                }`}>
                                {kpi.up === true ? <ArrowUpRight size={12} /> : kpi.up === false ? <ArrowDownRight size={12} /> : null}
                                {kpi.growth}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-primary mb-1">{kpi.value}</div>
                        <div className="text-xs text-slate-400">{kpi.label}</div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart + Live Visitors + Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-5">
                {/* Left: Revenue Chart + Quick Actions stacked */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Revenue Chart */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="font-bold text-primary">Revenue Bulanan</h3>
                                <p className="text-xs text-slate-400 mt-0.5">6 bulan terakhir (dalam juta Rp)</p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <ArrowUpRight size={12} /> +8% vs bulan lalu
                            </span>
                        </div>
                        <div className="flex items-end gap-2 mt-2" style={{ height: "140px" }}>
                            {revenueData.map((d, i) => {
                                const barHeight = Math.round((d.value / maxRevenue) * 120);
                                const isLast = i === revenueData.length - 1;
                                return (
                                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                                        <span className={`text-[10px] font-semibold ${isLast ? "text-primary" : "text-slate-400"}`}>
                                            {d.label}
                                        </span>
                                        <div className="w-full rounded-t-lg" style={{
                                            height: `${barHeight}px`,
                                            background: isLast
                                                ? "linear-gradient(180deg, #2BBEE8, #1A3C6E)"
                                                : "#E2E8F0"
                                        }} />
                                        <span className={`text-xs font-semibold ${isLast ? "text-primary" : "text-slate-400"}`}>
                                            {d.month}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card p-5 flex-1">
                        <h3 className="font-bold text-primary mb-4">Aksi Cepat</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { label: "Tambah Tour Baru", href: "/admin/tours", icon: Plus, color: "text-blue bg-blue/10" },
                                { label: "Kelola Booking", href: "/admin/bookings", icon: BookOpen, color: "text-amber-600 bg-amber-50" },
                                { label: "Manajemen User", href: "/admin/users", icon: Users, color: "text-violet-600 bg-violet-50" },
                                { label: "Lihat Laporan", href: "/owner/reports", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
                            ].map((a) => (
                                <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-slate-100">
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                                        <a.icon size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-primary leading-tight">{a.label}</span>
                                    <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-primary" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Visitor Widget */}
                <LiveVisitorWidget />
            </div>

            {/* Booking Terbaru + Top Tours */}
            <div className="grid lg:grid-cols-3 gap-5">
                {/* Recent Bookings */}
                <div className="lg:col-span-2 card overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h3 className="font-bold text-primary">Booking Terbaru</h3>
                        <Link href="/admin/bookings" className="text-xs text-blue font-semibold hover:underline flex items-center gap-1">
                            Lihat Semua <ChevronRight size={13} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400">ID</th>
                                    <th className="text-left px-3 py-3 text-xs font-semibold text-slate-400">Nama</th>
                                    <th className="text-left px-3 py-3 text-xs font-semibold text-slate-400 hidden sm:table-cell">Tour</th>
                                    <th className="text-left px-3 py-3 text-xs font-semibold text-slate-400 hidden md:table-cell">Total</th>
                                    <th className="text-left px-3 py-3 text-xs font-semibold text-slate-400">Status</th>
                                    <th className="text-left px-3 py-3 text-xs font-semibold text-slate-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((b) => {
                                    const s = statusConfig[b.status];
                                    return (
                                        <tr key={b.id} className="border-t border-slate-50 hover:bg-slate-50/80 transition-colors">
                                            <td className="px-5 py-3 text-xs text-slate-400 font-mono">{b.id}</td>
                                            <td className="px-3 py-3 font-semibold text-primary whitespace-nowrap">{b.name}</td>
                                            <td className="px-3 py-3 text-slate-500 hidden sm:table-cell text-xs">{b.tour}</td>
                                            <td className="px-3 py-3 font-semibold text-accent hidden md:table-cell text-xs">{formatPrice(b.total)}</td>
                                            <td className="px-3 py-3">
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.cls}`}>
                                                    {s.label}
                                                </span>
                                            </td>
                                            <td className="px-3 py-3">
                                                <button className="text-xs text-blue hover:text-primary font-semibold flex items-center gap-1">
                                                    <Eye size={12} /> Detail
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Tours */}
                <div className="card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-primary">Tour Terlaris</h3>
                        <Link href="/admin/tours" className="text-xs text-blue font-semibold hover:underline">
                            Kelola
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {topTours.map((t, i) => (
                            <div key={t.name} className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${i === 0 ? "bg-amber-100 text-amber-700" :
                                    i === 1 ? "bg-slate-100 text-slate-600" :
                                        "bg-orange-50 text-orange-600"
                                    }`}>
                                    {i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-primary leading-tight truncate">{t.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-400">{t.bookings} booking</span>
                                        <span className="text-xs text-slate-200">•</span>
                                        <span className="text-xs text-amber-500 flex items-center gap-0.5">
                                            <Star size={10} fill="currentColor" /> {t.rating}
                                        </span>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">{formatPrice(t.revenue)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
