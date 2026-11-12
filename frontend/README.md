# Shop-Mate UNKLAB

Sistem informasi berbasis web e-commerce eksklusif untuk civitas akademika Universitas Klabat yang membantu mahasiswa, dosen, staff, dan tenant kantin melakukan transaksi jual-beli produk kampus secara efisien, transparan, dan terpadu.

![Halaman utama](docs/screenshots/01_halaman_utama.png)

| | |
|---|---|
| **Mata kuliah** | System Analysis and Design — Fakultas Ilmu Komputer, Universitas Klabat |
| **Kelompok** | [N] — Shop-Mate Development Team |
| **Objek / studi kasus** | Universitas Klabat (Marketplace Kampus) |
| **Model SDLC** | Agile / Prototyping |
| **Dokumen SRS** | [docs/SAD_FP_Kelompok[N]_SRS.pdf](docs/) |
| **Prototipe UI** | [https://www.figma.com/…] |

## Anggota Kelompok

| No | Nama | NIM | Peran | Kontribusi utama |
|----|------|-----|-------|------------------|
| 1 | Kartika Sari | [NIM] | Project manager | Rencana kerja, manajemen repository, UC-01 (Registrasi) |
| 2 | Ayu Ningsi | [NIM] | System analyst | Elisitasi kebutuhan, perancangan use case & SRS |
| 3 | Christina J. Pattilamonia | [NIM] | System designer | Use case diagram, sequence diagram, class diagram |
| 4 | Sisiani Palari | [NIM] | Developer & QA | Implementasi front-end/back-end, pengujian sistem, dan dokumentasi |

## Latar Belakang

- **Masalah:** Proses jual beli di lingkungan kampus Universitas Klabat (seperti pemesanan makanan kantin, modul kuliah, dan atribut kampus) masih dilakukan secara manual melalui pesan instan tanpa wadah pencatatan transaksi yang terpusat.
- **Kondisi saat ini:** Transaksi dicatat secara manual di buku kas atau chat pribadi, sehingga rentan terjadi kesalahan pencatatan pesanan, konfirmasi pembayaran yang lambat, dan kurangnya transparansi stok produk bagi mahasiswa.
- **Tujuan sistem:** Membangun platform e-commerce internal kampus yang memfasilitasi manajemen produk oleh tenant/penjual, pemesanan terpadu oleh pembeli, serta pengawasan sistem oleh administrator.
- **Pengguna (aktor):** Pembeli (Mahasiswa/Staff), Penjual (Tenant Kantin/Koperasi), dan Administrator.

## Fitur Utama

| No | Fitur | Aktor | Use case | Kebutuhan |
|----|-------|-------|----------|-----------|
| 1 | Registrasi dan Login Akun Kampus | Semua Aktor | UC-01, UC-02 | FR-01, FR-02 |
| 2 | Katalog, Pencarian & Detail Produk | Pembeli | UC-03, UC-04, UC-05 | FR-03, FR-04, FR-05 |
| 3 | Kelola Keranjang, Checkout & Pembayaran | Pembeli | UC-06, UC-07, UC-08 | FR-06, FR-07, FR-08 |
| 4 | Pemantauan Status Pesanan & Profil | Pembeli, Penjual, Administrator | UC-09, UC-10 | FR-09, FR-10 |
| 5 | Kelola Produk, Tambah/Edit & Visibilitas | Penjual | UC-11, UC-12, UC-13, UC-14, UC-19 | FR-11 s.d. FR-14, FR-19 |
| 6 | Kelola Pesanan Masuk, Status & Notifikasi | Penjual | UC-15, UC-16, UC-17, UC-18, UC-20 | FR-15 s.d. FR-18, FR-20 |
| 7 | Manajemen Pengguna, Kategori & Transaksi | Administrator | UC-21 s.d. UC-27 | FR-21 s.d. FR-27 |

## Screenshot

**[UC-01] Registrasi**

![UC-01](docs/screenshots/02_uc01.png)

**[UC-02] Login**

![UC-02](docs/screenshots/03_uc02.png)

**Validasi input**

![Pesan validasi](docs/screenshots/10_validasi.png)

## Teknologi

| Lapisan | Teknologi | Versi |
|---------|-----------|-------|
| Front-end | React.js, Tailwind CSS, Vite | 18.x / 3.x |
| Back-end | Node.js, Express.js | 20.x / 4.x |
| Database | MySQL (XAMPP) | 8.0 |
| Tools pemodelan | draw.io, StarUML | — |
| Prototipe UI | Figma | — |

## Kebutuhan Sistem

- Node.js 20 atau lebih baru
- MySQL 8 atau XAMPP Control Panel
- Git version control
- Browser modern (Google Chrome / Microsoft Edge / Mozilla Firefox)

## Instalasi dan Menjalankan Aplikasi

1. Clone repository:

   ```bash
   git clone [https://github.com/s22229040-dotcom/shop-mate-unklab.git](https://github.com/s22229040-dotcom/shop-mate-unklab.git)
   cd shop-mate-unklab