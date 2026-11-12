import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuyerProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(() => {
    const activeUser = localStorage.getItem('shopmate_active_user');
    return activeUser ? JSON.parse(activeUser) : {
      name: 'Kartika Sari',
      email: 's22229040@student.unklab.ac.id',
      phone: '081234567890',
      address: 'kost/filkom'
    };
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('shopmate_active_user', JSON.stringify(profile));

    let allAccounts = JSON.parse(localStorage.getItem('shopmate_accounts')) || [];
    allAccounts = allAccounts.map(acc => 
      acc.email.toLowerCase() === profile.email.toLowerCase() ? { ...acc, phone: profile.phone, address: profile.address } : acc
    );
    localStorage.setItem('shopmate_accounts', JSON.stringify(allAccounts));

    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  return (
    <div className="min-h-screen bg-[#131b2e] font-sans text-white">
      
      {/* NAVBAR ATAS (Sudah Berfungsi Penuh) */}
      <div className="bg-[#0b101d] px-8 py-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-slate-900 font-black">🛒</div>
          <div>
            <h1 className="text-sm font-black tracking-wider text-white">SHOP-MATE UNKLAB</h1>
            <p className="text-[10px] text-amber-400 font-bold">PORTAL BELANJA CIVITAS AKADEMIKA</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-xs font-semibold">
          <button onClick={() => navigate('/dashboard')} className="hover:text-amber-400 transition cursor-pointer">Katalog</button>
          <button onClick={() => navigate('/cart')} className="hover:text-amber-400 transition cursor-pointer">Keranjang</button>
          <button onClick={() => navigate('/notifications')} className="hover:text-amber-400 transition cursor-pointer">Notifikasi</button>
          <button onClick={() => navigate('/profile')} className="bg-amber-400 text-slate-900 px-4 py-2 rounded-xl font-extrabold shadow cursor-pointer">Profil Saya</button>
          <button onClick={() => { localStorage.removeItem('shopmate_active_user'); navigate('/login'); }} className="bg-rose-500/20 text-rose-400 px-4 py-2 rounded-xl font-bold hover:bg-rose-500/30 transition cursor-pointer">
            Keluar
          </button>
        </div>
      </div>

      {/* KONTEN UTAMA PROFIL */}
      <div className="max-w-3xl mx-auto mt-10 p-8 bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-700">
        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-lg font-black text-white">Profil Pembeli Civitas</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-4 py-2 rounded-xl text-xs font-extrabold shadow transition cursor-pointer"
            >
              Edit Profil
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="bg-[#131b2e] p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">Nama:</span>
              <span className="text-sm font-bold text-white">{profile.name}</span>
            </div>

            <div className="bg-[#131b2e] p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">Email UNKLAB:</span>
              <span className="text-sm font-bold text-amber-300">{profile.email}</span>
            </div>

            <div className="bg-[#131b2e] p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">Nomor WhatsApp / HP:</span>
              <span className="text-sm font-bold text-white">{profile.phone || 'Belum diisi'}</span>
            </div>

            <div className="bg-[#131b2e] p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">Alamat:</span>
              <span className="text-sm font-bold text-white">{profile.address || 'Belum diisi'}</span>
            </div>

            <div className="pt-4 text-center">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3 rounded-xl transition text-xs shadow-lg cursor-pointer"
              >
                ← Kembali ke Katalog Belanja
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama</label>
              <input type="text" value={profile.name} disabled 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-400 cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Resmi UNKLAB</label>
              <input type="email" value={profile.email} disabled 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-400 cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Nomor WhatsApp / HP</label>
              <input type="text" name="phone" required value={profile.phone} onChange={handleChange} 
                className="w-full px-4 py-3 bg-[#131b2e] border border-amber-400/50 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Alamat</label>
              <textarea name="address" required rows="3" value={profile.address} onChange={handleChange} 
                className="w-full px-4 py-3 bg-[#131b2e] border border-amber-400/50 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" 
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3 rounded-xl transition text-xs shadow-lg cursor-pointer">
                Simpan Perubahan
              </button>
              <button type="button" onClick={() => setIsEditing(false)} 
                className="px-6 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition text-xs cursor-pointer">
                Batal
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}