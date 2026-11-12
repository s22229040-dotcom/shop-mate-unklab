import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuyerProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(() => {
    const activeUser = localStorage.getItem('shopmate_active_user');
    return activeUser ? JSON.parse(activeUser) : {
      name: 'Michael Tendean',
      email: 's22229040@student.unklab.ac.id',
      phone: '081234567890',
      address: 'Jasmine Kamar 203'
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
    <div className="min-h-screen bg-[#131b2e] font-sans text-white p-6">
      
      {/* TOMBOL KEMBALI DI ATAS */}
      <div className="max-w-3xl mx-auto mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          ← Kembali
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-8 bg-[#1e293b] rounded-3xl shadow-2xl border border-slate-700">
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
              <span className="text-xs text-slate-400 font-bold uppercase">Nomor WhatsApp:</span>
              <span className="text-sm font-bold text-white">{profile.phone}</span>
            </div>

            <div className="bg-[#131b2e] p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">Alamat:</span>
              <span className="text-sm font-bold text-white">{profile.address}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Lengkap</label>
              <input type="text" value={profile.name} disabled 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-400 cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Resmi UNKLAB</label>
              <input type="email" value={profile.email} disabled 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-400 cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Nomor WhatsApp</label>
              <input type="text" name="phone" required value={profile.phone} onChange={handleChange} 
                className="w-full px-4 py-3 bg-[#131b2e] border border-amber-400/50 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase mb-1">Alamat (Contoh: Outsider / Jasmine Kamar 203)</label>
              <textarea name="address" required rows="3" value={profile.address} onChange={handleChange} 
                className="w-full px-4 py-3 bg-[#131b2e] border border-amber-400/50 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-400" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" 
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3 rounded-xl transition text-xs shadow-lg cursor-pointer">
                Simpan
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