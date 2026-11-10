import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // State navigasi menu aktif
  const [activeMenu, setActiveMenu] = useState('overview');

  // State daftar tenant untuk diverifikasi (Use Case: Verifikasi Tenant)
  const [tenants, setTenants] = useState([
    { id: 1, name: 'Kantin Asrama Putra UNKLAB', owner: 'Michael Tendean', email: 'michael@student.unklab.ac.id', status: 'Pending' },
    { id: 2, name: 'Bakery Fakultas Fasilkom', owner: 'Christina Pattilamonia', email: 'christina@student.unklab.ac.id', status: 'Aktif' },
    { id: 3, name: 'Koperasi Mahasiswa UNKLAB', owner: 'Rivaldo Lumentut', email: 'rivaldo@student.unklab.ac.id', status: 'Pending' }
  ]);

  // State daftar pengguna civitas (Use Case: User Management)
  const [users, setUsers] = useState([
    { id: 1, name: 'Michael Tendean', email: 'michael@student.unklab.ac.id', role: 'Student (Mahasiswa)', status: 'Aktif' },
    { id: 2, name: 'Dr. Rorong, M.Cs.', email: 'rorong@unklab.ac.id', role: 'Dosen / Staff', status: 'Aktif' },
    { id: 3, name: 'Christina Pattilamonia', email: 'christina@student.unklab.ac.id', role: 'Penjual', status: 'Aktif' }
  ]);

  // State laporan transaksi (Use Case: Laporan & Audit)
  const [transactions] = useState([
    { id: 'ORD-9821', tenant: 'Kantin Asrama Putra', buyer: 'Michael Tendean', total: 'Rp 15.000', method: 'QRIS', status: 'Selesai' },
    { id: 'ORD-9822', tenant: 'Koperasi UNKLAB', buyer: 'Christina P.', total: 'Rp 25.000', method: 'Cash (COD)', status: 'Diproses' }
  ]);

  // Handler aksi verifikasi tenant
  const handleTenantAction = (id, action) => {
    setTenants(tenants.map(t => {
      if (t.id === id) {
        return { ...t, status: action === 'approve' ? 'Aktif' : 'Ditolak' };
      }
      return t;
    }));
    alert(`Tenant berhasil ${action === 'approve' ? 'disetujui dan diaktifkan' : 'ditolak'}!`);
  };

  // Handler blokir/aktifkan civitas
  const toggleUserStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Aktif' ? 'Diblokir' : 'Aktif';
        alert(`Status akun ${u.name} diubah menjadi: ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* SIDEBAR ADMIN INTERAKTIF */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center font-black text-xl shadow-md">
              🛡️
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white tracking-wider">ADMIN PANEL</h1>
              <p className="text-[10px] text-amber-400 font-bold">Shop-Mate UNKLAB SRS</p>
            </div>
          </div>

          <nav className="space-y-2 text-xs font-semibold">
            <button 
              onClick={() => setActiveMenu('overview')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeMenu === 'overview' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>📊</span> Dashboard Overview
            </button>
            <button 
              onClick={() => setActiveMenu('users')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeMenu === 'users' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>👥</span> Kelola Civitas & Akun
            </button>
            <button 
              onClick={() => setActiveMenu('tenants')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeMenu === 'tenants' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>🏪</span> Verifikasi Tenant Toko
            </button>
            <button 
              onClick={() => setActiveMenu('reports')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-3 ${activeMenu === 'reports' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
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

      {/* KONTEN UTAMA DINAMIS */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-white">
              {activeMenu === 'overview' && 'Dashboard Administrator Sistem SRS'}
              {activeMenu === 'users' && 'Manajemen Hak Akses & Data Civitas'}
              {activeMenu === 'tenants' && 'Persetujuan & Verifikasi Tenant Toko Kampus'}
              {activeMenu === 'reports' && 'Rekapitulasi Transaksi & System Audit Log'}
            </h2>
            <p className="text-xs text-slate-400">Pusat kontrol dan manajemen operasional e-commerce Universitas Klabat.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 bg-amber-400/10 text-amber-400 text-xs font-extrabold rounded-xl border border-amber-400/30 shadow-sm">
              👑 Administrator Utama
            </span>
          </div>
        </header>

        {/* 1. OVERVIEW */}
        {activeMenu === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Total Civitas Terdaftar</p>
                <h3 className="text-2xl font-black text-white">{users.length + 1240}</h3>
                <span className="text-[10px] text-emerald-400 mt-2 inline-block font-bold">+12% minggu ini</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Tenant / Penjual Aktif</p>
                <h3 className="text-2xl font-black text-white">{tenants.filter(t => t.status === 'Aktif').length}</h3>
                <span className="text-[10px] text-amber-400 mt-2 inline-block font-bold">{tenants.filter(t => t.status === 'Pending').length} pending verifikasi</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Total Transaksi Kampus</p>
                <h3 className="text-2xl font-black text-white">Rp 45.2 Juta</h3>
                <span className="text-[10px] text-emerald-400 mt-2 inline-block font-bold">QRIS & COD Terverifikasi</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl shadow-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1">Status Sistem SRS</p>
                <h3 className="text-2xl font-black text-emerald-400">Normal</h3>
                <span className="text-[10px] text-slate-400 mt-2 inline-block font-bold">Uptime 99.9%</span>
              </div>
            </div>

            {/* Tabel Quick Verifikasi */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-4">Permintaan Verifikasi Tenant Terbaru</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="pb-3 font-bold uppercase">Nama Tenant</th>
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
                              <button onClick={() => handleTenantAction(t.id, 'approve')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer">Setujui</button>
                              <button onClick={() => handleTenantAction(t.id, 'reject')} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer">Tolak</button>
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

        {/* 2. KELOLA PENGGUNA */}
        {activeMenu === 'users' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Daftar Civitas Akademika Terdaftar</h3>
              <button onClick={() => alert('Fitur tambah akun civitas manual oleh admin')} className="px-4 py-2 bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs hover:bg-amber-500 transition cursor-pointer">
                + Tambah Akun Manual
              </button>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="pb-3 font-bold uppercase">Nama Lengkap</th>
                  <th className="pb-3 font-bold uppercase">Email Resmi UNKLAB</th>
                  <th className="pb-3 font-bold uppercase">Peran (Role)</th>
                  <th className="pb-3 font-bold uppercase">Status</th>
                  <th className="pb-3 font-bold uppercase text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3.5 font-bold text-white">{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-md font-bold text-[10px]">{u.role}</span></td>
                    <td>
                      <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] ${u.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button onClick={() => toggleUserStatus(u.id)} className={`px-3 py-1 rounded-lg font-bold cursor-pointer ${u.status === 'Aktif' ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30'}`}>
                        {u.status === 'Aktif' ? 'Blokir' : 'Aktifkan'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. VERIFIKASI TENANT */}
        {activeMenu === 'tenants' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Validasi & Kelola Tenant Toko Kampus</h3>
            <div className="space-y-3">
              {tenants.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-700">
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">Pemilik: {t.owner} | {t.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md font-extrabold text-[10px] ${t.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {t.status}
                    </span>
                    {t.status === 'Pending' && (
                      <div className="space-x-2">
                        <button onClick={() => handleTenantAction(t.id, 'approve')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer">
                          Setujui
                        </button>
                        <button onClick={() => handleTenantAction(t.id, 'reject')} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer">
                          Tolak
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. LAPORAN & AUDIT LOG */}
        {activeMenu === 'reports' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-2">📄 Laporan Rekapitulasi Transaksi Kampus</h3>
              <p className="text-xs text-slate-400 mb-4">Unduh rekapitulasi transaksi seluruh tenant civitas akademika UNKLAB.</p>
              <button onClick={() => alert('Laporan transaksi berhasil diunduh dalam format resmi!')} className="px-4 py-2.5 bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs hover:bg-amber-500 transition cursor-pointer shadow-md">
                📥 Unduh Laporan Transaksi (Excel / PDF)
              </button>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-3">🛡️ System Audit Log (Keamanan & Aktivitas)</h3>
              <div className="text-xs space-y-2 text-slate-300 font-mono bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p className="text-emerald-400">[10 Nov 2026, 14:32] Admin menyetujui registrasi Tenant Kantin Asrama Putra.</p>
                <p className="text-slate-400">[10 Nov 2026, 12:15] Pengguna mendaftar dengan domain resmi @student.unklab.ac.id.</p>
                <p className="text-amber-400">[10 Nov 2026, 09:40] Sistem memverifikasi pembayaran QRIS berhasil.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}