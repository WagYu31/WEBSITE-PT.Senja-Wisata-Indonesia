"use client";

import { useState, useEffect, useCallback } from "react";
import { tours as staticTours } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Edit2, Trash2, Eye, Star, MapPin, Clock, X, Package } from "lucide-react";

type Tour = typeof staticTours[0] & { status?: string };

const categoryOptions = ["Semua", "Beach", "Culture", "Adventure", "Family", "Honeymoon", "International"];
const allCategories = ["Beach", "Culture", "Adventure", "Family", "Honeymoon", "International"];

const emptyForm = { title: "", location: "", price: "", duration: "", category: "Beach", description: "", image: "", rating: "4.5", reviews: "0" };

export default function AdminToursPage() {
    const [tourList, setTourList] = useState<Tour[]>(staticTours);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");

    // Modal states
    const [showForm, setShowForm] = useState(false);
    const [editingTour, setEditingTour] = useState<Tour | null>(null);
    const [previewTour, setPreviewTour] = useState<Tour | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Tour | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // Load tours from DB and merge with static
    const loadTours = useCallback(async () => {
        try {
            const res = await fetch("/api/tours");
            const data = await res.json();
            if (data.tours && data.tours.length > 0) {
                const dbTours = data.tours as Tour[];
                const dbIds = new Set(dbTours.map((t: Tour) => t.id));
                // Merge: DB tours first, then static tours not in DB
                const merged = [
                    ...dbTours.map((t: Tour) => ({
                        ...t,
                        gallery: [],
                        includes: [],
                        itinerary: [],
                        badge: "",
                        maxPax: t.maxPax || 20,
                        minAge: t.minAge || 0,
                        island: t.island || "",
                        reviews: t.reviews || 0,
                        rating: t.rating || 4.5,
                        originalPrice: t.originalPrice || undefined,
                        slug: t.slug || "",
                    })),
                    ...staticTours.filter(t => !dbIds.has(t.id)),
                ];
                setTourList(merged);
            }
        } catch {
            // Fallback to static
        }
    }, []);

    useEffect(() => {
        loadTours();
    }, [loadTours]);

    const filtered = tourList.filter((t) => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.location.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === "Semua" || t.category === category;
        return matchSearch && matchCat;
    });

    const openAdd = () => {
        setEditingTour(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (tour: Tour) => {
        setEditingTour(tour);
        setForm({
            title: tour.title,
            location: tour.location,
            price: String(tour.price),
            duration: tour.duration,
            category: tour.category,
            description: tour.description || "",
            image: tour.image,
            rating: String(tour.rating),
            reviews: String(tour.reviews),
        });
        setShowForm(true);
    };

    const handleSave = async () => {
        if (!form.title || !form.location || !form.price) return;
        setSaving(true);
        try {
            if (editingTour) {
                const res = await fetch("/api/tours", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: editingTour.id, ...form, price: Number(form.price) }),
                });
                const data = await res.json();
                if (data.success) {
                    showSuccess("Tour berhasil diperbarui!");
                    await loadTours();
                } else {
                    showSuccess("Error: " + (data.error || "Gagal update"));
                }
            } else {
                const res = await fetch("/api/tours", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, price: Number(form.price) }),
                });
                const data = await res.json();
                if (data.success) {
                    showSuccess("Tour baru berhasil ditambahkan!");
                    await loadTours();
                } else {
                    showSuccess("Error: " + (data.error || "Gagal tambah"));
                }
            }
            setShowForm(false);
        } catch (err) {
            showSuccess("Error: " + String(err));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const res = await fetch("/api/tours", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: deleteTarget.id }),
            });
            const data = await res.json();
            if (data.success) {
                showSuccess("Tour berhasil dihapus.");
                await loadTours();
            }
        } catch {
            showSuccess("Gagal menghapus tour.");
        }
        setDeleteTarget(null);
    };

    const showSuccess = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Success toast */}
            {successMsg && (
                <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-xl font-semibold text-sm flex items-center gap-2 animate-in slide-in-from-top-2">
                    ✓ {successMsg}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold" style={{ color: '#05073C' }}>Kelola Tour</h2>
                    <p className="text-sm text-slate-400">{tourList.length} paket wisata terdaftar</p>
                </div>
                <button onClick={openAdd} className="btn btn-primary gap-2 self-start sm:self-auto">
                    <Plus size={16} /> Tambah Tour Baru
                </button>
            </div>

            {/* Filter bar */}
            <div className="card p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Cari nama tour atau lokasi..." value={search}
                        onChange={(e) => setSearch(e.target.value)} className="form-input pl-9 w-full" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {categoryOptions.map((c) => (
                        <button key={c} onClick={() => setCategory(c)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${category === c ? "text-white border-transparent" : "border-slate-200 text-slate-500 hover:border-slate-400"}`}
                            style={category === c ? { backgroundColor: '#05073C', borderColor: '#05073C' } : {}}
                        >{c}</button>
                    ))}
                </div>
            </div>

            {/* Tours Table */}
            <div className="card overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="text-left p-4 font-semibold text-slate-500">Tour</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden md:table-cell">Lokasi</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden sm:table-cell">Harga</th>
                            <th className="text-left p-4 font-semibold text-slate-500 hidden lg:table-cell">Rating</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Status</th>
                            <th className="text-left p-4 font-semibold text-slate-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((tour, i) => (
                            <tr key={tour.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={tour.image} alt={tour.title} className="w-14 h-10 object-cover rounded-lg shrink-0" />
                                        <div>
                                            <div className="font-semibold" style={{ color: '#05073C' }}>{tour.title}</div>
                                            <div className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} /> {tour.duration}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 hidden md:table-cell text-slate-500">
                                    <span className="flex items-center gap-1"><MapPin size={12} /> {tour.location}</span>
                                </td>
                                <td className="p-4 hidden sm:table-cell">
                                    <div className="font-semibold text-accent">{formatPrice(tour.price)}</div>
                                    {tour.originalPrice && <div className="text-xs text-slate-400 line-through">{formatPrice(tour.originalPrice)}</div>}
                                </td>
                                <td className="p-4 hidden lg:table-cell">
                                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                                        <Star size={12} fill="currentColor" /> {tour.rating}
                                        <span className="text-slate-400 font-normal text-xs">({tour.reviews})</span>
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="badge badge-success">Aktif</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => setPreviewTour(tour)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all" title="Preview">
                                            <Eye size={15} />
                                        </button>
                                        <button onClick={() => openEdit(tour)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-amber-50 hover:text-amber-500 transition-all" title="Edit">
                                            <Edit2 size={15} />
                                        </button>
                                        <button onClick={() => setDeleteTarget(tour)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all" title="Hapus">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <Package size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="font-semibold">Tidak ada tour ditemukan</p>
                    </div>
                )}
            </div>

            {/* ===== MODAL: Tambah / Edit Tour ===== */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold" style={{ color: '#05073C' }}>
                                {editingTour ? "Edit Tour" : "Tambah Tour Baru"}
                            </h3>
                            <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Tour *</label>
                                <input className="form-input w-full" placeholder="Contoh: Raja Ampat Paradise" value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Lokasi *</label>
                                    <input className="form-input w-full" placeholder="Contoh: Raja Ampat, Papua" value={form.location}
                                        onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Durasi</label>
                                    <input className="form-input w-full" placeholder="Contoh: 5 Hari 4 Malam" value={form.duration}
                                        onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Harga (Rp) *</label>
                                    <input className="form-input w-full" type="number" placeholder="8500000" value={form.price}
                                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
                                    <select className="form-input w-full" value={form.category}
                                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                        {allCategories.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">URL Foto</label>
                                <input className="form-input w-full" placeholder="https://..." value={form.image}
                                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Deskripsi</label>
                                <textarea className="form-input w-full resize-none" rows={3} placeholder="Deskripsi singkat tour..."
                                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                            </div>
                        </div>
                        <div className="flex gap-3 p-6 border-t border-slate-100">
                            <button onClick={() => setShowForm(false)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                                Batal
                            </button>
                            <button onClick={handleSave} disabled={saving || !form.title || !form.location || !form.price}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                                style={{ backgroundColor: '#05073C' }}>
                                {saving ? "Menyimpan..." : editingTour ? "Simpan Perubahan" : "Tambah Tour"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL: Preview Tour ===== */}
            {previewTour && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="relative h-48">
                            <img src={previewTour.image} alt={previewTour.title} className="w-full h-full object-cover" />
                            <button onClick={() => setPreviewTour(null)}
                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-3">
                            <h3 className="text-xl font-bold" style={{ color: '#05073C' }}>{previewTour.title}</h3>
                            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><MapPin size={13} /> {previewTour.location}</span>
                                <span className="flex items-center gap-1"><Clock size={13} /> {previewTour.duration}</span>
                                <span className="flex items-center gap-1 text-amber-500 font-semibold"><Star size={13} fill="currentColor" /> {previewTour.rating} ({previewTour.reviews} ulasan)</span>
                            </div>
                            {previewTour.description && <p className="text-sm text-slate-600">{previewTour.description}</p>}
                            <div className="flex items-center justify-between pt-2">
                                <div>
                                    <div className="text-2xl font-bold text-accent">{formatPrice(previewTour.price)}</div>
                                    <div className="text-xs text-slate-400">per orang</div>
                                </div>
                                <span className="badge badge-success">Aktif</span>
                            </div>
                        </div>
                        <div className="flex gap-3 px-6 pb-6">
                            <button onClick={() => { setPreviewTour(null); openEdit(previewTour); }}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                <Edit2 size={14} /> Edit Tour
                            </button>
                            <button onClick={() => window.open(`/tours/${previewTour.id}`, '_blank')}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
                                style={{ backgroundColor: '#05073C' }}>
                                <Eye size={14} /> Lihat di Website
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
                            <h3 className="text-lg font-bold text-slate-800">Hapus Tour?</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Tour <strong>&quot;{deleteTarget.title}&quot;</strong> akan dihapus permanen dan tidak bisa dikembalikan.
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
