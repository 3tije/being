# BEING Biro Psikologi — Aplikasi Final

Prototype PWA profesional berdasarkan alur:
Registrasi/Login → Identitas → Input Kebutuhan → Matching Engine → Pilih Profesional →
Model Layanan → Penjadwalan → Konsultasi → Laporan → Pembayaran → Notifikasi.

## Isi paket
- `index.html` — seluruh tampilan aplikasi
- `styles.css` — desain responsif desktop/mobile
- `app.js` — interaksi, simulasi dashboard, matching, booking, chat, pembayaran
- `manifest.json` + `sw.js` — dukungan PWA
- `supabase-schema.sql` — rancangan database produksi
- `assets/` — logo dan ikon Being

## Cara menjalankan
Jangan dibuka hanya dengan klik ganda bila ingin service worker aktif.

### Opsi 1: VS Code
1. Buka folder.
2. Pasang ekstensi Live Server.
3. Klik kanan `index.html` → Open with Live Server.

### Opsi 2: Python
Jalankan:
`python -m http.server 8080`
Lalu buka `http://localhost:8080`.

## Mode yang tersedia
- Beranda publik
- Form kebutuhan layanan
- Daftar dan filter profesional
- Pemilihan model layanan
- Penjadwalan
- Dashboard klien
- Dashboard profesional
- Chat simulasi
- Laporan hasil
- Pembayaran
- Profil
- PWA installable

## Catatan produksi
Prototype ini masih menggunakan data contoh dan localStorage. Untuk produksi:
1. Hubungkan autentikasi Supabase.
2. Terapkan tabel pada `supabase-schema.sql`.
3. Tambahkan Row Level Security.
4. Integrasikan WhatsApp/email.
5. Integrasikan payment gateway Midtrans/Xendit.
6. Gunakan Google Meet/Zoom/Jitsi untuk telekonsultasi.
7. Tambahkan kebijakan privasi, persetujuan tindakan, dan audit log.
8. Lakukan uji keamanan dan kepatuhan sebelum menangani data klinis nyata.


## Pembaruan identitas final
- Menggunakan logo resmi BEING Biro Psikologi dari pemilik.
- Logo diterapkan pada header, sidebar, footer, halaman login, favicon, dan PWA.
- Tidak ada perubahan bentuk atau filosofi logo.
- Ikon Android/PWA dibuat dari logo resmi dengan ruang aman agar tetap terbaca.
