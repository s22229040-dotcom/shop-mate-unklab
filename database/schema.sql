-- Shop-Mate UNKLAB: skema database
-- Cara pakai: buat database kosong (nama bebas, samakan dengan DB_NAME di backend/.env),
-- pilih database itu di phpMyAdmin, lalu jalankan isi file ini di tab SQL.

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) DEFAULT '',
  phone VARCHAR(30) DEFAULT '',
  role VARCHAR(30) NOT NULL DEFAULT 'Pembeli'
);

-- Akun uji (bukan akun asli siapa pun)
-- Catatan: kalau akun admin tidak masuk ke dashboard Administrator,
-- ubah nilai role-nya sesuai yang dipakai frontend (cek frontend/src/pages/login.jsx).
INSERT INTO users (name, email, password, address, phone, role) VALUES
  ('Admin Uji',   'admin@contoh.test',   'admin123',   '', '', 'Administrator'),
  ('Penjual Uji', 'penjual@contoh.test', 'penjual123', '', '', 'Penjual'),
  ('Pembeli Uji', 'pembeli@contoh.test', 'pembeli123', '', '', 'Pembeli');