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
- **My Trips** — riwayat booking dengan tab filter: Semua, Mendatang, Pending, Refund, Selesai
- **Badge counter** pada tab Pending & Refund untuk notifikasi aktif
- **E-Ticket digital** dengan QR code scannable per booking
- **Halaman verifikasi tiket** publik: `/ticket/[code]`
- **Wishlist** destinasi favorit
- Manajemen profil pengguna

---

### 📦 Sistem Booking & Pembayaran (Midtrans)
- Pilih paket tour → isi data peserta → pilih tanggal → bayar via Midtrans Snap
- **Payment gateway Midtrans** — mendukung VA BCA/BNI/Mandiri, GoPay, QRIS, kartu kredit
- **Virtual Account** tersimpan dan ditampilkan di detail booking pending
- Tombol **"Bayar Sekarang"** untuk membuka ulang Midtrans Snap dari My Trips
- **Konfirmasi otomatis** status pembayaran via callback (tanpa perlu webhook di dev)
- **Kebijakan refund berjenjang** saat pembatalan:
  - Batalkan >7 hari sebelum berangkat → refund 100%
  - 3–7 hari → refund 50%
  - <3 hari → refund 25%

---

### 💬 Live Chat (Production-Ready)
- **Widget chat** floating di semua halaman publik
- **Bot otomatis** (Senja Assistant) menjawab pertanyaan umum
- **Handoff ke admin** — user bisa minta disambungkan ke tim support
- **Multi-tab interface**: Chat, Kontak, FAQ
- Riwayat chat tersimpan di **MySQL database**
- **Real-time** via Server-Sent Events (SSE)
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
| 💬 **Live Chat** | Balas pesan user secara real-time |
| ⚙️ **Pengaturan Web** | Konfigurasi informasi perusahaan |

- **Badge notifikasi** unread chat di sidebar
- **Live Visitor Widget** — monitor pengunjung aktif secara real-time

---

### 👑 Panel Owner
- Akses penuh ke semua data bisnis
- Laporan performa lebih lengkap dibanding admin

---

### 🌐 Halaman Publik
- **Beranda** — landing page premium dengan animasi
- **Tour** — katalog paket wisata dengan filter & search
- **Destinasi** — galeri destinasi Indonesia & mancanegara
- **Tentang Kami** — halaman profil perusahaan dengan timeline, tim, visi-misi
- **Kontak** — form pesan + peta lokasi

---

## 🏗️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | Next.js 15, TypeScript, CSS |
| **State Management** | Zustand |
| **Database** | MySQL 8.0 |
| **Payment Gateway** | Midtrans Snap |
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
│       └── init.sql              # Schema & seed database
├── senja-wisata/                 # Aplikasi Next.js
│   └── src/
│       ├── app/
│       │   ├── (public)/         # Halaman publik
│       │   │   ├── about/        # Tentang Kami
│       │   │   ├── tours/        # Katalog & detail tour
│       │   │   ├── destinations/ # Daftar destinasi
│       │   │   └── contact/      # Kontak
│       │   ├── admin/            # Panel admin
│       │   ├── owner/            # Panel owner
│       │   ├── dashboard/        # Dashboard user
│       │   ├── ticket/[code]/    # Verifikasi e-ticket publik
│       │   └── api/              # API Routes
│       │       ├── booking/      # Booking, konfirmasi, VA, cancel
│       │       ├── ticket/       # Verifikasi tiket
│       │       └── chat/         # Live Chat SSE
│       ├── components/           # Reusable components
│       ├── store/                # Zustand stores
│       └── lib/                  # Utilities, DB, bookingStore, Midtrans
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

## 🚀 Cara Menjalankan

### Development (tanpa Docker)
```bash
cd senja-wisata
npm install
cp .env.local.example .env.local   # isi konfigurasi
npm run dev
```

### Dengan Docker
```bash
docker-compose up -d
```
Akses: `http://localhost:3000` | phpMyAdmin: `http://localhost:8080`

---

<div align="center">
  <p>Dibuat oleh <strong>WagYu31</strong></p>
  <p>PT. Senja Wisata Indonesia — <em>Liburan Impian Anda</em></p>
</div>
