"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Search, Clock, CheckCircle, XCircle, Package, Filter } from "lucide-react";

const allBookings = [
    { id: "BK-2025-047", user: "Reza Firmansyah", email: "reza@mail.com", tour: "Raja Ampat Paradise", date: "2025-03-15", guests: 2, total: 17000000, status: "pending", created: "2025-02-18" },
    { id: "BK-2025-046", user: "Dewi Lestari", email: "dewi@mail.com", tour: "Bali Complete Experience", date: "2025-03-10", guests: 3, total: 15600000, status: "confirmed", created: "2025-02-16" },
    { id: "BK-2025-045", user: "Ahmad Fajar", email: "ahmad@mail.com", tour: "Komodo Island Adventure", date: "2025-03-08", guests: 4, total: 28800000, status: "confirmed", created: "2025-02-14" },
    { id: "BK-2025-044", user: "Siti Nur Aisyah", email: "siti@mail.com", tour: "Bromo Sunrise Trekking", date: "2025-02-28", guests: 2, total: 3600000, status: "completed", created: "2025-02-10" },
    { id: "BK-2025-043", user: "Budi Santoso", email: "budi@mail.com", tour: "Lombok & Gili Islands", date: "2025-02-25", guests: 2, total: 9600000, status: "cancelled", created: "2025-02-08" },
    { id: "BK-2025-042", user: "Linda Handayani", email: "linda@mail.com", tour: "Yogyakarta Cultural Tour", date: "2025-02-20", guests: 4, total: 9600000, status: "completed", created: "2025-02-05" },
    { id: "BK-2025-041", user: "Hendra Wijaya", email: "hendra@mail.com", tour: "Raja Ampat Paradise", date: "2025-04-05", guests: 1, total: 8500000, status: "pending", created: "2025-02-19" },
    { id: "BK-2025-040", user: "Melati Putri", email: "melati@mail.com", tour: "Bali Complete Experience", date: "2025-04-12", guests: 2, total: 10400000, status: "confirmed", created: "2025-02-17" },
];

const statusTabs = ["Semua", "pending", "confirmed", "completed", "cancelled"];

const statusMap: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    pending: { label: "Pending", icon: <Clock size={12} />, cls: "badge-warning" },
    confirmed: { label: "Dikonfirmasi", icon: <CheckCircle size={12} />, cls: "badge-success" },
    completed: { label: "Selesai", icon: <CheckCircle size={12} />, cls: "bg-blue/10 text-blue" },
    cancelled: { label: "Dibatalkan", icon: <XCircle size={12} />, cls: "bg-red-100 text-red-600" },
};

const tabLabels: Record<string, string> = {
    "Semua": "Semua", pending: "Pending", confirmed: "Dikonfirmasi", completed: "Selesai", cancelled: "Dibatalkan"
};

export default function AdminBookingsPage() {
    const [activeTab, setActiveTab] = useState("Semua");
    const [search, setSearch] = useState("");

    const filtered = allBookings.filter((b) => {
        const matchTab = activeTab === "Semua" || b.status === activeTab;
        const matchSearch = b.user.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase()) ||
            b.tour.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    const countByStatus = (s: string) => s === "Semua" ? allBookings.length : allBookings.filter((b) => b.status === s).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-primary">Kelola Booking</h2>
                <p className="text-sm text-slate-400">{allBookings.length} total booking terdaftar</p>
            </div>

            {/* Status Tabs */}
            <div className="card p-2 flex gap-1 overflow-x-auto">
                {statusTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-100"
                            }`}
                    >
                        {tabLabels[tab]}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {countByStatus(tab)}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Cari booking ID, nama user, atau tour..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-input pl-9 w-full max-w-md"
                />
            </div>

            {/* Bookings Table */}
            <div className="card overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="text-left p-4 font-semibold text-slate-500">Booking ID</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden md:table-cell">Pelanggan</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden lg:table-cell">Tour</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden sm:table-cell">Tanggal Trip</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden md:table-cell">Total</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Status</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((b, i) => {
                            const s = statusMap[b.status];
                            return (
                                <tr key={b.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}>
                                    <td className="p-4">
                                        <div className="font-mono font-bold text-xs text-primary">{b.id}</div>
                                        <div className="text-xs text-slate-400">Dipesan: {b.created}</div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <div className="font-semibold text-slate-700">{b.user}</div>
                                        <div className="text-xs text-slate-400">{b.email}</div>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell text-slate-500 max-w-[160px] truncate">{b.tour}</td>
                                    <td className="p-4 hidden sm:table-cell text-slate-500">{b.date}</td>
                                    <td className="p-4 hidden md:table-cell">
                                        <div className="font-semibold text-accent">{formatPrice(b.total)}</div>
                                        <div className="text-xs text-slate-400">{b.guests} orang</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`badge flex items-center gap-1 w-fit ${s.cls}`}>
                                            {s.icon} {s.label}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-1">
                                            <button className="btn btn-outline btn-sm text-xs">Detail</button>
                                            {b.status === "pending" && (
                                                <button className="btn btn-sm text-xs bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600">Konfirmasi</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <Package size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="font-semibold">Tidak ada booking ditemukan</p>
                    </div>
                )}
            </div>
        </div>
    );
}
