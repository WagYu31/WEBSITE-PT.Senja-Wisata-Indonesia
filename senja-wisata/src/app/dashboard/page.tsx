"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { Package, Heart, Star, Calendar, Clock, MapPin, CheckCircle, AlertCircle } from "lucide-react";

const mockBookings = [
    { id: "BK001", tourTitle: "Raja Ampat Paradise", date: "2025-03-15", duration: "7 Days", guests: 2, total: 17000000, status: "confirmed" as const, image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=200&q=60" },
    { id: "BK002", tourTitle: "Bali Complete Experience", date: "2025-02-28", duration: "5 Days", guests: 3, total: 15600000, status: "completed" as const, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=60" },
];

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

    const stats = [
        { label: "Total Trip", value: "2", icon: Package, color: "text-blue bg-blue/10" },
        { label: "Wishlist", value: "5", icon: Heart, color: "text-accent bg-accent/10" },
        { label: "Ulasan Dibuat", value: "3", icon: Star, color: "text-amber-500 bg-amber-50" },
        { label: "Trip Mendatang", value: "1", icon: Calendar, color: "text-emerald-600 bg-emerald-50" },
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
                {stats.map((s) => (
                    <div key={s.label} className="card p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                            <s.icon size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-primary">{s.value}</div>
                            <div className="text-xs text-slate-400">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Trip */}
            <div>
                <h3 className="font-bold text-lg text-primary mb-4">Trip Mendatang</h3>
                <div className="card p-5 flex flex-col sm:flex-row gap-4">
                    <img src={mockBookings[0].image} alt="" className="w-full sm:w-32 h-28 sm:h-auto object-cover rounded-xl" />
                    <div className="flex-1">
                        <div className={`badge ${statusStyle.confirmed} mb-2`}>
                            <CheckCircle size={12} /> {statusLabel.confirmed}
                        </div>
                        <h4 className="font-bold text-primary text-lg mb-1">{mockBookings[0].tourTitle}</h4>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1"><Calendar size={13} /> {mockBookings[0].date}</span>
                            <span className="flex items-center gap-1"><Clock size={13} /> {mockBookings[0].duration}</span>
                            <span className="flex items-center gap-1"><MapPin size={13} /> Papua Barat</span>
                        </div>
                        <div className="font-bold text-accent">{formatPrice(mockBookings[0].total)}</div>
                    </div>
                    <div className="sm:text-right">
                        <div className="text-xs text-slate-400 mb-1">Booking ID</div>
                        <div className="font-mono font-bold text-sm text-primary">{mockBookings[0].id}</div>
                        <button className="btn btn-outline btn-sm mt-3 text-xs">Lihat Detail</button>
                    </div>
                </div>
            </div>

            {/* Booking History */}
            <div>
                <h3 className="font-bold text-lg text-primary mb-4">Riwayat Booking</h3>
                <div className="card overflow-hidden">
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
                            {mockBookings.map((b, i) => (
                                <tr key={b.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === mockBookings.length - 1 ? "border-0" : ""}`}>
                                    <td className="p-4">
                                        <div className="font-semibold text-primary">{b.tourTitle}</div>
                                        <div className="text-xs text-slate-400">{b.id}</div>
                                    </td>
                                    <td className="p-4 hidden sm:table-cell text-slate-500">{b.date}</td>
                                    <td className="p-4 hidden md:table-cell font-semibold text-accent">{formatPrice(b.total)}</td>
                                    <td className="p-4">
                                        <span className={`badge ${statusStyle[b.status]}`}>{statusLabel[b.status]}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
