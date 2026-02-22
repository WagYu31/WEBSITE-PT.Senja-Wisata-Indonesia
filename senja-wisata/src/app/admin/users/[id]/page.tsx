"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft, User, Mail, Phone, MapPin, Camera,
    CheckCircle, Shield, Crown, UserCheck, Save
} from "lucide-react";

type UserData = {
    id: number; name: string; email: string; role: string;
    totalBookings: number; joined: string; avatar: string;
    phone: string; city: string; bio: string;
};

const allUsers: UserData[] = [
    { id: 1, name: "Pak Bowo", email: "owner@senja.com", role: "owner", totalBookings: 0, joined: "2024-01-15", avatar: "B", phone: "+62 812-0000-0001", city: "Malang", bio: "Owner PT. Senja Wisata Indonesia" },
    { id: 2, name: "Admin Senja", email: "admin@senja.com", role: "admin", totalBookings: 0, joined: "2024-01-16", avatar: "A", phone: "+62 812-0000-0002", city: "Jakarta", bio: "Admin pengelola sistem" },
    { id: 3, name: "Budi Santoso", email: "user@senja.com", role: "user", totalBookings: 5, joined: "2024-02-10", avatar: "B", phone: "+62 812-3456-7890", city: "Surabaya", bio: "Pecinta alam dan budaya Indonesia" },
    { id: 4, name: "Reza Firmansyah", email: "reza@mail.com", role: "user", totalBookings: 3, joined: "2024-03-01", avatar: "R", phone: "+62 813-1234-5678", city: "Bandung", bio: "Traveler muda yang gemar mendaki" },
    { id: 5, name: "Dewi Lestari", email: "dewi@mail.com", role: "user", totalBookings: 7, joined: "2024-03-15", avatar: "D", phone: "+62 817-9876-5432", city: "Yogyakarta", bio: "Suka wisata budaya dan kuliner" },
    { id: 6, name: "Ahmad Fajar", email: "ahmad@mail.com", role: "user", totalBookings: 2, joined: "2024-04-20", avatar: "A", phone: "+62 856-1122-3344", city: "Semarang", bio: "Backpacker budget-friendly" },
    { id: 7, name: "Siti Nur Aisyah", email: "siti@mail.com", role: "user", totalBookings: 4, joined: "2024-05-05", avatar: "S", phone: "+62 878-5566-7788", city: "Bali", bio: "Pecinta pantai dan sunset" },
    { id: 8, name: "Linda Handayani", email: "linda@mail.com", role: "user", totalBookings: 6, joined: "2024-06-12", avatar: "L", phone: "+62 821-9900-1122", city: "Makassar", bio: "Penggemar wisata bahari" },
];

const roleInfo: Record<string, { label: string; icon: React.ReactNode; cls: string; desc: string }> = {
    user: { label: "User", icon: <UserCheck size={14} />, cls: "bg-blue-50 text-blue-600 border-blue-200", desc: "Dapat booking tour" },
    admin: { label: "Admin", icon: <Shield size={14} />, cls: "bg-violet-50 text-violet-600 border-violet-200", desc: "Akses dashboard admin" },
    owner: { label: "Owner", icon: <Crown size={14} />, cls: "bg-amber-50 text-amber-600 border-amber-200", desc: "Akses penuh sistem" },
};

const avatarColors: Record<string, string> = {
    owner: "#F59E0B",
    admin: "#7C3AED",
    user: "#2BBEE8",
};

