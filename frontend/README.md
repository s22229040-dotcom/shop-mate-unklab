# Shop-Mate UNKLAB

Shop-Mate UNKLAB adalah platform e-commerce dan pusat kuliner eksklusif yang dirancang khusus untuk civitas akademika Universitas Klabat (UNKLAB). Aplikasi ini memfasilitasi mahasiswa, dosen, serta tenant/penjual lokal kampus untuk melakukan transaksi pemesanan makanan dan atribut kampus dengan mudah tanpa antre.

## 🚀 Fitur Utama
- **Autentikasi & Registrasi Berbasis Civitas**: Validasi login khusus menggunakan email resmi UNKLAB (`@unklab.ac.id`) atau NIK/NIM civitas.
- **Multi-Role Access**: Pemisahan hak akses antara **Student & Civitas** serta **Penjual / Tenant**.
- **Navigasi Cerdas (Back Navigation)**: Memastikan alur kembali (*back*) mengarah ke halaman login aplikasi, bukan keluar browser.
- **Katalog Produk & Pemesanan**: Menampilkan daftar makanan asrama dan merchandise resmi kampus.

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React.js, Vite, Tailwind CSS, React Router DOM.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL (XAMPP).
- **Deployment**: Vercel (Frontend).

## 💻 Cara Menjalankan Secara Lokal
1. Clone repository ini atau unduh kodenya.
2. Masuk ke direktori frontend:
   ```bash
   cd frontend
   npm install
   npm run dev