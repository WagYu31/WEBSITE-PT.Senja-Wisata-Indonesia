"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock, Camera, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function ProfilePage() {
    const { user } = useAuthStore();
    const [saved, setSaved] = useState(false);
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const [form, setForm] = useState({
        name: user?.name || "Senja Traveler",
        email: user?.email || "user@senja.com",
        phone: "+62 812-3456-7890",
        city: "Jakarta",
        bio: "Pecinta alam dan budaya Indonesia. Sudah menjelajahi 12 provinsi!",
    });

    const [pwForm, setPwForm] = useState({ old: "", new: "", confirm: "" });

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h2 className="text-2xl font-bold text-primary">Profil Saya</h2>
                <p className="text-slate-500 text-sm">Kelola informasi personal Anda</p>
            </div>

            {/* Avatar */}
            <div className="card p-6 flex items-center gap-5">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue to-primary flex items-center justify-center text-white text-2xl font-bold">
                        {form.name[0]}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:text-accent shadow-sm transition-colors">
                        <Camera size={13} />
                    </button>
                </div>
                <div>
                    <p className="font-bold text-primary text-lg">{form.name}</p>
                    <p className="text-slate-400 text-sm">{form.email}</p>
                    <span className="badge bg-blue/10 text-blue text-xs mt-1">Traveler</span>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="card p-6 space-y-5">
                <h3 className="font-bold text-primary text-lg border-b border-slate-100 pb-3">Informasi Personal</h3>

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
                    <label className="form-label">Bio Traveler</label>
                    <textarea
                        value={form.bio}
                        onChange={set("bio")}
                        rows={3}
                        className="form-input resize-none"
                        placeholder="Ceritakan sedikit tentang diri Anda..."
                    />
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button type="submit" className="btn btn-primary gap-2">
                        {saved ? <><CheckCircle size={16} /> Tersimpan!</> : "Simpan Perubahan"}
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

            {/* Change Password */}
            <div className="card p-6 space-y-5">
                <h3 className="font-bold text-primary text-lg border-b border-slate-100 pb-3">Ganti Password</h3>

                <div>
                    <label className="form-label">Password Lama</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type={showOld ? "text" : "password"}
                            value={pwForm.old}
                            onChange={(e) => setPwForm((f) => ({ ...f, old: e.target.value }))}
                            placeholder="Masukkan password lama"
                            className="form-input pl-9 pr-9"
                        />
                        <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="form-label">Password Baru</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type={showNew ? "text" : "password"}
                            value={pwForm.new}
                            onChange={(e) => setPwForm((f) => ({ ...f, new: e.target.value }))}
                            placeholder="Min. 8 karakter"
                            className="form-input pl-9 pr-9"
                        />
                        <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="form-label">Konfirmasi Password Baru</label>
                    <div className="relative">
                        <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="password"
                            value={pwForm.confirm}
                            onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                            placeholder="Ulangi password baru"
                            className={`form-input pl-9 ${pwForm.confirm && pwForm.new !== pwForm.confirm ? "border-red-300" : ""}`}
                        />
                    </div>
                    {pwForm.confirm && pwForm.new !== pwForm.confirm && (
                        <p className="text-red-500 text-xs mt-1">Password tidak cocok</p>
                    )}
                </div>

                <button
                    type="button"
                    disabled={!pwForm.old || !pwForm.new || pwForm.new !== pwForm.confirm}
                    className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Update Password
                </button>
            </div>

            {/* Danger Zone */}
            <div className="card p-6 border border-red-100">
                <h3 className="font-bold text-red-600 mb-2">Zona Berbahaya</h3>
                <p className="text-sm text-slate-500 mb-4">Aksi berikut tidak dapat dibatalkan. Harap berhati-hati.</p>
                <button className="btn btn-sm text-red-600 border border-red-200 bg-red-50 hover:bg-red-100">
                    Hapus Akun Saya
                </button>
            </div>
        </div>
    );
}
