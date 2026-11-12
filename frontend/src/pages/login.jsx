import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
  const [selectedRole, setSelectedRole] = useState('Student (Mahasiswa)');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    buyerOrSeller: 'Pembeli (Buyer)',
    address: ''
  });

  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    const savedAccounts = localStorage.getItem('shopmate_accounts');
    if (savedAccounts) {
      try {
        return JSON.parse(savedAccounts);
      } catch (e) {
        console.error("Gagal memuat data akun lokal", e);
      }
    }
    return [
      {
        name: 'Kartika Sari',
        email: 's22229040@student.unklab.ac.id',
        phone: '081234567890',
        password: 'password123',
        role: 'Student (Mahasiswa)',
        buyerOrSeller: 'Pembeli (Buyer)',
        address: 'kost/filkom'
      },
      {
        name: 'Kantin Asri UNKLAB',
        email: 'tenantkantin@student.unklab.ac.id',
        phone: '082198765432',
        password: 'seller123',
        role: 'Penjual',
        buyerOrSeller: 'Penjual (Seller/Tenant)',
        address: 'Pusat Kuliner Kampus'
      },
      {
        name: 'Administrator Sistem',
        email: 'admin@unklab.ac.id',
        phone: '080000000000',
        password: 'admin123',
        role: 'Admin',
        buyerOrSeller: 'Admin',
        address: 'Gedung Rektorat UNKLAB'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('shopmate_accounts', JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputEmail = formData.email.trim().toLowerCase();

    if (selectedRole === 'Admin' && mode === 'login') {
      if (inputEmail === 'admin@unklab.ac.id' && formData.password === 'admin123') {
        alert('Login Berhasil sebagai Administrator!');
        navigate('/admin-dashboard');
        return;
      } else {
        alert('Maaf, Akses Admin ditolak!');
        return;
      }
    }

    if (mode === 'register') {
      const existingEmail = registeredAccounts.find(acc => acc.email.toLowerCase() === inputEmail);
      if (existingEmail) {
        alert('Maaf, email ini sudah terdaftar! Silakan langsung login.');
        setMode('login');
        return;
      }

      const newAcc = { 
        ...formData, 
        email: inputEmail,
        role: selectedRole 
      };
      
      const updatedAccounts = [...registeredAccounts, newAcc];
      setRegisteredAccounts(updatedAccounts);
      
      alert('Registrasi akun berhasil! Silakan login.');
      setMode('login');
      setFormData({ name: '', email: '', phone: '', password: '', buyerOrSeller: 'Pembeli (Buyer)', address: '' });
    
    } else if (mode === 'login') {
      const matchedAccount = registeredAccounts.find(acc => acc.email.toLowerCase() === inputEmail);

      if (!matchedAccount) {
        alert('Email Resmi UNKLAB belum terdaftar. Silakan registrasi terlebih dahulu!');
        setMode('register');
        return;
      }

      if (matchedAccount.password !== formData.password) {
        alert('Password salah!');
        return;
      }

      // SIMPAN SESI AKUN AKTIF
      localStorage.setItem('shopmate_active_user', JSON.stringify(matchedAccount));

      alert(`Login Berhasil! Selamat datang kembali, ${matchedAccount.name}.`);
      
      if (matchedAccount.role === 'Admin') {
        navigate('/admin-dashboard');
      } else if (matchedAccount.role === 'Penjual' || matchedAccount.buyerOrSeller.includes('Penjual')) {
        navigate('/seller-dashboard');
      } else {
        navigate('/dashboard'); // Diarahkan ke Katalog Pembeli
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#2d0c4a] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 flex flex-col justify-center items-center text-center text-white relative bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(58, 16, 92, 0.78), rgba(30, 8, 50, 0.88)), url('/download.jpg')` }}>
          <div className="max-w-xs mx-auto space-y-4 z-10">
            <h1 className="text-2xl font-black tracking-tight text-white">Shop-Mate UNKLAB</h1>
            <p className="text-xs text-amber-200 leading-relaxed font-medium">Platform e-commerce eksklusif civitas akademika Universitas Klabat.</p>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[90vh]">
          <div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-[#3a105c]">Universitas Klabat</h2>
              <p className="text-xs text-slate-500 mt-0.5">{mode === 'register' ? 'Form Registrasi Akun Civitas' : 'Silakan Login'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode !== 'forgot' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pilih Peran / Status</label>
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
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
                    <input type="text" name="name" required placeholder="Nama lengkap sesuai SIAK" value={formData.name} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tipe Akun</label>
                    <select name="buyerOrSeller" value={formData.buyerOrSeller} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                      <option value="Pembeli (Buyer)">🛍️ Pembeli (Buyer)</option>
                      <option value="Penjual (Seller/Tenant)">🏪 Penjual (Seller / Tenant)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nomor WhatsApp</label>
                    <input type="text" name="phone" required placeholder="Contoh: 081234567890" value={formData.phone} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Alamat (Contoh: Outsider / Jasmine Kamar 203)</label>
                    <input type="text" name="address" required placeholder="Masukkan alamat atau lokasi anda" value={formData.address} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800" />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Resmi UNKLAB</label>
                <input type="email" name="email" required placeholder="Contoh: s22229040@student.unklab.ac.id" value={formData.email} onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Password</label>
                <input type="password" name="password" required placeholder="••••••••" value={formData.password} onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800" />
              </div>

              <button type="submit" className="w-full bg-[#3a105c] hover:bg-[#4d167a] text-amber-300 font-extrabold py-3 rounded-xl transition text-xs shadow-md mt-2">
                {mode === 'register' ? 'Daftar Akun Baru' : 'Log in'}
              </button>
            </form>
          </div>

          <div className="text-center pt-4 border-t border-slate-100 mt-4">
            <button type="button" onClick={() => setMode(mode === 'register' ? 'login' : 'register')} className="text-amber-600 hover:underline font-bold text-xs">
              {mode === 'register' ? 'Sudah punya akun? Login' : 'Belum punya akun? Registrasi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}