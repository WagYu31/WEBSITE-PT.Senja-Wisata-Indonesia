"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, Package, UserPlus, CheckCircle, XCircle, Clock, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    time: string;
    link?: string;
}

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "Baru saja";
    if (m < 60) return `${m} menit lalu`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} jam lalu`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d} hari lalu`;
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function getIcon(type: string) {
    switch (type) {
        case "booking_confirmed": return <CheckCircle size={16} className="text-emerald-500" />;
        case "booking_completed": return <CheckCircle size={16} className="text-blue-500" />;
        case "booking_cancelled": return <XCircle size={16} className="text-red-500" />;
        case "booking_pending": return <CreditCard size={16} className="text-amber-500" />;
        case "new_booking": return <Package size={16} className="text-cyan-500" />;
        case "new_user": return <UserPlus size={16} className="text-violet-500" />;
        default: return <Bell size={16} className="text-slate-400" />;
    }
}

function getIconBg(type: string) {
    switch (type) {
        case "booking_confirmed": return "bg-emerald-50";
        case "booking_completed": return "bg-blue-50";
        case "booking_cancelled": return "bg-red-50";
        case "booking_pending": return "bg-amber-50";
        case "new_booking": return "bg-cyan-50";
        case "new_user": return "bg-violet-50";
        default: return "bg-slate-50";
    }
}

export default function NotificationDropdown({
    role,
    userId,
    textColor,
    dark = false,
}: {
    role: "user" | "admin" | "owner";
    userId?: string | number;
    textColor?: string;
    dark?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [lastRead, setLastRead] = useState<string>("");
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const storageKey = role === "user" ? `sw-notif-read-${userId}` : "sw-notif-read-admin";

    const fetchNotifications = useCallback(async () => {
        try {
            const params = new URLSearchParams({ role });
            if (userId) params.set("userId", String(userId));
            const res = await fetch(`/api/notifications?${params}`);
            const data = await res.json();
            if (data.success) setNotifications(data.notifications || []);
        } catch { /* silent */ }
    }, [role, userId]);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) setLastRead(saved);
        fetchNotifications();
        const t = setInterval(fetchNotifications, 30_000);
        return () => clearInterval(t);
    }, [fetchNotifications, storageKey]);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const unreadCount = lastRead
        ? notifications.filter((n) => new Date(n.time) > new Date(lastRead)).length
        : notifications.length;

    const markAllRead = () => {
        const now = new Date().toISOString();
        localStorage.setItem(storageKey, now);
        setLastRead(now);
    };

    const handleClick = (n: Notification) => {
        setOpen(false);
        if (n.link) router.push(n.link);
    };

    const bgDropdown = dark ? "#1e293b" : "#ffffff";
    const bgHover = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
    const textPrimary = dark ? "#f1f5f9" : "#1e293b";
    const textSecondary = dark ? "#94a3b8" : "#64748b";
    const borderClr = dark ? "#334155" : "#e2e8f0";

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => { setOpen(!open); if (!open) fetchNotifications(); }}
                className="p-2 rounded-xl hover:bg-slate-100/50 relative transition-all"
                style={{ color: textColor || textSecondary }}
                title="Notifikasi"
            >
                <Bell size={18} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border z-[100] overflow-hidden"
                    style={{ backgroundColor: bgDropdown, borderColor: borderClr }}
                >
                    {/* Header */}
                    <div
                        className="px-4 py-3 flex items-center justify-between"
                        style={{ borderBottom: `1px solid ${borderClr}` }}
                    >
                        <h3 className="font-bold text-sm" style={{ color: textPrimary }}>
                            Notifikasi
                        </h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-xs font-medium px-2 py-1 rounded-lg transition-colors"
                                style={{ color: "#2BBEE8" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bgHover)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                                Tandai Dibaca
                            </button>
                        )}
                    </div>

                    {/* Notification list */}
                    <div className="max-h-[360px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-10 text-center">
                                <Bell size={28} className="mx-auto mb-2 opacity-20" style={{ color: textSecondary }} />
                                <p className="text-sm" style={{ color: textSecondary }}>Belum ada notifikasi</p>
                            </div>
                        ) : (
                            notifications.map((n) => {
                                const isUnread = lastRead ? new Date(n.time) > new Date(lastRead) : true;
                                return (
                                    <button
                                        key={n.id}
                                        onClick={() => handleClick(n)}
                                        className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors"
                                        style={{
                                            backgroundColor: isUnread ? (dark ? "rgba(43,190,232,0.05)" : "rgba(43,190,232,0.04)") : "transparent",
                                            borderBottom: `1px solid ${borderClr}`,
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = bgHover)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isUnread ? (dark ? "rgba(43,190,232,0.05)" : "rgba(43,190,232,0.04)") : "transparent")}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${getIconBg(n.type)}`}>
                                            {getIcon(n.type)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs font-semibold truncate" style={{ color: textPrimary }}>
                                                    {n.title}
                                                </p>
                                                {isUnread && <span className="w-1.5 h-1.5 bg-[#2BBEE8] rounded-full shrink-0" />}
                                            </div>
                                            <p className="text-[11px] mt-0.5 line-clamp-2" style={{ color: textSecondary }}>
                                                {n.message}
                                            </p>
                                            <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color: textSecondary }}>
                                                <Clock size={10} /> {timeAgo(n.time)}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
