"use client";

import { useAuthStore } from "@/store/auth";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    BookOpen, TrendingUp, Users, Package, Clock,
    Star, AlertCircle, ChevronRight, CheckCircle,
    ArrowUpRight, ArrowDownRight, Plus, Eye,
    Calendar, MessageSquare, Target, Heart, Repeat2, Pencil, Check
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
    const CURRENT_REVENUE = 284; // in Jt
    const [revenueTarget, setRevenueTarget] = useState(350);
    const [editingTarget, setEditingTarget] = useState(false);
    const [tempTarget, setTempTarget] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("sw-revenue-target");
        if (saved) setRevenueTarget(Number(saved));
    }, []);

    const saveTarget = () => {
        const val = parseInt(tempTarget);
        if (val && val > 0) {
            setRevenueTarget(val);
            localStorage.setItem("sw-revenue-target", String(val));
        }
        setEditingTarget(false);
    };

    const pct = Math.min(100, Math.round((CURRENT_REVENUE / revenueTarget) * 100));
    const remaining = Math.max(0, revenueTarget - CURRENT_REVENUE);

    // Fetch latest reviews
    const [latestReviews, setLatestReviews] = useState<Array<{ user_name: string; tour_title: string; rating: number; comment: string }>>([]);
    useEffect(() => {
        fetch("/api/reviews?latest=3")
            .then(r => r.json())
            .then(data => {
                if (data.reviews && data.reviews.length > 0) {
                    setLatestReviews(data.reviews);
                }
            })
            .catch(() => { });
    }, []);

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

            {/* Aksi Cepat - Compact Horizontal Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <span className="text-xs font-semibold text-slate-400 shrink-0">Aksi Cepat:</span>
                {[
                    { label: "Tambah Tour", href: "/admin/tours", icon: Plus, color: "text-blue bg-blue/10 border-blue/20" },
                    { label: "Kelola Booking", href: "/admin/bookings", icon: BookOpen, color: "text-amber-600 bg-amber-50 border-amber-200" },
                    { label: "Manajemen User", href: "/admin/users", icon: Users, color: "text-violet-600 bg-violet-50 border-violet-200" },
                    { label: "Lihat Laporan", href: "/owner/reports", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
                ].map((a) => (
                    <Link key={a.href} href={a.href} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:shadow-sm shrink-0 ${a.color}`}>
                        <a.icon size={13} />
                        {a.label}
                    </Link>
                ))}
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

            {/* Revenue Chart + Live Visitors */}
            <div className="grid lg:grid-cols-3 gap-5">
                {/* Left: Revenue Chart + Target + Ulasan stacked */}
                <div className="lg:col-span-2 flex flex-col gap-5">
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
                        <div className="flex items-end gap-2 mt-2" style={{ height: "200px" }}>
                            {revenueData.map((d, i) => {
                                const barHeight = Math.round((d.value / maxRevenue) * 180);
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

                    {/* Target Revenue + Ulasan Terbaru side by side under chart */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        {/* Target Revenue */}
                        <div className="card p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    <Target size={16} className="text-emerald-600" />
                                </div>
                                <h4 className="font-bold text-primary text-sm flex-1">Target Revenue</h4>
                                <button
                                    onClick={() => { setTempTarget(String(revenueTarget)); setEditingTarget(!editingTarget); }}
                                    className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors"
                                    title="Edit target"
                                >
                                    <Pencil size={12} />
                                </button>
                            </div>
                            {editingTarget && (
                                <div className="flex items-center gap-2 mb-3 bg-slate-50 rounded-lg p-2">
                                    <span className="text-[11px] text-slate-400 shrink-0">Target:</span>
                                    <div className="flex items-center gap-1 flex-1">
                                        <span className="text-[11px] text-slate-500">Rp</span>
                                        <input
                                            type="number"
                                            value={tempTarget}
                                            onChange={e => setTempTarget(e.target.value)}
                                            className="w-full text-sm font-semibold text-primary bg-white border border-slate-200 rounded-md px-2 py-1"
                                            placeholder="350"
                                            min={1}
                                        />
                                        <span className="text-[11px] text-slate-500">Jt</span>
                                    </div>
                                    <button onClick={saveTarget} className="p-1.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
                                        <Check size={12} />
                                    </button>
                                </div>
                            )}
                            <div className="text-2xl font-bold text-primary mb-0.5">{pct}%</div>
                            <p className="text-[11px] text-slate-400 mb-3">Rp {CURRENT_REVENUE} Jt / Rp {revenueTarget} Jt</p>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-slate-400">
                                <span>Tercapai: <strong className="text-emerald-600">Rp {CURRENT_REVENUE} Jt</strong></span>
                                <span>Sisa: <strong className="text-slate-600">Rp {remaining} Jt</strong></span>
                            </div>
                        </div>

                        {/* Ulasan Terbaru */}
                        <div className="card p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <MessageSquare size={16} className="text-amber-600" />
                                </div>
                                <h4 className="font-bold text-primary text-sm">Ulasan Terbaru</h4>
                            </div>
                            <div className="space-y-2.5">
                                {(latestReviews.length > 0 ? latestReviews : [
                                    { user_name: "Belum ada", tour_title: "-", rating: 0, comment: "Belum ada ulasan" },
                                ]).map((r, i) => (
                                    <div key={i} className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                                            {r.user_name.charAt(0)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-semibold text-primary truncate">{r.user_name}</span>
                                                <div className="flex gap-px">
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={8} className={s <= r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />)}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-slate-400 truncate">{r.tour_title} — &quot;{r.comment || 'Tanpa komentar'}&quot;</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tour Mendatang */}
                        <div className="card p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center">
                                    <Calendar size={16} className="text-blue" />
                                </div>
                                <h4 className="font-bold text-primary text-sm">Tour Mendatang</h4>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { tour: "Raja Ampat Paradise", date: "28 Feb", pax: 8, color: "bg-blue" },
                                    { tour: "Bali Complete Exp.", date: "02 Mar", pax: 12, color: "bg-emerald-500" },
                                    { tour: "Bromo Sunrise", date: "05 Mar", pax: 6, color: "bg-amber-500" },
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                        <div className={`w-1 h-8 rounded-full shrink-0 ${t.color}`} />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-primary truncate">{t.tour}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                                    <Calendar size={8} /> {t.date}
                                                </span>
                                                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                                    <Users size={8} /> {t.pax} pax
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kepuasan Pelanggan */}
                        <div className="card p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                                    <Heart size={16} className="text-rose-500" />
                                </div>
                                <h4 className="font-bold text-primary text-sm">Kepuasan Pelanggan</h4>
                            </div>
                            <div className="space-y-3">
                                <div className="text-center py-1">
                                    <div className="flex items-center justify-center gap-1 mb-0.5">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className={s <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/30 text-amber-400/30"} />)}
                                    </div>
                                    <div className="text-2xl font-bold text-primary">4.8</div>
                                    <p className="text-[10px] text-slate-400">dari 342 ulasan</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                                        <Repeat2 size={14} className="mx-auto text-violet-500 mb-0.5" />
                                        <div className="text-sm font-bold text-primary">32%</div>
                                        <p className="text-[9px] text-slate-400">Repeat Customer</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                                        <TrendingUp size={14} className="mx-auto text-emerald-500 mb-0.5" />
                                        <div className="text-sm font-bold text-primary">87</div>
                                        <p className="text-[9px] text-slate-400">NPS Score</p>
                                    </div>
                                </div>
                            </div>
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
