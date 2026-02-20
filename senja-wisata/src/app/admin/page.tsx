"use client";

import { useAuthStore } from "@/store/auth";
import { formatPrice } from "@/lib/utils";
import { TrendingUp, Users, Package, BookOpen, Clock, CheckCircle, XCircle, AlertCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const mockStats = [
    { label: "Total Booking Bulan Ini", value: "47", change: "+12%", icon: BookOpen, color: "text-blue bg-blue/10", up: true },
    { label: "Revenue Bulan Ini", value: "Rp 284 Jt", change: "+8%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50", up: true },
    { label: "Total Users", value: "1.240", change: "+24 baru", icon: Users, color: "text-violet-600 bg-violet-50", up: true },
    { label: "Tour Aktif", value: "18", change: "2 draft", icon: Package, color: "text-amber-500 bg-amber-50", up: false },
];

const mockBookings = [
    { id: "BK-2025-047", user: "Reza Firmansyah", tour: "Raja Ampat Paradise", date: "2025-03-15", total: 17000000, status: "pending" },
    { id: "BK-2025-046", user: "Dewi Lestari", tour: "Bali Complete Experience", date: "2025-03-10", total: 15600000, status: "confirmed" },
    { id: "BK-2025-045", user: "Ahmad Fajar", tour: "Komodo Island Adventure", date: "2025-03-08", total: 28800000, status: "confirmed" },
    { id: "BK-2025-044", user: "Siti Nur Aisyah", tour: "Bromo Sunrise Trekking", date: "2025-02-28", total: 3600000, status: "completed" },
    { id: "BK-2025-043", user: "Budi Santoso", tour: "Lombok & Gili Islands", date: "2025-02-25", total: 9600000, status: "cancelled" },
];

const statusMap: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    pending: { label: "Pending", icon: <Clock size={12} />, cls: "badge-warning" },
    confirmed: { label: "Dikonfirmasi", icon: <CheckCircle size={12} />, cls: "badge-success" },
    completed: { label: "Selesai", icon: <CheckCircle size={12} />, cls: "bg-blue/10 text-blue" },
    cancelled: { label: "Dibatalkan", icon: <XCircle size={12} />, cls: "bg-red-100 text-red-600" },
};

const quickActions = [
    { label: "Booking Pending", count: 5, href: "/admin/bookings", cls: "text-amber-600 bg-amber-50", icon: <Clock size={16} /> },
    { label: "Review Butuh Persetujuan", count: 8, href: "/admin/bookings", cls: "text-violet-600 bg-violet-50", icon: <AlertCircle size={16} /> },
    { label: "Tour Draft", count: 2, href: "/admin/tours", cls: "text-slate-600 bg-slate-100", icon: <Package size={16} /> },
];

export default function AdminDashboard() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-primary to-blue rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 -translate-y-20" />
                <div className="absolute right-12 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-10" />
                <div className="relative">
                    <p className="text-white/70 text-sm mb-1">Selamat datang,</p>
                    <h2 className="text-2xl font-bold">{user?.name} 👋</h2>
                    <p className="text-white/60 mt-1 text-sm">Berikut ringkasan operasional hari ini.</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {mockStats.map((s) => (
                    <div key={s.label} className="card p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                                <s.icon size={18} />
                            </div>
                            <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-emerald-600" : "text-slate-400"}`}>
                                {s.up && <ArrowUpRight size={12} />} {s.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-primary">{s.value}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
                {quickActions.map((q) => (
                    <Link key={q.label} href={q.href} className="card p-4 flex items-center gap-3 hover:shadow-md transition-all group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${q.cls}`}>
                            {q.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-primary text-lg leading-none">{q.count}</div>
                            <div className="text-xs text-slate-400 mt-0.5 truncate">{q.label}</div>
                        </div>
                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-accent transition-colors shrink-0" />
                    </Link>
                ))}
            </div>

            {/* Recent Bookings */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-primary">Booking Terbaru</h3>
                    <Link href="/admin/bookings" className="text-sm text-accent font-semibold hover:underline flex items-center gap-1">
                        Lihat Semua <ArrowUpRight size={14} />
                    </Link>
                </div>
                <div className="card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="text-left p-4 font-semibold text-slate-500">Booking ID</th>
                                <th className="text-left p-4 font-semibold text-slate-500 hidden md:table-cell">Pelanggan</th>
                                <th className="text-left p-4 font-semibold text-slate-500 hidden lg:table-cell">Tour</th>
                                <th className="text-left p-4 font-semibold text-slate-500 hidden sm:table-cell">Total</th>
                                <th className="text-left p-4 font-semibold text-slate-500">Status</th>
                                <th className="text-left p-4 font-semibold text-slate-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBookings.map((b, i) => {
                                const s = statusMap[b.status];
                                return (
                                    <tr key={b.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === mockBookings.length - 1 ? "border-0" : ""}`}>
                                        <td className="p-4 font-mono font-bold text-xs text-primary">{b.id}</td>
                                        <td className="p-4 hidden md:table-cell text-slate-600">{b.user}</td>
                                        <td className="p-4 hidden lg:table-cell text-slate-500 max-w-[180px] truncate">{b.tour}</td>
                                        <td className="p-4 hidden sm:table-cell font-semibold text-accent">{formatPrice(b.total)}</td>
                                        <td className="p-4">
                                            <span className={`badge flex items-center gap-1 w-fit ${s.cls}`}>
                                                {s.icon} {s.label}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className="btn btn-outline btn-sm text-xs">Detail</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
