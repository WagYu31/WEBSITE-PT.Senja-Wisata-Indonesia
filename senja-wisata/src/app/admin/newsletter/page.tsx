"use client";

import { useState, useEffect } from "react";
import {
    Send, Users, Mail, Trash2, RefreshCw,
    CheckCircle, AlertCircle, Clock, FileText
} from "lucide-react";

interface Subscriber {
    id: number;
    email: string;
    subscribed_at: string;
    is_active: number;
}

interface SendLog {
    id: number;
    subject: string;
    total_recipients: number;
    sent_count: number;
    failed_count: number;
    sent_at: string;
}

export default function NewsletterPage() {
    const [tab, setTab] = useState<"compose" | "subscribers" | "history">("compose");
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [logs, setLogs] = useState<SendLog[]>([]);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

    useEffect(() => {
        fetchSubscribers();
        fetchLogs();
    }, []);

    const fetchSubscribers = async () => {
        const res = await fetch("/api/newsletter");
        const data = await res.json();
        setSubscribers(data.subscribers || []);
    };

    const fetchLogs = async () => {
        const res = await fetch("/api/newsletter/send");
        const data = await res.json();
        setLogs(data.logs || []);
    };

    const handleSend = async () => {
        if (!subject.trim() || !content.trim()) {
            setResult({ type: "error", message: "Subject dan konten harus diisi!" });
            return;
        }

        const activeCount = subscribers.filter(s => s.is_active).length;
        if (activeCount === 0) {
            setResult({ type: "error", message: "Tidak ada subscriber aktif!" });
            return;
        }

        if (!confirm(`Kirim newsletter ke ${activeCount} subscriber?`)) return;

        setSending(true);
        setResult(null);

        try {
            const res = await fetch("/api/newsletter/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, content: content.replace(/\n/g, "<br/>") }),
            });
            const data = await res.json();

            if (res.ok) {
                setResult({ type: "success", message: data.message });
                setSubject("");
                setContent("");
                fetchLogs();
            } else {
                setResult({ type: "error", message: data.error || "Gagal mengirim" });
            }
        } catch {
            setResult({ type: "error", message: "Gagal mengirim newsletter" });
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async (email: string) => {
        if (!confirm(`Hapus subscriber ${email}?`)) return;
        await fetch("/api/newsletter", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        fetchSubscribers();
    };

    const activeSubscribers = subscribers.filter(s => s.is_active);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold" style={{ color: "#05073C" }}>Newsletter</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Kirim promo dan penawaran ke subscriber</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-semibold">
                        <Users size={14} />
                        {activeSubscribers.length} Subscriber Aktif
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                {([
                    { id: "compose", label: "Tulis Newsletter", icon: Send },
                    { id: "subscribers", label: "Subscriber", icon: Users },
                    { id: "history", label: "Riwayat Kirim", icon: Clock },
                ] as const).map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t.id ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        <t.icon size={15} />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Result Banner */}
            {result && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${result.type === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                    {result.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    {result.message}
                </div>
            )}

            {/* Compose Tab */}
            {tab === "compose" && (
                <div className="card p-6 space-y-5">
                    <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
                        <Send size={16} className="text-blue-500" />
                        Tulis Newsletter
                    </h3>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject Email</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="contoh: Promo Akhir Tahun — Diskon 50% Semua Paket!"
                            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">Konten Newsletter</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder={"Halo Traveler! 🎉\n\nKami punya penawaran spesial untuk Anda...\n\nKunjungi website kami untuk info lebih lanjut: https://fluentlya.com"}
                            rows={10}
                            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none font-mono"
                        />
                        <p className="text-xs text-slate-400 mt-1">Tulis konten dalam format teks biasa. Baris baru akan otomatis dikonversi.</p>
                    </div>

                    {/* Preview */}
                    {(subject || content) && (
                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                                <FileText size={12} /> Preview Email:
                            </p>
                            <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
                                <div className="p-4 text-center" style={{ backgroundColor: "#05073C" }}>
                                    <p className="text-white font-bold">✈️ Senja Wisata</p>
                                    <p className="text-white/60 text-xs">PT. Senja Wisata Indonesia</p>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-slate-800 mb-2" style={{ color: "#05073C" }}>{subject || "(Subject)"}</h3>
                                    <div className="text-sm text-slate-600 whitespace-pre-line">
                                        {content || "(Konten newsletter)"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-slate-500">
                            Akan dikirim ke <strong>{activeSubscribers.length}</strong> subscriber aktif
                        </p>
                        <button
                            onClick={handleSend}
                            disabled={sending || !subject || !content}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-50 transition-all"
                            style={{ backgroundColor: "#FC4C4D" }}
                        >
                            {sending ? (
                                <><RefreshCw size={15} className="animate-spin" /> Mengirim...</>
                            ) : (
                                <><Send size={15} /> Kirim Newsletter</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Subscribers Tab */}
            {tab === "subscribers" && (
                <div className="card overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Users size={16} className="text-blue-500" />
                            Daftar Subscriber ({subscribers.length})
                        </h3>
                        <button onClick={fetchSubscribers} className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
                            <RefreshCw size={13} /> Refresh
                        </button>
                    </div>
                    {subscribers.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                            <Mail size={32} className="mx-auto mb-2 opacity-50" />
                            <p>Belum ada subscriber</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {subscribers.map(sub => (
                                <div key={sub.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${sub.is_active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                                            <Mail size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">{sub.email}</p>
                                            <p className="text-xs text-slate-400">
                                                {new Date(sub.subscribed_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                                {!sub.is_active && <span className="ml-1 text-red-400">(Unsubscribed)</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(sub.email)}
                                        className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* History Tab */}
            {tab === "history" && (
                <div className="card overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Clock size={16} className="text-blue-500" />
                            Riwayat Pengiriman
                        </h3>
                    </div>
                    {logs.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                            <Clock size={32} className="mx-auto mb-2 opacity-50" />
                            <p>Belum ada newsletter yang dikirim</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {logs.map(log => (
                                <div key={log.id} className="px-4 py-3 hover:bg-slate-50">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-semibold text-sm text-slate-700">{log.subject}</p>
                                        <p className="text-xs text-slate-400">
                                            {new Date(log.sent_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 text-xs">
                                        <span className="text-emerald-600">✓ {log.sent_count} terkirim</span>
                                        {log.failed_count > 0 && <span className="text-red-500">✗ {log.failed_count} gagal</span>}
                                        <span className="text-slate-400">/ {log.total_recipients} total</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
