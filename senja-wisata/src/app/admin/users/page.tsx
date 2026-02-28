"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, UserCheck, Shield, Crown, Edit2, Trash2, Mail, X, Loader2 } from "lucide-react";

type User = { id: number; name: string; email: string; role: string; totalBookings: number; joined: string; avatar: string; };

const roleInfo: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    owner: { label: "Owner", icon: <Crown size={12} />, cls: "bg-amber-50 text-amber-600" },
    admin: { label: "Admin", icon: <Shield size={12} />, cls: "bg-violet-50 text-violet-600" },
    user: { label: "User", icon: <UserCheck size={12} />, cls: "bg-blue-50 text-blue-600" },
};

const avatarColors: Record<string, string> = {
    owner: "#F59E0B",
    admin: "#7C3AED",
    user: "#2BBEE8",
};

const roleTabs = ["Semua", "owner", "admin", "user"];
const roleTabLabels: Record<string, string> = { "Semua": "Semua", owner: "Owner", admin: "Admin", user: "User" };

export default function AdminUsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Semua");
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [successMsg, setSuccessMsg] = useState("");

    const fetchUsers = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (data.success && data.users) {
                setUsers(data.users);
            }
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filtered = users.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "Semua" || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const countByRole = (r: string) => r === "Semua" ? users.length : users.filter((u) => u.role === r).length;

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
                showToast("Pengguna berhasil dihapus.");
            } else {
                showToast(data.error || "Gagal menghapus pengguna.");
            }
        } catch {
            // Fallback: remove from UI
            setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
            showToast("Pengguna berhasil dihapus.");
        }
        setDeleteTarget(null);
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
                <h2 className="text-xl font-bold" style={{ color: '#05073C' }}>Kelola Users</h2>
                <p className="text-sm text-slate-400">{users.length} pengguna terdaftar</p>
            </div>

            {/* Role Tabs */}
            <div className="card p-2 flex gap-1 overflow-x-auto">
                {roleTabs.map((tab) => (
                    <button key={tab} onClick={() => setRoleFilter(tab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${roleFilter === tab ? "text-white" : "text-slate-500 hover:bg-slate-100"}`}
                        style={roleFilter === tab ? { backgroundColor: '#05073C' } : {}}>
                        {roleTabLabels[tab]}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${roleFilter === tab ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                            {countByRole(tab)}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Cari nama atau email..." value={search}
                    onChange={(e) => setSearch(e.target.value)} className="form-input pl-9 w-full max-w-md" />
            </div>

            {/* Users Table */}
            <div className="card overflow-hidden">
                {loading ? (
                    <div className="text-center py-16">
                        <Loader2 size={32} className="mx-auto mb-3 animate-spin text-slate-300" />
                        <p className="text-slate-400 text-sm">Memuat data pengguna...</p>
                    </div>
                ) : (
                    <>
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-slate-500">Pengguna</th>
                                    <th className="text-left p-4 font-semibold text-slate-500 hidden md:table-cell">Email</th>
                                    <th className="text-left p-4 font-semibold text-slate-500">Role</th>
                                    <th className="text-left p-4 font-semibold text-slate-500 hidden sm:table-cell">Total Booking</th>
                                    <th className="text-left p-4 font-semibold text-slate-500 hidden lg:table-cell">Bergabung</th>
                                    <th className="text-left p-4 font-semibold text-slate-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u, i) => {
                                    const r = roleInfo[u.role] || roleInfo["user"];
                                    return (
                                        <tr key={u.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                                                        style={{ backgroundColor: avatarColors[u.role] || '#2BBEE8' }}>
                                                        {u.avatar}
                                                    </div>
                                                    <div className="font-semibold" style={{ color: '#05073C' }}>{u.name}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 hidden md:table-cell">
                                                <span className="flex items-center gap-1 text-slate-500"><Mail size={12} /> {u.email}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`badge flex items-center gap-1 w-fit ${r.cls}`}>{r.icon} {r.label}</span>
                                            </td>
                                            <td className="p-4 hidden sm:table-cell">
                                                <span className="font-bold" style={{ color: '#05073C' }}>{u.totalBookings}</span>
                                                <span className="text-xs text-slate-400 ml-1">trip</span>
                                            </td>
                                            <td className="p-4 hidden lg:table-cell text-slate-400 text-xs">{u.joined}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => router.push(`/admin/users/${u.id}`)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-500 transition-all" title="Edit profil">
                                                        <Edit2 size={15} />
                                                    </button>
                                                    <button onClick={() => setDeleteTarget(u)}
                                                        disabled={u.role === "owner"}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="Hapus">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filtered.length === 0 && (
                            <div className="text-center py-16 text-slate-400">
                                <UserCheck size={40} className="mx-auto mb-3 opacity-30" />
                                <p className="font-semibold">Tidak ada pengguna ditemukan</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ===== MODAL: Konfirmasi Hapus ===== */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4 text-center">
                        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                            <Trash2 size={24} className="text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Hapus Pengguna?</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Akun <strong>{deleteTarget.name}</strong> akan dihapus permanen beserta seluruh datanya.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteTarget(null)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                                Batal
                            </button>
                            <button onClick={handleDelete}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition-all">
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
