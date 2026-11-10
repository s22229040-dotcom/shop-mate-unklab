import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // 'select' = Tampilan awal sesuai gambar, 'register' = Form registrasi, 'login' = Form login
  const [viewMode, setViewMode] = useState('select'); 
  const [selectedRoleType, setSelectedRoleType] = useState('student'); // 'student' atau 'penjual' (Dosen/Staff)

  // Data Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    accountRole: 'Pembeli (Buyer)' // Pilihan Pembeli atau Penjual
  });

  // Penyimpanan sementara akun terdaftar
  const [registeredAccounts, setRegisteredAccounts] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi Domain Email UNKLAB
    if (selectedRoleType === 'student' && !formData.email.endsWith('@student.unklab.ac.id')) {
      alert('Student (Mahasiswa) wajib menggunakan email resmi berdomain @student.unklab.ac.id!');
      return;
    }
    if (selectedRoleType === 'penjual' && !formData.email.endsWith('@unklab.ac.id') && !formData.email.endsWith('@student.unklab.ac.id')) {
      alert('Civitas UNKLAB wajib menggunakan email resmi berdomain @unklab.ac.id atau @student.unklab.ac.id!');
      return;
    }

    if (viewMode === 'register') {
      // Simpan registrasi baru beserta password buatan sendiri
      const newAcc = { ...formData, category: selectedRoleType };
      setRegisteredAccounts([...registeredAccounts, newAcc]);
      
      alert('Registrasi berhasil! Silakan login menggunakan password yang telah Anda buat.');
      setFormData({ name: '', email: '', password: '', accountRole: 'Pembeli (Buyer)' });
      setViewMode('login'); // Pindah ke menu login
    } else {
      // Proses Login
      const found = registeredAccounts.find(
        (acc) => acc.email === formData.email && acc.password === formData.password
      );

      if (registeredAccounts.length > 0 && !found) {
        alert('Email atau Password salah! Pastikan Anda sudah melakukan registrasi mandiri.');
        return;
      }

      alert(`Login berhasil! Selamat datang di Shop-Mate UNKLAB.`);
      navigate(`/dashboard?role=${selectedRoleType}`);
    }
  };

  // TAMPILAN AWAL (PERSIS SEPERTI GAMBAR ANDA)
  if (viewMode === 'select') {
    return (
      <div className="min-h-screen bg-[#3a105c] flex items-center justify-center p-4 font-sans">
        
        {/* Container Kartu Utama */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
          
          {/* Sisi Kiri: Banner Ungu dengan Ilustrasi Wisuda */}
          <div 
            className="p-8 flex flex-col justify-between text-white relative bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(58, 16, 92, 0.85), rgba(30, 8, 50, 0.95)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop')` 
            }}
          >
            <div>
              <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-md uppercase tracking-wider mb-6">
                UNKLAB EXCLUSIVE
              </span>
              
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-400 text-2xl font-bold mb-4 border border-white/20">
                🛒
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight mb-2">Shop-Mate</h1>
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-4">UNKLAB</h2>
              
              <p className="text-xs text-slate-200 leading-relaxed">
                Selamat datang di Shop-Mate. Platform belanja eksklusif civitas akademika Universitas Klabat.
              </p>
            </div>

            <div className="text-[10px] text-slate-400 pt-8">
              &copy; 2026 Universitas Klabat • Restricted Access
            </div>
          </div>

          {/* Sisi Kanan: Pilihan Peran / Kartu Interaktif */}
          <div className="p-8 flex flex-col justify-between bg-white">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">Anda adalah?</h3>
              <p className="text-xs text-slate-500 mb-6">Pilih jenis pengguna sebelum melanjutkan.</p>

              <div className="space-y-3">
                {/* Opsi 1: Student & Civitas */}
                <div 
                  onClick={() => setSelectedRoleType('student')}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                    selectedRoleType === 'student' 
                      ? 'border-amber-500 bg-amber-50/40 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                    🎓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Student & Civitas</h4>
                    <p className="text-[11px] text-slate-500">Mahasiswa & Staff aktif UNKLAB</p>
                    <p className="text-[10px] text-amber-700 font-semibold mt-1">Wajib menggunakan email @student.unklab.ac.id</p>
                  </div>
                </div>

                {/* Opsi 2: Penjual / Dosen */}
                <div 
                  onClick={() => setSelectedRoleType('penjual')}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-start gap-3 ${
                    selectedRoleType === 'penjual' 
                      ? 'border-amber-500 bg-amber-50/40 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                    🏪
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Dosen / Penjual Tenant</h4>
                    <p className="text-[11px] text-slate-500">Pengelola toko & tenant umum</p>
                    <p className="text-[10px] text-amber-700 font-semibold mt-1">Akses manajemen produk & pesanan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Lanjut & Pindah ke Registrasi */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <button
                onClick={() => setViewMode('register')}
                className="w-full bg-[#1e0832] hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition text-xs shadow-md cursor-pointer"
              >
                Lanjutkan Registrasi Akun Baru &rarr;
              </button>

              <div className="text-center">
                <button
                  onClick={() => setViewMode('login')}
                  className="text-xs text-amber-600 hover:underline font-semibold cursor-pointer"
                >
                  Sudah punya akun? Login di sini
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // TAMPILAN FORM REGISTRASI ATAU LOGIN
  return (
    <div className="min-h-screen bg-[#3a105c] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        
        <button 
          onClick={() => setViewMode('select')}
          className="text-xs text-amber-600 hover:underline font-semibold mb-4 flex items-center gap-1 cursor-pointer"
        >
          &larr; Kembali ke Pilihan Peran
        </button>

        <h2 className="text-xl font-extrabold text-slate-900 mb-1">
          {viewMode === 'register' ? 'Registrasi Akun Shop-Mate' : 'Login ke Shop-Mate'}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Kategori: <span className="text-amber-600 font-bold uppercase">{selectedRoleType}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {viewMode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Nama lengkap sesuai SIAK"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Pilihan Peran Saat Registrasi (Pembeli atau Penjual) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pilih Peran Akun</label>
                <select
                  name="accountRole"
                  value={formData.accountRole}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Pembeli (Buyer)">🛍️ Pembeli (Buyer)</option>
                  <option value="Penjual (Seller/Tenant)">🏪 Penjual (Seller / Tenant)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Resmi UNKLAB</label>
            <input
              type="email"
              name="email"
              required
              placeholder={selectedRoleType === 'student' ? 'nama@student.unklab.ac.id' : 'nama@unklab.ac.id'}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              {viewMode === 'register' ? 'Buat Password Mandiri' : 'Masukkan Password Anda'}
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl transition text-xs shadow-md cursor-pointer mt-2"
          >
            {viewMode === 'register' ? 'Daftar & Buat Password Akun' : 'Masuk Sekarang (Login)'}
          </button>
        </form>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'register' ? 'login' : 'register')}
            className="text-xs text-slate-600 hover:underline font-medium cursor-pointer"
          >
            {viewMode === 'register' ? 'Sudah punya akun & password? Login di sini' : 'Belum registrasi? Buat Akun Baru'}
          </button>
        </div>

      </div>
    </div>
  );
}