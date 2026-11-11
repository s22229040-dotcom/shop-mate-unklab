import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
  const [selectedRole, setSelectedRole] = useState('Student (Mahasiswa)');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    buyerOrSeller: 'Pembeli (Buyer)',
    address: ''
  });

  // Database memori lokal akun terdaftar (menyimpan data secara persisten selama sesi)
  const [registeredAccounts, setRegisteredAccounts] = useState([
    {
      name: 'Michael Tendean',
      email: '12320526@student.unklab.ac.id',
      password: 'password123',
      role: 'Student (Mahasiswa)',
      buyerOrSeller: 'Pembeli (Buyer)',
      address: 'Asrama Putra UNKLAB'
    },
    {
      name: 'Kantin Asri UNKLAB',
      email: '12210987@student.unklab.ac.id',
      password: 'seller123',
      role: 'Penjual',
      buyerOrSeller: 'Penjual (Seller/Tenant)',
      address: 'Pusat Kuliner Kampus'
    },
    {
      name: 'Dr. Citra Lestari',
      email: 'citra.lestari@unklab.ac.id',
      password: 'dosen123',
      role: 'Dosen / Staff',
      buyerOrSeller: 'Staff Kampus',
      address: 'Fakultas Ilmu Komputer'
    },
    {
      name: 'Administrator Sistem',
      email: 'admin@unklab.ac.id',
      password: 'admin123',
      role: 'Admin',
      buyerOrSeller: 'Admin',
      address: 'Gedung Rektorat UNKLAB'
    }
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputEmail = formData.email.trim().toLowerCase();

    // 1. Validasi Login Admin Khusus
    if (selectedRole === 'Admin' && mode === 'login') {
      if (inputEmail === 'admin@unklab.ac.id' && formData.password === 'admin123') {
        alert('Login Berhasil sebagai Administrator!');
        navigate('/admin-dashboard');
        return;
      } else {
        alert('Maaf, Akses Admin ditolak! Periksa kembali kredensial Admin.');
        return;
      }
    }

    // 2. Mode Pendaftaran (Register)
    if (mode === 'register') {
      const existingEmail = registeredAccounts.find(acc => acc.email.toLowerCase() === inputEmail);
      if (existingEmail) {
        alert('Maaf, email ini sudah terdaftar! Akun Anda sudah ada, silakan langsung login.');
        setMode('login');
        return;
      }

      const existingName = registeredAccounts.find(acc => acc.name.toLowerCase() === formData.name.trim().toLowerCase());
      if (existingName) {
        alert('Maaf, nama lengkap tersebut sudah digunakan oleh akun lain.');
        return;
      }

      const newAcc = { 
        ...formData, 
        email: inputEmail,
        role: selectedRole 
      };
      
      setRegisteredAccounts([...registeredAccounts, newAcc]);
      alert('Registrasi akun berhasil dan disimpan! Silakan lakukan login.');
      setMode('login');
      setFormData({ name: '', email: '', password: '', buyerOrSeller: 'Pembeli (Buyer)', address: '' });
    
    } 
    // 3. Mode Masuk (Login) Berdasarkan Email Resmi UNKLAB (Nomor Registrasi di Depan)
    else if (mode === 'login') {
      const matchedAccount = registeredAccounts.find(acc => acc.email.toLowerCase() === inputEmail);

      if (!matchedAccount) {
        alert('Maaf, Email Resmi UNKLAB belum terdaftar atau belum pernah melakukan registrasi. Silakan lakukan registrasi terlebih dahulu!');
        setMode('register');
        return;
      }

      if (matchedAccount.password !== formData.password) {
        alert('Password salah untuk email ini! Silakan gunakan menu "Lupa password?" di bawah untuk memperbarui sandi.');
        setMode('forgot');
        return;
      }

      alert(`Login Berhasil! Selamat datang kembali, ${matchedAccount.name}.`);
      
      if (matchedAccount.role === 'Admin') {
        navigate('/admin-dashboard');
      } else if (matchedAccount.role === 'Penjual' || matchedAccount.buyerOrSeller.includes('Penjual')) {
        navigate('/seller-dashboard');
      } else if (matchedAccount.role === 'Dosen / Staff') {
        navigate('/faculty-dashboard');
      } else {
        navigate(`/dashboard?role=${matchedAccount.role.toLowerCase()}`);
      }

    } 
    // 4. Mode Lupa Password (Forgot)
    else if (mode === 'forgot') {
      const account = registeredAccounts.find(acc => acc.email.toLowerCase() === inputEmail);

      if (!account) {
        alert('Email tidak ditemukan dalam database sistem kampus kami. Silakan registrasi baru.');
        setMode('register');
        return;
      }
      
      account.password = formData.password;
      alert(`Password baru berhasil diperbarui untuk akun ${account.name} (${account.email})! Silakan login.`);
      setMode('login');
      setFormData({ name: '', email: '', password: '', buyerOrSeller: 'Pembeli (Buyer)', address: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#2d0c4a] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* SISI KIRI: Background Kampus Nuansa Ungu & Kuning UNKLAB */}
        <div 
          className="p-8 flex flex-col justify-center items-center text-center text-white relative bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(58, 16, 92, 0.78), rgba(30, 8, 50, 0.88)), url('/download.jpg')` 
          }}
        >
          <div className="max-w-xs mx-auto space-y-4 z-10">
            <div className="w-20 h-20 bg-amber-400/20 backdrop-blur-md rounded-2xl flex items-center justify-center p-2 mx-auto mb-2 border border-amber-400/40 shadow-xl">
              <img src="/logo.png" alt="Logo Shop-Mate" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md">Shop-Mate UNKLAB</h1>
            <p className="text-xs text-amber-200 leading-relaxed font-medium drop-shadow">
              Platform e-commerce eksklusif civitas akademika Universitas Klabat menggunakan Email Resmi Kampus.
            </p>
          </div>
          <div className="absolute bottom-6 text-[10px] text-amber-300 z-10 font-semibold">
            &copy; 2026 Universitas Klabat • Restricted Access
          </div>
        </div>

        {/* SISI KANAN: Form Autentikasi */}
        <div className="p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[90vh]">
          <div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-[#3a105c] tracking-wide">Universitas Klabat</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {mode === 'register' && 'Form Registrasi Akun Civitas'}
                {mode === 'login' && 'Silakan masukkan Email Resmi & Password'}
                {mode === 'forgot' && 'Pemulihan / Reset Password Akun'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              {mode !== 'forgot' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pilih Peran / Status</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3a105c] cursor-pointer"
                  >
                    <option value="Student (Mahasiswa)">Student (Mahasiswa)</option>
                    <option value="Dosen / Staff">Dosen / Staff</option>
                    <option value="Penjual">Penjual (Tenant Kampus)</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              )}

              {mode === 'register' && (
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
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tipe Akun Transaksi</label>
                    <select
                      name="buyerOrSeller"
                      value={formData.buyerOrSeller}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 cursor-pointer"
                    >
                      <option value="Pembeli (Buyer)">🛍️ Pembeli (Buyer)</option>
                      <option value="Penjual (Seller/Tenant)">🏪 Penjual (Seller / Tenant)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Alamat Lengkap / Asrama / Fakultas</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Contoh: Asrama Putra / Fakultas Fasilkom"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                  </div>
                </>
              )}

              {/* INPUT EMAIL KAMPUS (MENGGANTIKAN NO. REG DI TAMPILAN LOGIN) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Resmi UNKLAB</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Contoh: 12320526@student.unklab.ac.id"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  {mode === 'register' ? 'Buat Password Mandiri' : mode === 'forgot' ? 'Buat Password Baru' : 'Password'}
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              {mode === 'login' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-amber-600 hover:underline font-semibold cursor-pointer"
                  >
                    Lupa password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#3a105c] hover:bg-[#4d167a] text-amber-300 font-extrabold py-3 rounded-xl transition text-xs shadow-md cursor-pointer mt-2"
              >
                {mode === 'register' && 'Daftar Akun Baru'}
                {mode === 'login' && 'Log in'}
                {mode === 'forgot' && 'Reset & Perbarui Password'}
              </button>
            </form>
          </div>

          <div className="text-center pt-4 border-t border-slate-100 mt-4 flex justify-between text-xs">
            {mode === 'forgot' ? (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-amber-600 hover:underline font-bold mx-auto cursor-pointer"
              >
                &larr; Kembali ke Login
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
                className="text-amber-600 hover:underline font-bold cursor-pointer mx-auto"
              >
                {mode === 'register' ? 'Sudah punya akun? Login' : 'Belum punya akun? Registrasi'}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}