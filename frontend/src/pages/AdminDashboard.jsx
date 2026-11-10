import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // State untuk navigasi menu aktif
  const [activeMenu, setActiveMenu] = useState('overview');

  // State data verifikasi tenant agar tombol Setujui/Tolak berfungsi interaktif
  const [tenants, setTenants] = useState([
    { id: 1, name: 'Kantin Asrama Putra UNKLAB', owner: 'Michael Tendean', email: 'michael@student.unklab.ac.id', status: 'Pending' },
    { id: 2, name: 'Bakery Fakultas Fasilkom', owner: 'Christina Pattilamonia', email: 'christina@student.unklab.ac.id', status: 'Aktif' }
  ]);

  // State data pengguna civitas (Fitur tambahan esensial SRS)
  const [users, setUsers] = useState([
    { id: 1, name: 'Michael Tendean', email: 'michael@student.unklab.ac.id', role: 'Student', status: 'Aktif' },
    { id: 2, name: 'Christina Pattilamonia', email: 'christina@student.unklab.ac.id', role: 'Student', status: 'Aktif' },
    { id: 3, name: 'Dr. Rorong, M.Cs.', email: 'rorong@unklab.ac.id', role: 'Dosen / Staff', status: 'Aktif' }
  ]);

  // Handler Tombol Setujui / Tolak Tenant
  const handleTenantAction = (id, action) => {
    setTenants(tenants.map(t => {
      if (t.id === id) {
        return { ...t, status: action === 'approve' ? 'Aktif' : 'Ditolak' };
      }
      return t;
    }));
    alert(`Tenant berhasil ${action === 'approve' ? 'disetujui' : 'ditolak'}!`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* Sidebar Admin Interaktif */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
              ⚙️
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white">Admin Panel</h1>
              <p className="text-[10px] text-amber-400">Shop-Mate UNKLAB</p>
            </div>
          </div>

          <nav className="space-y-2 text-xs font-semibold">
            <button 
              onClick={() => setActiveMenu('overview')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${activeMenu === 'overview' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>📊</span> Dashboard Overview
            </button>
            <button 
              onClick={() => setActiveMenu('users')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${activeMenu === 'users' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>👥</span> Kelola Pengguna / Civitas
            </button>
            <button 
              onClick={() => setActiveMenu('tenants')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${activeMenu === 'tenants' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>🏪</span> Verifikasi Tenant & Toko
            </button>
            <button 
              onClick={() => setActiveMenu('reports')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${activeMenu === 'reports' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>📈</span> Laporan & Audit Log
            </button>
          </nav>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold py-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🚪</span> Keluar (Logout)
        </button>
      </div>

      {/* Konten Utama Dinamis */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-white">
              {activeMenu === 'overview' && 'Dashboard Administrator Sistem'}
              {activeMenu === 'users' && 'Manajemen Data Pengguna Civitas UNKLAB'}
              {activeMenu === 'tenants' && 'Persetujuan & Verifikasi Tenant Toko'}
              {activeMenu === 'reports' && 'Laporan Transaksi & Audit Log Sistem'}
            </h2>
            <p className="text-xs text-slate-400">Pusat kontrol dan manajemen data civitas akademika UNKLAB.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 bg-amber-400/10 text-amber-400 text-xs font-extrabold rounded-xl border border-amber-400/30 shadow-sm">
              🛡️ Administrator Utama
            </span>
          </div>
        </header>

        {/* KONTEN 1: OVERVIEW */}
        {activeMenu === 'overview' && (
          <div>
            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Total Pengguna Terdaftar</p>
                <h3 className="text-2xl font-black text-white">1,245</h3>
                <span className="text-[10px] text-emerald-400 mt-2 inline-block font-bold">+12% minggu ini</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Tenant / Penjual Aktif</p>
                <h3 className="text-2xl font-black text-white">48</h3>
                <span className="text-[10px] text-amber-400 mt-2 inline-block font-bold">3 menunggu verifikasi</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Total Transaksi</p>
                <h3 className="text-2xl font-black text-white">Rp 45.2 Juta</h3>
                <span className="text-[10px] text-emerald-400 mt-2 inline-block font-bold">Terverifikasi sistem</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Status Server</p>
                <h3 className="text-2xl font-black text-emerald-400">Normal</h3>
                <span className="text-[10px] text-slate-400 mt-2 inline-block font-bold">Uptime 99.9%</span>
              </div>
            </div>

            {/* Tabel Verifikasi Tenant Cepat */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-white mb-4">Permintaan Verifikasi Tenant / Penjual Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="pb-3 font-bold uppercase">Nama Toko / Tenant</th>
                      <th className="pb-3 font-bold uppercase">Pemilik (Civitas)</th>
                      <th className="pb-3 font-bold uppercase">Email UNKLAB</th>
                      <th className="pb-3 font-bold uppercase">Status</th>
                      <th className="pb-3 font-bold uppercase text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {tenants.map((t) => (
                      <tr key={t.id}>
                        <td className="py-3.5 font-bold text-white">{t.name}</td>
                        <td>{t.owner}</td>
                        <td>{t.email}</td>
                        <td>
                          <span className={`px-2.5 py-1 rounded-md font-extrabold text-[10px] ${
                            t.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400' :
                            t.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          {t.status === 'Pending' ? (
                            <>
                              <button onClick={() => handleTenantAction(t.id, 'approve')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer transition">Setujui</button>
                              <button onClick={() => handleTenantAction(t.id, 'reject')} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer transition">Tolak</button>
                            </>
                          ) : (
                            <span className="text-slate-500 font-medium">Selesai</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* KONTEN 2: KELOLA PENGGUNA */}
        {activeMenu === 'users' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white">Daftar Pengguna / Civitas Akademika Terdaftar</h3>
              <button onClick={() => alert('Fitur tambah pengguna manual dibuka')} className="px-3.5 py-2 bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs hover:bg-amber-500 transition cursor-pointer">
                + Tambah Akun Civitas
              </button>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-3 font-bold uppercase">Nama Lengkap</th>
                  <th className="pb-3 font-bold uppercase">Email Resmi UNKLAB</th>
                  <th className="pb-3 font-bold uppercase">Peran / Status</th>
                  <th className="pb-3 font-bold uppercase text-right">Aksi Manajemen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3.5 font-bold text-white">{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-md font-bold text-[10px]">{u.role}</span></td>
                    <td className="py-3.5 text-right space-x-2">
                      <button onClick={() => alert(`Edit data ${u.name}`)} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-bold cursor-pointer">Edit</button>
                      <button onClick={() => alert(`Blokir akses ${u.name}`)} className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-bold cursor-pointer">Blokir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* KONTEN 3: VERIFIKASI TENANT */}
        {activeMenu === 'tenants' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-white mb-4">Kelola & Validasi Tenant / Toko Kampus</h3>
            <div className="space-y-3">
              {tenants.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">Pemilik: {t.owner} ({t.email})</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md font-extrabold text-[10px] ${t.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {t.status}
                    </span>
                    {t.status === 'Pending' && (
                      <button onClick={() => handleTenantAction(t.id, 'approve')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer">
                        Setujui Toko
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KONTEN 4: LAPORAN & AUDIT LOG (Fitur Tambahan Esensial SRS) */}
        {activeMenu === 'reports' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-white mb-3">📄 Laporan Keuangan & Transaksi Keseluruhan</h3>
              <p className="text-xs text-slate-400 mb-4">Unduh rekapitulasi transaksi seluruh tenant civitas akademika UNKLAB dalam format laporan resmi.</p>
              <button onClick={() => alert('Laporan keuangan berhasil diunduh dalam format PDF/Excel!')} className="px-4 py-2.5 bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs hover:bg-amber-500 transition cursor-pointer shadow-md">
                📥 Unduh Laporan Transaksi (Excel / PDF)
              </button>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-white mb-3">🛡️ System Audit Log (Keamanan & Aktivitas)</h3>
              <div className="text-xs space-y-2 text-slate-300 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-emerald-400">[10 Nov 2026, 14:32] Admin menyetujui registrasi Tenant Kantin Asrama Putra.</p>
                <p className="text-slate-400">[10 Nov 2026, 12:15] Pengguna baru mendaftar dengan domain @student.unklab.ac.id.</p>
                <p className="text-amber-400">[10 Nov 2026, 09:40] Sistem mendeteksi login sukses role Dosen / Staff.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}