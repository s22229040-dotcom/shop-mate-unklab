import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get('role') || 'Student (Mahasiswa)';

  // State profil pengguna
  const [profile, setProfile] = useState({
    name: 'Michael Tendean',
    email: 'michael@student.unklab.ac.id',
    faculty: 'Fakultas Ilmu Komputer (FASILKOM)',
    phone: '081234567890',
    address: 'Asrama Putra UNKLAB, Kamar 204'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* NAVBAR */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(`/dashboard?role=${userRole}`)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            <span>&larr;</span> Kembali ke Katalog
          </button>
        </div>
        <h1 className="font-extrabold text-sm text-white tracking-wide">PROFIL AKUN CIVITAS</h1>
        <button 
          onClick={() => navigate('/')}
          className="px-3.5 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold text-xs rounded-xl transition cursor-pointer"
        >
          Keluar
        </button>
      </header>

      {/* KONTEN PROFIL */}
      <main className="flex-1 p-6 max-w-2xl mx-auto w-full my-auto">
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 shadow-2xl">
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
            <div className="w-16 h-16 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow">
              🎓
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{profile.name}</h2>
              <p className="text-xs text-amber-400 font-semibold uppercase">{userRole}</p>
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 flex justify-between">
                <span className="text-slate-400 font-bold">Email Resmi UNKLAB:</span>
                <span className="text-white font-semibold">{profile.email}</span>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 flex justify-between">
                <span className="text-slate-400 font-bold">Fakultas / Unit:</span>
                <span className="text-white font-semibold">{profile.faculty}</span>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 flex justify-between">
                <span className="text-slate-400 font-bold">Nomor WhatsApp:</span>
                <span className="text-white font-semibold">{profile.phone}</span>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 flex justify-between">
                <span className="text-slate-400 font-bold">Alamat Pengiriman / Asrama:</span>
                <span className="text-white font-semibold">{profile.address}</span>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl transition text-xs shadow-md cursor-pointer"
              >
                ✏️ Edit Profil Saya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Fakultas / Unit</label>
                <input
                  type="text"
                  name="faculty"
                  value={profile.faculty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Alamat Asrama / Pengiriman</label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  rows="2"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl cursor-pointer"
                >
                  Simpan Perubahan ✓
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}