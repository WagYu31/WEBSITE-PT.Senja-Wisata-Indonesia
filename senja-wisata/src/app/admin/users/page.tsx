"use client";

import { useState } from "react";
import { Search, UserCheck, Shield, Crown, Edit2, Trash2, Mail } from "lucide-react";

const mockUsers = [
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
    user: { label: "User", icon: <UserCheck size={12} />, cls: "bg-blue/10 text-blue" },
};

const roleColors: Record<string, string> = {
    owner: "bg-amber-400",
    admin: "bg-violet-400",
    user: "bg-blue",
};

const roleTabs = ["Semua", "owner", "admin", "user"];
const roleTabLabels: Record<string, string> = { "Semua": "Semua", owner: "Owner", admin: "Admin", user: "User" };

export default function AdminUsersPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Semua");

    const filtered = mockUsers.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === "Semua" || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const countByRole = (r: string) => r === "Semua" ? mockUsers.length : mockUsers.filter((u) => u.role === r).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-primary">Kelola Users</h2>
                <p className="text-sm text-slate-400">{mockUsers.length} pengguna terdaftar</p>
            </div>

            {/* Role Tabs */}
            <div className="card p-2 flex gap-1 overflow-x-auto">
                {roleTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setRoleFilter(tab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${roleFilter === tab ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-100"
                            }`}
                    >
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
                <input
                    type="text"
                    placeholder="Cari nama atau email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-input pl-9 w-full max-w-md"
                />
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
                                            <div className={`w-9 h-9 ${roleColors[u.role]} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                                                {u.avatar}
                                            </div>
                                            <div className="font-semibold text-primary">{u.name}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="flex items-center gap-1 text-slate-500">
                                            <Mail size={12} /> {u.email}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`badge flex items-center gap-1 w-fit ${r.cls}`}>
                                            {r.icon} {r.label}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden sm:table-cell">
                                        <span className="font-bold text-primary">{u.totalBookings}</span>
                                        <span className="text-xs text-slate-400 ml-1">trip</span>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell text-slate-400 text-xs">{u.joined}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-500 transition-all" title="Edit role">
                                                <Edit2 size={15} />
                                            </button>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all" title="Hapus">
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
        </div>
    );
}
