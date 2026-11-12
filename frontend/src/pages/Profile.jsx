import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  // Mengambil data pengguna aktif dari localStorage
  const [profile, setProfile] = useState(() => {
    const activeUser = localStorage.getItem('shopmate_active_user');
    return activeUser ? JSON.parse(activeUser) : {
      name: 'Pengguna Kampus',
      email: 'user@student.unklab.ac.id',
      phone: '081234567890',
      address: 'Asrama / Fakultas UNKLAB',
      role: 'Student (Mahasiswa)'
    };
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // 1. Perbarui sesi aktif di localStorage
    localStorage.setItem('shopmate_active_user', JSON.stringify(profile));

    // 2. Perbarui juga data di daftar akun utama (shopmate_accounts)
    let allAccounts = JSON.parse(localStorage.getItem('shopmate_accounts')) || [];
    allAccounts = allAccounts.map(acc => acc.email.toLowerCase() === profile.email.toLowerCase() ? profile : acc);
    localStorage.setItem('shopmate_accounts', JSON.stringify(allAccounts));

    alert('Nomor HP dan Alamat berhasil diperbarui secara permanen!');
  };

  const handleLogout = () => {
    localStorage.removeItem('shopmate_active_user');
    alert('Anda telah keluar.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8">
        
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-xl font-black text-[#3a105c]">Kelola Profil Pengguna</h1>
            <p className="text-xs text-slate-500">Perbarui informasi kontak dan alamat pengiriman Anda di UNKLAB.</p>
          </div>
          <button onClick={() => navigate(-1)} className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-bold text-slate-700">
            &larr; Kembali
          </button>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nama Lengkap</label>
            <input type="text" name="name" value={profile.name} disabled
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed" />
            <span className="text-[10px] text-slate-400 mt-0.5 block">Nama lengkap tidak dapat diubah (sesuai SIAK).</span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Resmi UNKLAB</label>
            <input type="email" value={profile.email} disabled
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 cursor-not-allowed" />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nomor HP</label>
            <input type="text" name="phone" required value={profile.phone} onChange={handleChange} placeholder="Contoh: 081234567890"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:ring-2 focus:ring-[#3a105c]" />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Alamat</label>
            <textarea name="address" required rows="3" value={profile.address} onChange={handleChange} placeholder="Contoh: Asrama Putra / Fakultas Fasilkom UNKLAB"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:ring-2 focus:ring-[#3a105c]" />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="submit" className="flex-1 bg-[#3a105c] hover:bg-[#4d167a] text-amber-300 font-extrabold py-3 rounded-xl transition text-xs shadow-md cursor-pointer">
              Simpan Perubahan Profil
            </button>
            <button type="button" onClick={handleLogout} className="px-5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3 rounded-xl transition text-xs cursor-pointer">
              Log out
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}