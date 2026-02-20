"use client";

import { formatPrice } from "@/lib/utils";
import { TrendingUp, Download, Calendar } from "lucide-react";

const monthlyData = [
    { month: "September 2024", bookings: 38, revenue: 180000000, growth: null },
    { month: "Oktober 2024", bookings: 44, revenue: 210000000, growth: +16.7 },
    { month: "November 2024", bookings: 41, revenue: 195000000, growth: -7.1 },
    { month: "Desember 2024", bookings: 67, revenue: 320000000, growth: +64.1 },
    { month: "Januari 2025", bookings: 56, revenue: 260000000, growth: -18.8 },
    { month: "Februari 2025", bookings: 47, revenue: 284000000, growth: +9.2 },
];

export default function OwnerReportsPage() {
    const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
    const totalBookings = monthlyData.reduce((sum, m) => sum + m.bookings, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-primary">Laporan Keuangan</h2>
                    <p className="text-sm text-slate-400">Data 6 bulan terakhir</p>
                </div>
                <button className="btn btn-outline gap-2 self-start sm:self-auto">
                    <Download size={16} /> Export PDF
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <TrendingUp size={16} />
                        </div>
                        <span className="text-sm text-slate-400">Total Revenue (6 Bln)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{formatPrice(totalRevenue)}</div>
                </div>
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue/10 text-blue rounded-lg flex items-center justify-center">
                            <Calendar size={16} />
                        </div>
                        <span className="text-sm text-slate-400">Total Booking (6 Bln)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{totalBookings}</div>
                </div>
            </div>

            {/* Monthly Table */}
            <div className="card overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="text-left p-4 font-semibold text-slate-500">Bulan</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Total Booking</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Revenue</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Growth MoM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...monthlyData].reverse().map((m, i) => (
                            <tr key={m.month} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === monthlyData.length - 1 ? "border-0" : ""}`}>
                                <td className="p-4 font-semibold text-primary">{m.month}</td>
                                <td className="p-4 text-slate-600">{m.bookings} booking</td>
                                <td className="p-4 font-bold text-accent">{formatPrice(m.revenue)}</td>
                                <td className="p-4">
                                    {m.growth === null ? (
                                        <span className="text-slate-300 text-xs">—</span>
                                    ) : (
                                        <span className={`font-semibold text-xs ${m.growth >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                            {m.growth > 0 ? "+" : ""}{m.growth}%
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
