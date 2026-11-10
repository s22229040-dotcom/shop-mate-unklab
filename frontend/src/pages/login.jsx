import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('student'); // 'student' atau 'dosen'
  const [mode, setMode] = useState('select'); // 'select', 'login', 'register'
  
  // State untuk form registrasi & login
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Pembeli (Buyer)' // Pilihan Pembeli atau Penjual
  });

  // Penyimpanan sementara data akun terdaftar (Simulasi database lokal)
  const [registeredAccounts, setRegisteredAccounts] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActionSubmit = (e) => {
    e.preventDefault();

    // 1. Validasi Domain Email Resmi UNKLAB
    if (selectedCategory === 'student' && !formData.email.endsWith('@student.unklab.ac.id')) {
      alert('Mahasiswa wajib menggunakan email resmi berdomain @student.unklab.ac.id!');
      return;
    }
    if (selectedCategory === 'dosen' && !formData.email.endsWith('@unklab.ac.id')) {
      alert('Dosen/Staff wajib menggunakan email resmi berdomain @unklab.ac.id!');
      return;
    }

    if (mode === 'register') {
      // Proses Registrasi: Simpan akun baru beserta password buatannya sendiri
      const newAccount = {
        ...formData,
        category: selectedCategory
      };
      
      setRegisteredAccounts([...registeredAccounts, newAccount]);
      alert('Registrasi akun berhasil! Silakan login menggunakan password yang telah Anda buat.');
      
      // Reset form dan arahkan ke menu login
      setFormData({ name: '', email: '', password: '', role: 'Pembeli (Buyer)' });
      setMode('login');

    } else if (mode === 'login') {
      // Proses Login: Wajib mencocokkan email & password yang sudah diregistrasikan
      const foundAccount = registeredAccounts.find(
        (acc) => acc.email === formData.email && acc.password === formData.password
      );

      // Untuk kemudahan demo jika belum sempat daftar, kita beri peringatan atau izinkan masuk
      if (registeredAccounts.length > 0 && !foundAccount) {
        alert('Email atau Password salah! Pastikan Anda sudah melakukan registrasi terlebih dahulu.');
        return;
      }

      alert(`Login berhasil! Selamat datang di Shop-Mate UNKLAB sebagai ${formData.role || 'Pengguna'}.`);
      navigate(`/dashboard?role=${selectedCategory}`);
    }
  };

  // TAMPILAN UTAMA: PILIH KATEGORI AKUN
  if (mode === 'select') {
    return (
      <div 
        className="min-h-screen text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden font-sans bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(11, 19, 41, 0.92), rgba(11, 19, 41, 0.96)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop')` 
        }}
      >
        {/* Header Atas */}
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-md">
              🎓
            </div>
            <div>
              <h1 className="font-black text-base tracking-wider text-white">SHOP-MATE UNKLAB</h1>
              <p className="text-[11px] text-slate-300 font-medium">Official Campus Marketplace & Commerce</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => navigate('/dashboard?role=student')}
              className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-amber-400 text-xs font-semibold rounded-xl border border-slate-700/80 shadow-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <span>🟡</span> Demo Pembeli
            </button>
            <button 
              onClick={() => navigate('/dashboard?role=penjual')}
              className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-amber-400 text-xs font-semibold rounded-xl border border-slate-700/80 shadow-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <span>🟡</span> Demo Penjual
            </button>
          </div>
        </div>

        {/* Konten Utama Tengah */}
        <div className="max-w-4xl mx-auto w-full text-center my-auto py-8 z-10">
          <div className="inline-block px-4 py-1.5 bg-amber-400 text-slate-950 text-xs font-extrabold rounded-full mb-5 shadow-md tracking-wide">
            UNIVERSITAS KLABAT AIRMADIDI
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Pilih Kategori Akun Civitas Akademika
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Platform e-commerce eksklusif untuk Mahasiswa dan Dosen/Staff UNKLAB. Wajib registrasi untuk membuat password mandiri dan memilih peran.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10 text-left">
            <div 
              onClick={() => setSelectedCategory('student')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative bg-slate-900/85 backdrop-blur-md ${
                selectedCategory === 'student' 
                  ? 'border-amber-400 shadow-xl shadow-amber-400/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-4">
                🎓
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Student (Mahasiswa)</h3>
              <p className="text-xs text-slate-300 mb-5">
                Gunakan email berdomain <span className="text-amber-400 font-semibold">@student.unklab.ac.id</span>
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                Pilih Mahasiswa &rarr;
              </span>
            </div>

            <div 
              onClick={() => setSelectedCategory('dosen')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative bg-slate-900/85 backdrop-blur-md ${
                selectedCategory === 'dosen' 
                  ? 'border-amber-400 shadow-xl shadow-amber-400/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-4">
                🏛️
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Dosen / Staff UNKLAB</h3>
              <p className="text-xs text-slate-300 mb-5">
                Gunakan email resmi <span className="text-amber-400 font-semibold">@unklab.ac.id</span>
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                Pilih Dosen / Staff &rarr;
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <button
              onClick={() => setMode('login')}
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-4 px-6 rounded-2xl transition shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>&rarr; Lanjut Login</span>
            </button>
            <button
              onClick={() => setMode('register')}
              className="flex-1 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-extrabold py-4 px-6 rounded-2xl transition text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>👤+ Buat Akun Baru</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 z-10">
          <p>&copy; 2026 Shop-Mate UNKLAB. Projek Sistem Analisis dan Desain.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-200 cursor-pointer">Dokumentasi Sistem</span>
            <span className="hover:text-slate-200 cursor-pointer">Schema DB</span>
          </div>
        </div>
      </div>
    );
  }

  // TAMPILAN FORM REGISTRASI & LOGIN
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(11, 19, 41, 0.92), rgba(11, 19, 41, 0.96)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop')` 
      }}
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-slate-100">
        <button 
          onClick={() => setMode('select')}
          className="text-xs text-amber-400 hover:underline font-semibold mb-5 flex items-center gap-1 cursor-pointer"
        >
          &larr; Kembali ke Beranda
        </button>

        <h2 className="text-2xl font-black mb-1">
          {mode === 'register' ? 'Registrasi Akun Baru' : 'Masuk dengan Password'}
        </h2>
        <p className="text-xs text-slate-300 mb-6">
          Kategori: <span className="text-amber-400 font-bold uppercase">{selectedCategory}</span>
        </p>

        <form onSubmit={handleActionSubmit} className="space-y-4">
          
          {/* Input Nama Lengkap (Hanya saat Registrasi) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Nama lengkap sesuai SIAK"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          )}

          {/* Pilihan Peran (Pembeli / Penjual) - Tersedia untuk Student & Dosen saat Registrasi */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Pilih Peran Akun</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                <option value="Pembeli (Buyer)">🛍️ Pembeli (Buyer)</option>
                <option value="Penjual (Seller/Tenant)">🏪 Penjual (Seller / Tenant)</option>
              </select>
            </div>
          )}

          {/* Email Resmi UNKLAB */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              {selectedCategory === 'student' ? 'Email Student UNKLAB' : 'Email Resmi UNKLAB'}
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder={selectedCategory === 'student' ? 'nama@student.unklab.ac.id' : 'nama@unklab.ac.id'}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Password (Buat Baru saat Registrasi, atau Masukkan saat Login) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              {mode === 'register' ? 'Buat Password Mandiri' : 'Masukkan Password Anda'}
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl transition shadow-lg text-sm cursor-pointer mt-3"
          >
            {mode === 'register' ? 'Daftar & Buat Password' : 'Masuk Sekarang (Login)'}
          </button>
        </form>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
            className="text-xs text-amber-400 hover:underline font-medium cursor-pointer"
          >
            {mode === 'register' ? 'Sudah registrasi & buat password? Login di sini' : 'Belum punya akun? Wajib Registrasi dulu'}
          </button>
        </div>
      </div>
    </div>
  );
}