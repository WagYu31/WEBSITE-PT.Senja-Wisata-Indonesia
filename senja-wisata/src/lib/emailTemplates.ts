import { SMTP_FROM } from "./email";

// Shared email wrapper with Senja Wisata branding
function emailWrapper(title: string, content: string): string {
    return `
        <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#f8fafc;">
            <div style="background:linear-gradient(135deg,#05073C,#1e3a5f);padding:30px;text-align:center;border-radius:12px 12px 0 0;">
                <h1 style="color:white;margin:0;font-size:22px;">✈️ Senja Wisata</h1>
                <p style="color:rgba(255,255,255,0.6);margin:5px 0 0;font-size:13px;">PT. Senja Wisata Indonesia</p>
            </div>
            <div style="padding:30px;background:#ffffff;border:1px solid #e5e7eb;border-top:0;">
                <h2 style="color:#05073C;margin:0 0 20px;font-size:20px;">${title}</h2>
                ${content}
            </div>
            <div style="padding:20px;background:#f1f5f9;text-align:center;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px;">
                <p style="color:#94a3b8;font-size:11px;margin:0;">
                    &copy; 2026 PT. Senja Wisata Indonesia. All rights reserved.<br/>
                    <a href="https://fluentlya.com" style="color:#2BBEE8;">fluentlya.com</a>
                </p>
            </div>
        </div>
    `;
}

function infoRow(label: string, value: string): string {
    return `<tr><td style="padding:8px 12px;color:#64748b;font-size:14px;border-bottom:1px solid #f1f5f9;">${label}</td><td style="padding:8px 12px;color:#1e293b;font-size:14px;font-weight:600;border-bottom:1px solid #f1f5f9;">${value}</td></tr>`;
}

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

// ─── 1. Booking Created ─────────────────────────────────────
export function bookingCreatedEmail(data: {
    userName: string;
    bookingCode: string;
    tourTitle: string;
    tourDate: string;
    adults: number;
    children: number;
    totalPrice: number;
}) {
    const content = `
        <p style="color:#334155;line-height:1.7;margin:0 0 20px;">
            Halo <strong>${data.userName}</strong>, booking Anda telah berhasil dibuat! 
            Silakan selesaikan pembayaran untuk mengkonfirmasi reservasi.
        </p>
        <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;overflow:hidden;margin:0 0 20px;">
            ${infoRow("📋 Kode Booking", data.bookingCode)}
            ${infoRow("🏝️ Paket Tour", data.tourTitle)}
            ${infoRow("📅 Tanggal", data.tourDate)}
            ${infoRow("👥 Tamu", `${data.adults} Dewasa${data.children > 0 ? `, ${data.children} Anak` : ""}`)}
            ${infoRow("💰 Total", formatRupiah(data.totalPrice))}
            ${infoRow("📌 Status", '<span style="color:#f59e0b;font-weight:700;">Menunggu Pembayaran</span>')}
        </table>
        <div style="text-align:center;margin:25px 0;">
            <a href="https://fluentlya.com/dashboard/trips" 
               style="display:inline-block;background:#ef4444;color:white;padding:14px 32px;
                      border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;">
                🎫 Lihat Booking Saya
            </a>
        </div>
    `;
    return {
        subject: `Booking Dibuat — ${data.bookingCode} | Senja Wisata`,
        html: emailWrapper("Booking Berhasil Dibuat! 🎉", content),
    };
}

// ─── 2. Booking Status Change ────────────────────────────────
export function bookingStatusEmail(data: {
    userName: string;
    bookingCode: string;
    tourTitle: string;
    status: string;
    reason?: string;
}) {
    const statusMap: Record<string, { label: string; color: string; emoji: string; message: string }> = {
        confirmed: { label: "Dikonfirmasi", color: "#10b981", emoji: "✅", message: "Booking Anda telah dikonfirmasi! Siapkan diri Anda untuk petualangan yang menyenangkan." },
        completed: { label: "Selesai", color: "#3b82f6", emoji: "🏆", message: "Perjalanan Anda telah selesai. Terima kasih telah memilih Senja Wisata!" },
        cancelled: { label: "Dibatalkan", color: "#ef4444", emoji: "❌", message: "Booking Anda telah dibatalkan." + (data.reason ? ` Alasan: ${data.reason}` : "") },
    };
    const info = statusMap[data.status] || { label: data.status, color: "#64748b", emoji: "📋", message: "Status booking Anda telah diperbarui." };

    const content = `
        <p style="color:#334155;line-height:1.7;margin:0 0 20px;">
            Halo <strong>${data.userName}</strong>, ${info.message}
        </p>
        <div style="background:${info.color}15;border-left:4px solid ${info.color};padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 20px;">
            <p style="margin:0;font-size:18px;font-weight:700;color:${info.color};">${info.emoji} ${info.label}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;overflow:hidden;margin:0 0 20px;">
            ${infoRow("📋 Kode Booking", data.bookingCode)}
            ${infoRow("🏝️ Paket Tour", data.tourTitle)}
        </table>
        <div style="text-align:center;margin:25px 0;">
            <a href="https://fluentlya.com/dashboard/trips" 
               style="display:inline-block;background:#05073C;color:white;padding:14px 32px;
                      border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;">
                🎫 Lihat Detail Booking
            </a>
        </div>
    `;
    return {
        subject: `${info.emoji} Booking ${info.label} — ${data.bookingCode} | Senja Wisata`,
        html: emailWrapper(`Status Booking: ${info.label}`, content),
    };
}

