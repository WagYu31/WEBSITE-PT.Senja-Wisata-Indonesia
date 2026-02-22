"use client";

import { use, useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, MapPin, Calendar, Users, Loader2, AlertTriangle, CreditCard } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type Booking = {
    booking_code: string;
    tour_title: string;
    tour_location: string;
    tour_date: string;
    guests: number;
    adults: number;
    children: number;
    total_price: number;
    status: string;
    payment_status: string;
    created_at: string;
};

export default function TicketVerifyPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = use(params);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`/api/ticket/${code}`)
            .then(r => r.json())
            .then(data => {
                if (data.booking) setBooking(data.booking);
                else setNotFound(true);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [code]);

    const isValid = booking?.status === "confirmed" && booking?.payment_status === "paid";

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #05073C 0%, #0a1564 60%, #1a2d8a 100%)" }}>
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                        <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-xs">SW</span>
                        </div>
                        <span className="text-white font-bold text-sm">Senja Wisata</span>
                    </div>
                    <p className="text-white/60 text-xs mt-2">Verifikasi E-Ticket</p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16 px-6">
                            <Loader2 size={36} className="animate-spin text-blue-500 mb-3" />
                            <p className="text-slate-500 text-sm">Memverifikasi tiket...</p>
                        </div>
                    ) : notFound || !booking ? (
                        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                <XCircle size={32} className="text-red-500" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 mb-1">Tiket Tidak Ditemukan</h2>
                            <p className="text-sm text-slate-500">Kode booking <strong>{code}</strong> tidak valid atau tidak terdaftar.</p>
                        </div>
                    ) : (
                        <>
                            {/* Status banner */}
                            <div className={`p-5 text-center ${isValid ? "bg-emerald-500" : "bg-amber-500"}`}>
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    {isValid ? (
                                        <CheckCircle size={28} className="text-white" />
                                    ) : (
                                        <AlertTriangle size={28} className="text-white" />
                                    )}
                                </div>
                                <div className="text-white font-bold text-lg">
                                    {isValid ? "✓ Tiket Valid" : "⚠ Tiket Tidak Aktif"}
                                </div>
                                <div className="text-white/80 text-xs mt-0.5">
                                    {isValid ? "Peserta dapat melanjutkan" : `Status: ${booking.status} · Pembayaran: ${booking.payment_status}`}
                                </div>
                            </div>

                            {/* Booking details */}
                            <div className="p-5 space-y-3">
                                <div className="text-center pb-3 border-b border-slate-100">
                                    <div className="text-xs text-slate-400 mb-0.5">Kode Booking</div>
                                    <div className="font-mono font-bold text-xl tracking-wider text-slate-800">{booking.booking_code}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400 mb-0.5">Tour</div>
                                    <div className="font-bold text-slate-800">{booking.tour_title}</div>
                                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                                        <MapPin size={10} /> {booking.tour_location}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
                                            <Calendar size={10} /> Tanggal Berangkat
                                        </div>
                                        <div className="font-bold text-slate-700 text-sm">
                                            {new Date(booking.tour_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
                                            <Users size={10} /> Peserta
                                        </div>
                                        <div className="font-bold text-slate-700 text-sm">
                                            {booking.guests} Orang
                                            <span className="text-xs text-slate-400 font-normal block">
                                                {booking.adults}D{booking.children > 0 ? ` + ${booking.children}A` : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <div>
                                        <div className="flex items-center gap-1 text-slate-400 text-xs mb-0.5">
                                            <CreditCard size={10} /> Total Pembayaran
                                        </div>
                                        <div className="font-bold text-accent text-lg">{formatPrice(booking.total_price)}</div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${booking.payment_status === "paid" ? "bg-emerald-100 text-emerald-700" :
                                        "bg-amber-100 text-amber-700"
                                        }`}>
                                        {booking.payment_status === "paid" ? "✓ Lunas" : booking.payment_status}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 text-slate-400 text-xs pt-1">
                                    <Clock size={10} />
                                    Dipesan: {new Date(booking.created_at).toLocaleDateString("id-ID")}
                                </div>
                            </div>

                            <div className="px-5 pb-5">
                                <div className="bg-slate-800 rounded-xl p-3 text-center">
                                    <div className="text-slate-400 text-xs mb-1">Diverifikasi oleh</div>
                                    <div className="text-white font-semibold text-sm">PT. Senja Wisata Indonesia</div>
                                    <div className="text-slate-400 text-xs">info@senjawisata.com</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <p className="text-center text-white/40 text-xs mt-4" suppressHydrationWarning>
                    {new Date().toLocaleString("id-ID")}
                </p>
            </div>
        </div>
    );
}
