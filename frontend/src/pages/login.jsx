import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  // 'auth' = Halaman Login/Registrasi, 'select' = Pilihan Peran Awal
  const [viewMode, setViewMode] = useState('auth'); 
  const [isRegister, setIsRegister] = useState(false); // false = Login, true = Registrasi

  // Form State ala Universitas Klabat
  const [roleSelection, setRoleSelection] = useState('Student'); // Student, Admin, Penjual, Dosen, Staff, dll.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    buyerOrSeller: 'Pembeli (Buyer)' // Pilihan Pembeli atau Penjual saat registrasi
  });

  // Simulasi database akun terdaftar lokal
  const [registeredAccounts, setRegisteredAccounts] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi domain email UNKLAB
    if (!formData.email.endsWith('@unklab.ac.id') && !formData.email.endsWith('@student.unklab.ac.id')) {
      alert('Wajib menggunakan email resmi berdomain @unklab.ac.id atau @student.unklab.ac.id!');
      return;
    }

    if (isRegister) {
      // Registrasi Akun Baru
      const newAccount = { ...formData, role: roleSelection };
      setRegisteredAccounts([...registeredAccounts, newAccount]);
      alert('Registrasi berhasil! Silakan login menggunakan password yang telah Anda buat.');
      setIsRegister(false); // Pindah ke mode login
      setFormData({ name: '', email: '', password: '', buyerOrSeller: 'Pembeli (Buyer)' });
    } else {
      // Proses Login
      const matched = registeredAccounts.find(
        acc => acc.email === formData.email && acc.password === formData.password
      );

      if (registeredAccounts.length > 0 && !matched) {
        alert('Email atau Password salah! Pastikan Anda sudah melakukan registrasi terlebih dahulu.');
        return;
      }

      alert(`Login Berhasil sebagai ${roleSelection}! Masuk ke sistem...`);
      navigate(`/dashboard?role=${roleSelection.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#2d0c4a] flex items-center justify-center p-4 font-sans">
      
      {/* Container Utama Kartu Ganda */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* SISI KIRI: Banner Ungu dengan Background Kampus & Logo di Tengah */}
        <div 
          className="p-8 flex flex-col justify-center items-center text-center text-white relative bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(58, 16, 92, 0.88), rgba(30, 8, 50, 0.94)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop')` 
          }}
        >
          <div className="max-w-xs mx-auto space-y-4">
            
            {/* Logo Shop-Mate di Tengah */}
            <div className="w-16 h-16 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-lg mx-auto mb-2">
              🛒
            </div>

            <h1 className="text-2xl font-black tracking-tight">Shop-Mate UNKLAB</h1>
            
            {/* Teks Sambutan Baru */}
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              Halo, Selamat Datang di Shop-Mate UNKLAB! Platform e-commerce eksklusif civitas akademika Universitas Klabat.
            </p>
          </div>

          <div className="absolute bottom-6 text-[10px] text-slate-400">
            &copy; 2026 Universitas Klabat • Restricted Access
          </div>
        </div>

        {/* SISI KANAN: Form Model Universitas Klabat (Dropdown Role, Email, Password, Login/Registrasi) */}
        <div className="p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-black text-[#3a105c] tracking-wide">Universitas Klabat</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isRegister ? 'Form Registrasi Akun Civitas' : 'Silakan pilih peran dan masuk ke akun Anda'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Dropdown Pilihan Role ala Universitas Klabat */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pilih Peran / Status</label>
                <div className="relative">
                  <select
                    value={roleSelection}
                    onChange={(e) => setRoleSelection(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3a105c] cursor-pointer"
                  >
                    <option value="Student">Student (Mahasiswa)</option>
                    <option value="Admin">Admin</option>
                    <option value="Rektor">Rektor</option>
                    <option value="Wakil Rektor 1">Wakil Rektor 1</option>
                    <option value="Wakil Rektor 2">Wakil Rektor 2</option>
                    <option value="Wakil Rektor 3">Wakil Rektor 3</option>
                    <option value="Registrar">Registrar</option>
                    <option value="Staff">Staff</option>
                    <option value="Dosen">Dosen</option>
                    <option value="Penjual / Tenant">Penjual / Tenant</option>
                  </select>
                </div>
              </div>

              {/* Input Nama Lengkap (Hanya saat Registrasi) */}
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nama lengkap sesuai SIAK"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3a105c]"
                  />
                </div>
              )}

              {/* Pilihan Pembeli / Penjual khusus saat Registrasi */}
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tipe Akun Transaksi</label>
                  <select
                    name="buyerOrSeller"
                    value={formData.buyerOrSeller}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3a105c] cursor-pointer"
                  >
                    <option value="Pembeli (Buyer)">🛍️ Pembeli (Buyer)</option>
                    <option value="Penjual (Seller/Tenant)">🏪 Penjual (Seller / Tenant)</option>
                  </select>
                </div>
              )}

              {/* Input Email Resmi UNKLAB */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Resmi UNKLAB</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={roleSelection === 'Student' ? 's22229040@student.unklab.ac.id' : 'nama@unklab.ac.id'}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3a105c]"
                />
              </div>

              {/* Input Password */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  {isRegister ? 'Buat Password Mandiri' : 'Password'}
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3a105c]"
                />
              </div>

              {/* Tombol Aksi (Log in / Register) */}
              <button
                type="submit"
                className="w-full bg-[#3a105c] hover:bg-[#4d167a] text-white font-extrabold py-3.5 rounded-xl transition text-xs shadow-md cursor-pointer mt-2"
              >
                {isRegister ? 'Daftar & Buat Akun Baru' : 'Log in'}
              </button>
            </form>
          </div>

          {/* Toggle Bawah: Pindah antara Login dan Registrasi */}
          <div className="text-center pt-6 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-amber-600 hover:underline font-bold cursor-pointer"
            >
              {isRegister 
                ? 'Sudah punya akun? Log in di sini' 
                : 'Belum punya akun? Klik di sini untuk Registrasi & buat password'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}