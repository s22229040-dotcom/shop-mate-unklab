import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('student'); // 'student' atau 'dosen'
  const [mode, setMode] = useState('select'); // 'select', 'login', 'register'
  
  const [formData, setFormData] = useState({
    identityNumber: '',
    email: '',
    password: '',
    name: '',
    whatsapp: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActionSubmit = (e) => {
    e.preventDefault();

    if (mode === 'register') {
      if (selectedCategory === 'student' && !formData.email.endsWith('@student.unklab.ac.id')) {
        alert('Mahasiswa wajib menggunakan email berdomain @student.unklab.ac.id!');
        return;
      }
      if (selectedCategory === 'dosen' && !formData.email.endsWith('@unklab.ac.id')) {
        alert('Dosen/Staff wajib menggunakan email resmi @unklab.ac.id!');
        return;
      }

      alert('Registrasi akun berhasil! Silakan login.');
      setMode('login');
    } else if (mode === 'login') {
      alert('Login berhasil! Masuk ke dashboard...');
      navigate(`/dashboard?role=${selectedCategory}`);
    }
  };

  if (mode === 'select') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto w-full pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg shadow-md">
                🎓
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-wide text-white">SHOP-MATE UNKLAB</h1>
                <p className="text-[11px] text-slate-400">Official Campus Marketplace & Commerce</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/dashboard?role=student')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg border border-slate-700 transition cursor-pointer"
              >
                🟡 Demo Pembeli
              </button>
              <button 
                onClick={() => navigate('/dashboard?role=penjual')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg border border-slate-700 transition cursor-pointer"
              >
                🟡 Demo Penjual
              </button>
            </div>
          </div>

          <div className="text-center my-10">
            <span className="inline-block px-4 py-1.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-full mb-4 shadow-sm tracking-wide">
              UNIVERSITAS KLABAT AIRMADIDI
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Pilih Kategori Akun Civitas Akademika
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Platform e-commerce eksklusif untuk Mahasiswa dan Dosen/Staff UNKLAB. Aman, terverifikasi domain resmi, dan terintegrasi penuh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10">
            <div 
              onClick={() => setSelectedCategory('student')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative bg-slate-900/80 backdrop-blur-md ${
                selectedCategory === 'student' 
                  ? 'border-amber-400 shadow-xl shadow-amber-400/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-4">
                🎓
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Student (Mahasiswa)</h3>
              <p className="text-xs text-slate-400 mb-4">
                Gunakan email berdomain <span className="text-amber-400 font-medium">@student.unklab.ac.id</span>
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                Pilih Mahasiswa &rarr;
              </span>
            </div>

            <div 
              onClick={() => setSelectedCategory('dosen')}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative bg-slate-900/80 backdrop-blur-md ${
                selectedCategory === 'dosen' 
                  ? 'border-amber-400 shadow-xl shadow-amber-400/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold mb-4">
                🏛️
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Dosen / Staff UNKLAB</h3>
              <p className="text-xs text-slate-400 mb-4">
                Gunakan NIK atau email resmi <span className="text-amber-400 font-medium">@unklab.ac.id</span>
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                Pilih Dosen / Staff &rarr;
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <button
              onClick={() => setMode('login')}
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>&rarr; Lanjut Login</span>
            </button>
            <button
              onClick={() => setMode('register')}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold py-3.5 px-6 rounded-xl transition text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>👤+ Buat Akun Baru</span>
            </button>
          </div>
        </div>

        <div className="relative z-0 max-w-4xl mx-auto w-full pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>&copy; 2026 Shop-Mate UNKLAB. Projek Sistem Analisis dan Desain.</p>
          <div className="flex gap-4">
            <span>Dokumentasi Sistem</span>
            <span>Schema DB</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-slate-100">
        <button 
          onClick={() => setMode('select')}
          className="text-xs text-amber-400 hover:underline font-medium mb-4 flex items-center gap-1 cursor-pointer"
        >
          &larr; Kembali ke Beranda
        </button>

        <h2 className="text-2xl font-bold mb-1">
          {mode === 'register' ? 'Buat Akun Baru' : 'Masuk ke Akun'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Kategori terpilih: <span className="text-amber-400 font-bold uppercase">{selectedCategory}</span>
        </p>

        <form onSubmit={handleActionSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Nama lengkap sesuai SIAK"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              {selectedCategory === 'student' ? 'Email Student UNKLAB' : 'Email / NIK UNKLAB'}
            </label>
            <input
              type="text"
              name="email"
              required
              placeholder={selectedCategory === 'student' ? 'nama@student.unklab.ac.id' : 'nama@unklab.ac.id'}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg text-sm cursor-pointer mt-2"
          >
            {mode === 'register' ? 'Daftar Sekarang' : 'Masuk Sekarang'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
            className="text-xs text-amber-400 hover:underline cursor-pointer"
          >
            {mode === 'register' ? 'Sudah punya akun? Login di sini' : 'Belum punya akun? Buat Akun Baru'}
          </button>
        </div>
      </div>
    </div>
  );
}