"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp, Star, Download, XCircle, AlertTriangle, CheckCircle, CreditCard, Loader2, Send, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import ETicketModal from "@/components/ui/ETicketModal";
import { tours as staticTours } from "@/lib/data";

// Midtrans Snap type
declare global {
    interface Window {
        snap?: {
            pay: (token: string, options: {
                onSuccess?: (r: Record<string, unknown>) => void;
                onPending?: (r: Record<string, unknown>) => void;
                onError?: (r: Record<string, unknown>) => void;
                onClose?: () => void;
            }) => void;
        };
    }
}

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
type PaymentStatus = "pending" | "paid" | "refunded" | "cancelled" | "expired";

type Booking = {
    id: number;
    booking_code: string;
    tour_id: number;
    tour_title?: string;
    tour_location?: string;
    tour_image?: string;
    tour_date: string;
    tour_departure_time?: string;
    guests: number;
    adults: number;
    children: number;
    total_price: number;
    status: BookingStatus;
    payment_status: PaymentStatus;
    midtrans_order_id?: string;
    created_at: string;
    refund_amount?: number;
    refund_percentage?: number;
    cancelled_at?: string;
    va_number?: string;
    va_bank?: string;
};


const statusStyle: Record<string, string> = {
    confirmed: "badge-success",
    pending: "badge-warning",
    completed: "bg-blue/10 text-blue",
    cancelled: "bg-red-100 text-red-600",
};
const statusLabel: Record<string, string> = {
    confirmed: "Terkonfirmasi",
    pending: "Menunggu Pembayaran",
    completed: "Selesai",
    cancelled: "Dibatalkan",
};
const paymentBadge: Record<string, string> = {
    paid: "bg-emerald-50 text-emerald-600",
    pending: "bg-amber-50 text-amber-600",
    refunded: "bg-purple-50 text-purple-600",
    cancelled: "bg-red-50 text-red-500",
    expired: "bg-slate-100 text-slate-500",
};
const paymentLabel: Record<string, string> = {
    paid: "Lunas",
    pending: "Belum Bayar",
    refunded: "Refund",
    cancelled: "Dibatalkan",
    expired: "Kadaluarsa",
};

type RefundInfo = {
    refundPercent: number;
    deductionPercent: number;
    refundAmount: number;
    deductionAmount: number;
    daysBeforeTrip: number;
    policyLabel: string;
};