// ─── 3. Payment Success / Receipt ────────────────────────────
export function paymentSuccessEmail(data: {
    userName: string;
    bookingCode: string;
    tourTitle: string;
    tourDate: string;
    adults: number;
    children: number;
    totalPrice: number;
    paymentMethod?: string;
    transactionId?: string;
}) {
    const content = `
        <p style="color:#334155;line-height:1.7;margin:0 0 20px;">
            Halo <strong>${data.userName}</strong>, pembayaran Anda telah berhasil! 
            Berikut adalah bukti pembayaran Anda.
        </p>
        <div style="background:#ecfdf5;border-left:4px solid #10b981;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 20px;">
            <p style="margin:0;font-size:18px;font-weight:700;color:#10b981;">✅ Pembayaran Berhasil</p>
        </div>
        <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;overflow:hidden;margin:0 0 20px;">
            ${infoRow("📋 Kode Booking", data.bookingCode)}
            ${infoRow("🏝️ Paket Tour", data.tourTitle)}
            ${infoRow("📅 Tanggal", data.tourDate)}
            ${infoRow("👥 Tamu", `${data.adults} Dewasa${data.children > 0 ? `, ${data.children} Anak` : ""}`)}
            ${infoRow("💳 Metode", data.paymentMethod || "Online Payment")}
            ${data.transactionId ? infoRow("🔖 ID Transaksi", data.transactionId) : ""}
            ${infoRow("💰 Total Dibayar", `<span style="color:#10b981;font-size:18px;">${formatRupiah(data.totalPrice)}</span>`)}
            ${infoRow("📌 Status", '<span style="color:#10b981;font-weight:700;">LUNAS</span>')}
        </table>
        <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0 0 20px;">
            Simpan email ini sebagai bukti pembayaran Anda.
        </p>
        <div style="text-align:center;margin:25px 0;">
            <a href="https://fluentlya.com/dashboard/trips" 
               style="display:inline-block;background:#10b981;color:white;padding:14px 32px;
                      border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;">
                🎫 Lihat E-Ticket
            </a>
        </div>
    `;
    return {
        subject: `✅ Pembayaran Berhasil — ${data.bookingCode} | Senja Wisata`,
        html: emailWrapper("Bukti Pembayaran 🧾", content),
    };
}

// ─── 4. Document Verification ────────────────────────────────
export function documentVerificationEmail(data: {
    userName: string;
    bookingCode: string;
    tourTitle: string;
    status: "verified" | "rejected";
    documentType?: string;
    reason?: string;
}) {
    const isVerified = data.status === "verified";
    const content = `
        <p style="color:#334155;line-height:1.7;margin:0 0 20px;">
            Halo <strong>${data.userName}</strong>, dokumen Anda telah ditinjau oleh tim kami.
        </p>
        <div style="background:${isVerified ? "#ecfdf5" : "#fef2f2"};border-left:4px solid ${isVerified ? "#10b981" : "#ef4444"};padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 20px;">
            <p style="margin:0;font-size:18px;font-weight:700;color:${isVerified ? "#10b981" : "#ef4444"};">
                ${isVerified ? "✅ Dokumen Diverifikasi" : "❌ Dokumen Ditolak"}
            </p>
            ${!isVerified && data.reason ? `<p style="margin:8px 0 0;color:#64748b;font-size:14px;">Alasan: ${data.reason}</p>` : ""}
        </div>
        <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;overflow:hidden;margin:0 0 20px;">
            ${infoRow("📋 Kode Booking", data.bookingCode)}
            ${infoRow("🏝️ Paket Tour", data.tourTitle)}
            ${data.documentType ? infoRow("📄 Tipe Dokumen", data.documentType) : ""}
        </table>
        ${!isVerified ? `
        <p style="color:#334155;line-height:1.7;margin:0 0 20px;">
            Silakan upload ulang dokumen yang benar melalui dashboard Anda.
        </p>` : ""}
        <div style="text-align:center;margin:25px 0;">
            <a href="https://fluentlya.com/dashboard/trips" 
               style="display:inline-block;background:#05073C;color:white;padding:14px 32px;
                      border-radius:12px;text-decoration:none;font-weight:bold;font-size:15px;">
                📄 Lihat Detail
            </a>
        </div>
    `;
    return {
        subject: `${isVerified ? "✅" : "❌"} Dokumen ${isVerified ? "Diverifikasi" : "Ditolak"} — ${data.bookingCode} | Senja Wisata`,
        html: emailWrapper(`Status Dokumen: ${isVerified ? "Diverifikasi" : "Ditolak"}`, content),
    };
}
