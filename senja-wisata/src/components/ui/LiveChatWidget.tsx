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
    // Greetings
    {
        kw: ["halo", "hi", "hey", "hai", "selamat", "pagi", "siang", "sore", "malam", "assalamualaikum", "permisi"],
        reply: "Halo! 😊 Selamat datang di **Senja Wisata**!\n\nSaya bisa bantu kamu soal:\n🌏 Paket wisata & destinasi\n💰 Harga & promo\n📋 Cara booking\n✈️ Itinerary & fasilitas\n\nMau tanya apa dulu?"
    },

    // ── TOUR PACKAGES ──────────────────────────────────────────────────────
    {
        kw: ["paket", "wisata", "tour", "lihat", "info", "destinasi", "pilihan", "ada apa aja", "apa saja", "tersedia", "rekomendasi", "rekomen"],
        reply: "Kami punya banyak pilihan paket wisata! 🌏\n\n🏝️ **Paket Domestik Populer:**\n• **Bali Complete** 5D4N — Rp 4.2jt/pax\n• **Raja Ampat Paradise** 7D6N — Rp 8.5jt/pax\n• **Bromo Sunrise** 2D1N — Rp 1.2jt/pax\n• **Yogyakarta Cultural** 3D2N — Rp 1.8jt/pax\n• **Komodo Island** 4D3N — Rp 4.5jt/pax\n• **Lombok & Gili** 5D4N — Rp 3.8jt/pax\n\n👨‍👩‍👧 **Paket Keluarga:**\n• **Bali Family** 5D4N — Rp 3.5jt/pax\n• **Jogja Family** 4D3N — Rp 2.5jt/pax\n\n💑 **Honeymoon:**\n• **Maldives** 6D5N — Rp 15jt/pax\n\nMau tau detail paket yang mana?"
    },

    // Bali specific
    {
        kw: ["bali"],
        reply: "🌴 **Paket Bali** — Destinasi Paling Populer!\n\n📦 **Bali Complete 5D4N** — Rp 4.2jt/pax\n• Ubud, Tegalalang, Monkey Forest\n• Nusa Penida day trip\n• Pura Besakih & Kintamani\n• Sunset di Uluwatu\n• Villa private + breakfast\n\n👨‍👩‍👧 **Bali Family 5D4N** — Rp 3.5jt/pax\n• Waterbom Bali\n• Bali Safari & Marine Park\n• Dolphin Watching Lovina\n• Cocok untuk anak-anak!\n\nSemuanya sudah termasuk hotel, transportasi, makan, tiket wisata & guide. Mau booking yang mana?"
    },

    // Raja Ampat specific
    {
        kw: ["raja ampat", "ampat"],
        reply: "🐠 **Raja Ampat Paradise 7D6N** — Rp 8.5jt/pax\n\n**Itinerary Lengkap:**\n📍 Day 1: Tiba Sorong → Transfer resort\n📍 Day 2: Snorkeling Chicken Island\n📍 Day 3: Pianemo + Diving Friwen Wall\n📍 Day 4: Cape Kri + berenang dengan Manta Ray! 🦈\n📍 Day 5: Wayag Lagoon + trekking\n📍 Day 6: Free + Sunset Cruise\n📍 Day 7: Check-out & pulang\n\n✅ Include: Resort, makan 3x, peralatan diving/snorkeling, boat, guide\n\nRaja Ampat memiliki **75% spesies karang dunia**! Tertarik?"
    },

    // Bromo specific
    {
        kw: ["bromo", "gunung", "sunrise", "trekking"],
        reply: "🌋 **Bromo Sunrise Trekking 2D1N** — Rp 1.2jt/pax\n\n**Itinerary:**\n📍 Day 1: Malang/Surabaya → Cemoro Lawang, check-in hotel\n📍 Day 2: Bangun 03:00 🌅, Jeep ke Penanjakan, sunrise view, turun ke kawah Bromo\n\n✅ Include: Hotel, jeep 4x4, guide, makan, tiket masuk\n\n⭐ Rating 4.9/5 — Paket paling populer untuk short trip!\n\nMau booking tanggal berapa?"
    },

    // Yogyakarta specific
    {
        kw: ["jogja", "yogya", "yogyakarta", "borobudur", "prambanan", "merapi"],
        reply: "🏛️ **Yogyakarta Tours:**\n\n📦 **Cultural Tour 3D2N** — Rp 1.8jt/pax\n• Malioboro & gudeg legendaris\n• Sunrise Borobudur 🕌\n• Candi Prambanan\n• Jeep Merapi Lava Tour 🌋\n\n👨‍👩‍👧 **Jogja Family 4D3N** — Rp 2.5jt/pax\n• Borobudur + Workshop Batik\n• Merapi Jeep + Museum\n• Kraton Yogyakarta\n• Pasar Beringharjo & oleh-oleh\n\n✅ Include: Hotel, makan, transport, guide, tiket masuk\n\nJogja cocok untuk semua umur! Mau pilih yang mana?"
    },

    // Komodo specific
    {
        kw: ["komodo", "labuan bajo", "flores", "ntt"],
        reply: "🦎 **Komodo Island Adventure 4D3N** — Rp 4.5jt/pax\n\n**Itinerary:**\n📍 Day 1: Tiba Labuan Bajo → boarding liveaboard 🚢\n📍 Day 2: Trekking lihat Komodo + Manta Point snorkeling\n📍 Day 3: Pink Beach 🩷 + Trekking Padar Island sunrise\n📍 Day 4: Kanawa Island → kembali\n\n✅ Include: Liveaboard, makan 3x, snorkeling gear, guide, tiket masuk\n\nPadar Island viewpoint-nya WAJIB di-explore! 📸 Tertarik?"
    },

    // Lombok specific
    {
        kw: ["lombok", "gili", "rinjani"],
        reply: "🏖️ **Lombok & Gili Islands 5D4N** — Rp 3.8jt/pax\n\n**Itinerary:**\n📍 Day 1: Tiba → Resort Mandalika, Kuta Lombok\n📍 Day 2: Gili Trawangan — snorkeling + sunset swing 🌅\n📍 Day 3: Gili Meno & Air — berenang sama penyu! 🐢\n📍 Day 4: Trekking Air Terjun Sendang Gile\n📍 Day 5: Desa Sade (tenun tradisional) → pulang\n\n✅ Include: Resort, fast boat, makan, guide, snorkeling gear\n\n3 Gili wajib dikunjungi! Mau booking?"
    },

    // Maldives / Honeymoon
    {
        kw: ["maldives", "honeymoon", "bulan madu", "romantis", "couple"],
        reply: "💑 **Maldives Honeymoon Escape 6D5N** — Rp 15jt/pax\n\n**Itinerary Romantis:**\n📍 Day 1: Tiba → Water Villa private! 🏝️\n📍 Day 2: Snorkeling + Dolphin Cruise + Candle Dinner 🕯️\n📍 Day 3: Couples Spa + Private Beach\n📍 Day 4: Island Hopping & seafood segar\n📍 Day 5: Sunrise Kayak + Fine Dining over water\n📍 Day 6: Pulang\n\n✅ Include: Water villa, pesawat PP, makan, aktivitas, spa\n\nPerfect untuk bulan madu! 💕 Mau tanya lebih detail?"
    },

    // Family packages
    {
        kw: ["keluarga", "family", "anak", "anak-anak", "kid"],
        reply: "👨‍👩‍👧‍👦 **Paket Keluarga** — Aman & Seru!\n\n🏝️ **Bali Family 5D4N** — Rp 3.5jt/pax\n• Waterbom Bali, Safari Park, Dolphin Watch\n• Villa family-friendly\n\n🏛️ **Jogja Family 4D3N** — Rp 2.5jt/pax\n• Borobudur, Workshop Batik, Merapi Jeep\n• Edukasi & petualangan!\n\n✅ Semua paket family include:\n• Hotel family room\n• Child-friendly menu\n• Aktivitas aman untuk anak\n• Free 1 anak di bawah 5 tahun\n\nMau pilih Bali atau Jogja?"
    },

    // ── PRICING & PAYMENT ──────────────────────────────────────────────────
    {
        kw: ["harga", "biaya", "berapa", "tarif", "cost", "budget", "mahal", "per orang"],
        reply: "Harga paket kami mulai dari **Rp 900rb**! 💰\n\n📊 **Kisaran Harga per Orang:**\n• 🌋 Bromo 2D1N: **Rp 1.2jt**\n• 🏛️ Jogja 3D2N: **Rp 1.8jt**\n• 🏖️ Lombok 5D4N: **Rp 3.8jt**\n• 🌴 Bali 5D4N: **Rp 4.2jt**\n• 🦎 Komodo 4D3N: **Rp 4.5jt**\n• 🐠 Raja Ampat 7D6N: **Rp 8.5jt**\n• 💑 Maldives 6D5N: **Rp 15jt**\n\n🏷️ **Anak 5-11 tahun diskon 30%**\n👶 **Anak di bawah 5 tahun GRATIS!**\n\nHarga sudah include hotel, transport, makan, tiket & guide!"
    },

    {
        kw: ["bayar", "pembayaran", "transfer", "payment", "e-wallet", "gopay", "ovo", "dana", "qris", "kartu kredit", "cicil"],
        reply: "Metode pembayaran yang tersedia: 💳\n\n🏦 **Transfer Bank:**\n• BCA, BNI, BRI, Mandiri\n\n📱 **E-Wallet:**\n• GoPay, OVO, Dana, ShopeePay\n\n📲 **QRIS** — Scan & bayar!\n\n💳 **Kartu Kredit/Debit** — Visa, Mastercard\n\n🔄 **Cicilan** 0% tersedia untuk pembelian di atas Rp 3jt\n\nSetelah bayar, e-ticket dikirim otomatis ke email kamu! ✉️"
    },

    // ── BOOKING ─────────────────────────────────────────────────────────────
    {
        kw: ["booking", "pesan", "daftar", "reservasi", "beli", "order", "cara pesan", "gimana caranya", "bagaimana"],
        reply: "Cara booking gampang banget! 🎉\n\n1️⃣ Buka menu **Tours** di website\n2️⃣ Pilih paket yang kamu suka\n3️⃣ Klik **Pesan Sekarang**\n4️⃣ Isi data diri & pilih tanggal\n5️⃣ Pilih metode pembayaran\n6️⃣ Bayar & dapat **e-ticket** via email\n\n⏰ Konfirmasi otomatis dalam 1×24 jam!\n\n💡 **Tips:** Booking 30 hari sebelumnya dapat harga early bird! 🐦\n\nAtau mau dibantu booking via WhatsApp?"
    },

    // ── PROMOS ──────────────────────────────────────────────────────────────
    {
        kw: ["promo", "diskon", "voucher", "kode", "murah", "hemat", "sale", "potongan"],
        reply: "Promo spesial untuk kamu! 🎁\n\n🏷️ **SENJA10** — Diskon 10% semua paket\n🏷️ **WELCOME50** — Potongan Rp 50rb member baru\n🏷️ **EARLYBIRD** — Diskon 15% booking 30 hari sebelumnya\n🏷️ **GROUP5** — Diskon 20% untuk 5+ orang\n\n❗ **Berlaku sampai akhir tahun!**\n\nMasukkan kode promo saat checkout ya!"
    },

    // ── FACILITIES ──────────────────────────────────────────────────────────
    {
        kw: ["include", "fasilitas", "termasuk", "apa saja", "free", "dapat apa", "sudah termasuk"],
        reply: "Yang sudah include di setiap paket: ✅\n\n🚌 Transportasi AC selama tour\n🏨 Hotel bintang 3-4 (sesuai paket)\n🍽️ Makan sesuai itinerary\n🎫 Tiket masuk semua objek wisata\n👨‍💼 Tour guide berpengalaman\n📸 Dokumentasi foto\n🛡️ Asuransi perjalanan\n\n⭐ **Paket Premium tambahan:**\n• Tiket pesawat PP\n• Hotel bintang 5\n• Private tour (tanpa gabungan)\n\nMau upgrade ke premium?"
    },

    // ── CANCELLATION ────────────────────────────────────────────────────────
    {
        kw: ["cancel", "refund", "batal", "kembali", "reschedule", "ganti tanggal", "ubah jadwal"],
        reply: "Kebijakan pembatalan kami: 📋\n\n• **30+ hari sebelum** → refund 100% ✅\n• **14-29 hari sebelum** → refund 80%\n• **7-13 hari sebelum** → refund 50%\n• **< 7 hari** → no refund\n\n🔄 **Reschedule:** Gratis 1x, hingga 14 hari sebelum keberangkatan\n\n⚡ **Force majeure** (bencana/pandemic): Full refund!\n\nProses refund 3-5 hari kerja ke rekening. Ada yang mau ditanyakan lagi?"
    },

    // ── CONTACT ──────────────────────────────────────────────────────────────
    {
        kw: ["kontak", "hubungi", "telepon", "wa", "whatsapp", "email", "alamat", "kantor", "cs"],
        reply: "Hubungi kami kapan saja! 📞\n\n📱 **WhatsApp:** +62 812-3456-7890\n📧 **Email:** info@senjawisata.com\n🌐 **Website:** fluentlya.com\n📍 **Kantor:** Malang, Jawa Timur\n\n🕐 **Jam layanan:**\nSenin – Jumat: 08.00 – 21.00 WIB\nSabtu: 08.00 – 18.00 WIB\nMinggu: 09.00 – 15.00 WIB\n\nResponse time < 5 menit via WhatsApp! ⚡"
    },

    // ── SAFETY ───────────────────────────────────────────────────────────────
    {
        kw: ["aman", "keamanan", "covid", "protokol", "asuransi", "selamat", "safety"],
        reply: "Keselamatan tamu prioritas #1! 🛡️\n\n✅ Asuransi perjalanan ALL RISK included\n✅ Guide bersertifikat & first aid trained\n✅ Kendaraan tahun 2020+ & rutin diservis\n✅ Protokol kesehatan diterapkan\n✅ Emergency contact 24/7\n\n🏆 **Track Record:**\n• 15.000+ tamu sejak 2015\n• Rating 4.9/5\n• Zero accident record\n\nTravel dengan tenang bersama kami! 😊"
    },

    // ── GROUP & CUSTOM ──────────────────────────────────────────────────────
    {
        kw: ["grup", "group", "rombongan", "kantor", "perusahaan", "outing", "gathering", "team building"],
        reply: "Kami melayani paket grup! 👥\n\n🏢 **Corporate Outing** — Team building + wisata\n🎓 **Study Tour** — Untuk sekolah/kampus\n👨‍👩‍👧‍👦 **Family Gathering** — Min 10 orang\n\n💡 **Keuntungan Grup:**\n• Diskon s/d 25% (10+ orang)\n• Itinerary bisa dikustom\n• Tour leader dedicated\n• Invoice & faktur pajak tersedia\n\nHubungi kami untuk penawaran khusus ya!"
    },

    {
        kw: ["custom", "private", "khusus", "sesuai", "request", "kustom"],
        reply: "Tentu bisa custom! 🎨\n\n📋 **Yang bisa dikustom:**\n• Durasi perjalanan\n• Destinasi & hotel\n• Aktivitas harian\n• Kelas penerbangan\n• Menu makanan\n\n💰 Harga menyesuaikan pilihan kamu\n📲 Konsultasi GRATIS via WhatsApp!\n\nCeritakan trip impian kamu, kami buatkan paketnya! 😊"
    },

    // ── WEATHER & TIMING ────────────────────────────────────────────────────
    {
        kw: ["cuaca", "musim", "hujan", "panas", "kapan", "waktu terbaik", "best time"],
        reply: "Waktu terbaik untuk berlibur: 🌤️\n\n📅 **April – Oktober** (Musim Kering):\n• Best untuk: Bali, Komodo, Raja Ampat, Lombok\n• Langit cerah, laut tenang\n\n📅 **November – Maret** (Musim Hujan):\n• Best untuk: Jogja, Bromo (sunrise tetap cantik!)\n• Harga lebih murah, wisatawan lebih sedikit\n\n🌊 **Raja Ampat:** Terbaik Oktober – April\n🦎 **Komodo:** Terbaik April – Juni\n\nTapi semua destinasi bisa dikunjungi sepanjang tahun! 😊"
    },

    // ── ITINERARY QUESTIONS ──────────────────────────────────────────────────
    {
        kw: ["jadwal", "itinerary", "acara", "rundown", "kegiatan", "agenda"],
        reply: "Setiap paket punya itinerary lengkap! 📋\n\n📍 Contoh **Bali 5D4N:**\nDay 1: Tiba → Check-in villa\nDay 2: Ubud Cultural Tour\nDay 3: Pura Besakih & Kintamani\nDay 4: Nusa Penida Day Trip\nDay 5: Shopping & Sunset Uluwatu\n\n✅ Detail lengkap bisa dilihat di halaman masing-masing tour di website.\n\nMau saya jelaskan itinerary paket yang mana?"
    },

    // ── REVIEWS & TRUST ─────────────────────────────────────────────────────
    {
        kw: ["review", "ulasan", "testimoni", "rating", "bagus", "terpercaya", "bintang"],
        reply: "Terima kasih sudah bertanya! 🌟\n\n⭐ **Rating:** 4.9/5 dari 5000+ traveler\n🏆 **Top Rated** di Google Reviews\n💬 **Testimoni favorit:**\n\n_\"Guide ramah, itinerary rapi, pengalaman luar biasa!\"_ — Rina, Jakarta\n\n_\"Raja Ampat-nya bikin speechless!\"_ — Budi, Surabaya\n\n_\"Family trip Bali seru banget, anak-anak happy!\"_ — Sarah, Bandung\n\nBaca lebih banyak review di website kami ya! 📖"
    },

    // ── THANK YOU & GOODBYE ─────────────────────────────────────────────────
    {
        kw: ["terima kasih", "makasih", "thanks", "thank you", "trims"],
        reply: "Sama-sama! 🙏\n\nSenang bisa membantu. Kalau ada pertanyaan lagi, jangan sungkan ya! 😊\n\nSemoga liburanmu menyenangkan bersama **Senja Wisata**! 🌅✨"
    },

    {
        kw: ["bye", "dah", "sampai jumpa", "selesai", "cukup", "udah"],
        reply: "Selamat tinggal! 👋\n\nTerima kasih sudah menghubungi **Senja Wisata**.\nKami tunggu booking-nya ya! 🌴\n\nSampai jumpa di perjalanan berikutnya! 🚀"
    },

    // ── YES / INTEREST ──────────────────────────────────────────────────────
    {
        kw: ["iya", "ya", "mau", "boleh", "ok", "oke", "tertarik", "saya mau", "pengen", "ingin"],
        reply: "Senang kamu tertarik! 😊\n\nUntuk melanjutkan, kamu bisa:\n\n1️⃣ Langsung **booking di website** → menu Tours\n2️⃣ Chat lebih lanjut dengan **admin** kami\n3️⃣ WhatsApp ke **+62 812-3456-7890**\n\nAtau mau saya jelaskan soal paket tertentu? Sebutkan saja destinasinya! 🌏"
    },
];

function getBotReply(text: string): string {
    const lower = text.toLowerCase().replace(/[?!.,]/g, "");
    // Score each response by number of keyword matches
    let bestReply = "";
    let bestScore = 0;
    for (const { kw, reply } of BOT_RESPONSES) {
        let score = 0;
        for (const k of kw) {
            if (lower.includes(k)) score += k.length; // longer keyword = higher score
        }
        if (score > bestScore) {
            bestScore = score;
            bestReply = reply;
        }
    }
    if (bestScore > 0) return bestReply;
    return "Maaf, saya belum memahami pertanyaan Anda. 🤔\n\nCoba tanyakan tentang:\n• **Paket wisata** (Bali, Raja Ampat, Bromo, dll)\n• **Harga** & promo\n• **Cara booking** & pembayaran\n• **Fasilitas** yang included\n• **Jadwal** & itinerary\n\nAtau ketik nama destinasi impianmu! 🌏";
}

const QUICK_REPLIES = ["Info paket wisata", "Berapa harganya?", "Cara booking", "Paket Bali", "Ada promo?"];

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