export default function TripsPage() {
    const { user } = useAuthStore();
    const searchParams = useSearchParams();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [tab, setTab] = useState<"all" | "upcoming" | "pending" | "refund" | "completed">("all");
    const [toast, setToast] = useState<{ msg: string; type: "success" | "warning" | "error" } | null>(null);
    const [ticketBooking, setTicketBooking] = useState<Booking | null>(null);

    // Cancel modal state
    const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
    const [refundPreview, setRefundPreview] = useState<RefundInfo | null>(null);
    const [loadingRefund, setLoadingRefund] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [payingBookingCode, setPayingBookingCode] = useState<string | null>(null);
    const router = useRouter();

    // Review modal state
    const [reviewTarget, setReviewTarget] = useState<Booking | null>(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewedBookings, setReviewedBookings] = useState<Set<string>>(new Set());
    const [hoverRating, setHoverRating] = useState(0);
    const [isEditingReview, setIsEditingReview] = useState(false);

    const showToast = useCallback((msg: string, type: "success" | "warning" | "error" = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 4000);
    }, []);

    // Re-open Midtrans Snap for pending booking
    const handlePayNow = async (b: Booking) => {
        setPayingBookingCode(b.booking_code);
        try {
            const res = await fetch(`/api/booking/snap-token?bookingCode=${b.booking_code}`);
            const data = await res.json();
            if (!data.snapToken) { showToast("Token pembayaran tidak ditemukan. Buat order baru.", "error"); setPayingBookingCode(null); return; }
            if (!window.snap) { showToast("Midtrans Snap belum siap. Muat ulang halaman.", "error"); setPayingBookingCode(null); return; }
            window.snap.pay(data.snapToken, {
                onSuccess: async () => {
                    try { await fetch("/api/booking/confirm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookingCode: b.booking_code }) }); } catch { /* ignore */ }
                    showToast("Pembayaran berhasil! Booking dikonfirmasi.", "success");
                    fetchBookings();
                },
                onPending: async (result) => {
                    try {
                        const vaNumbers = result.va_numbers as Array<{ bank: string; va_number: string }> | undefined;
                        const va = vaNumbers?.[0];
                        if (va && b.midtrans_order_id) {
                            await fetch("/api/booking/va", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: b.midtrans_order_id, vaNumber: va.va_number, vaBank: va.bank }) });
                        }
                    } catch { /* ignore */ }
                    showToast("Gunakan nomor VA di detail booking untuk melanjutkan pembayaran.", "warning");
                    fetchBookings();
                },
                onError: () => showToast("Pembayaran gagal. Coba lagi.", "error"),
                onClose: () => { router.refresh(); fetchBookings(); },
            });
        } catch { showToast("Terjadi kesalahan.", "error"); }
        finally { setPayingBookingCode(null); }
    };


    const fetchBookings = useCallback(async () => {
        if (!user?.id) { setLoading(false); return; }
        try {
            const res = await fetch(`/api/booking?userId=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setBookings(data.bookings || []);
            } else {
                setBookings([]);
            }
        } catch {
            setBookings([]);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    // Auto-check payment status for pending bookings (solves localhost webhook issue)
    useEffect(() => {
        if (bookings.length === 0) return;
        const pendingBookings = bookings.filter(
            b => b.payment_status === "pending" && b.midtrans_order_id
        );
        if (pendingBookings.length === 0) return;

        let statusChanged = false;
        const checkAll = async () => {
            for (const b of pendingBookings) {
                try {
                    const res = await fetch("/api/booking/check-status", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId: b.midtrans_order_id }),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (data.paymentStatus !== "pending") {
                            statusChanged = true;
                        }
                    }
                } catch { /* ignore */ }
            }
            if (statusChanged) {
                showToast("Status pembayaran telah diperbarui! 🎉", "success");
                fetchBookings(); // Re-fetch to show updated statuses
            }
        };
        checkAll();
    }, [bookings.length]); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle payment redirect params
    useEffect(() => {
        const payment = searchParams.get("payment");
        if (payment === "success") showToast("Pembayaran berhasil! Booking Anda telah dikonfirmasi.", "success");
        if (payment === "pending") showToast("Pembayaran sedang diproses. Kami akan mengkonfirmasi segera.", "warning");
    }, [searchParams, showToast]);

    // Check which bookings have already been reviewed
    useEffect(() => {
        if (!user?.id || bookings.length === 0) return;
        const completedBookings = bookings.filter(b => b.status === "completed");
        if (completedBookings.length === 0) return;

        const checkReviews = async () => {
            const reviewed = new Set<string>();
            for (const b of completedBookings) {
                try {
                    const bookingIdentifier = b.id || b.booking_code;
                    const res = await fetch(`/api/reviews?bookingId=${bookingIdentifier}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.reviews && data.reviews.length > 0) {
                            reviewed.add(b.booking_code);
                        }
                    }
                } catch { /* ignore */ }
            }
            if (reviewed.size > 0) {
                setReviewedBookings(prev => new Set([...prev, ...reviewed]));
            }
        };
        checkReviews();
    }, [user?.id, bookings]); // eslint-disable-line react-hooks/exhaustive-deps

    // Load refund preview when cancel modal opens
    useEffect(() => {
        if (!cancelTarget) { setRefundPreview(null); return; }
        setLoadingRefund(true);
        fetch(`/api/booking/cancel?tourDate=${cancelTarget.tour_date}&totalPrice=${cancelTarget.total_price}`)
            .then(r => r.json())
            .then(data => setRefundPreview(data))
            .catch(() => setRefundPreview(null))
            .finally(() => setLoadingRefund(false));
    }, [cancelTarget]);

    const handleCancel = async () => {
        if (!cancelTarget) return;
        setCancelling(true);
        try {
            const res = await fetch("/api/booking/cancel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingCode: cancelTarget.booking_code, reason: cancelReason || "Dibatalkan oleh pengguna" }),
            });
            const data = await res.json();
            if (res.ok) {
                showToast(`Booking berhasil dibatalkan. Refund: ${formatPrice(data.refund?.refundAmount || 0)}`, "success");
                setCancelTarget(null);
                setCancelReason("");
                fetchBookings();
            } else {
                showToast(data.error || "Gagal membatalkan booking", "error");
            }
        } catch {
            showToast("Terjadi kesalahan. Silakan coba lagi.", "error");
        } finally {
            setCancelling(false);
        }
    };

    const filtered = bookings.filter((b) => {
        if (tab === "upcoming") return b.status === "confirmed";
        if (tab === "pending") return b.status === "pending" || b.payment_status === "pending";
        if (tab === "refund") return b.payment_status === "refunded" || b.status === "cancelled";
        if (tab === "completed") return b.status === "completed";
        return true;
    });

    // Helper: get tour image from static data based on tour_id
    const getTourImage = (b: Booking) => {
        if (b.tour_image) return b.tour_image;
        const staticTour = staticTours.find(t => t.id === Number(b.tour_id));
        return staticTour?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70";
    };

    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 z-50 px-4 py-3 rounded-xl shadow-xl font-semibold text-sm flex items-center gap-2 transition-all ${toast.type === "success" ? "bg-emerald-500 text-white" :
                    toast.type === "warning" ? "bg-amber-500 text-white" :
                        "bg-red-500 text-white"
                    }`}>
                    {toast.type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    {toast.msg}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary">My Trips</h2>
                    <p className="text-slate-500 text-xs sm:text-sm">Riwayat dan trip mendatang Anda</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-0.5 sm:gap-1 border-b border-slate-100 pb-1 overflow-x-auto">
                {([
                    { key: "all", label: "Semua" },
                    { key: "upcoming", label: "Mendatang" },
                    { key: "pending", label: "Pending" },
                    { key: "refund", label: "Refund" },
                    { key: "completed", label: "Selesai" },
                ] as const).map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-all whitespace-nowrap ${tab === key ? "text-accent border-b-2 border-accent" : "text-slate-400 hover:text-primary"
                            }`}
                    >
                        {label}
                        {key === "pending" && bookings.filter(b => b.status === "pending").length > 0 && (
                            <span className="ml-1.5 text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-bold">
                                {bookings.filter(b => b.status === "pending").length}
                            </span>
                        )}
                        {key === "refund" && bookings.filter(b => b.payment_status === "refunded" || b.status === "cancelled").length > 0 && (
                            <span className="ml-1.5 text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full font-bold">
                                {bookings.filter(b => b.payment_status === "refunded" || b.status === "cancelled").length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-400">
                    <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mr-3" />
                    Memuat data trip...
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="font-semibold">Belum ada trip</p>
                    <p className="text-sm mt-1">Yuk, mulai perjalanan impian Anda!</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map((b) => (
                        <div key={b.booking_code} className="card overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                                <img
                                    src={getTourImage(b)}
                                    alt={b.tour_title}
                                    className="w-full sm:w-36 h-36 sm:h-auto object-cover shrink-0"
                                />
                                <div className="flex-1 p-4 sm:p-5">
                                    <div className="flex flex-wrap items-start gap-2 sm:gap-3 justify-between mb-3">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                                                <span className={`badge text-[10px] sm:text-xs ${statusStyle[b.status]}`}>{statusLabel[b.status]}</span>
                                                <span className={`badge text-[10px] sm:text-xs ${paymentBadge[b.payment_status] || "bg-slate-100 text-slate-500"}`}>
                                                    <CreditCard size={10} className="mr-0.5" />
                                                    {paymentLabel[b.payment_status] || b.payment_status}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-primary text-base sm:text-lg leading-tight">{b.tour_title || `Tour #${b.tour_id}`}</h3>
                                            {b.tour_location && (
                                                <div className="flex items-center gap-1 text-slate-400 text-xs sm:text-sm mt-0.5">
                                                    <MapPin size={12} /> {b.tour_location}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="font-bold text-accent text-base sm:text-lg">{formatPrice(b.total_price)}</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400 font-mono">{b.booking_code}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(b.tour_date).toLocaleDateString("id-ID")}</span>
                                        {(() => { const t = staticTours.find(st => st.title === b.tour_title); return t?.departureTime ? <span className="flex items-center gap-1"><Clock size={12} /> Keberangkatan {t.departureTime}</span> : null; })()}
                                        <span className="flex items-center gap-1"><Users size={12} /> {b.guests} Orang</span>
                                        {b.adults > 0 && <span className="text-[10px] sm:text-xs text-slate-400">{b.adults} Dewasa{b.children > 0 ? `, ${b.children} Anak` : ""}</span>}
                                    </div>

                                    {/* Refund info if cancelled */}
                                    {b.status === "cancelled" && b.refund_amount != null && (
                                        <div className="bg-purple-50 border border-purple-100 rounded-lg px-3 py-2 text-xs text-purple-700 mb-3">
                                            Refund: <strong>{formatPrice(b.refund_amount)}</strong>
                                            {b.refund_percentage != null && ` (${b.refund_percentage}%)`}
                                            {b.cancelled_at && ` · ${new Date(b.cancelled_at).toLocaleDateString("id-ID")}`}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        <button
                                            onClick={() => setExpanded(expanded === b.booking_code ? null : b.booking_code)}
                                            className="btn btn-outline btn-sm gap-1 text-xs"
                                        >
                                            Detail {expanded === b.booking_code ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                        </button>
                                        {b.status === "confirmed" && (
                                            <button
                                                onClick={() => setTicketBooking(b)}
                                                className="btn btn-primary btn-sm gap-1 text-xs"
                                            >
                                                <Download size={13} /> E-Ticket
                                            </button>
                                        )}
                                        {b.status === "pending" && b.payment_status === "pending" && (
                                            <button
                                                onClick={() => handlePayNow(b)}
                                                disabled={payingBookingCode === b.booking_code}
                                                className="btn btn-sm gap-1 text-xs bg-emerald-500 text-white hover:bg-emerald-600 border-0"
                                            >
                                                {payingBookingCode === b.booking_code
                                                    ? <><Loader2 size={13} className="animate-spin" /> Membuka...</>
                                                    : <><CreditCard size={13} /> Bayar Sekarang</>
                                                }
                                            </button>
                                        )}
                                        {(b.status === "confirmed" || b.status === "pending") && (
                                            <button
                                                onClick={() => { setCancelTarget(b); setCancelReason(""); }}
                                                className="btn btn-sm gap-1 text-xs bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
                                            >
                                                <XCircle size={13} /> Batalkan
                                            </button>
                                        )}
                                        {b.status === "completed" && (
                                            reviewedBookings.has(b.booking_code) ? (
                                                <button
                                                    onClick={async () => {
                                                        setReviewTarget(b);
                                                        setIsEditingReview(true);
                                                        // Fetch existing review data
                                                        try {
                                                            const bookingIdentifier = b.id || b.booking_code;
                                                            const res = await fetch(`/api/reviews?bookingId=${bookingIdentifier}`);
                                                            if (res.ok) {
                                                                const data = await res.json();
                                                                if (data.reviews?.[0]) {
                                                                    setReviewRating(data.reviews[0].rating);
                                                                    setReviewComment(data.reviews[0].comment || "");
                                                                }
                                                            }
                                                        } catch { /* ignore */ }
                                                    }}
                                                    className="btn btn-sm gap-1 text-xs bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                                                >
                                                    <Pencil size={13} /> Edit Ulasan
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => { setReviewTarget(b); setReviewRating(5); setReviewComment(""); setIsEditingReview(false); }}
                                                    className="btn btn-sm gap-1 text-xs bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
                                                >
                                                    <Star size={13} /> Beri Ulasan
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Detail */}
                            {expanded === b.booking_code && (
                                <div className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                                    <div>
                                        <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Kode Booking</div>
                                        <div className="font-mono font-bold text-primary">{b.booking_code}</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Tanggal Booking</div>
                                        <div className="font-semibold text-primary">{new Date(b.created_at).toLocaleDateString("id-ID")}</div>
                                        <div className="text-xs text-slate-400">{new Date(b.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} WIB</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Jumlah Peserta</div>
                                        <div className="font-semibold text-primary">{b.guests} orang ({b.adults} dewasa{b.children > 0 ? `, ${b.children} anak` : ""})</div>
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Status Pembayaran</div>
                                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${paymentBadge[b.payment_status] || ""}`}>
                                            {paymentLabel[b.payment_status] || b.payment_status}
                                        </div>
                                    </div>
                                    {b.midtrans_order_id && (
                                        <div className="sm:col-span-2">
                                            <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Order ID Midtrans</div>
                                            <div className="font-mono text-xs text-slate-600">{b.midtrans_order_id}</div>
                                        </div>
                                    )}
                                    {b.payment_status === "pending" && b.va_number && (
                                        <div className="sm:col-span-2">
                                            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CreditCard size={14} className="text-blue-500" />
                                                    <span className="text-xs font-bold text-blue-700 uppercase">Virtual Account {b.va_bank?.toUpperCase()}</span>
                                                </div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="font-mono text-sm sm:text-lg font-bold text-primary tracking-wider sm:tracking-widest break-all min-w-0">{b.va_number}</div>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(b.va_number!)}
                                                        className="text-xs px-3 py-1.5 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shrink-0"
                                                    >
                                                        Salin
                                                    </button>
                                                </div>
                                                <p className="text-xs text-blue-500 mt-2">Selesaikan pembayaran sebelum batas waktu berlaku.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ===== MODAL: Batalkan Booking ===== */}
            {cancelTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-red-50 p-6 text-center border-b border-red-100">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <XCircle size={28} className="text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Batalkan Booking?</h3>
                            <p className="text-sm text-slate-500 mt-1">{cancelTarget.tour_title}</p>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{cancelTarget.booking_code}</p>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Refund Preview */}
                            {loadingRefund ? (
                                <div className="flex justify-center py-4">
                                    <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full" />
                                </div>
                            ) : refundPreview ? (
                                <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
                                    <div className="font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                                        <CreditCard size={14} className="text-accent" />
                                        Kebijakan Refund
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Total Pembayaran</span>
                                        <span className="font-semibold text-slate-700">{formatPrice(cancelTarget.total_price)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Hari sebelum trip</span>
                                        <span className="font-semibold">{refundPreview.daysBeforeTrip} hari</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Kebijakan</span>
                                        <span className="font-semibold text-orange-600">{refundPreview.policyLabel}</span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-2 mt-2">
                                        <div className="flex justify-between text-red-500">
                                            <span>Biaya Pembatalan ({refundPreview.deductionPercent}%)</span>
                                            <span className="font-semibold">- {formatPrice(refundPreview.deductionAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-emerald-600 font-bold text-base mt-1">
                                            <span>Estimasi Refund ({refundPreview.refundPercent}%)</span>
                                            <span>{formatPrice(refundPreview.refundAmount)}</span>
                                        </div>
                                    </div>
                                    {refundPreview.refundPercent === 0 && (
                                        <div className="bg-red-50 text-red-600 text-xs rounded-lg px-3 py-2 mt-2">
                                            ⚠️ Pembatalan kurang dari 24 jam sebelum trip tidak mendapat refund.
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-sm text-slate-400 text-center py-2">Tidak dapat memuat info refund</div>
                            )}

                            {/* Reason */}
                            <div>
                                <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Alasan Pembatalan (opsional)</label>
                                <textarea
                                    value={cancelReason}
                                    onChange={e => setCancelReason(e.target.value)}
                                    placeholder="Ceritakan alasan pembatalan Anda..."
                                    className="form-input w-full text-sm resize-none"
                                    rows={2}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={() => { setCancelTarget(null); setCancelReason(""); }}
                                    disabled={cancelling}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
                                >
                                    Kembali
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={cancelling}
                                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {cancelling ? (
                                        <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Membatalkan...</>
                                    ) : "Ya, Batalkan Booking"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* E-Ticket Modal */}
            {ticketBooking && (
                <ETicketModal
                    booking={ticketBooking}
                    userName={user?.name}
                    userEmail={user?.email}
                    onClose={() => setTicketBooking(null)}
                />
            )}

            {/* Review Modal */}
            <AnimatePresence>
                {reviewTarget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 text-white">
                                <h3 className="font-bold text-lg">{isEditingReview ? "Edit Ulasan" : "Beri Ulasan"}</h3>
                                <p className="text-sm opacity-90 mt-0.5">{reviewTarget.tour_title}</p>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Star Rating */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Rating</label>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <button
                                                key={s}
                                                type="button"
                                                onMouseEnter={() => setHoverRating(s)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setReviewRating(s)}
                                                className="p-0.5 transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    size={28}
                                                    className={s <= (hoverRating || reviewRating)
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "text-slate-200"}
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-2 text-sm font-semibold text-slate-500">
                                            {reviewRating === 5 ? "Luar biasa!" : reviewRating === 4 ? "Bagus" : reviewRating === 3 ? "Cukup" : reviewRating === 2 ? "Kurang" : "Buruk"}
                                        </span>
                                    </div>
                                </div>

                                {/* Comment */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Komentar</label>
                                    <textarea
                                        value={reviewComment}
                                        onChange={e => setReviewComment(e.target.value)}
                                        rows={3}
                                        className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none resize-none"
                                        placeholder="Ceritakan pengalaman perjalanan Anda..."
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setReviewTarget(null)}
                                        className="flex-1 btn btn-outline btn-sm"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={async () => {
                                            setReviewSubmitting(true);
                                            try {
                                                const bookingIdentifier = reviewTarget.id || reviewTarget.booking_code;
                                                const payload = {
                                                    userId: user?.id,
                                                    userName: user?.name,
                                                    tourId: reviewTarget.tour_id,
                                                    tourTitle: reviewTarget.tour_title,
                                                    bookingId: bookingIdentifier,
                                                    rating: reviewRating,
                                                    comment: reviewComment,
                                                };

                                                let res = await fetch("/api/reviews", {
                                                    method: isEditingReview ? "PUT" : "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify(payload),
                                                });

                                                // If POST returns 409 (already exists), auto-retry with PUT
                                                if (res.status === 409 && !isEditingReview) {
                                                    res = await fetch("/api/reviews", {
                                                        method: "PUT",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify(payload),
                                                    });
                                                }

                                                const data = await res.json();
                                                if (res.ok) {
                                                    setReviewedBookings(prev => new Set([...prev, reviewTarget.booking_code]));
                                                    showToast(data.message || "Review berhasil disimpan! 🎉", "success");
                                                    setReviewTarget(null);
                                                    setIsEditingReview(false);
                                                } else {
                                                    showToast(data.error || "Gagal menyimpan review", "error");
                                                }
                                            } catch {
                                                showToast("Gagal menyimpan review", "error");
                                            } finally {
                                                setReviewSubmitting(false);
                                            }
                                        }}
                                        disabled={reviewSubmitting}
                                        className="flex-1 btn btn-sm gap-1.5 bg-amber-500 text-white hover:bg-amber-600 border-0"
                                    >
                                        {reviewSubmitting
                                            ? <><Loader2 size={13} className="animate-spin" /> Mengirim...</>
                                            : isEditingReview
                                                ? <><Pencil size={13} /> Perbarui Review</>
                                                : <><Send size={13} /> Kirim Review</>
                                        }
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
