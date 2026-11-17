# Shop-Mate UNKLAB

Marketplace berbasis web eksklusif yang dirancang untuk mendukung kegiatan jual beli di lingkungan civitas akademika Universitas Klabat (UNKLAB), menyediakan platform terpusat yang aman, terstruktur, dan terverifikasi menggunakan email resmi kampus.

![Halaman utama](docs/screenshots/01_halaman_utama.png)

| | |
|---|---|
| **Mata kuliah** | System Analysis and Design — Fakultas Ilmu Komputer, Universitas Klabat |
| **Kelompok** | Kelompok Well — Model SDLC: Agile |
| **Objek / studi kasus** | Civitas Akademika Universitas Klabat (Mahasiswa, Dosen, Staf, dan Tenant) |
| **Model SDLC** | Agile (Iteratif / Sprint) |
| **Dokumen SRS** | [docs/SAD_FP_Kelompok_SRS.pdf](docs/) |
| **Prototipe UI** | [Figma UI/UX Design](https://www.figma.com/…) |

## Anggota Kelompok

| No | Nama | NIM | Peran | Kontribusi utama |
|----|------|-----|-------|------------------|
| 1 | Pattilamonia, Christina J. | [isi NIM] | Project Manager / Koordinator | Perencanaan jadwal, pengawasan task, dan koordinasi tim |
| 2 | Palari, Sisiani | [isi NIM] | System Analyst | Elisitasi kebutuhan, pembuatan use case, dan activity diagram |
| 3 | Kartika Sari | [isi NIM] | System Designer / Analis UML | Perancangan arsitektur basis data, ERD, dan class diagram |
| 4 | Ayu Ningsi | [isi NIM] | UI/UX Designer | Perancangan wireframe dan prototipe antarmuka di Figma |

## Latar Belakang

- **Masalah:** Warga kampus Universitas Klabat mengalami kesulitan dalam melacak stok barang, merekap pesanan, dan sering terjadi miskomunikasi karena proses jual-beli saat ini masih mengandalkan grup WhatsApp, Instagram, serta pencatatan manual di buku atau Excel.
- **Kondisi saat ini (As-Is):** Promosi dilakukan di media sosial, negosiasi secara chat pribadi, dan pembayaran/COD tanpa rekapitulasi data terpusat yang rapi.
- **Tujuan sistem:** Menyediakan platform e-commerce kampus yang mengotomatisasi pencatatan katalog produk, keranjang belanja, *checkout*, pemilihan metode pembayaran, pemantauan status pesanan, hingga dasbor laporan penjualan bagi penjual dan administrator.
- **Pengguna (Aktor):** 
  - **Pembeli (Mahasiswa, Dosen, Staf):** Mencari produk, mengelola keranjang, *checkout*, memilih metode pembayaran, dan memantau status pesanan.
  - **Penjual (Tenant):** Mengelola produk (tambah, edit, nonaktifkan), mengelola pesanan masuk, melihat informasi pembeli, mengatur visibilitas, dan memantau popularitas produk.
  - **Administrator:** Mengelola akun pengguna, memantau produk, mengelola kategori, serta mengawasi seluruh catatan transaksi sistem.

## Fitur Utama (Berdasarkan 27 Use Case)

| No | Fitur | Aktor | Use Case | Kebutuhan |
|----|-------|-------|----------|-----------|
| 1 | Registrasi Akun Civitas | Pembeli | UC-01 | FR-01 |
| 2 | Login & Autentikasi Berbasis Peran | Semua Aktor | UC-02 | FR-02 |
| 3 | Katalog Produk & Pencarian | Pembeli | UC-03, UC-04, UC-05 | FR-03, FR-04, FR-05 |
| 4 | Keranjang Belanja & Checkout | Pembeli | UC-06, UC-07, UC-08 | FR-06, FR-07, FR-08 |
| 5 | Pemantauan Status Pesanan | Pembeli | UC-09 | FR-09 |
| 6 | Pengelolaan Profil Pengguna | Semua Aktor | UC-10 | FR-10 |
| 7 | Pengelolaan Produk & Stok Toko | Penjual | UC-11, UC-12, UC-13, UC-14, UC-19, UC-20 | FR-11 s.d. FR-14, FR-19, FR-20 |
| 8 | Manajemen Pesanan & Notifikasi Tenant | Penjual | UC-15, UC-16, UC-17, UC-18 | FR-15 s.d. FR-18 |
| 9 | Administrasi Pengguna & Sistem | Administrator | UC-21 s.d. UC-27 | FR-21 s.d. FR-27 |

## Screenshot

**[UC-01 & UC-02] Halaman Registrasi & Login**

![Login](docs/screenshots/02_uc01.png)

**[UC-03] Katalog Produk & Dashboard Pembeli**

![Dashboard](docs/screenshots/03_uc02.png)

**Validasi Sistem & Keamanan Input**

![Validasi](docs/screenshots/10_validasi.png)

## Teknologi

| Lapisan | Teknologi | Alasan / Keterangan |
|---------|-----------|---------------------|
| Front-end | React, Vite, Tailwind CSS | Mudah diintegrasikan, responsif di mobile & desktop |
| Back-end / Storage | Node.js / PHP & LocalStorage (Prototyping) | Tangguh untuk request data dan simulasi basis data klien |
| Database | MySQL / MariaDB | Relasional, sangat cocok untuk struktur transaksi e-commerce |
| Tools pemodelan | Figma, Draw.io | Desain antarmuka kolaboratif dan perancangan diagram UML |

## Kebutuhan Sistem

- Node.js 18.x atau lebih baru
- Git
- Browser web modern (Google Chrome, Mozilla Firefox, Microsoft Edge)

## Instalasi dan Menjalankan Aplikasi

1. Clone repository:

   ```bash
   git clone https://github.com/s22229040-dotcom/shop-mate-unklab.git
   cd shop-mate-unklab
   ```

2. Masuk ke direktori frontend dan pasang dependensi:

   ```bash
   cd frontend
   npm install
   ```

3. Jalankan server pengembangan lokal:

   ```bash
   npm run dev
   ```

4. Buka tautan `http://localhost:5173` di browser Anda.

### Akun Uji

| Aktor | Email / Username | Keterangan Peran |
|-------|------------------|------------------|
| **Administrator** | admin@unklab.ac.id | Akses penuh kontrol sistem dan pengguna |
| **Penjual (Tenant)** | tenant@unklab.ac.id | Pengelolaan produk dan pesanan toko |
| **Pembeli (Mahasiswa)** | s23142847@student.unklab.ac.id | Katalog, keranjang, dan transaksi |

## Struktur Folder

```text
shop-mate-unklab/
├── .vscode/
├── backend/
├── frontend/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   │   ├── download.jpg
│   │   └── logo.png
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FacultyDashboard.jsx
│   │   │   ├── login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── SellerDashboard.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── vercel.json
```

## Rancangan Sistem (SRS Summary)

Ringkasan artefak perancangan sistem yang bersumber dari dokumen SRS Kelompok Well:
- **Use Case Diagram & Deskripsi:** 27 Use Case fungsional mencakup aktor Pembeli, Penjual, dan Administrator (SRS Bagian 6).
- **Activity & Sequence Diagram:** Pemodelan interaksi lengkap AD-01 s.d. AD-27 dan SD-01 s.d. SD-27 (SRS Bagian 6 & 7).
- **Class Diagram & Data Model (ERD):** Pemetaan entitas Pengguna, Pembeli, Penjual, Administrator, Produk, Kategori, Pesanan, Detail Pesanan, Pembayaran, Keranjang, dan Transaksi (SRS Bagian 7 & 8).
- **Prototipe UI/UX:** 24 rancangan halaman interaktif (L-01 s.d. L-24) dirancang di Figma (SRS Bagian 9).

## Pengujian (Testing)

Menggunakan metode Black-Box Testing berdasarkan matriks keterlacakan fungsi (TC-01 s.d. TC-27):

| ID Uji | Use Case | Skenario Pengujian | Hasil yang Diharapkan | Status |
|--------|----------|--------------------|------------------------|--------|
| TC-01 | UC-01 | Registrasi dengan format NIM mahasiswa valid | Akun baru tersimpan di sistem | Lulus |
| TC-02 | UC-02 | Login dengan kredensial benar sesuai peran | Masuk ke dasbor masing-masing aktor | Lulus |
| TC-03 | UC-07 | Melakukan checkout saat keranjang terisi | Ringkasan pesanan dan metode pembayaran muncul | Lulus |
| TC-04 | UC-12 | Penjual menambahkan produk baru ke katalog | Produk tampil di etalase pembeli | Lulus |
| TC-05 | UC-21 | Administrator mengelola atau menonaktifkan akun | Status akun diperbarui secara real-time | Lulus |

## Keterbatasan dan Pengembangan Berikutnya

- Penyimpanan data operasional saat ini memanfaatkan *LocalStorage* sisi klien untuk kebutuhan prototipe cepat dan kemudahan demonstrasi portabel.
- Integrasi pembayaran riil (*Payment Gateway* pihak ketiga) disimulasikan menggunakan pilihan metode pembayaran transfer dan COD internal kampus.

## Penggunaan AI dan Referensi

| Alat AI | Dipakai untuk | Bagian Dokumen / Kode |
|---------|---------------|------------------------|
| LLM / Gemini | Penyusunan draf teks laporan SRS dan struktur logika komponen React | Bagian 1 s.d. 12 & modul autentikasi frontend |

Referensi:
1. Dokumentasi Resmi React — [https://react.dev](https://react.dev)
2. Dokumentasi Tailwind CSS — [https://tailwindcss.com](https://tailwindcss.com)