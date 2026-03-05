"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { Search, Clock, CheckCircle, XCircle, Package, X, User, MapPin, Calendar, Users, CheckSquare } from "lucide-react";

type Booking = {
    id: string; user: string; email: string; tour: string;
    date: string; guests: number; total: number;
    status: string; payment_status?: string; created: string; phone?: string;
    refund_amount?: number; refund_percentage?: number;
};

const initialBookings: Booking[] = [
    { id: "BK-2025-047", user: "Reza Firmansyah", email: "reza@mail.com", phone: "+62 812-0001-0001", tour: "Raja Ampat Paradise", date: "2025-03-15", guests: 2, total: 17000000, status: "pending", payment_status: "pending", created: "2025-02-18" },
    { id: "BK-2025-046", user: "Dewi Lestari", email: "dewi@mail.com", phone: "+62 812-0002-0002", tour: "Bali Complete Experience", date: "2025-03-10", guests: 3, total: 15600000, status: "confirmed", payment_status: "paid", created: "2025-02-16" },
    { id: "BK-2025-045", user: "Ahmad Fajar", email: "ahmad@mail.com", phone: "+62 812-0003-0003", tour: "Komodo Island Adventure", date: "2025-03-08", guests: 4, total: 28800000, status: "confirmed", payment_status: "paid", created: "2025-02-14" },
    { id: "BK-2025-044", user: "Siti Nur Aisyah", email: "siti@mail.com", phone: "+62 812-0004-0004", tour: "Bromo Sunrise Trekking", date: "2025-02-28", guests: 2, total: 3600000, status: "completed", payment_status: "paid", created: "2025-02-10" },
    { id: "BK-2025-043", user: "Budi Santoso", email: "budi@mail.com", phone: "+62 812-0005-0005", tour: "Lombok & Gili Islands", date: "2025-02-25", guests: 2, total: 9600000, status: "cancelled", payment_status: "refunded", refund_amount: 8640000, refund_percentage: 90, created: "2025-02-08" },
    { id: "BK-2025-042", user: "Linda Handayani", email: "linda@mail.com", phone: "+62 812-0006-0006", tour: "Yogyakarta Cultural Tour", date: "2025-02-20", guests: 4, total: 9600000, status: "completed", payment_status: "paid", created: "2025-02-05" },
    { id: "BK-2025-041", user: "Hendra Wijaya", email: "hendra@mail.com", phone: "+62 812-0007-0007", tour: "Raja Ampat Paradise", date: "2025-04-05", guests: 1, total: 8500000, status: "pending", payment_status: "pending", created: "2025-02-19" },
    { id: "BK-2025-040", user: "Melati Putri", email: "melati@mail.com", phone: "+62 812-0008-0008", tour: "Bali Complete Experience", date: "2025-04-12", guests: 2, total: 10400000, status: "confirmed", payment_status: "paid", created: "2025-02-17" },
];

const statusTabs = ["Semua", "pending", "confirmed", "completed", "cancelled"];
const tabLabels: Record<string, string> = { "Semua": "Semua", pending: "Pending", confirmed: "Dikonfirmasi", completed: "Selesai", cancelled: "Dibatalkan" };

