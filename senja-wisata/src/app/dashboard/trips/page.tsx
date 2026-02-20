"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp, Star, Download } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

const mockBookings: Array<{
    id: string;
    tourTitle: string;
    location: string;
    date: string;
    returnDate: string;
    duration: string;
    guests: number;
    total: number;
    status: BookingStatus;
    image: string;
    guide: string;
    meetingPoint: string;
    bookedAt: string;
    canReview?: boolean;
}> = [
        {
            id: "BK001",
            tourTitle: "Raja Ampat Paradise",
            location: "Papua Barat",
            date: "2025-03-15",
            returnDate: "2025-03-22",
            duration: "7 Days",
            guests: 2,
            total: 17000000,
            status: "confirmed",
            image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&q=70",
            guide: "Bapak Yusuf",
            meetingPoint: "Bandara Domine Eduard Osok, Sorong",
            bookedAt: "2025-02-01",
        },
        {
            id: "BK002",
            tourTitle: "Bali Complete Experience",
            location: "Bali",
            date: "2025-02-05",
            returnDate: "2025-02-10",
            duration: "5 Days",
            guests: 3,
            total: 15600000,
            status: "completed",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=70",
            guide: "Ibu Kadek Sari",
            meetingPoint: "Bandara Ngurah Rai, Bali",
            bookedAt: "2025-01-05",
            canReview: true,
        },
        {
            id: "BK003",
            tourTitle: "Bromo Sunrise Trekking",
            location: "Jawa Timur",
            date: "2024-12-20",
            returnDate: "2024-12-22",
            duration: "2 Days",
            guests: 2,
            total: 3600000,
            status: "completed",
            image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=400&q=70",
            guide: "Pak Agung",
            meetingPoint: "Hotel Bromo Permai, Cemoro Lawang",
            bookedAt: "2024-11-10",
        },
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

export default function TripsPage() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [tab, setTab] = useState<"all" | "upcoming" | "completed">("all");

    const filtered = mockBookings.filter((b) => {
        if (tab === "upcoming") return b.status === "confirmed" || b.status === "pending";
        if (tab === "completed") return b.status === "completed";
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-primary">My Trips</h2>
                    <p className="text-slate-500 text-sm">Riwayat dan trip mendatang Anda</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-100 pb-1">
                {(["all", "upcoming", "completed"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all ${tab === t ? "text-accent border-b-2 border-accent" : "text-slate-400 hover:text-primary"
                            }`}
                    >
                        {t === "all" ? "Semua" : t === "upcoming" ? "Mendatang" : "Selesai"}
                    </button>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-slate-400">
                    <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-semibold">Belum ada trip</p>
                    <p className="text-sm mt-1">Yuk, mulai perjalanan impian Anda!</p>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {filtered.map((b) => (
                    <div key={b.id} className="card overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                            <img
                                src={b.image}
                                alt={b.tourTitle}
                                className="w-full sm:w-36 h-40 sm:h-auto object-cover shrink-0"
                            />
                            <div className="flex-1 p-5">
                                <div className="flex flex-wrap items-start gap-3 justify-between mb-3">
                                    <div>
                                        <span className={`badge ${statusStyle[b.status]} mb-2`}>{statusLabel[b.status]}</span>
                                        <h3 className="font-bold text-primary text-lg">{b.tourTitle}</h3>
                                        <div className="flex items-center gap-1 text-slate-400 text-sm">
                                            <MapPin size={13} /> {b.location}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-accent text-lg">{formatPrice(b.total)}</div>
                                        <div className="text-xs text-slate-400 font-mono">{b.id}</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={13} /> {b.date} → {b.returnDate}</span>
                                    <span className="flex items-center gap-1"><Clock size={13} /> {b.duration}</span>
                                    <span className="flex items-center gap-1"><Users size={13} /> {b.guests} Orang</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                                        className="btn btn-outline btn-sm gap-1 text-xs"
                                    >
                                        Detail {expanded === b.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                    </button>
                                    {b.status === "confirmed" && (
                                        <button className="btn btn-primary btn-sm gap-1 text-xs">
                                            <Download size={13} /> E-Ticket
                                        </button>
                                    )}
                                    {b.status === "completed" && (b as typeof b & { canReview?: boolean }).canReview && (
                                        <button className="btn btn-sm gap-1 text-xs bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100">
                                            <Star size={13} /> Beri Ulasan
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Expanded Detail */}
                        {expanded === b.id && (
                            <div className="border-t border-slate-100 p-5 bg-slate-50 grid sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Guide</div>
                                    <div className="font-semibold text-primary">{b.guide}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Meeting Point</div>
                                    <div className="font-semibold text-primary">{b.meetingPoint}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Tanggal Booking</div>
                                    <div className="font-semibold text-primary">{b.bookedAt}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Jumlah Peserta</div>
                                    <div className="font-semibold text-primary">{b.guests} orang</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
