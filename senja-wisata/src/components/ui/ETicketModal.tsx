"use client";

import { useState } from "react";
import { X, Printer, MapPin, Calendar, Users, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

type Booking = {
  booking_code: string;
  tour_title?: string;
  tour_location?: string;
  tour_image?: string;
  tour_date: string;
  guests: number;
  adults: number;
  children: number;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
};

interface ETicketModalProps {
  booking: Booking;
  userName?: string;
  userEmail?: string;
  onClose: () => void;
}

export default function ETicketModal({ booking, userName, userEmail, onClose }: ETicketModalProps) {
  const [printing, setPrinting] = useState(false);

  const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "")}/ticket/${booking.booking_code}`;
  const tourDate = new Date(booking.tour_date);
  const formattedDate = tourDate.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const handlePrint = () => {
    setPrinting(true);

    // Build QR code as SVG data URL using a simple URL-safe QR
    // We'll use a Google Charts QR API as the QR image src for the popup
    const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrUrl)}&color=05073C&bgcolor=ffffff`;

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8"/>
  <title>E-Ticket ${booking.booking_code} - Senja Wisata</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f1f5f9; display:flex; justify-content:center; align-items:flex-start; min-height:100vh; padding:20px; }
    .ticket { width:480px; background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.15); }
    .header { background:linear-gradient(135deg,#05073C 0%,#0a1564 60%,#1a2d8a 100%); padding:24px; color:#fff; position:relative; overflow:hidden; }
    .header::before { content:''; position:absolute; top:-30px; right:-30px; width:120px; height:120px; border-radius:50%; background:rgba(255,255,255,0.08); }
    .logo-row { display:flex; align-items:center; gap:10px; margin-bottom:16px; }
    .logo-box { width:32px; height:32px; background:rgba(255,255,255,0.2); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; }
    .logo-name { font-weight:700; font-size:13px; }
    .logo-sub { font-size:11px; opacity:0.6; }
    .ticket-label { font-size:10px; text-transform:uppercase; letter-spacing:1px; opacity:0.6; margin-bottom:4px; }
    .tour-name { font-size:22px; font-weight:700; margin-bottom:4px; }
    .location { font-size:13px; opacity:0.8; }
    .tear-line { display:flex; align-items:center; background:#f8fafc; }
    .circle { width:20px; height:20px; border-radius:50%; background:linear-gradient(135deg,#05073C,#1a2d8a); flex-shrink:0; }
    .circle-left { margin-left:-10px; }
    .circle-right { margin-right:-10px; }
    .dashed { flex:1; border-top:2px dashed #cbd5e1; margin:0 8px; }
    .body { padding:20px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
    .field-label { font-size:10px; text-transform:uppercase; font-weight:600; color:#94a3b8; margin-bottom:4px; }
    .field-value { font-weight:700; color:#1e293b; font-size:13px; }
    .field-sub { font-size:11px; color:#94a3b8; font-weight:400; }
    .paid-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; background:#ecfdf5; color:#059669; border-radius:20px; font-size:11px; font-weight:700; }
    .divider { border:none; border-top:2px dashed #e2e8f0; margin:16px 0; }
    .total-row { display:flex; align-items:flex-end; justify-content:space-between; }
    .total-label { font-size:10px; text-transform:uppercase; font-weight:600; color:#94a3b8; margin-bottom:4px; }
    .total-price { font-size:26px; font-weight:700; color:#E85D04; }
    .qr-box { text-align:center; }
    .qr-img { width:84px; height:84px; border:2px solid #e2e8f0; border-radius:10px; padding:4px; }
    .qr-label { font-size:10px; color:#94a3b8; margin-top:4px; }
    .code-bar { background:#1e293b; color:#fff; border-radius:12px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; margin-top:16px; }
    .code-label { font-size:10px; color:#94a3b8; margin-bottom:2px; }
    .booking-code { font-family:monospace; font-size:20px; font-weight:700; letter-spacing:4px; }
    .ticket-id { font-family:monospace; font-size:11px; color:#94a3b8; }
    .footer-note { text-align:center; font-size:11px; color:#94a3b8; margin-top:12px; line-height:1.6; }
    @media print {
      body { background:white; padding:0; }
      .ticket { box-shadow:none; border-radius:0; width:100%; max-width:480px; margin:auto; }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="header">
      <div class="logo-row">
        <div class="logo-box">SW</div>
        <div>
          <div class="logo-name">PT. Senja Wisata Indonesia</div>
          <div class="logo-sub">Liburan Impian Anda</div>
        </div>
      </div>
      <div class="ticket-label">E-Ticket Perjalanan</div>
      <div class="tour-name">${booking.tour_title || "Tour Package"}</div>
      <div class="location">📍 ${booking.tour_location || "Indonesia"}</div>
    </div>
    <div class="tear-line">
      <div class="circle circle-left"></div>
      <div class="dashed"></div>
      <div class="circle circle-right"></div>
    </div>
    <div class="body">
      <div class="grid">
        <div>
          <div class="field-label">📅 Tanggal Berangkat</div>
          <div class="field-value">${formattedDate}</div>
          <div class="field-sub" style="margin-top:2px">⏰ Jam Keberangkatan: 08:00 WIB</div>
        </div>
        <div>
          <div class="field-label">👥 Jumlah Peserta</div>
          <div class="field-value">${booking.guests} Orang <span class="field-sub">(${booking.adults} Dewasa${booking.children > 0 ? ` + ${booking.children} Anak` : ""})</span></div>
        </div>
        ${userName ? `<div><div class="field-label">Nama Pemesan</div><div class="field-value">${userName}</div></div>` : ""}
        ${userEmail ? `<div><div class="field-label">Email</div><div class="field-value" style="font-size:11px">${userEmail}</div></div>` : ""}
        <div>
          <div class="field-label">🕐 Tanggal Booking</div>
          <div class="field-value">${new Date(booking.created_at).toLocaleDateString("id-ID")}</div>
        </div>
        <div>
          <div class="field-label">Status Pembayaran</div>
          <div class="paid-badge">✓ Lunas</div>
        </div>
      </div>
      <hr class="divider">
      <div class="total-row">
        <div>
          <div class="total-label">Total Pembayaran</div>
          <div class="total-price">${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(booking.total_price)}</div>
        </div>
        <div class="qr-box">
          <img class="qr-img" src="${qrImgSrc}" alt="QR Code" crossorigin="anonymous"/>
          <div class="qr-label">Scan QR</div>
        </div>
      </div>
      <div class="code-bar">
        <div>
          <div class="code-label">Kode Booking</div>
          <div class="booking-code">${booking.booking_code}</div>
        </div>
        <div style="text-align:right">
          <div class="code-label">ID Tiket</div>
          <div class="ticket-id">SW-${booking.booking_code}-${booking.total_price}</div>
        </div>
      </div>
      <div class="footer-note">
        Harap tunjukkan e-ticket ini saat check-in perjalanan Anda.<br/>
        Hubungi kami di info@senjawisata.com untuk bantuan.
      </div>
    </div>
  </div>
  <script>
    // Wait for QR image to load then print
    window.onload = function() {
      var img = document.querySelector('img');
      if (img && !img.complete) {
        img.onload = function() { setTimeout(window.print, 300); };
        img.onerror = function() { setTimeout(window.print, 300); };
      } else {
        setTimeout(window.print, 500);
      }
      window.onafterprint = function() { window.close(); };
    };
  </script>
</body>
</html>`;

    const popup = window.open("", "_blank", "width=600,height=800,scrollbars=yes");
    if (popup) {
      popup.document.write(html);
      popup.document.close();
    } else {
      alert("Browser memblokir popup. Izinkan popup untuk localhost:3000 di browser Anda.");
    }

    setTimeout(() => setPrinting(false), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl my-4">
        {/* Actions header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">E-Ticket</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              disabled={printing}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all disabled:opacity-70"
            >
              <Printer size={14} />
              {printing ? "Mencetak..." : "Print / Save PDF"}
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ===== TICKET DESIGN (rendered to PDF) ===== */}
        <div className="p-6 bg-white">
          {/* Header */}
          <div className="rounded-2xl overflow-hidden mb-0" style={{ background: "linear-gradient(135deg, #05073C 0%, #0a1564 60%, #1a2d8a 100%)" }}>
            <div className="p-6 text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ background: "white" }} />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10" style={{ background: "white" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SW</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm">PT. Senja Wisata Indonesia</div>
                    <div className="text-white/60 text-xs">Liburan Impian Anda</div>
                  </div>
                </div>

                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">E-Ticket Perjalanan</div>
                <h2 className="text-2xl font-bold mb-1">{booking.tour_title || "Tour Package"}</h2>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <MapPin size={12} />
                  <span>{booking.tour_location || "Indonesia"}</span>
                </div>
              </div>
            </div>

            {/* Ticket tear line */}
            <div className="flex items-center" style={{ background: "#f8fafc" }}>
              <div className="w-5 h-5 rounded-full" style={{ background: "linear-gradient(135deg, #05073C 0%, #1a2d8a 100%)", marginLeft: "-10px" }} />
              <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-2" />
              <div className="w-5 h-5 rounded-full" style={{ background: "linear-gradient(135deg, #05073C 0%, #1a2d8a 100%)", marginRight: "-10px" }} />
            </div>
          </div>

          {/* Ticket body */}
          <div className="border border-slate-200 border-t-0 rounded-b-2xl overflow-hidden">
            <div className="p-5 bg-slate-50/50 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-1 text-slate-400 text-xs uppercase font-semibold mb-1">
                  <Calendar size={10} /> Tanggal Berangkat
                </div>
                <div className="font-bold text-slate-800">{formattedDate}</div>
                <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                  <Clock size={10} /> Jam Keberangkatan: <span className="font-semibold">08:00 WIB</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-slate-400 text-xs uppercase font-semibold mb-1">
                  <Users size={10} /> Jumlah Peserta
                </div>
                <div className="font-bold text-slate-800">
                  {booking.guests} Orang
                  <span className="text-xs text-slate-400 font-normal ml-1">
                    ({booking.adults} Dewasa{booking.children > 0 ? `, ${booking.children} Anak` : ""})
                  </span>
                </div>
              </div>
              {userName && (
                <div>
                  <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Nama Pemesan</div>
                  <div className="font-bold text-slate-800">{userName}</div>
                </div>
              )}
              {userEmail && (
                <div>
                  <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Email</div>
                  <div className="font-bold text-slate-800 text-xs break-all">{userEmail}</div>
                </div>
              )}
              <div>
                <div className="flex items-center gap-1 text-slate-400 text-xs uppercase font-semibold mb-1">
                  <Clock size={10} /> Tanggal Booking
                </div>
                <div className="font-bold text-slate-800">
                  {new Date(booking.created_at).toLocaleDateString("id-ID")}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-xs uppercase font-semibold mb-1">Status Pembayaran</div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                  ✓ Lunas
                </div>
              </div>
            </div>

            {/* Total & QR Code */}
            <div className="border-t border-dashed border-slate-200 p-5 flex items-end justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Total Pembayaran</div>
                <div className="text-2xl font-bold" style={{ color: "#E85D04" }}>{formatPrice(booking.total_price)}</div>
              </div>
              {/* Real QR code */}
              <div className="text-center">
                <div className="w-20 h-20 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center p-1">
                  <QRCodeSVG
                    value={`${process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "")}/ticket/${booking.booking_code}`}
                    size={64}
                    level="M"
                    fgColor="#05073C"
                    bgColor="#ffffff"
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1">Scan QR</div>
              </div>
            </div>

            {/* Booking code footer */}
            <div className="px-5 pb-5">
              <div className="bg-slate-800 text-white rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-xs mb-0.5">Kode Booking</div>
                  <div className="font-mono font-bold text-lg tracking-widest">{booking.booking_code}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-xs mb-0.5">ID Tiket</div>
                  <div className="font-mono text-xs text-slate-300">{`SW-${booking.booking_code}`.substring(0, 16)}</div>
                </div>
              </div>
              <p className="text-center text-xs text-slate-400 mt-3">
                Harap tunjukkan e-ticket ini saat check-in perjalanan Anda.<br />
                Hubungi kami di info@senjawisata.com untuk bantuan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
