"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    MessageCircle, X, Send, Bot, Headphones, Phone, Mail,
    PhoneCall, ChevronDown, Smile, Volume2, VolumeX,
    Clock, CheckCircle, RefreshCw
} from "lucide-react";
import { usePathname } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────
type Sender = "user" | "bot" | "admin";
type SessionStatus = "bot" | "waiting" | "live" | "closed";

interface ChatMessage {
    id: string;
    sender: Sender;
    senderName?: string | null;
    text: string;
    createdAt: string;
}

// ── Bot knowledge base ────────────────────────────────────────────────────────
const BOT_RESPONSES: Array<{ kw: string[]; reply: string }> = [
    { kw: ["halo", "hi", "hey", "hai", "selamat", "pagi", "siang", "sore", "malam"], reply: "Halo! 😊 Selamat datang di **Senja Wisata**!\n\nAda yang bisa saya bantu hari ini?" },
    { kw: ["paket", "wisata", "tour", "lihat", "info", "destinasi", "pilihan"], reply: "Kami punya ratusan paket wisata! 🌏\n\n✈️ **Favorit Kami:**\n• **Paket Bali 4D3N** — Rp 2.5jt/pax\n• **Raja Ampat 5D4N** — Rp 6.8jt/pax\n• **Komodo Island 3D2N** — Rp 3.2jt/pax\n• **Bromo Sunrise 2D1N** — Rp 1.2jt/pax\n\nMau lihat selengkapnya?" },
    { kw: ["harga", "biaya", "berapa", "tarif", "cost"], reply: "Harga paket kami mulai dari **Rp 900rb** untuk trip domestik! 💰\n\n📊 **Kisaran Harga:**\n• Domestik: Rp 900rb – Rp 8jt/pax\n• Internasional: Rp 8jt – Rp 25jt/pax\n\nHarga sudah termasuk tiket, hotel & pemandu. Mau info lebih detail?" },
    { kw: ["booking", "pesan", "daftar", "reservasi", "beli"], reply: "Cara booking gampang banget! 🎉\n\n1️⃣ Pilih paket di menu **Tour**\n2️⃣ Klik **Pesan Sekarang**\n3️⃣ Isi data diri & pilih tanggal\n4️⃣ Bayar via transfer / e-wallet\n5️⃣ Dapat e-ticket via email\n\nBisa juga langsung WhatsApp kami ya!" },
    { kw: ["promo", "diskon", "voucher", "kode", "murah", "hemat"], reply: "Ada promo menarik nih! 🎁\n\n🏷️ **SENJA10** — diskon 10% semua paket\n🏷️ **WELCOME50** — Rp 50rb untuk member baru\n\nMasukkan kode saat checkout, berlaku sampai akhir tahun!" },
    { kw: ["include", "fasilitas", "termasuk", "apa saja", "free"], reply: "Yang sudah include dalam paket: ✅\n\n🚌 Transportasi PP\n🏨 Hotel bintang 3-4\n🍽️ Makan sesuai itinerary\n🎫 Tiket masuk objek wisata\n👨‍💼 Tour guide berpengalaman\n\nBeberapa paket premium sudah termasuk tiket pesawat!" },
    { kw: ["cancel", "refund", "batal", "kembali", "reschedule"], reply: "Kebijakan pembatalan kami: 📋\n\n• **14+ hari sebelum** → refund 80%\n• **7-13 hari sebelum** → refund 50%\n• **< 7 hari** → no refund\n\nReschedule gratis 1x hingga 30 hari sebelum keberangkatan. Mau tanya lebih lanjut?" },
    { kw: ["kontak", "hubungi", "telepon", "wa", "whatsapp", "email"], reply: "Kami bisa dihubungi via: 📞\n\n📱 **WhatsApp:** +62 812-3456-7890\n📧 **Email:** info@senjawisata.com\n🕐 **Jam layanan:** Senin–Sabtu 08.00–20.00 WIB\n\nAtau klik tombol WhatsApp di bawah ya!" },
    { kw: ["aman", "keamanan", "covid", "protokol", "asuransi"], reply: "Keselamatan tamu adalah prioritas kami! 🛡️\n\n✅ Asuransi perjalanan included\n✅ Guide bersertifikat & berpengalaman\n✅ Kendaraan rutin diservis\n✅ Protokol kesehatan diterapkan\n\nSudah dipercaya 5000+ pelanggan sejak 2015!" },
];

function getBotReply(text: string): string {
    const lower = text.toLowerCase();
    for (const { kw, reply } of BOT_RESPONSES) {
        if (kw.some((k) => lower.includes(k))) return reply;
    }
    return "Maaf, saya belum memahami pertanyaan Anda. 🤔\n\nCoba tanyakan tentang:\n• **Paket wisata** yang tersedia\n• **Harga** & promo\n• **Cara booking**\n• **Fasilitas** yang included\n\nAtau langsung hubungi tim kami!";
}

