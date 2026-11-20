const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'API Shop-Mate UNKLAB Berjalan dengan Baik' });
});

// Endpoint Registrasi Akun
app.post('/api/register', (req, res) => {
  const { name, email, password, address, phone, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nama, email, dan password wajib diisi' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const userRole = role || 'Pembeli';

  db.query('SELECT id, role FROM users WHERE LOWER(email) = ?', [normalizedEmail], (err, existing) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }

    if (existing.length > 0) {
      return res.status(409).json({
        message: `Email ini sudah terdaftar sebagai "${existing[0].role}". Silakan langsung masuk (login)!`
      });
    }

    db.query(
      'INSERT INTO users (name, email, password, address, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
      [name, normalizedEmail, password, address || '', phone || '', userRole],
      (insertErr, result) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ message: 'Gagal menyimpan akun ke database' });
        }

        res.status(201).json({
          message: 'Registrasi berhasil! Silakan masuk (login) menggunakan akun yang baru dibuat.',
          user: {
            id: result.insertId,
            name,
            email: normalizedEmail,
            address: address || '',
            phone: phone || '',
            role: userRole
          }
        });
      }
    );
  });
});

// Endpoint Login Akun
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  db.query(
    'SELECT id, name, email, password, address, phone, role FROM users WHERE LOWER(email) = ?',
    [normalizedEmail],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Email belum terdaftar! Silakan lakukan registrasi terlebih dahulu.' });
      }

      const dbUser = rows[0];
      if (dbUser.password !== password) {
        return res.status(401).json({ message: 'Password salah! Silakan periksa kembali kata sandi Anda.' });
      }

      const { password: _, ...safeUser } = dbUser;
      res.json({
        message: 'Login berhasil',
        user: safeUser
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di port ${PORT}`);
});