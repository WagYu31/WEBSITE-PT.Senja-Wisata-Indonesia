"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/auth";
import {
    MessageCircle, Send, User, Bot, Headphones,
    Clock, CheckCircle, XCircle, AlertCircle,
    Search, ChevronRight, Trash2, RefreshCw
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type SessionStatus = "bot" | "waiting" | "live" | "closed";

interface ChatMessage {
    id: string;
    sender: "user" | "bot" | "admin";
    sender_name?: string | null;
    text: string;
    created_at: string;
}

interface ChatSession {
    id: string;
    visitor_name: string;
    visitor_email?: string;
    status: SessionStatus;
    unread_by_admin: number;
    created_at: string;
    updated_at: string;
    last_message_text?: string;
    last_message_sender?: string;
}

function renderText(text: string) {
    return text.split("\n").map((line, i, arr) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
            <span key={i}>
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
                {i < arr.length - 1 && <br />}
            </span>
        );
    });
}

function timeOf(iso: string) {
    return new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

const statusConfig: Record<SessionStatus, { label: string; cls: string; icon: React.ElementType }> = {
    bot: { label: "Bot Mode", cls: "bg-slate-100 text-slate-600", icon: Bot },
    waiting: { label: "Menunggu Admin", cls: "bg-amber-100 text-amber-700", icon: Clock },
    live: { label: "Live Chat", cls: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
    closed: { label: "Selesai", cls: "bg-slate-100 text-slate-400", icon: XCircle },
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminChatsPage() {
    const { user } = useAuthStore();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [activeSession, setActiveSessionState] = useState<ChatSession | null>(null);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "waiting" | "live" | "closed">("all");
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // ── Load sessions ──────────────────────────────────────────────────────────
    const loadSessions = useCallback(async () => {
        try {
            const res = await fetch("/api/chat/session");
            const data = await res.json();
            setSessions(data.sessions ?? []);
        } catch { /* silent */ }
    }, []);

    const loadMessages = useCallback(async (id: string) => {
        setLoadingMsg(true);
        try {
            const res = await fetch(`/api/chat/session/${id}`);
            const data = await res.json();
            setMessages(data.messages ?? []);
            setActiveSessionState(data.session ?? null);
            // Mark read
            await fetch(`/api/chat/session/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ unreadByAdmin: 0 }),
            });
            setSessions(prev => prev.map(s => s.id === id ? { ...s, unread_by_admin: 0 } : s));
        } catch { /* silent */ } finally { setLoadingMsg(false); }
    }, []);

    // Initial load
    useEffect(() => { loadSessions(); }, [loadSessions]);

    // Load messages when session selected
    useEffect(() => {
        if (activeId) loadMessages(activeId);
        else { setMessages([]); setActiveSessionState(null); }
    }, [activeId, loadMessages]);

    // Auto-scroll
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);

    // ── SSE — real-time update dari API ──────────────────────────────────────────
    useEffect(() => {
        const es = new EventSource("/api/chat/stream");
        es.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                if (data.type === "new_message") {
                    // Reload sesi list untuk update last message & badge
                    loadSessions();
                    // Kalau msg untuk sesi yang sedang aktif, reload
                    if (data.message?.sessionId === activeId) {
                        setMessages(prev => {
                            const exists = prev.find(m => m.id === data.message.id);
                            if (exists) return prev;
                            return [...prev, { ...data.message, created_at: data.message.createdAt }];
                        });
                    }
                }
                if (data.type === "session_updated" || data.type === "session_deleted") {
                    loadSessions();
                    if (data.type === "session_deleted" && data.sessionId === activeId) {
                        setActiveId(null);
                    }
                }
            } catch { /* silent */ }
        };
        return () => es.close();
    }, [activeId, loadSessions]);

    // ── Send admin reply ──────────────────────────────────────────────────────
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !activeId) return;
        const text = input.trim();
        setInput("");
        await fetch("/api/chat/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: activeId, sender: "admin", senderName: user?.name ?? "Admin", text }),
        });
        await loadMessages(activeId);
        await loadSessions();
    };

    // ── Close / Delete session ─────────────────────────────────────────────────
    const closeSession = async (id: string) => {
        await fetch(`/api/chat/session/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "closed" }),
        });
        await loadSessions();
        if (activeId === id) setActiveSessionState(prev => prev ? { ...prev, status: "closed" } : null);
    };

    const deleteSession = async (id: string) => {
        await fetch(`/api/chat/session/${id}`, { method: "DELETE" });
        setSessions(prev => prev.filter(s => s.id !== id));
        if (activeId === id) setActiveId(null);
        setConfirmDelete(null);
    };

    // ── Derived ───────────────────────────────────────────────────────────────
    const visibleSessions = sessions.filter(s => {
        if (filter !== "all" && s.status !== filter) return false;
        if (search && !s.visitor_name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });
    const totalUnread = sessions.reduce((a, s) => a + s.unread_by_admin, 0);
    const waitingCount = sessions.filter(s => s.status === "waiting").length;

    // ── Render ──────────────────────────────────────────────────────────────────
    return (
        <div className="flex h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">

            {/* Left: Session List */}
            <div className="w-72 flex-shrink-0 border-r border-slate-100 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="font-bold text-primary text-sm">Live Chat</h2>
                        <div className="flex items-center gap-1.5">
                            {waitingCount > 0 && (
                                <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <AlertCircle size={10} /> {waitingCount} menunggu
                                </span>
                            )}
                            {totalUnread > 0 && (
                                <span className="text-[10px] bg-accent text-white font-bold px-2 py-0.5 rounded-full">
                                    {totalUnread}
                                </span>
                            )}
                            <button onClick={loadSessions} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                                <RefreshCw size={12} />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Cari visitor..." value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue transition-colors" />
                    </div>

                    <div className="flex gap-1 mt-2">
                        {(["all", "waiting", "live", "closed"] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`flex-1 text-[10px] py-1 rounded-md font-semibold transition-all ${filter === f ? "bg-primary text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}>
                                {f === "all" ? "Semua" : f === "waiting" ? "Tunggu" : f === "live" ? "Live" : "Selesai"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Session List */}
                <div className="flex-1 overflow-y-auto">
                    {visibleSessions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-300 py-12">
                            <MessageCircle size={32} strokeWidth={1} />
                            <p className="text-xs text-center">
                                {filter === "waiting" ? "Tidak ada chat yang menunggu" : "Belum ada percakapan"}
                            </p>
                        </div>
                    ) : (
                        visibleSessions.map(sess => {
                            const sc = statusConfig[sess.status];
                            const isActive = sess.id === activeId;
                            return (
                                <div key={sess.id} className="relative group">
                                    <button onClick={() => setActiveId(sess.id)}
                                        className={`w-full text-left px-4 py-3 border-b border-slate-50 transition-colors hover:bg-slate-50
                                            ${isActive ? "bg-blue/5 border-l-2 border-l-blue" : ""}`}>
                                        <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-xs mt-0.5">
                                                {sess.visitor_name[0]}
                                            </div>
                                            <div className="flex-1 min-w-0 pr-5">
                                                <div className="flex items-center justify-between gap-1">
                                                    <p className="text-xs font-semibold text-primary truncate">{sess.visitor_name}</p>
                                                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${sc.cls}`}>
                                                        {sc.label}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                                    {sess.last_message_text?.replace(/\*\*/g, "").split("\n")[0] ?? "..."}
                                                </p>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-[10px] text-slate-300">{timeOf(sess.updated_at)}</span>
                                                    {sess.unread_by_admin > 0 && (
                                                        <span className="w-4 h-4 bg-accent rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                                                            {sess.unread_by_admin}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                    <button onClick={e => { e.stopPropagation(); setConfirmDelete(sess.id); }}
                                        className="absolute top-3 right-3 w-6 h-6 rounded-md bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                        title="Hapus sesi">
                                        <Trash2 size={11} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Right: Chat Panel */}
            {activeSession ? (
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Chat Header */}
                    <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {activeSession.visitor_name[0]}
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-primary">{activeSession.visitor_name}</p>
                                <div className="flex items-center gap-2">
                                    {(() => {
                                        const sc = statusConfig[activeSession.status]; return (
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sc.cls} flex items-center gap-1`}>
                                                <sc.icon size={10} /> {sc.label}
                                            </span>
                                        );
                                    })()}
                                    <span className="text-[10px] text-slate-400">{messages.length} pesan</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {activeSession.status !== "closed" && (
                                <button onClick={() => closeSession(activeSession.id)}
                                    className="text-xs text-slate-400 hover:text-amber-600 transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-amber-50 border border-slate-100">
                                    <XCircle size={13} /> Tutup Sesi
                                </button>
                            )}
                            <button onClick={() => setConfirmDelete(activeSession.id)}
                                className="text-xs text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 border border-slate-100">
                                <Trash2 size={13} /> Hapus
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto bg-slate-50 px-5 py-4 space-y-4">
                        {loadingMsg && (
                            <div className="flex justify-center py-8">
                                <RefreshCw size={18} className="animate-spin text-slate-300" />
                            </div>
                        )}
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
                                {msg.sender !== "user" && (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                                        ${msg.sender === "bot" ? "bg-primary text-white" : "bg-emerald-600 text-white"}`}>
                                        {msg.sender === "bot" ? <Bot size={14} /> : <Headphones size={14} />}
                                    </div>
                                )}
                                <div className={`max-w-[65%] flex flex-col gap-0.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                                    <span className="text-[10px] text-slate-400 px-1">
                                        {msg.sender === "bot" ? "Senja Assistant" : msg.sender === "admin" ? (msg.sender_name ?? "Admin") : "User"}
                                        {" · "}{timeOf(msg.created_at)}
                                    </span>
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                                        ${msg.sender === "user" ? "text-white rounded-tr-sm"
                                            : msg.sender === "admin" ? "bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-tl-sm"
                                                : "bg-white shadow-sm text-slate-700 rounded-tl-sm border border-slate-100"}`}
                                        style={msg.sender === "user" ? { background: "linear-gradient(135deg, #FC4C4D, #e03030)" } : {}}>
                                        {renderText(msg.text)}
                                    </div>
                                </div>
                                {msg.sender === "user" && (
                                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <User size={14} className="text-rose-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input area */}
                    {activeSession.status !== "closed" ? (
                        <div className="bg-white border-t border-slate-100 p-4">
                            {activeSession.status === "bot" && (
                                <div className="mb-3 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                                    <AlertCircle size={13} className="text-amber-600 flex-shrink-0" />
                                    <p className="text-xs text-amber-700">User masih <strong>mode bot</strong>. Balas langsung — chat otomatis jadi <strong>Live</strong>.</p>
                                </div>
                            )}
                            {activeSession.status === "waiting" && (
                                <div className="mb-3 flex items-center gap-2 bg-blue/5 border border-blue/20 rounded-xl px-3 py-2">
                                    <Clock size={13} className="text-blue flex-shrink-0" />
                                    <p className="text-xs text-blue">User <strong>menunggu admin</strong>. Balas untuk mulai sesi live.</p>
                                </div>
                            )}
                            <form onSubmit={handleSend} className="flex gap-2">
                                <input type="text" value={input} onChange={e => setInput(e.target.value)}
                                    placeholder={`Balas sebagai ${user?.name ?? "Admin"}...`}
                                    className="flex-1 bg-slate-50 rounded-full px-4 py-2.5 text-sm outline-none border border-slate-200 focus:border-blue transition-colors" />
                                <button type="submit" disabled={!input.trim()}
                                    className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
                                    style={{ background: "linear-gradient(135deg, #05073C, #1A3C6E)" }}>
                                    <Send size={15} className="text-white" />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex items-center justify-center gap-2 text-slate-400">
                            <CheckCircle size={14} />
                            <span className="text-xs">Sesi chat telah ditutup</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-300 bg-slate-50">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                        <MessageCircle size={36} strokeWidth={1} className="text-slate-300" />
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-slate-400">Pilih Percakapan</p>
                        <p className="text-sm text-slate-300 mt-1">Klik sesi di sebelah kiri untuk membuka chat</p>
                    </div>
                    {waitingCount > 0 && (
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
                            <AlertCircle size={15} className="text-amber-600" />
                            <span className="text-sm font-semibold text-amber-700">{waitingCount} user menunggu respons Anda!</span>
                            <ChevronRight size={14} className="text-amber-500" />
                        </div>
                    )}
                </div>
            )}

            {/* Confirm Delete Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 mx-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={22} className="text-red-500" />
                        </div>
                        <h3 className="font-bold text-primary text-center mb-1">Hapus Sesi Chat?</h3>
                        <p className="text-sm text-slate-400 text-center mb-5">
                            Semua riwayat pesan akan dihapus permanen dari database.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDelete(null)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                                Batal
                            </button>
                            <button onClick={() => deleteSession(confirmDelete)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">
                                Hapus Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
