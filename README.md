# 🌅 WEBSITE PT. Senja Wisata Indonesia

> Platform pemesanan paket wisata premium berbasis web yang dibangun dengan Next.js, dirancang untuk memberikan pengalaman perjalanan terbaik bagi pelanggan dan kemudahan pengelolaan bagi tim internal.

---

## ✨ Fitur Utama

### 🏠 Landing Page
- **Hero Section** dengan animasi word-by-word text reveal dan floating particles
- **Statistik animasi** count-up saat section masuk viewport
- **Card hover shimmer glow** effect premium
- **Gradient shift** animasi latar belakang yang subtle dan elegan
- Section: Hero, Destinasi Populer, Paket Tour, Testimoni, Newsletter, Footer lengkap

---

### 🗺️ Halaman Destinasi & Tour
- Daftar **destinasi wisata** dengan filter kategori dan pencarian
- Halaman **detail tour** lengkap dengan galeri foto, itinerary, fasilitas, dan harga
- **Sistem promo & voucher** — input kode diskon saat checkout
- Tampilan responsif dan mobile-friendly

---

### 🔐 Autentikasi
- **Login & Register** dengan validasi form
- Role-based access: `user`, `admin`, `owner`
- Proteksi halaman berdasarkan role
- Session management menggunakan Zustand dengan persistence

---

### 👤 Dashboard User
- Lihat **riwayat booking** pribadi
- Status booking: Pending → Confirmed → Completed / Cancelled
- **Wishlist** destinasi favorit
- Manajemen profil pengguna

---

### 📦 Sistem Booking
- Pilih paket tour → isi data peserta → pilih tanggal → konfirmasi
- Support **kode promo** dengan perhitungan diskon otomatis
- Status booking real-time
- Riwayat transaksi lengkap

---

### 💬 Live Chat (Production-Ready)
- **Widget chat** floating di semua halaman publik
- **Bot otomatis** (Senja Assistant) menjawab pertanyaan umum: paket, harga, booking, promo, fasilitas
- **Handoff ke admin** — user bisa minta disambungkan ke tim support
- **Multi-tab interface**: Chat, Kontak, FAQ
- Riwayat chat tersimpan di **MySQL database** (bukan localStorage)
- **Real-time** via Server-Sent Events (SSE) — admin menerima pesan instan tanpa refresh
- Widget otomatis tersembunyi di halaman admin/owner

---

### 🛠️ Panel Admin
**Diakses oleh admin perusahaan:**

| Modul | Fitur |
|-------|-------|
| 📊 **Dashboard** | Statistik booking, revenue, visitor aktif |
| 🏝️ **Kelola Tour** | CRUD paket wisata, galeri, itinerary, harga |
| 📋 **Kelola Booking** | Lihat, konfirmasi, batalkan booking |
| 👥 **Kelola Users** | Manajemen akun pelanggan |
| 💬 **Live Chat** | Balas pesan user secara real-time, tutup/hapus sesi |
| ⚙️ **Pengaturan Web** | Konfigurasi informasi perusahaan |

- **Badge notifikasi** unread chat di sidebar
- **Live Visitor Widget** — monitor pengunjung aktif secara real-time

---

### 👑 Panel Owner
- Akses penuh ke semua data bisnis
- Laporan performa lebih lengkap dibanding admin

---

## 🏗️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS |
| **State Management** | Zustand |
| **Database** | MySQL 8.0 |
| **Real-time** | Server-Sent Events (SSE) |
| **ORM / DB Client** | mysql2 |
| **Containerization** | Docker, Docker Compose |
| **DB Management** | phpMyAdmin |

---

## 📁 Struktur Proyek

```
WEBSITE PT.Senja Wisata Indonesia/
├── docker/
│   └── mysql/
│       └── init.sql          # Schema & seed database
├── senja-wisata/             # Aplikasi Next.js
│   └── src/
│       ├── app/
│       │   ├── (public)/     # Halaman publik
│       │   ├── admin/        # Panel admin
│       │   ├── owner/        # Panel owner
│       │   ├── dashboard/    # Dashboard user
│       │   └── api/chat/     # API Live Chat
│       ├── components/       # Reusable components
│       ├── store/            # Zustand stores
│       └── lib/              # Utilities & DB connection
├── docker-compose.yml
└── .env.example
```

---

## 🎨 Design System

- **Primary**: Navy `#05073C`
- **Accent**: Red `#FC4C4D`
- **Font**: Inter (Google Fonts)
- **Style**: Glassmorphism, gradient, micro-animations
- **Dark-ready**: Komponen siap dikembangkan ke dark mode

---

<div align="center">
  <p>Dibuat dengan ❤️ oleh <strong>WagYu31</strong></p>
  <p>PT. Senja Wisata Indonesia — <em>Liburan Impian Anda</em></p>
</div>
