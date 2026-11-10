import React, { useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState({
    namaLengkap: 'Christina Pattilamonia',
    email: 'christina@student.unklab.ac.id',
    whatsapp: '081234567890',
    alamatAsrama: 'Asrama Putri UNKLAB, Airmadidi'
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Perubahan profil berhasil disimpan!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-lg border border-slate-100">
        
        {/* Header Judul */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
            👤
          </div>
          <h1 className="text-xl font-bold text-slate-800">
            Kelola Profil Civitas
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              NAMA LENGKAP
            </label>
            <input
              type="text"
              name="namaLengkap"
              value={profile.namaLengkap}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              required
            />
          </div>

          {/* Email Resmi */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              EMAIL RESMI (DOMAIN UNKLAB)
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 text-sm cursor-not-allowed"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              NOMOR WHATSAPP / HP
            </label>
            <input
              type="text"
              name="whatsapp"
              value={profile.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              required
            />
          </div>

          {/* Alamat Asrama / Fakultas */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              ALAMAT ASRAMA / FAKULTAS
            </label>
            <textarea
              name="alamatAsrama"
              rows="3"
              value={profile.alamatAsrama}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition resize-none"
              required
            />
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="w-full bg-[#0d233a] hover:bg-blue-900 text-white font-semibold py-3.5 rounded-xl transition shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Simpan Perubahan Profil</span>
            <span className="text-amber-400">🔒</span>
          </button>
        </form>

      </div>
    </div>
  );
}