# Shop-Mate UNKLAB

Sistem informasi berbasis web berupa marketplace untuk lingkungan Universitas Klabat yang membantu Pembeli, Penjual, dan Administrator melakukan jual beli, mengelola produk dan pesanan, serta memantau transaksi agar proses jual beli di kampus lebih terstruktur dan tidak lagi tercecer di chat.

![Halaman utama](docs/screenshots/01_gambar_halaman_pertama.png)

| | |
|---|---|
| **Mata kuliah** | System Analysis and Design — Fakultas Ilmu Komputer, Universitas Klabat |
| **Kelompok** | [N] — Well |
| **Objek / studi kasus** | Kegiatan jual beli mahasiswa, dosen, dan staf di Universitas Klabat |
| **Model SDLC** | Agile |
| **Dokumen SRS** | [docs/SAD_FP_Kelompok[N]_SRS.pdf](docs/) |
| **Prototipe UI** | [https://www.figma.com/…] |
| **Aplikasi (deploy)** | [https://shop-mate-unklab-xpmy.vercel.app](https://shop-mate-unklab-xpmy.vercel.app) |

## Anggota Kelompok

| No | Nama | NIM | Peran | Kontribusi utama |
|----|------|-----|-------|------------------|
| 1 | Pattilamonia, Christina J. | 105022410098 | Project Manager / Koordinator | Perencanaan jadwal, pengawasan task, koordinasi tim, repository |
| 2 | Palari, Sisiani | 105012410097 | System Analyst | Elisitasi kebutuhan, use case, dan activity diagram |
| 3 | Kartika Sari | 1050112410022 | System Designer / Analis UML | Arsitektur basis data, ERD, dan class diagram |
| 4 | Ayu Ningsi | 105022410100 | UI/UX Designer | Wireframe dan prototipe antarmuka di Figma (L-01 s.d. L-24) |

## Latar Belakang

- **Masalah:** Penjual dan pembeli di kampus kesulitan melacak stok barang dan merekap pesanan karena semua dilakukan lewat chat; sering terjadi miskomunikasi stok.
- **Kondisi saat ini:** Penjual mengunggah foto barang di grup WhatsApp kampus, pembeli menghubungi lewat chat pribadi, harga dan tempat transaksi (umumnya COD di area kampus) disepakati sendiri, dan pencatatan dilakukan manual di buku tulis atau Microsoft Excel.
- **Tujuan sistem:** Menyediakan satu tempat bagi warga kampus untuk menawarkan, mencari, dan memesan produk dengan alur yang jelas (keranjang, checkout, pemilihan metode pembayaran, dan pemantauan status pesanan), serta membantu Administrator mengelola pengguna, produk, kategori, dan transaksi.
- **Pengguna (aktor):**
  - **Pembeli**: mahasiswa, dosen, atau staf yang membeli produk (registrasi, login, katalog, pencarian, keranjang, checkout, status pesanan, profil).
  - **Penjual**: pengguna yang menjual produk (kelola produk, kelola pesanan dan status, lihat informasi pembeli, notifikasi, visibilitas, popularitas produk, profil).
  - **Administrator**: pengelola sistem (kelola pengguna, produk, kategori, transaksi, dan profil).

## Fitur Utama

Setiap fitur dipetakan ke use case dan kebutuhan di SRS (Bagian 5.2 dan 6.3).

| No | Fitur | Aktor | Use case | Kebutuhan |
|----|-------|-------|----------|-----------|
| 1 | Registrasi dan login | Pembeli, Penjual, Administrator | UC-01, UC-02 | FR-01, FR-02 |
| 2 | Katalog, pencarian, dan detail produk | Pembeli | UC-03, UC-04, UC-05 | FR-03, FR-04, FR-05 |
| 3 | Keranjang, checkout, dan metode pembayaran | Pembeli | UC-06, UC-07, UC-08 | FR-06, FR-07, FR-08 |
| 4 | Status pesanan | Pembeli | UC-09 | FR-09 |
| 5 | Kelola profil | Semua aktor | UC-10 | FR-10 |
| 6 | Kelola produk (tambah, edit, nonaktifkan, visibilitas) | Penjual | UC-11, UC-12, UC-13, UC-14, UC-19 | FR-11, FR-12, FR-13, FR-14, FR-19 |
| 7 | Kelola pesanan, status, informasi pembeli, dan notifikasi | Penjual | UC-15, UC-16, UC-17, UC-18 | FR-15, FR-16, FR-17, FR-18 |
| 8 | Popularitas produk | Penjual | UC-20 | FR-20 |
| 9 | Kelola pengguna | Administrator | UC-21, UC-22, UC-23, UC-24 | FR-21, FR-22, FR-23, FR-24 |
| 10 | Kelola produk dan kategori | Administrator | UC-25, UC-26 | FR-25, FR-26 |
| 11 | Lihat dan kelola transaksi | Administrator | UC-27 | FR-27 |

## Screenshot

**Halaman pertama: login dan registrasi (UC-01, UC-02)**

![Halaman login](docs/screenshots/01_gambar_halaman_pertama.png)

**Dashboard Pembeli: katalog, keranjang, checkout, status pesanan (UC-03 s.d. UC-09)**

![Dashboard Pembeli](docs/screenshots/08_gambar_halaman_pembeli.png)

**Dashboard Penjual: kelola produk dan stok, pesanan masuk, laporan saldo (UC-11 s.d. UC-20)**

![Dashboard Penjual](docs/screenshots/02_gambar_halaman_penjual.png)

**Dashboard Administrator: pengguna, kategori, laporan transaksi, QRIS (UC-21 s.d. UC-27)**

![Dashboard Administrator](docs/screenshots/03_gambar_halaman_admin.png)

**Profil Pembeli (UC-10)**

![Profil Pembeli](docs/screenshots/04_gambar_profil_pembeli.png)

**Profil Penjual (UC-10)**

![Profil Penjual](docs/screenshots/05_gambar_profil_penjual.png)

**Profil dan ganti password Administrator (UC-10)**

![Profil Administrator](docs/screenshots/06_gambar_profil_admin.png)

**Validasi input: pesan error saat password salah**

![Pesan validasi](docs/screenshots/07_gambar_validasi.png)

## Teknologi

| Lapisan | Teknologi | Versi |
|---------|-----------|-------|
| Front-end | React, Vite, Tailwind CSS, PostCSS | [lihat `frontend/package.json`] |
| Autentikasi | Firebase Authentication | [lihat `frontend/package.json`] |
| Back-end | [Node.js / sesuai isi folder `backend/`] | [ ] |
| Database | [Firebase / MySQL — sesuaikan dengan yang dipakai] | [ ] |
| Hosting | Vercel | — |
| Tools pemodelan | draw.io | — |
| Prototipe UI | Figma | — |

## Kebutuhan Sistem

- Node.js 20 atau lebih baru (dan npm)
- Git
- Browser modern (Chrome, Edge, Firefox)
- Akun proyek Firebase (untuk nilai konfigurasi `VITE_FIREBASE_*`)

## Instalasi dan Menjalankan Aplikasi

1. Clone repository:

   ```bash
   git clone https://github.com/s22229040-dotcom/shop-mate-unklab.git
   cd shop-mate-unklab/frontend
   ```

2. Pasang dependensi:

   ```bash
   npm install
   ```

3. Siapkan konfigurasi. Buat file `.env` di folder `frontend/` lalu isi dengan konfigurasi Firebase proyek (nilai diambil dari Firebase Console):

   ```env
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

4. Jalankan aplikasi dalam mode pengembangan:

   ```bash
   npm run dev
   ```

5. Buka [http://localhost:5173](http://localhost:5173) di browser.

6. (Opsional) Build untuk produksi:

   ```bash
   npm run build
   ```

### Akun uji

Hanya akun uji, bukan akun asli siapa pun.

| Aktor | Username / email | Password |
|-------|------------------|----------|
| Administrator | [admin@contoh.test] | [password uji] |
| Penjual | [penjual@contoh.test] | [password uji] |
| Pembeli | [pembeli@contoh.test] | [password uji] |

## Struktur Folder

Struktur kode mengikuti rancangan di SRS Bagian 10.2. Halaman pada `src/pages/` mengacu pada prototipe UI (SRS Bagian 9) dan dibagi berdasarkan peran aktor.

```text
shop-mate-unklab/
├── .vscode/
├── backend/                   # logika server / layanan pendukung
├── frontend/
│   ├── dist/                  # hasil build (otomatis)
│   ├── docs/
│   │   └── screenshots/       # screenshot untuk README
│   │       ├── 01_gambar_halaman_pertama.png
│   │       ├── 02_gambar_halaman_penjual.png
│   │       ├── 03_gambar_halaman_admin.png
│   │       ├── 04_gambar_profil_pembeli.png
│   │       ├── 05_gambar_profil_penjual.png
│   │       ├── 06_gambar_profil_admin.png
│   │       ├── 07_gambar_validasi.png
│   │       └── 08_gambar_halaman_pembeli.png
│   ├── node_modules/          # dependensi (otomatis)
│   ├── public/                # aset statis
│   │   ├── download.jpg
│   │   └── logo.png
│   ├── src/
│   │   ├── pages/             # halaman sesuai peran aktor (prototipe SRS Bagian 9)
│   │   │   ├── login.jsx             # registrasi dan login (UC-01, UC-02)
│   │   │   ├── Dashboard.jsx         # dashboard Pembeli (UC-03 s.d. UC-09)
│   │   │   ├── SellerDashboard.jsx   # dashboard Penjual (UC-11 s.d. UC-20)
│   │   │   ├── AdminDashboard.jsx    # dashboard Administrator (UC-21 s.d. UC-27)
│   │   │   ├── FacultyDashboard.jsx  # dashboard dosen/staf
│   │   │   └── Profile.jsx           # kelola profil (UC-10)
│   │   ├── App.jsx            # routing dan kontrol akses berbasis peran
│   │   ├── index.css          # gaya global (Tailwind)
│   │   └── main.jsx           # titik masuk aplikasi
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
└── vercel.json                # konfigurasi deploy Vercel
```

## Rancangan Sistem

Ringkasan rancangan; detail lengkap ada di dokumen SRS.

| Artefak | Lokasi |
|---------|--------|
| Kebutuhan fungsional dan non-fungsional | SRS Bagian 5 |
| Use case diagram dan description (UC-01 s.d. UC-27) | SRS Bagian 6.2 dan 6.3 |
| Activity diagram (AD-01 s.d. AD-27) | SRS Bagian 6.4 |
| Sequence diagram (SD-01 s.d. SD-27) | SRS Bagian 7.1 |
| Class diagram | SRS Bagian 7.2 |
| Model data (ERD) | SRS Bagian 8 |
| Prototipe UI (24 halaman, L-01 s.d. L-24) | SRS Bagian 9 · [tautan Figma] |
| Matriks keterlacakan | SRS Bagian 10.3 |

![Use case diagram](docs/diagrams/use_case_diagram.png)

![Class diagram](docs/diagrams/class_diagram.png)

![ERD](docs/diagrams/erd.png)

## Pengujian

Ringkasan: **[jumlah] kasus uji, [jumlah] lulus**. Daftar lengkap ada di SRS Bagian 10.4 (pengujian menggunakan metode Black-Box Testing).

| ID | Use case | Skenario | Hasil diharapkan | Status |
|----|----------|----------|------------------|--------|
| TC-01 | UC-02 | Login dengan email dan password benar | Masuk ke dasbor | [Lulus] |
| TC-02 | UC-02 | Login dengan password salah | Muncul pesan error | [Lulus] |
| TC-03 | UC-07 | Checkout saat keranjang kosong | Tombol checkout nonaktif | [Lulus] |

## Keterbatasan dan Pengembangan Berikutnya

- Pembayaran hanya disimulasikan (pemilihan metode pembayaran), belum terhubung ke payment gateway.
- Integrasi API kurir pihak ketiga (mis. JNE/J&T) tidak termasuk ruang lingkup.
- Fitur wishlist, ulasan produk, dan media sosial tidak termasuk ruang lingkup.
- Antarmuka dirancang untuk tampilan desktop dan berbahasa Indonesia.
- [Bug yang diketahui dan belum diperbaiki]
- [Rencana pengembangan, mis. validasi daftar civitas UNKLAB, notifikasi real-time]

## Penggunaan AI dan Referensi

| Alat AI | Dipakai untuk | Yang diperiksa atau diubah dari hasilnya |
|---------|---------------|------------------------------------------|
| LLM | Penyusunan teks laporan (SRS Bagian 1–12) | Pengecekan tata bahasa dan kesesuaian format tabel |
| Claude | Membantu melihat error pada kode dan menyusun README | [isi apa yang kalian periksa atau ubah] |

Referensi:

1. React — https://react.dev
2. Vite — https://vite.dev
3. Tailwind CSS — https://tailwindcss.com
4. Firebase Authentication — https://firebase.google.com/docs/auth
5. Dokumentasi Vercel — https://vercel.com/docs