"use client";

import { useState } from "react";
import { Search, UserCheck, Shield, Crown, Edit2, Trash2, Mail, X, Check } from "lucide-react";

type User = { id: number; name: string; email: string; role: string; totalBookings: number; joined: string; avatar: string; };

const initialUsers: User[] = [
    { id: 1, name: "Pak Bowo", email: "owner@senja.com", role: "owner", totalBookings: 0, joined: "2024-01-15", avatar: "B" },
    { id: 2, name: "Admin Senja", email: "admin@senja.com", role: "admin", totalBookings: 0, joined: "2024-01-16", avatar: "A" },
    { id: 3, name: "Budi Santoso", email: "user@senja.com", role: "user", totalBookings: 5, joined: "2024-02-10", avatar: "B" },
    { id: 4, name: "Reza Firmansyah", email: "reza@mail.com", role: "user", totalBookings: 3, joined: "2024-03-01", avatar: "R" },
    { id: 5, name: "Dewi Lestari", email: "dewi@mail.com", role: "user", totalBookings: 7, joined: "2024-03-15", avatar: "D" },
    { id: 6, name: "Ahmad Fajar", email: "ahmad@mail.com", role: "user", totalBookings: 2, joined: "2024-04-20", avatar: "A" },
    { id: 7, name: "Siti Nur Aisyah", email: "siti@mail.com", role: "user", totalBookings: 4, joined: "2024-05-05", avatar: "S" },
    { id: 8, name: "Linda Handayani", email: "linda@mail.com", role: "user", totalBookings: 6, joined: "2024-06-12", avatar: "L" },
];

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
const allRoles = ["user", "admin", "owner"];

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Semua");
    const [editTarget, setEditTarget] = useState<User | null>(null);
    const [editRole, setEditRole] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [successMsg, setSuccessMsg] = useState("");

    const filtered = users.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "Semua" || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const countByRole = (r: string) => r === "Semua" ? users.length : users.filter((u) => u.role === r).length;

    const openEdit = (u: User) => {
        setEditTarget(u);
        setEditRole(u.role);
    };

    const handleSaveRole = () => {
        if (!editTarget) return;
        setUsers(prev => prev.map(u => u.id === editTarget.id ? { ...u, role: editRole } : u));
        setEditTarget(null);
        showToast(`Role ${editTarget.name} diubah menjadi ${editRole}.`);
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        setUsers(prev => prev.filter(u => u.id !== deleteTarget.id));
        setDeleteTarget(null);
        showToast("Pengguna berhasil dihapus.");
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
                            const r = roleInfo[u.role];
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
                                            <button onClick={() => openEdit(u)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-500 transition-all" title="Edit role">
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
            </div>

            {/* ===== MODAL: Edit Role ===== */}
            {editTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold" style={{ color: '#05073C' }}>Ubah Role</h3>
                            <button onClick={() => setEditTarget(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                                <X size={18} />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: avatarColors[editTarget.role] }}>
                                {editTarget.avatar}
                            </div>
                            <div>
                                <div className="font-semibold text-sm" style={{ color: '#05073C' }}>{editTarget.name}</div>
                                <div className="text-xs text-slate-400">{editTarget.email}</div>
                            </div>
                        </div>

                        {/* Role Picker */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-600">Pilih Role</label>
                            {allRoles.map(role => {
                                const info = roleInfo[role];
                                return (
                                    <button key={role} onClick={() => setEditRole(role)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${editRole === role ? "border-transparent" : "border-slate-100 hover:border-slate-200"}`}
                                        style={editRole === role ? { borderColor: '#05073C', backgroundColor: '#F0F1F7' } : {}}>
                                        <span className={`badge flex items-center gap-1 ${info.cls}`}>{info.icon} {info.label}</span>
                                        <span className="text-xs text-slate-500 flex-1">
                                            {role === "user" ? "Dapat booking tour" : role === "admin" ? "Akses dashboard admin" : "Akses penuh sistem"}
                                        </span>
                                        {editRole === role && <Check size={16} style={{ color: '#05073C' }} />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setEditTarget(null)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                                Batal
                            </button>
                            <button onClick={handleSaveRole}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                                style={{ backgroundColor: '#05073C' }}>
                                Simpan Role
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
