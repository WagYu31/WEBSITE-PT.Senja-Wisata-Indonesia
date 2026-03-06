"use client";

import { useState, useEffect, useRef } from "react";
import { formatPrice } from "@/lib/utils";
import { TrendingUp, Download, Calendar, RefreshCw, AlertCircle } from "lucide-react";

interface MonthData {
    monthKey: string;
    month: string;
    bookings: number;
    paidBookings: number;
    revenue: number;
    growth: number | null;
}

export default function OwnerReportsPage() {
    const [data, setData] = useState<MonthData[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [exporting, setExporting] = useState(false);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/owner/reports");
            const json = await res.json();
            setData(json.data || []);
            setTotalRevenue(json.totalRevenue || 0);
            setTotalBookings(json.totalBookings || 0);
            setError("");
        } catch {
            setError("Gagal memuat data laporan");
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        setExporting(true);
        try {
            // Build PDF-friendly HTML
            const rows = data.map(m => `
                <tr>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#05073C;">${m.month}</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#475569;">${m.bookings} booking</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#FC4C4D;">${formatPrice(m.revenue)}</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">
                        ${m.growth === null ? '<span style="color:#cbd5e1;">—</span>' :
                    `<span style="color:${m.growth >= 0 ? '#059669' : '#ef4444'};font-weight:600;">${m.growth > 0 ? '+' : ''}${m.growth}%</span>`}
                    </td>
                </tr>
            `).join("");

            const now = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

            const html = `
                <html>
                <head>
                    <title>Laporan Keuangan - PT. Senja Wisata Indonesia</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
                        h1 { color: #05073C; font-size: 22px; margin: 0; }
                        .subtitle { color: #94a3b8; font-size: 13px; margin: 4px 0 0; }
                        .date { color: #64748b; font-size: 12px; margin-top: 4px; }
                        .summary { display: flex; gap: 24px; margin: 24px 0; }
                        .summary-card { padding: 16px 20px; border: 1px solid #e5e7eb; border-radius: 8px; flex: 1; }
                        .summary-card .label { font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
                        .summary-card .value { font-size: 20px; font-weight: 700; color: #05073C; }
                        table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
                        th { text-align: left; padding: 10px 12px; background: #f8fafc; border-bottom: 2px solid #e5e7eb; color: #64748b; font-weight: 600; font-size: 12px; }
                        .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #94a3b8; text-align: center; }
                        @media print { body { padding: 20px; } }
                    </style>
                </head>
                <body>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #05073C;">
                        <div>
                            <h1>📊 Laporan Keuangan</h1>
                            <p class="subtitle">PT. Senja Wisata Indonesia</p>
                            <p class="date">Dicetak: ${now}</p>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:11px;color:#94a3b8;">Data ${data.length} bulan terakhir</div>
                        </div>
                    </div>

                    <div class="summary">
                        <div class="summary-card">
                            <div class="label">Total Revenue</div>
                            <div class="value">${formatPrice(totalRevenue)}</div>
                        </div>
                        <div class="summary-card">
                            <div class="label">Total Booking</div>
                            <div class="value">${totalBookings}</div>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Bulan</th>
                                <th>Total Booking</th>
                                <th>Revenue</th>
                                <th>Growth MoM</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>

                    <div class="footer">
                        Laporan ini dihasilkan secara otomatis dari sistem booking Senja Wisata Indonesia<br/>
                        https://fluentlya.com
                    </div>
                </body>
                </html>
            `;

            // Open print dialog which allows saving as PDF
            const printWindow = window.open("", "_blank");
            if (printWindow) {
                printWindow.document.write(html);
                printWindow.document.close();
                setTimeout(() => {
                    printWindow.print();
                }, 500);
            }
        } catch {
            alert("Gagal export PDF");
        } finally {
            setExporting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw size={24} className="animate-spin text-blue" />
                <span className="ml-2 text-slate-400">Memuat laporan...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-primary">Laporan Keuangan</h2>
                    <p className="text-sm text-slate-400">Data {data.length} bulan terakhir (dari database)</p>
                </div>
                <button
                    onClick={handleExportPDF}
                    disabled={exporting || data.length === 0}
                    className="btn btn-outline gap-2 self-start sm:self-auto disabled:opacity-50"
                >
                    {exporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                    Export PDF
                </button>
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <TrendingUp size={16} />
                        </div>
                        <span className="text-sm text-slate-400">Total Revenue ({data.length} Bln)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{formatPrice(totalRevenue)}</div>
                </div>
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-blue/10 text-blue rounded-lg flex items-center justify-center">
                            <Calendar size={16} />
                        </div>
                        <span className="text-sm text-slate-400">Total Booking ({data.length} Bln)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{totalBookings}</div>
                </div>
            </div>

            {/* Monthly Table */}
            <div className="card overflow-hidden" ref={tableRef}>
                {data.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                        <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                        <p>Belum ada data booking</p>
                    </div>
                ) : (
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
                            {data.map((m, i) => (
                                <tr key={m.monthKey} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === data.length - 1 ? "border-0" : ""}`}>
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
                )}
            </div>
        </div>
    );
}
