import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // State form
  const [role, setRole] = useState('Mahasiswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Logika Registrasi Sesuai Permintaan
      const newUser = { role, email, password };
      localStorage.setItem('shopmate_registered_user', JSON.stringify(newUser));
      alert('Registrasi berhasil! Silakan masuk.');
      setIsRegistering(false);
    } else {
      // Logika Login
      localStorage.setItem('shopmate_active_user', email);
      if (email.includes('admin')) {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b101d] flex items-center justify-center p-4 font-sans text-white">
      <div className="max-w-4xl w-full bg-[#131b2e] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2">
        
        {/* KIRI: BANNER DENGAN POSISI TENGAH (CENTER), LOGO DIPERBESAR & BACKGROUND LOKAL */}
        <div className="p-8 flex flex-col justify-between items-center text-center relative bg-slate-900 overflow-hidden">
          {/* Background dari file public/download.jpg */}
          <div className="absolute inset-0 bg-cover bg-center opacity-35" 
               style={{ backgroundImage: `url('/download.jpg')` }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b]/85 to-[#0f172a]/95"></div>

          {/* Konten Kiri (Diatur ke tengah & Logo diperbesar) */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
            {/* Logo dari file public/logo.png (diperbesar ukurannya menjadi w-20 h-20) */}
            <div className="w-20 h-20 bg-amber-400/10 rounded-2xl flex items-center justify-center p-2 mb-6 border border-amber-400/30 shadow-xl">
              <img src="/logo.png" alt="Logo Unklab" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-wide">Shop-Mate UNKLAB</h1>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-xs">
              Platform e-commerce eksklusif civitas akademika Universitas Klabat menggunakan Email Resmi Kampus.
            </p>
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] text-slate-400 font-medium">© 2026 Universitas Klabat • Restricted Access</p>
          </div>
        </div>

        {/* KANAN: FORM LOGIN / REGISTRASI */}
        <div className="p-8 flex flex-col justify-center bg-[#131b2e]">
          <h2 className="text-xl font-black text-white mb-1">
            {isRegistering ? 'Form Registrasi Akun Civitas' : 'Masuk ke Akun Anda'}
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            {isRegistering ? 'Daftar menggunakan peran dan email resmi kampus.' : 'Silakan masuk menggunakan email kampus terdaftar.'}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase">Pilih Peran / Status</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} 
                  className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400">
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Penjual (Tenant Kampus)">Penjual (Tenant Kampus)</option>
                  <option value="Fakultas / Staff">Fakultas / Staff</option>
                </select>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase">Email Resmi Unklab</label>
              <input type="email" placeholder="Contoh: s22229040@student.unklab.ac.id" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase">Buat Password Mandiri</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" />
            </div>

            <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3 rounded-xl text-xs transition shadow-lg cursor-pointer mt-2">
              {isRegistering ? 'Daftar Akun Baru' : 'Masuk Sekarang'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsRegistering(!isRegistering)} className="text-xs text-amber-400 hover:underline font-bold cursor-pointer">
              {isRegistering ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar akun civitas'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}