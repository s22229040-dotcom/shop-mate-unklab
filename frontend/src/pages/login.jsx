import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // State form dengan role di awal
  const [role, setRole] = useState('Student (Mahasiswa)');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Logika Registrasi
      const newUser = { role, email, password };
      localStorage.setItem('shopmate_registered_user', JSON.stringify(newUser));
      alert('Registrasi berhasil! Silakan masuk.');
      setIsRegistering(false);
    } else {
      // Logika Login Berdasarkan Peran
      localStorage.setItem('shopmate_active_user', email);
      
      if (role.includes('Admin') || email.includes('admin')) {
        navigate('/admin-dashboard');
      } else if (role.includes('Penjual')) {
        navigate('/seller-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] flex items-center justify-center p-4 font-sans text-white">
      <div className="max-w-4xl w-full bg-[#131b2e] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2">
        
        {/* KIRI: BANNER DENGAN BACKGROUND KAMPUS YANG TERANG & JELAS */}
        <div className="p-8 flex flex-col justify-between items-center text-center relative overflow-hidden bg-indigo-950">
          {/* Background Gambar Kampus Unklab (Opacity dinaikkan agar jelas terlihat) */}
          <div className="absolute inset-0 bg-cover bg-center opacity-70" 
               style={{ backgroundImage: `url('/download.jpg')` }}>
          </div>
          {/* Overlay gradasi tipis agar teks tetap terbaca namun gambar tetap jelas */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/95 via-[#131b2e]/60 to-transparent"></div>

          {/* Konten Kiri (Logo & Judul di Tengah) */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
            <div className="w-28 h-28 bg-[#131b2e]/80 rounded-3xl flex items-center justify-center p-3 mb-6 border-2 border-amber-400 shadow-2xl backdrop-blur-md">
              <img src="/logo.png" alt="Logo Unklab" className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
            </div>
            <h1 className="text-2xl font-black text-amber-300 tracking-wide drop-shadow-md">Shop-Mate UNKLAB</h1>
            <p className="text-xs text-slate-100 mt-2 leading-relaxed max-w-xs font-semibold drop-shadow">
              Platform e-commerce eksklusif civitas akademika Universitas Klabat menggunakan Email Resmi Kampus.
            </p>
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] text-amber-300 font-bold tracking-wider drop-shadow">© 2026 Universitas Klabat • Restricted Access</p>
          </div>
        </div>

        {/* KANAN: FORM LOGIN / REGISTRASI */}
        <div className="p-8 flex flex-col justify-center bg-[#131b2e]">
          <h2 className="text-xl font-black text-white mb-1">
            {isRegistering ? 'Form Registrasi Akun Civitas' : 'Masuk ke Akun Anda'}
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            {isRegistering ? 'Daftar menggunakan peran dan email resmi kampus.' : 'Pilih peran dan masuk menggunakan email kampus terdaftar.'}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            {/* PILIHAN PERAN SEBELUM LOGIN / REGISTRASI */}
            <div>
              <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pilih Peran / Status Anda</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} 
                className="w-full mt-1 bg-[#1e293b] border border-amber-400/40 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-amber-400 shadow-inner">
                <option value="Student (Mahasiswa)">Student (Mahasiswa)</option>
                <option value="Dosen / Staff">Dosen / Staff</option>
                <option value="Penjual / Tenant">Penjual / Tenant</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase">Email Resmi Unklab</label>
              <input type="email" placeholder="Contoh: s12345678@student.unklab.ac.id" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase">Buat Password Mandiri</label>
              <input type="password" placeholder="••••••••" value= {password} onChange={(e) => setPassword(e.target.value)} required
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