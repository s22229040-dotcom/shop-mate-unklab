import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' atau 'register'
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
      try { return JSON.parse(savedAccounts); } catch (e) { console.error(e); }
    }
    return [
      {
        name: 'Kartika Sari',
        email: 's22229040@student.unklab.ac.id',
        phone: '081234567890',
        password: 'password123',
        role: 'Student (Mahasiswa)',
        buyerOrSeller: 'Pembeli (Buyer)',
        address: 'Asrama Putri / Fakultas Fasilkom'
      },
      {
        name: 'Kantin Asri UNKLAB',
        email: 'tenantkantin@student.unklab.ac.id',
        phone: '082198765432',
        password: 'seller123',
        role: 'Penjual',
        buyerOrSeller: 'Penjual (Seller/Tenant)',
        address: 'Pusat Kuliner Kampus'
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

    if (mode === 'register') {
      const existing = registeredAccounts.find(acc => acc.email.toLowerCase() === inputEmail);
      if (existing) {
        alert('Email sudah terdaftar! Silakan login.');
        setMode('login');
        return;
      }

      const newAccount = {
        ...formData,
        email: inputEmail,
        role: selectedRole
      };

      const updated = [...registeredAccounts, newAccount];
      setRegisteredAccounts(updated);
      alert('Registrasi akun berhasil! Silakan login.');
      setMode('login');
      setFormData({ name: '', email: '', phone: '', password: '', buyerOrSeller: 'Pembeli (Buyer)', address: '' });
    } else {
      const account = registeredAccounts.find(acc => acc.email.toLowerCase() === inputEmail);
      if (!account) {
        alert('Email belum terdaftar. Silakan registrasi terlebih dahulu!');
        setMode('register');
        return;
      }
      if (account.password !== formData.password) {
        alert('Password salah!');
        return;
      }

      localStorage.setItem('shopmate_active_user', JSON.stringify(account));
      alert(`Login Berhasil! Selamat datang, ${account.name}.`);

      if (account.role === 'Penjual' || account.buyerOrSeller.includes('Penjual')) {
        navigate('/seller-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden"
         style={{ background: 'linear-gradient(135deg, rgba(58,16,92,0.85) 0%, rgba(30,8,50,0.92) 100%), url("/download.jpg") center/cover no-repeat' }}>
      
      {/* Overlay terang agar gambar latar belakang tetap terlihat jelas dan estetik */}
      <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[2px]"></div>

      <div className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 z-10 border border-purple-100">
        <div className="p-8 flex flex-col justify-center items-center text-center text-white bg-gradient-to-br from-[#3a105c] to-[#200835] relative">
          <div className="max-w-xs mx-auto space-y-4 z-10">
            <div className="w-16 h-16 bg-amber-400 rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg">🛒</div>
            <h1 className="text-2xl font-black tracking-tight text-white">Shop-Mate UNKLAB</h1>
            <p className="text-xs text-amber-200 leading-relaxed font-medium">
              Platform e-commerce eksklusif civitas akademika Universitas Klabat menggunakan Email Resmi Kampus[cite: 5].
            </p>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[90vh]">
          <div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-[#3a105c]">Universitas Klabat</h2>
              <p className="text-xs text-slate-500 mt-0.5">{mode === 'register' ? 'Form Registrasi Akun Civitas' : 'Silakan Masuk'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pilih Peran / Status</label>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-purple-500">
                  <option value="Student (Mahasiswa)">Student (Mahasiswa)</option>
                  <option value="Dosen / Staff">Dosen / Staff</option>
                  <option value="Penjual">Penjual (Tenant Kampus)</option>
                </select>
              </div>

              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nama Lengkap</label>
                    <input type="text" name="name" required placeholder="Nama lengkap sesuai SIAK" value={formData.name} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Tipe Akun Transaksi</label>
                    <select name="buyerOrSeller" value={formData.buyerOrSeller} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                      <option value="Pembeli (Buyer)">🛍️ Pembeli (Buyer)</option>
                      <option value="Penjual (Seller/Tenant)">🏪 Penjual (Seller / Tenant)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nomor WhatsApp / HP</label>
                    <input type="text" name="phone" required placeholder="Contoh: 081234567890" value={formData.phone} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Alamat Lengkap / Asrama / Fakultas[cite: 5]</label>
                    <input type="text" name="address" required placeholder="Contoh: Asrama Putri / Fakultas Fasilkom" value={formData.address} onChange={handleChange}
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

              <button type="submit" className="w-full bg-[#3a105c] hover:bg-[#4d167a] text-amber-300 font-extrabold py-3 rounded-xl transition text-xs shadow-md mt-2 cursor-pointer">
                {mode === 'register' ? 'Daftar Akun Baru' : 'Log in'}
              </button>
            </form>
          </div>

          <div className="text-center pt-4 border-t border-slate-100 mt-4">
            <button type="button" onClick={() => setMode(mode === 'register' ? 'login' : 'register')} className="text-amber-700 hover:underline font-bold text-xs cursor-pointer">
              {mode === 'register' ? 'Sudah punya akun? Login' : 'Belum punya akun? Registrasi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}