import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar Admin */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-bold text-lg">
              ⚙️
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white">Admin Panel</h1>
              <p className="text-[10px] text-amber-400">Shop-Mate UNKLAB</p>
            </div>
          </div>

          <nav className="space-y-2 text-xs">
            <a href="#overview" className="block px-4 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl">📊 Dashboard Overview</a>
            <a href="#users" className="block px-4 py-2.5 text-slate-300 hover:bg-slate-800 rounded-xl">👥 Kelola Pengguna / Civitas</a>
            <a href="#tenants" className="block px-4 py-2.5 text-slate-300 hover:bg-slate-800 rounded-xl">🏪 Verifikasi Tenant & Toko</a>
            <a href="#reports" className="block px-4 py-2.5 text-slate-300 hover:bg-slate-800 rounded-xl">📈 Laporan Transaksi</a>
          </nav>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
        >
          Keluar (Logout)
        </button>
      </div>

      {/* Konten Utama Admin */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-white">Dashboard Administrator Sistem</h2>
            <p className="text-xs text-slate-400">Pusat kontrol dan manajemen data civitas akademika UNKLAB.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-400/20">
              Administrator
            </span>
          </div>
        </header>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl">
            <p className="text-xs text-slate-400 font-semibold mb-1">Total Pengguna Terdaftar</p>
            <h3 className="text-2xl font-black text-white">1,245</h3>
            <span className="text-[10px] text-emerald-400 mt-2 inline-block">+12% minggu ini</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl">
            <p className="text-xs text-slate-400 font-semibold mb-1">Tenant / Penjual Aktif</p>
            <h3 className="text-2xl font-black text-white">48</h3>
            <span className="text-[10px] text-amber-400 mt-2 inline-block">3 menunggu verifikasi</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl">
            <p className="text-xs text-slate-400 font-semibold mb-1">Total Transaksi</p>
            <h3 className="text-2xl font-black text-white">Rp 45.2 Juta</h3>
            <span className="text-[10px] text-emerald-400 mt-2 inline-block">Terverifikasi sistem</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl">
            <p className="text-xs text-slate-400 font-semibold mb-1">Status Server</p>
            <h3 className="text-2xl font-black text-emerald-400">Normal</h3>
            <span className="text-[10px] text-slate-400 mt-2 inline-block">Uptime 99.9%</span>
          </div>
        </div>

        {/* Tabel Verifikasi Tenant / Pengguna */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">Permintaan Verifikasi Tenant / Penjual Terbaru</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-3">Nama Toko / Tenant</th>
                  <th className="pb-3">Pemilik (Civitas)</th>
                  <th className="pb-3">Email UNKLAB</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3 font-semibold text-white">Kantin Asrama Putra UNKLAB</td>
                  <td>Michael Tendean</td>
                  <td>michael@student.unklab.ac.id</td>
                  <td><span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-md font-bold text-[10px]">Pending</span></td>
                  <td className="py-3 text-right space-x-2">
                    <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold">Setujui</button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold">Tolak</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Bakery Fakultas Fasilkom</td>
                  <td>Christina Pattilamonia</td>
                  <td>christina@student.unklab.ac.id</td>
                  <td><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-md font-bold text-[10px]">Aktif</span></td>
                  <td className="py-3 text-right space-x-2">
                    <button className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg">Detail</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}