const QUICK_REPLIES = ["Info paket wisata", "Berapa harganya?", "Cara booking", "Ada promo?", "Fasilitas apa saja?"];

// ── Render bold markdown ──────────────────────────────────────────────────────
function renderText(text: string) {
    return text.split("\n").map((line, i, arr) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
            <span key={i}>
                {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
                {i < arr.length - 1 && <br />}
            </span>
        );
    });
}

function timeOf(iso: string) {
    return new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function LiveChatWidget() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin") || pathname?.startsWith("/owner");
    if (isAdmin) return null;

    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState<"chat" | "contact" | "faq">("chat");
    const [input, setInput] = useState("");
    const [mute, setMute] = useState(false);
    const [typing, setTyping] = useState(false);
    const [unread, setUnread] = useState(0);
    const [userMessageCount, setUserMessageCount] = useState(0);

    // Session state
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [status, setStatus] = useState<SessionStatus>("bot");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [polling, setPolling] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const lastMsgCountRef = useRef(0);

    // Init session saat widget pertama dibuka
    const initSession = useCallback(async () => {
        if (sessionId) return;
        const savedId = sessionStorage.getItem("senja_chat_session");
        if (savedId) {
            setSessionId(savedId);
            await loadSession(savedId);
            return;
        }
        try {
            setLoading(true);
            const res = await fetch("/api/chat/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ visitorName: "Tamu" }),
            });
            const data = await res.json();
            if (data.sessionId) {
                sessionStorage.setItem("senja_chat_session", data.sessionId);
                setSessionId(data.sessionId);
                await loadSession(data.sessionId);
            }
        } catch {
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
    }, [sessionId]);

    const loadSession = async (id: string) => {
        try {
            const res = await fetch(`/api/chat/session/${id}`);
            if (!res.ok) { sessionStorage.removeItem("senja_chat_session"); return; }
            const data = await res.json();
            setMessages(data.messages ?? []);
            setStatus(data.session?.status ?? "bot");
            lastMsgCountRef.current = (data.messages ?? []).length;
        } catch { /* silent */ }
    };

    // Polling tiap 3 detik untuk update dari admin
    const startPolling = useCallback((id: string) => {
        if (pollRef.current) return;
        setPolling(true);
        pollRef.current = setInterval(async () => {
            try {
                const res = await fetch(`/api/chat/session/${id}`);
                if (!res.ok) return;
                const data = await res.json();
                const newMsgs: ChatMessage[] = data.messages ?? [];
                const newStatus: SessionStatus = data.session?.status ?? "bot";
                setStatus(newStatus);
                if (newMsgs.length > lastMsgCountRef.current) {
                    setMessages(newMsgs);
                    lastMsgCountRef.current = newMsgs.length;
                    // Hitung pesan admin yang belum dibaca (saat widget tutup)
                    if (!open) {
                        const adminNew = newMsgs.slice(lastMsgCountRef.current).filter(m => m.sender === "admin").length;
                        setUnread(prev => prev + adminNew);
                    }
                }
            } catch { /* silent */ }
        }, 3000);
    }, [open]);

    const stopPolling = () => {
        if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
        setPolling(false);
    };

    useEffect(() => { if (open) { setUnread(0); initSession(); } }, [open]);

    useEffect(() => {
        if (sessionId) startPolling(sessionId);
        return () => stopPolling();
    }, [sessionId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, typing]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || !sessionId) return;
        setInput("");
        const newCount = userMessageCount + 1;
        setUserMessageCount(newCount);

        // Optimistic UI
        const tmpMsg: ChatMessage = {
            id: "tmp_" + Date.now(),
            sender: "user",
            text: text.trim(),
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, tmpMsg]);

        // Kirim ke API
        await fetch("/api/chat/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, sender: "user", text }),
        });

        // Bot reply (hanya kalau masih mode bot)
        if (status === "bot") {
            setTyping(true);
            await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
            setTyping(false);

            const reply = getBotReply(text);
            await fetch("/api/chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId, sender: "bot", senderName: "Senja Assistant", text: reply }),
            });
        }

        // Reload pesan dari server
        await loadSession(sessionId);
        lastMsgCountRef.current = messages.length + (status === "bot" ? 2 : 1);
    };

    const requestAdmin = async () => {
        if (!sessionId) return;
        const adminReqText = "✋ Baik! Saya akan menghubungkan Anda dengan **Tim Support Senja**. Mohon tunggu sebentar, admin kami akan segera membalas pesan Anda.\n\n_Estimasi waktu tunggu: < 5 menit_ ⏳";
        await fetch("/api/chat/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, sender: "bot", senderName: "Senja Assistant", text: adminReqText }),
        });
        await fetch(`/api/chat/session/${sessionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "waiting" }),
        });
        setStatus("waiting");
        await loadSession(sessionId);
    };

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };

    const showHandoff = status === "bot" && userMessageCount >= 2;
    const isLocked = status === "waiting" || status === "closed";

    return (
        <>
            {/* FAB Button */}
            <button
                onClick={() => setOpen(o => !o)}
                aria-label="Live Chat"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg, #05073C, #1A3C6E)" }}
            >
                <span className="absolute inset-0 rounded-full animate-ping opacity-25"
                    style={{ background: "linear-gradient(135deg, #05073C, #1A3C6E)" }} />
                {open ? <X size={22} /> : <MessageCircle size={22} />}
                {unread > 0 && !open && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                        {unread}
                    </span>
                )}
            </button>

            {/* Chat Panel */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[600px] rounded-2xl flex flex-col bg-white shadow-2xl shadow-slate-900/20 overflow-hidden animate-chat-slide-up border border-slate-100"
                    style={{ maxHeight: "min(600px, calc(100vh - 100px))" }}>

                    {/* Header */}
                    <div className="px-4 pt-4 pb-3 text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #05073C, #1A3C6E)" }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                                    {status === "live" ? <Headphones size={16} /> : <Bot size={16} />}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">
                                        {status === "live" ? "Admin Senja" : "Senja Assistant"}
                                    </p>
                                    <span className="text-[10px] text-white/70 flex items-center gap-1">
                                        {status === "waiting"
                                            ? <><Clock size={9} /> Menunggu admin...</>
                                            : status === "live"
                                                ? <><CheckCircle size={9} /> Admin Online</>
                                                : <>● Online</>}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setMute(m => !m)} className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                                    {mute ? <VolumeX size={13} /> : <Volume2 size={13} />}
                                </button>
                                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                                    <ChevronDown size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-0.5 bg-white/10 rounded-lg p-0.5">
                            {(["chat", "contact", "faq"] as const).map(t => (
                                <button key={t} onClick={() => setTab(t)}
                                    className={`flex-1 text-[11px] py-1 rounded-md font-semibold capitalize transition-all
                                        ${tab === t ? "bg-white text-primary" : "text-white/70 hover:text-white"}`}>
                                    {t === "chat" ? "Chat" : t === "contact" ? "Kontak" : "FAQ"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab: Chat */}
                    {tab === "chat" && (
                        <>
                            <div className="flex-1 overflow-y-auto bg-slate-50 px-3.5 py-3 space-y-3">
                                {loading && (
                                    <div className="flex justify-center py-8">
                                        <RefreshCw size={20} className="animate-spin text-slate-300" />
                                    </div>
                                )}
                                {error && <p className="text-xs text-red-500 text-center py-4">{error}</p>}

                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}>
                                        {msg.sender !== "user" && (
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                                                ${msg.sender === "bot" ? "bg-primary" : "bg-emerald-600"}`}>
                                                {msg.sender === "bot" ? <Bot size={12} className="text-white" /> : <Headphones size={12} className="text-white" />}
                                            </div>
                                        )}
                                        <div className={`max-w-[75%] flex flex-col gap-0.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                                            <span className="text-[9px] text-slate-400 px-1">
                                                {msg.sender === "bot" ? "Senja Assistant" : msg.sender === "admin" ? (msg.senderName ?? "Admin") : "Kamu"}
                                                {" · "}{timeOf(msg.createdAt)}
                                            </span>
                                            <div className={`px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed
                                                ${msg.sender === "user"
                                                    ? "text-white rounded-tr-sm"
                                                    : msg.sender === "admin"
                                                        ? "bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-tl-sm"
                                                        : "bg-white shadow-sm text-slate-700 rounded-tl-sm border border-slate-100"}`}
                                                style={msg.sender === "user" ? { background: "linear-gradient(135deg, #FC4C4D, #e03030)" } : {}}>
                                                {renderText(msg.text)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {typing && (
                                    <div className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                                            <Bot size={12} className="text-white" />
                                        </div>
                                        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-2.5 flex gap-1 items-center">
                                            {[0, 1, 2].map(i => (
                                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                                                    style={{ animationDelay: `${i * 0.15}s` }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Quick replies */}
                            {messages.length <= 1 && status === "bot" && (
                                <div className="px-3 py-2 flex gap-1.5 flex-wrap border-t border-slate-50">
                                    {QUICK_REPLIES.map(q => (
                                        <button key={q} onClick={() => sendMessage(q)}
                                            className="text-[10px] px-2.5 py-1 rounded-full border border-primary/20 text-primary hover:bg-primary/5 transition-colors font-medium whitespace-nowrap">
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Handoff button */}
                            {showHandoff && (
                                <div className="px-3 pt-1 pb-2 border-t border-slate-50">
                                    <button onClick={requestAdmin}
                                        className="w-full text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl py-2 hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5">
                                        <Phone size={12} /> Hubungi Admin Langsung
                                    </button>
                                </div>
                            )}

                            {/* Waiting */}
                            {status === "waiting" && (
                                <div className="border-t border-slate-100 px-4 py-3 bg-amber-50 text-center">
                                    <div className="flex items-center justify-center gap-2 text-amber-700">
                                        <Clock size={13} />
                                        <span className="text-xs font-medium">Menunggu admin merespons...</span>
                                    </div>
                                </div>
                            )}

                            {/* Live shortcuts */}
                            {status === "live" && (
                                <div className="border-t border-slate-100 px-3 py-2 flex gap-2">
                                    <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-1.5 rounded-full transition-colors">
                                        <PhoneCall size={11} /> WhatsApp
                                    </a>
                                    <a href="mailto:info@senjawisata.com"
                                        className="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 py-1.5 rounded-full transition-colors">
                                        <Mail size={11} /> Email
                                    </a>
                                </div>
                            )}

                            {/* Input */}
                            {!isLocked && (
                                <form onSubmit={handleSubmit}
                                    className="flex items-center gap-2 px-3 py-2.5 border-t border-slate-100 bg-white">
                                    <button type="button" className="text-slate-300 hover:text-slate-400 transition-colors">
                                        <Smile size={18} />
                                    </button>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder={status === "live" ? "Balas admin..." : "Tulis pesan..."}
                                        className="flex-1 bg-transparent text-[13px] outline-none text-slate-700 placeholder-slate-300"
                                    />
                                    <button type="submit" disabled={!input.trim()}
                                        className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
                                        style={{ background: "linear-gradient(135deg, #05073C, #1A3C6E)" }}>
                                        <Send size={13} className="text-white" />
                                    </button>
                                </form>
                            )}
                        </>
                    )}

                    {/* Tab: Kontak */}
                    {tab === "contact" && (
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {[
                                { icon: <PhoneCall size={16} />, label: "WhatsApp", val: "+62 812-3456-7890", href: "https://wa.me/6281234567890", color: "emerald" },
                                { icon: <Mail size={16} />, label: "Email", val: "info@senjawisata.com", href: "mailto:info@senjawisata.com", color: "blue" },
                                { icon: <Phone size={16} />, label: "Telepon", val: "+62 21-1234-5678", href: "tel:+62211234567​8", color: "violet" },
                            ].map(({ icon, label, val, href, color }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer"
                                    className={`flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:bg-${color}-50 hover:border-${color}-200 transition-all group`}>
                                    <div className={`w-10 h-10 rounded-full bg-${color}-50 flex items-center justify-center text-${color}-600`}>{icon}</div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500">{label}</p>
                                        <p className="text-sm font-bold text-primary">{val}</p>
                                    </div>
                                </a>
                            ))}
                            <p className="text-[11px] text-slate-400 text-center pt-2">08.00 – 20.00 WIB · Senin – Sabtu</p>
                        </div>
                    )}

                    {/* Tab: FAQ */}
                    {tab === "faq" && (
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {[
                                { q: "Berapa lama proses konfirmasi booking?", a: "Konfirmasi dikirim via email dalam 1×24 jam setelah pembayaran." },
                                { q: "Apakah bisa custom itinerary?", a: "Ya! Kami melayani paket custom untuk grup & keluarga. Hubungi tim kami." },
                                { q: "Metode pembayaran apa saja?", a: "Transfer bank, QRIS, GoPay, OVO, Dana, dan kartu kredit." },
                                { q: "Apakah ada guide berbahasa asing?", a: "Ya, tersedia guide Bahasa Inggris, Mandarin, dan Jepang untuk paket tertentu." },
                                { q: "Bagaimana kalau cuaca buruk?", a: "Kami akan reschedule atau full refund jika tour tidak dapat dilanjutkan." },
                            ].map(({ q, a }) => (
                                <details key={q} className="group border border-slate-100 rounded-xl overflow-hidden">
                                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-[13px] font-semibold text-primary list-none hover:bg-slate-50">
                                        {q} <span className="text-slate-300 group-open:rotate-180 transition-transform">▾</span>
                                    </summary>
                                    <p className="px-4 pb-3 text-[12px] text-slate-500 leading-relaxed">{a}</p>
                                </details>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