export default function AdminUserEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const userData = allUsers.find((u) => u.id === Number(id));

    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        city: userData?.city || "",
        bio: userData?.bio || "",
    });
    const [selectedRole, setSelectedRole] = useState(userData?.role || "user");

    if (!userData) {
        return (
            <div className="space-y-6">
                <button onClick={() => router.push("/admin/users")}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                    <ArrowLeft size={16} /> Kembali ke Kelola Users
                </button>
                <div className="card p-12 text-center">
                    <User size={48} className="mx-auto mb-4 text-slate-300" />
                    <h3 className="text-lg font-bold text-slate-600">Pengguna tidak ditemukan</h3>
                    <p className="text-sm text-slate-400 mt-1">ID pengguna tidak valid atau sudah dihapus.</p>
                </div>
            </div>
        );
    }

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Back Button */}
            <button onClick={() => router.push("/admin/users")}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                Kembali ke Kelola Users
            </button>

            {/* Header */}
            <div>
                <h2 className="text-xl font-bold" style={{ color: '#05073C' }}>Edit Profil Pengguna</h2>
                <p className="text-sm text-slate-400">Kelola informasi dan role pengguna</p>
            </div>

            {/* Avatar Section */}
            <div className="card p-6 flex items-center gap-5">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                        style={{ backgroundColor: avatarColors[userData.role] || '#2BBEE8' }}>
                        {userData.avatar}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:text-amber-500 shadow-sm transition-colors">
                        <Camera size={13} />
                    </button>
                </div>
                <div>
                    <p className="font-bold text-lg" style={{ color: '#05073C' }}>{form.name || userData.name}</p>
                    <p className="text-slate-400 text-sm">{form.email || userData.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border ${roleInfo[selectedRole].cls}`}>
                            {roleInfo[selectedRole].icon} {roleInfo[selectedRole].label}
                        </span>
                        <span className="text-xs text-slate-400">• Bergabung {userData.joined}</span>
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSave} className="card p-6 space-y-5">
                <h3 className="font-bold text-lg border-b border-slate-100 pb-3" style={{ color: '#05073C' }}>
                    Informasi Personal
                </h3>

                <div>
                    <label className="form-label">Nama Lengkap</label>
                    <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" value={form.name} onChange={set("name")} className="form-input pl-9" required />
                    </div>
                </div>

                <div>
                    <label className="form-label">Email</label>
                    <div className="relative">
                        <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="email" value={form.email} onChange={set("email")} className="form-input pl-9" required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="form-label">No. HP / WhatsApp</label>
                        <div className="relative">
                            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="tel" value={form.phone} onChange={set("phone")} className="form-input pl-9" />
                        </div>
                    </div>
                    <div>
                        <label className="form-label">Kota Domisili</label>
                        <div className="relative">
                            <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" value={form.city} onChange={set("city")} className="form-input pl-9" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="form-label">Bio</label>
                    <textarea
                        value={form.bio}
                        onChange={set("bio")}
                        rows={3}
                        className="form-input resize-none"
                        placeholder="Bio pengguna..."
                    />
                </div>

                {/* Booking Stats */}
                <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-4">
                    <div>
                        <p className="text-xs text-slate-400">Total Booking</p>
                        <p className="text-2xl font-bold" style={{ color: '#05073C' }}>{userData.totalBookings}</p>
                    </div>
                    <div className="text-xs text-slate-400">trip terdaftar</div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button type="submit" className="btn btn-primary gap-2"
                        style={saved ? { backgroundColor: '#10B981' } : { backgroundColor: '#05073C' }}>
                        {saved ? <><CheckCircle size={16} /> Tersimpan!</> : <><Save size={16} /> Simpan Perubahan</>}
                    </button>
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-emerald-500 text-sm font-semibold"
                        >
                            Profil berhasil diperbarui ✓
                        </motion.span>
                    )}
                </div>
            </form>

            {/* Role Section */}
            <div className="card p-6 space-y-4">
                <h3 className="font-bold text-lg border-b border-slate-100 pb-3" style={{ color: '#05073C' }}>
                    Role Pengguna
                </h3>
                <div className="space-y-2">
                    {Object.entries(roleInfo).map(([role, info]) => (
                        <button
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${selectedRole === role ? "border-transparent" : "border-slate-100 hover:border-slate-200"
                                }`}
                            style={selectedRole === role ? { borderColor: '#05073C', backgroundColor: '#F0F1F7' } : {}}
                        >
                            <span className={`flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1 rounded-full border ${info.cls}`}>
                                {info.icon} {info.label}
                            </span>
                            <span className="text-xs text-slate-500 flex-1">{info.desc}</span>
                            {selectedRole === role && (
                                <CheckCircle size={18} style={{ color: '#05073C' }} />
                            )}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => {
                        setSaved(true);
                        setTimeout(() => setSaved(false), 3000);
                    }}
                    className="btn text-white text-sm font-semibold gap-2"
                    style={{ backgroundColor: '#05073C' }}
                >
                    <Save size={16} /> Simpan Role
                </button>
            </div>
        </div>
    );
}
