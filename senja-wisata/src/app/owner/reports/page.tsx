"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import {
    TrendingUp, Download, Calendar, RefreshCw, AlertCircle,
    Trophy, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, DollarSign
} from "lucide-react";

interface MonthData {
    monthKey: string;
    month: string;
    bookings: number;
    paidBookings: number;
    cancelledBookings: number;
    pendingBookings: number;
    revenue: number;
    growth: number | null;
}

interface StatusItem { status: string; count: number; totalValue: number; }
interface TopTour { name: string; bookings: number; revenue: number; paidBookings: number; }
interface YearData { year: number; bookings: number; revenue: number; paidBookings: number; }

const statusLabels: Record<string, string> = {
    confirmed: "Dikonfirmasi",
    completed: "Selesai",
    pending: "Menunggu",
    cancelled: "Dibatalkan",
};
const statusColors: Record<string, string> = {
    confirmed: "#2BBEE8",
    completed: "#059669",
    pending: "#f59e0b",
    cancelled: "#ef4444",
};

export default function OwnerReportsPage() {
    const [monthly, setMonthly] = useState<MonthData[]>([]);
    const [statusBreakdown, setStatusBreakdown] = useState<StatusItem[]>([]);
    const [topTours, setTopTours] = useState<TopTour[]>([]);
    const [yearComparison, setYearComparison] = useState<YearData[]>([]);
    const [summary, setSummary] = useState({ totalRevenue: 0, totalBookings: 0, totalPaid: 0, avgBookingValue: 0, months: 0 });
    const [filterMonths, setFilterMonths] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [exporting, setExporting] = useState(false);

    useEffect(() => { fetchData(); }, [filterMonths]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/owner/reports?months=${filterMonths}&t=${Date.now()}`, { cache: "no-store" });
            const json = await res.json();
            setMonthly(json.monthly || []);
            setStatusBreakdown(json.statusBreakdown || []);
            setTopTours(json.topTours || []);
            setYearComparison(json.yearComparison || []);
            setSummary(json.summary || { totalRevenue: 0, totalBookings: 0, totalPaid: 0, avgBookingValue: 0, months: 0 });
            setError("");
        } catch { setError("Gagal memuat data"); }
        finally { setLoading(false); }
    };

    // Simple bar chart using CSS
    const maxRevenue = Math.max(...monthly.map(m => m.revenue), 1);

    const handleExportPDF = () => {
        setExporting(true);
        const rows = monthly.map(m => `
            <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#05073C;">${m.month}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${m.bookings}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${m.paidBookings}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#FC4C4D;">${formatPrice(m.revenue)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">
                    ${m.growth === null ? '—' : `<span style="color:${m.growth >= 0 ? '#059669' : '#ef4444'}">${m.growth > 0 ? '+' : ''}${m.growth}%</span>`}
                </td>
            </tr>`).join("");

        const tourRows = topTours.map((t, i) => `
            <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${i + 1}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;">${t.name}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${t.bookings}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#FC4C4D;">${formatPrice(t.revenue)}</td>
            </tr>`).join("");

        const statusRows = statusBreakdown.map(s => `
            <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${statusLabels[s.status] || s.status}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${s.count}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${formatPrice(s.totalValue)}</td>
            </tr>`).join("");

        const now = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

        const html = `<html><head><title>Laporan Keuangan - Senja Wisata</title>
            <style>
                body{font-family:Arial,sans-serif;padding:40px;color:#1e293b;font-size:13px;}
                h1{color:#05073C;font-size:20px;margin:0;}h2{color:#05073C;font-size:15px;margin:28px 0 10px;}
                .sub{color:#94a3b8;font-size:12px;margin:3px 0 0;}
                .cards{display:flex;gap:16px;margin:20px 0;}
                .card{padding:14px 18px;border:1px solid #e5e7eb;border-radius:8px;flex:1;}
                .card .lbl{font-size:11px;color:#94a3b8;margin-bottom:3px;}.card .val{font-size:18px;font-weight:700;color:#05073C;}
                table{width:100%;border-collapse:collapse;margin-top:8px;}
                th{text-align:left;padding:8px 12px;background:#f8fafc;border-bottom:2px solid #e5e7eb;color:#64748b;font-size:11px;}
                .footer{margin-top:32px;padding-top:12px;border-top:1px solid #e5e7eb;font-size:10px;color:#94a3b8;text-align:center;}
                @media print{body{padding:20px;}}
            </style></head><body>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:2px solid #05073C;margin-bottom:20px;">
                <div><h1>📊 Laporan Keuangan</h1><p class="sub">PT. Senja Wisata Indonesia</p><p class="sub">Dicetak: ${now} • Data ${summary.months} bulan terakhir</p></div>
            </div>
            <div class="cards">
                <div class="card"><div class="lbl">Total Revenue</div><div class="val">${formatPrice(summary.totalRevenue)}</div></div>
                <div class="card"><div class="lbl">Total Booking</div><div class="val">${summary.totalBookings}</div></div>
                <div class="card"><div class="lbl">Booking Terbayar</div><div class="val">${summary.totalPaid}</div></div>
                <div class="card"><div class="lbl">Rata-rata/Booking</div><div class="val">${formatPrice(summary.avgBookingValue)}</div></div>
            </div>
            <h2>📈 Revenue Bulanan</h2>
            <table><thead><tr><th>Bulan</th><th>Booking</th><th>Terbayar</th><th>Revenue</th><th>Growth</th></tr></thead><tbody>${rows}</tbody></table>
            ${topTours.length > 0 ? `<h2>🏆 Tour Terlaris</h2><table><thead><tr><th>#</th><th>Nama Tour</th><th>Booking</th><th>Revenue</th></tr></thead><tbody>${tourRows}</tbody></table>` : ""}
            ${statusBreakdown.length > 0 ? `<h2>📋 Status Booking</h2><table><thead><tr><th>Status</th><th>Jumlah</th><th>Nilai</th></tr></thead><tbody>${statusRows}</tbody></table>` : ""}
            <div class="footer">Laporan dihasilkan otomatis dari sistem booking Senja Wisata Indonesia • https://fluentlya.com</div>
        </body></html>`;

        const w = window.open("", "_blank");
        if (w) { w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500); }
        setExporting(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw size={24} className="animate-spin text-blue" />
                <span className="ml-2 text-slate-400">Memuat laporan...</span>
            </div>
        );
    }

    const totalStatusCount = statusBreakdown.reduce((s, i) => s + i.count, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-primary">Laporan Keuangan</h2>
                    <p className="text-sm text-slate-400">Data dari database booking</p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={filterMonths}
                        onChange={e => setFilterMonths(Number(e.target.value))}
                        className="px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400"
                    >
                        <option value={3}>3 Bulan</option>
                        <option value={6}>6 Bulan</option>
                        <option value={12}>12 Bulan</option>
                        <option value={24}>24 Bulan</option>
                    </select>
                    <button
                        onClick={handleExportPDF}
                        disabled={exporting || monthly.length === 0}
                        className="btn btn-outline gap-2 disabled:opacity-50"
                    >
                        {exporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                        Export PDF
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                    <AlertCircle size={16} />{error}
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><TrendingUp size={16} /></div>
                        <span className="text-xs text-slate-400">Total Revenue</span>
                    </div>
                    <div className="text-xl font-bold text-primary">{formatPrice(summary.totalRevenue)}</div>
                </div>
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue/10 text-blue rounded-lg flex items-center justify-center"><Calendar size={16} /></div>
                        <span className="text-xs text-slate-400">Total Booking</span>
                    </div>
                    <div className="text-xl font-bold text-primary">{summary.totalBookings}</div>
                </div>
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><DollarSign size={16} /></div>
                        <span className="text-xs text-slate-400">Rata-rata/Booking</span>
                    </div>
                    <div className="text-xl font-bold text-primary">{formatPrice(summary.avgBookingValue)}</div>
                </div>
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><PieChart size={16} /></div>
                        <span className="text-xs text-slate-400">Terbayar</span>
                    </div>
                    <div className="text-xl font-bold text-primary">{summary.totalPaid} <span className="text-sm font-normal text-slate-400">/ {summary.totalBookings}</span></div>
                </div>
            </div>

            {/* Revenue Chart */}
            {monthly.length > 0 && (
                <div className="card p-5">
                    <h3 className="font-bold text-primary text-sm flex items-center gap-2 mb-4">
                        <BarChart3 size={16} className="text-blue" /> Grafik Revenue Bulanan
                    </h3>
                    <div className="flex items-end gap-1.5" style={{ height: 160 }}>
                        {[...monthly].reverse().map(m => {
                            const heightPx = maxRevenue > 0 ? Math.max((m.revenue / maxRevenue) * 140, 4) : 4;
                            return (
                                <div key={m.monthKey} className="flex-1 flex flex-col items-center justify-end group relative" style={{ height: 160 }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-10">
                                        {m.month}: {formatPrice(m.revenue)}
                                    </div>
                                    <div
                                        className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
                                        style={{
                                            height: heightPx,
                                            background: m.revenue > 0 ? "linear-gradient(180deg, #2BBEE8 0%, #05073C 100%)" : "#e2e8f0",
                                        }}
                                    />
                                    <span className="text-[9px] text-slate-400 truncate w-full text-center mt-1">
                                        {m.monthKey.split("-")[1]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Two columns: Top Tours + Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Top Tours */}
                <div className="card overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-bold text-primary text-sm flex items-center gap-2">
                            <Trophy size={16} className="text-amber-500" /> Tour Terlaris
                        </h3>
                    </div>
                    {topTours.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-sm">Belum ada data</div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {topTours.map((tour, i) => {
                                const barWidth = topTours[0].revenue > 0 ? (tour.revenue / topTours[0].revenue) * 100 : 0;
                                return (
                                    <div key={i} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-amber-100 text-amber-600" : i === 1 ? "bg-slate-100 text-slate-500" : "bg-slate-50 text-slate-400"}`}>
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm font-semibold text-slate-700 truncate">{tour.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-accent">{formatPrice(tour.revenue)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 ml-8">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full" style={{ width: `${barWidth}%`, background: "linear-gradient(90deg, #2BBEE8, #05073C)" }} />
                                            </div>
                                            <span className="text-[10px] text-slate-400">{tour.bookings} booking</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Status Breakdown */}
                <div className="card overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-bold text-primary text-sm flex items-center gap-2">
                            <PieChart size={16} className="text-blue" /> Breakdown Status Booking
                        </h3>
                    </div>
                    {statusBreakdown.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-sm">Belum ada data</div>
                    ) : (
                        <div className="p-4 space-y-3">
                            {/* Visual bar */}
                            <div className="flex h-4 rounded-full overflow-hidden">
                                {statusBreakdown.map(s => (
                                    <div
                                        key={s.status}
                                        style={{
                                            width: `${totalStatusCount > 0 ? (s.count / totalStatusCount) * 100 : 0}%`,
                                            backgroundColor: statusColors[s.status] || "#94a3b8",
                                        }}
                                        title={`${statusLabels[s.status] || s.status}: ${s.count}`}
                                    />
                                ))}
                            </div>
                            {/* Legend */}
                            <div className="space-y-2 mt-3">
                                {statusBreakdown.map(s => (
                                    <div key={s.status} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[s.status] || "#94a3b8" }} />
                                            <span className="text-sm text-slate-600">{statusLabels[s.status] || s.status}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold text-slate-700">{s.count}</span>
                                            <span className="text-xs text-slate-400">{formatPrice(s.totalValue)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Year Comparison */}
            {yearComparison.length > 1 && (
                <div className="card p-5">
                    <h3 className="font-bold text-primary text-sm flex items-center gap-2 mb-4">
                        <BarChart3 size={16} className="text-emerald-500" /> Perbandingan Tahun
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {yearComparison.map((y, i) => {
                            const prevYear = yearComparison[i + 1];
                            const revenueGrowth = prevYear && prevYear.revenue > 0
                                ? Math.round(((y.revenue - prevYear.revenue) / prevYear.revenue) * 100)
                                : null;
                            return (
                                <div key={y.year} className="p-4 bg-slate-50 rounded-xl">
                                    <div className="text-lg font-bold text-primary mb-2">{y.year}</div>
                                    <div className="space-y-1.5 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Revenue</span>
                                            <span className="font-bold text-accent">{formatPrice(y.revenue)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Booking</span>
                                            <span className="font-semibold">{y.bookings}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Terbayar</span>
                                            <span className="font-semibold">{y.paidBookings}</span>
                                        </div>
                                        {revenueGrowth !== null && (
                                            <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                                                <span className="text-slate-500">vs {y.year - 1}</span>
                                                <span className={`font-bold flex items-center gap-0.5 ${revenueGrowth >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                                    {revenueGrowth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                    {revenueGrowth > 0 ? "+" : ""}{revenueGrowth}%
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Monthly Detail Table */}
            <div className="card overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                    <h3 className="font-bold text-primary text-sm flex items-center gap-2">
                        <Calendar size={16} className="text-blue" /> Detail Revenue Bulanan
                    </h3>
                </div>
                {monthly.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                        <Calendar size={32} className="mx-auto mb-2 opacity-50" /><p>Belum ada data booking</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-slate-500">Bulan</th>
                                    <th className="text-left p-4 font-semibold text-slate-500">Booking</th>
                                    <th className="text-left p-4 font-semibold text-slate-500">Terbayar</th>
                                    <th className="text-left p-4 font-semibold text-slate-500">Revenue</th>
                                    <th className="text-left p-4 font-semibold text-slate-500">Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthly.map((m, i) => (
                                    <tr key={m.monthKey} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === monthly.length - 1 ? "border-0" : ""}`}>
                                        <td className="p-4 font-semibold text-primary">{m.month}</td>
                                        <td className="p-4 text-slate-600">{m.bookings}</td>
                                        <td className="p-4 text-emerald-600 font-medium">{m.paidBookings}</td>
                                        <td className="p-4 font-bold text-accent">{formatPrice(m.revenue)}</td>
                                        <td className="p-4">
                                            {m.growth === null ? (
                                                <span className="text-slate-300 text-xs">—</span>
                                            ) : (
                                                <span className={`font-semibold text-xs flex items-center gap-0.5 ${m.growth >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                                    {m.growth >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                    {m.growth > 0 ? "+" : ""}{m.growth}%
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
