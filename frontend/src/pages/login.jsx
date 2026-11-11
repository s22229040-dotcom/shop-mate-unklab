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

  // State penyimpanan akun persisten lokal (menyimpan data registrasi)
  const [registeredAccounts, setRegisteredAccounts] = useState([
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

    // Login Khusus Admin
    if (selectedRole === 'Admin' && mode === 'login') {
      if (formData.email === 'admin@unklab.ac.id' && formData.password === 'admin123') {
        alert('Login Berhasil sebagai Administrator!');
        navigate('/admin-dashboard');
        return;
      } else {
        alert('Maaf, Akses Admin ditolak! Email atau Password Admin salah.');
        return;
      }
    }

    // Validasi Domain Email UNKLAB
    if (!formData.email.endsWith('@unklab.ac.id') && !formData.email.endsWith('@student.unklab.ac.id')) {
      alert('Wajib menggunakan email resmi berdomain @unklab.ac.id atau @student.unklab.ac.id!');
      return;
    }

    if (mode === 'register') {
      // Cek apakah email sudah terdaftar sebelumnya
      const existingEmail = registeredAccounts.find(acc => acc.email === formData.email);
      if (existingEmail) {
        alert('Maaf, email ini sudah terdaftar dalam sistem! Akun Anda sudah ada, silakan langsung login.');
        setMode('login');
        return;
      }

      // Cek apakah nama sudah ada (mencegah duplikasi nama akun yang sama)
      const existingName = registeredAccounts.find(acc => acc.name.toLowerCase() === formData.name.toLowerCase());
      if (existingName) {
        alert('Maaf, nama lengkap tersebut sudah digunakan oleh akun lain. Silakan gunakan nama lengkap unik atau login jika itu akun Anda.');
        return;
      }

      // Simpan akun baru
      const newAcc = { ...formData, role: selectedRole };
      setRegisteredAccounts([...registeredAccounts, newAcc]);
      alert('Registrasi akun berhasil! Akun Anda telah disimpan. Silakan login.');
      setMode('login');
      setFormData({ name: '', email: '', password: '', buyerOrSeller: 'Pembeli (Buyer)', address: '' });
    
    } else if (mode === 'login') {
      // Cek apakah email terdaftar
      const accountByEmail = registeredAccounts.find(acc => acc.email === formData.email);

      if (!accountByEmail) {
        alert('Maaf, akun belum terdaftar! Silakan lakukan registrasi terlebih dahulu.');
        setMode('register');
        return;
      }

      // Jika email ada tapi password salah -> Arahkan ke fitur Lupa Password
      if (accountByEmail.password !== formData.password) {
        alert('Password salah untuk email ini! Silakan gunakan fitur "Lupa password?" di bawah untuk mereset sandi Anda.');
        setMode('forgot');
        return;
      }

      alert(`Login Berhasil! Selamat datang di Shop-Mate UNKLAB.`);
      if (selectedRole === 'Penjual' || accountByEmail.buyerOrSeller.includes('Penjual')) {
        navigate('/seller-dashboard');
      } else {
        navigate(`/dashboard?role=${selectedRole.toLowerCase()}`);
      }

    } else if (mode === 'forgot') {
      const account = registeredAccounts.find(acc => acc.email === formData.email);
      if (!account) {
        alert('Email tidak ditemukan dalam sistem database kami. Belum punya akun? Silakan registrasi.');
        setMode('register');
        return;
      }
      // Simulasi reset/pembaruan password
      account.password = formData.password;
      alert(`Password baru berhasil disimpan untuk akun ${account.email}! Silakan login.`);
      setMode('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#2d0c4a] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* SISI KIRI: Background Kampus Nuansa Ungu & Kuning UNKLAB */}
        <div 
          className="p-8 flex flex-col justify-center items-center text-center text-white relative bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(15, 44, 89, 0.85), rgba(7, 22, 48, 0.92)), url('/download.jpg')` 
          }}
        >
          <div className="max-w-xs mx-auto space-y-4 z-10">
            <div className="w-20 h-20 bg-[#F4CE14]/20 backdrop-blur-md rounded-2xl flex items-center justify-center p-2 mx-auto mb-2 border border-[#F4CE14]/40 shadow-xl">
              <img src="/logo.png" alt="Logo Shop-Mate" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md">Shop-Mate UNKLAB</h1>
            <p className="text-xs text-[#F4CE14] leading-relaxed font-medium drop-shadow">
              Halo, Selamat Datang di Shop-Mate UNKLAB! Platform e-commerce eksklusif civitas akademika Universitas Klabat.
            </p>
          </div>
          <div className="absolute bottom-6 text-[10px] text-slate-300 z-10 font-semibold">
            &copy; 2026 Universitas Klabat • Restricted Access
          </div>
        </div>

        {/* SISI KANAN: Form Dinamis */}
        <div className="p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[90vh]">
          <div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-[#0F2C59] tracking-wide">Universitas Klabat</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {mode === 'register' && 'Form Registrasi Akun Civitas'}
                {mode === 'login' && 'Silakan pilih peran dan masuk'}
                {mode === 'forgot' && 'Pemulihan / Reset Password'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              
              {mode !== 'forgot' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pilih Peran / Status</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2C59] cursor-pointer"
                  >
                    <option value="Student (Mahasiswa)">Student (Mahasiswa)</option>
                    <option value="Dosen / Staff">Dosen / Staff</option>
                    <option value="Penjual">Penjual</option>
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
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Alamat Lengkap / Asrama</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Contoh: Asrama Putra UNKLAB"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Resmi UNKLAB</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={selectedRole === 'Admin' ? 'admin@unklab.ac.id' : 'nama@student.unklab.ac.id'}
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
                    className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
                  >
                    Lupa password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0F2C59] hover:bg-blue-900 text-[#F4CE14] font-extrabold py-3 rounded-xl transition text-xs shadow-md cursor-pointer mt-2"
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
                className="text-blue-700 hover:underline font-bold mx-auto cursor-pointer"
              >
                &larr; Kembali ke Login
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
                className="text-blue-700 hover:underline font-bold cursor-pointer mx-auto"
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