const statusMap: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    pending: { label: "Pending", icon: <Clock size={12} />, cls: "badge-warning" },
    confirmed: { label: "Dikonfirmasi", icon: <CheckCircle size={12} />, cls: "badge-success" },
    completed: { label: "Selesai", icon: <CheckCircle size={12} />, cls: "bg-blue-50 text-blue-600" },
    cancelled: { label: "Dibatalkan", icon: <XCircle size={12} />, cls: "bg-red-100 text-red-600" },
};

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);
    const [activeTab, setActiveTab] = useState("Semua");
    const [search, setSearch] = useState("");
    const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
    const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
    const [successMsg, setSuccessMsg] = useState("");

    // Fetch real bookings from API and merge with dummy data
    useEffect(() => {
        const autoCompleteBookings = (list: Booking[]): Booking[] => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return list.map(b => {
                if (b.status === "confirmed") {
                    const tripDate = new Date(b.date);
                    tripDate.setHours(23, 59, 59, 999);
                    if (tripDate < now) return { ...b, status: "completed" };
                }
                return b;
            });
        };

        fetch("/api/booking/all")
            .then(r => r.json())
            .then(data => {
                if (data.bookings && data.bookings.length > 0) {
                    const realBookings: Booking[] = data.bookings.map((b: Record<string, unknown>) => ({
                        id: (b.booking_code as string) || String(b.id),
                        user: (b.user_name as string) || "Guest",
                        email: (b.user_email as string) || "",
                        tour: (b.tour_title as string) || "",
                        date: (b.tour_date as string) || "",
                        guests: Number(b.guests) || 0,
                        total: Number(b.total_price) || 0,
                        status: (b.status as string) || "pending",
                        payment_status: (b.payment_status as string) || "pending",
                        created: (b.created_at as string) || "",
                    }));
                    const realIds = new Set(realBookings.map(b => b.id));
                    const merged = [...realBookings, ...initialBookings.filter(b => !realIds.has(b.id))];
                    setBookings(autoCompleteBookings(merged));
                } else {
                    setBookings(autoCompleteBookings(initialBookings));
                }
            })
            .catch(() => {
                setBookings(autoCompleteBookings(initialBookings));
            });
    }, []);

    const filtered = bookings.filter((b) => {
        const matchTab = activeTab === "Semua" || b.status === activeTab;
        const matchSearch = b.user.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase()) ||
            b.tour.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    const countByStatus = (s: string) => s === "Semua" ? bookings.length : bookings.filter((b) => b.status === s).length;

    const updateStatus = async (id: string, status: string) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
        setDetailBooking(prev => prev ? { ...prev, status } : null);
        // Persist to backend
        try {
            await fetch("/api/booking/update-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingCode: id, status }),
            });
        } catch { /* ignore */ }
        showToast(
            status === "confirmed" ? "Booking berhasil dikonfirmasi!" :
                status === "completed" ? "Booking ditandai selesai!" :
                    status === "cancelled" ? "Booking dibatalkan." : "Status diperbarui."
        );
    };

    const showToast = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Toast */}
            {successMsg && (
                <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-xl font-semibold text-sm flex items-center gap-2">
                    ✓ {successMsg}
                </div>
            )}

            {/* Header */}
            <div>
                <h2 className="text-xl font-bold" style={{ color: '#05073C' }}>Kelola Booking</h2>
                <p className="text-sm text-slate-400">{bookings.length} total booking terdaftar</p>
            </div>

            {/* Status Tabs */}
            <div className="card p-2 flex gap-1 overflow-x-auto">
                {statusTabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab ? "text-white" : "text-slate-500 hover:bg-slate-100"}`}
                        style={activeTab === tab ? { backgroundColor: '#05073C' } : {}}>
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
                <input type="text" placeholder="Cari booking ID, nama user, atau tour..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    className="form-input pl-9 w-full max-w-md" />
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
                            <th className="text-left p-4 font-semibold text-slate-500 hidden lg:table-cell">Pembayaran</th>
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
                                        <div className="font-mono font-bold text-xs" style={{ color: '#05073C' }}>{b.id}</div>
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
                                    <td className="p-4 hidden lg:table-cell">
                                        {b.payment_status && (
                                            <span className={`badge text-xs w-fit ${b.payment_status === "paid" ? "bg-emerald-50 text-emerald-600" :
                                                b.payment_status === "refunded" ? "bg-purple-50 text-purple-600" :
                                                    b.payment_status === "pending" ? "badge-warning" :
                                                        "bg-red-50 text-red-500"
                                                }`}>
                                                {{ paid: "💳 Lunas", pending: "⏳ Belum Bayar", refunded: "↩ Refund", cancelled: "✕ Batal", expired: "⌛ Expired" }[b.payment_status] || b.payment_status}
                                            </span>
                                        )}
                                        {b.payment_status === "refunded" && b.refund_amount != null && (
                                            <div className="text-xs text-purple-500 mt-0.5">{formatPrice(b.refund_amount)} ({b.refund_percentage}%)</div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`badge flex items-center gap-1 w-fit ${s.cls}`}>
                                            {s.icon} {s.label}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-1 flex-wrap">
                                            <button onClick={() => setDetailBooking(b)}
                                                className="btn btn-outline btn-sm text-xs">Detail</button>
                                            {b.status === "pending" && (
                                                <>
                                                    <button onClick={() => updateStatus(b.id, "confirmed")}
                                                        className="btn btn-sm text-xs bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600">Konfirmasi</button>
                                                    <button onClick={() => setCancelTarget(b)}
                                                        className="btn btn-sm text-xs bg-red-50 text-red-500 border-red-200 hover:bg-red-100">Tolak</button>
                                                </>
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

            {/* ===== MODAL: Detail Booking ===== */}
            {detailBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-bold" style={{ color: '#05073C' }}>Detail Booking</h3>
                                <p className="text-xs text-slate-400 font-mono">{detailBooking.id}</p>
                            </div>
                            <button onClick={() => setDetailBooking(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Info Cards */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><User size={11} /> Pelanggan</div>
                                    <div className="font-semibold text-sm" style={{ color: '#05073C' }}>{detailBooking.user}</div>
                                    <div className="text-xs text-slate-500">{detailBooking.email}</div>
                                    {detailBooking.phone && <div className="text-xs text-slate-500">{detailBooking.phone}</div>}
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><MapPin size={11} /> Tour</div>
                                    <div className="font-semibold text-sm" style={{ color: '#05073C' }}>{detailBooking.tour}</div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><Calendar size={11} /> Tanggal Trip</div>
                                    <div className="font-semibold text-sm">{detailBooking.date}</div>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1"><Users size={11} /> Jumlah Peserta</div>
                                    <div className="font-semibold text-sm">{detailBooking.guests} orang</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <div className="text-xs text-slate-400 mb-0.5">Total Pembayaran</div>
                                    <div className="text-2xl font-bold text-accent">{formatPrice(detailBooking.total)}</div>
                                    {detailBooking.payment_status && (
                                        <span className={`badge text-xs mt-1 ${detailBooking.payment_status === "paid" ? "bg-emerald-50 text-emerald-600" :
                                            detailBooking.payment_status === "refunded" ? "bg-purple-50 text-purple-600" :
                                                detailBooking.payment_status === "pending" ? "badge-warning" :
                                                    "bg-red-50 text-red-500"
                                            }`}>
                                            {{ paid: "💳 Lunas", pending: "⏳ Belum Bayar", refunded: "↩ Refund", cancelled: "✕ Batal", expired: "⌛ Expired" }[detailBooking.payment_status] || detailBooking.payment_status}
                                        </span>
                                    )}
                                    {detailBooking.payment_status === "refunded" && detailBooking.refund_amount != null && (
                                        <div className="text-xs text-purple-600 mt-1">Refund: {formatPrice(detailBooking.refund_amount)} ({detailBooking.refund_percentage}%)</div>
                                    )}
                                </div>
                                <span className={`badge flex items-center gap-1 ${statusMap[detailBooking.status].cls}`}>
                                    {statusMap[detailBooking.status].icon} {statusMap[detailBooking.status].label}
                                </span>
                            </div>

                            {/* Actions */}
                            {detailBooking.status === "pending" && (
                                <div className="flex gap-3">
                                    <button onClick={() => { updateStatus(detailBooking.id, "cancelled"); setCancelTarget(null); }}
                                        className="flex-1 py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all">
                                        Tolak Booking
                                    </button>
                                    <button onClick={() => updateStatus(detailBooking.id, "confirmed")}
                                        className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-sm font-semibold text-white hover:bg-emerald-600 transition-all">
                                        ✓ Konfirmasi
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL: Konfirmasi Tolak ===== */}
            {cancelTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4 text-center">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                            <XCircle size={24} className="text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Tolak Booking?</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Booking <strong>{cancelTarget.id}</strong> dari <strong>{cancelTarget.user}</strong> akan ditolak.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setCancelTarget(null)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                                Batal
                            </button>
                            <button onClick={() => { updateStatus(cancelTarget.id, "cancelled"); setCancelTarget(null); }}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition-all">
                                Ya, Tolak
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
