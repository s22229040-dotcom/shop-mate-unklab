import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // 1. VALIDASI EMAIL RESMI UNKLAB
    const allowedDomains = ['@student.unklab.ac.id', '@unklab.ac.id'];
    const isValidUnklabEmail = allowedDomains.some(domain => formData.email.toLowerCase().endsWith(domain));

    if (!isValidUnklabEmail) {
      alert('Pendaftaran ditolak! Harap gunakan email resmi UNKLAB (@student.unklab.ac.id atau @unklab.ac.id).');
      return;
    }

    // 2. AMBIL DATA AKUN YANG SUDAH ADA DI LOCALSTORAGE
    let allAccounts = JSON.parse(localStorage.getItem('shopmate_accounts')) || [];

    // 3. CEK APAKAH EMAIL SUDAH TERDAFTAR
    const isEmailExist = allAccounts.some(acc => acc.email.toLowerCase() === formData.email.toLowerCase());
    if (isEmailExist) {
      alert('Email ini sudah terdaftar! Silakan langsung login.');
      return;
    }

    // 4. SIMPAN AKUN BARU KE LOCALSTORAGE
    allAccounts.push(formData);
    localStorage.setItem('shopmate_accounts', JSON.stringify(allAccounts));

    alert('Registrasi berhasil! Silakan login dengan akun UNKLAB kamu.');
    navigate('/login'); // Arahkan kembali ke halaman login
  };

  return (
    <div className="min-h-screen bg-[#131b2e] font-sans text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-700">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-white">Daftar Akun UNKLAB</h2>
          <p className="text-xs text-slate-400 mt-1">Khusus Civitas Akademika Universitas Klabat</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Masukkan nama lengkap"
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-[#131b2e] border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Resmi UNKLAB</label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="contoh: s22229040@student.unklab.ac.id"
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-[#131b2e] border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nomor WhatsApp</label>
            <input 
              type="text" 
              name="phone" 
              required 
              placeholder="081234567890"
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-[#131b2e] border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Alamat / Asrama</label>
            <textarea 
              name="address" 
              required 
              rows="2" 
              placeholder="Contoh: Asrama Putra UNKLAB, Kamar 204"
              value={formData.address} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-[#131b2e] border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="Buat password akun"
              value={formData.password} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-[#131b2e] border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3 rounded-xl transition text-xs shadow-lg cursor-pointer mt-2"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-amber-400 font-bold hover:underline">
              Login di sini
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}