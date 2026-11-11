import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [activeAdminTab, setActiveAdminTab] = useState('overview');

  const [adminProfile, setAdminProfile] = useState({
    name: 'Dr. Citra Lestari, M.Kom',
    email: 'admin@unklab.ac.id',
    phone: '081199887766',
    role: 'Administrator Utama UNKLAB',
    password: 'admin123'
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Christina Pattilamonia', email: 'christina@student.unklab.ac.id', role: 'buyer', status: 'Aktif' },
    { id: 2, name: 'Kantin Asri UNKLAB', email: 'kantinasri@student.unklab.ac.id', role: 'seller', status: 'Aktif' },
    { id: 3, name: 'Michael Tendean', email: 'michael@student.unklab.ac.id', role: 'buyer', status: 'Aktif' }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Buku & Modul Kuliah', inUse: true },
    { id: 2, name: 'Atribut & Merchandise UNKLAB', inUse: true },
    { id: 3, name: 'Makanan & Minuman Kampus', inUse: true }
  ]);

  const [transactions] = useState([
    { id: 'TRX-501', date: '2026-11-10 10:30', buyer: 'Christina Pattilamonia', seller: 'Kantin Asri & Snack', total: 30000, status: 'Berhasil', method: 'QRIS UNKLAB' },
    { id: 'TRX-502', date: '2026-11-09 14:15', buyer: 'Michael Tendean', seller: 'Ayu Merchandise', total: 185000, status: 'Berhasil', method: 'Transfer BSI' }
  ]);

  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.oldPassword !== adminProfile.password) {
      alert('Password lama salah! Periksa kembali.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Konfirmasi password baru tidak cocok!');
      return;
    }
    setAdminProfile({ ...adminProfile, password: passwordForm.newPassword });
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password admin berhasil diperbarui dengan aman!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Brand Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black text-lg shadow">
            👑
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-wide">ADMIN CONTROL CENTER</h1>
            <p className="text-[10px] text-amber-400 font-semibold uppercase">Shop-Mate Universitas Klabat</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-white">{adminProfile.name}</p>
            <p className="text-[10px] text-amber-400">{adminProfile.email}</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-3.5 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
          >
            <span>&larr;</span> Keluar
          </button>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-2.5 flex overflow-x-auto gap-2 sticky top-[73px] z-30">
        <button onClick={() => setActiveAdminTab('overview')} className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${activeAdminTab === 'overview' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}>
          📊 Dashboard & Persentase
        </button>
        <button onClick={() => setActiveAdminTab('users')} className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${activeAdminTab === 'users' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}>
          👥 Kelola Pengguna
        </button>
        <button onClick={() => setActiveAdminTab('categories')} className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${activeAdminTab === 'categories' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}>
          🏷️ Kelola Kategori
        </button>
        <button onClick={() => setActiveAdminTab('transactions')} className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${activeAdminTab === 'transactions' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}>
          💰 Laporan Transaksi
        </button>
        <button onClick={() => setActiveAdminTab('profil')} className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${activeAdminTab === 'profil' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}>
          🛡️ Profil & Ganti Password Admin
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
                <p className="text-xs text-slate-400 font-semibold mb-1">Total Pengguna Aktif</p>
                <h3 className="text-3xl font-black text-white">{users.length + 120}</h3>
                <span className="text-[10px] text-emerald-400 font-bold mt-2 inline-block">Mahasiswa & Staff UNKLAB</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
                <p className="text-xs text-slate-400 font-semibold mb-1">Total Pendapatan Bruto</p>
                <h3 className="text-2xl font-black text-amber-400 mt-1">Rp {totalRevenue.toLocaleString('id-ID')}</h3>
                <span className="text-[10px] text-emerald-400 font-bold mt-2 inline-block">QRIS & COD Terverifikasi</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
                <p className="text-xs text-slate-400 font-semibold mb-1">Komisi Platform (2.5%)</p>
                <h3 className="text-2xl font-black text-emerald-400 mt-1">Rp {(totalRevenue * 0.025).toLocaleString('id-ID')}</h3>
                <span className="text-[10px] text-slate-300 font-bold mt-2 inline-block">Kas Kemahasiswaan Kampus</span>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl shadow-lg">
                <p className="text-xs text-slate-400 font-semibold mb-1">Status Sistem SRS</p>
                <h3 className="text-2xl font-black text-emerald-400 mt-1">Normal 99.9%</h3>
                <span className="text-[10px] text-amber-400 font-bold mt-2 inline-block">Aman & Terenkripsi</span>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-8 shadow-xl">
              <h3 className="text-sm font-black text-white mb-6">📈 Grafik Persentase Penjualan Tenant Kampus UNKLAB</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Kantin Asrama Putra (Makanan & Minuman)</span>
                    <span className="text-amber-400">65% (Terlaris)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Koperasi / Atribut Resmi Kampus</span>
                    <span className="text-blue-400">25%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Tenant Mahasiswa Mandiri (Fasilkom & FEB)</span>
                    <span className="text-emerald-400">10%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'users' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-white mb-4">Manajemen Pengguna Civitas Akademika</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="pb-3 font-bold uppercase">Nama Lengkap</th>
                    <th className="pb-3 font-bold uppercase">Email Resmi UNKLAB</th>
                    <th className="pb-3 font-bold uppercase">Peran</th>
                    <th className="pb-3 font-bold uppercase text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="py-3.5 font-bold text-white">{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="px-2.5 py-1 bg-amber-400/20 text-amber-400 font-bold rounded-lg text-[10px]">{u.role}</span></td>
                      <td className="py-3.5 text-right">
                        <button onClick={() => { setUsers(users.filter(x => x.id !== u.id)); alert('Akun pengguna dihapus.'); }} className="px-3 py-1 bg-red-600/20 text-red-400 font-bold rounded-xl cursor-pointer">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeAdminTab === 'categories' && (
          <div className="max-w-2xl mx-auto bg-slate-800/40 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-white mb-4">Kelola Kategori Produk Kampus</h3>
            <div className="space-y-3 text-xs">
              {categories.map(c => (
                <div key={c.id} className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl border border-slate-700">
                  <span className="font-bold text-white">{c.name}</span>
                  <button onClick={() => setCategories(categories.filter(x => x.id !== c.id))} className="px-3 py-1 bg-red-600/20 text-red-400 font-bold rounded-xl cursor-pointer">Hapus</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeAdminTab === 'transactions' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-white mb-4">Rekapitulasi Transaksi Pembeli & Penjual</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="pb-3 font-bold uppercase">ID</th>
                    <th className="pb-3 font-bold uppercase">Pembeli</th>
                    <th className="pb-3 font-bold uppercase">Tenant Penjual</th>
                    <th className="pb-3 font-bold uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {transactions.map(t => (
                    <tr key={t.id}>
                      <td className="py-3 font-bold text-amber-400">{t.id}</td>
                      <td>{t.buyer}</td>
                      <td>{t.seller}</td>
                      <td className="font-extrabold text-white">Rp {t.total.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeAdminTab === 'profil' && (
          <div className="max-w-xl mx-auto bg-slate-800/60 border border-slate-700 rounded-3xl p-8 shadow-xl space-y-6 text-xs">
            <div>
              <h2 className="text-xl font-black text-white mb-1">Profil & Keamanan Akun Admin</h2>
              <p className="text-slate-400">Ubah password secara berkala untuk mencegah akses login yang tidak sah.</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
              <p><b>Nama:</b> {adminProfile.name}</p>
              <p><b>Email:</b> {adminProfile.email}</p>
              <p><b>Peran:</b> <span className="text-amber-400">{adminProfile.role}</span></p>
              <p><b>No. WhatsApp:</b> {adminProfile.phone}</p>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4 pt-4 border-t border-slate-700">
              <h3 className="font-bold text-white uppercase tracking-wider">Form Ganti Password Admin</h3>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Password Lama</label>
                <input
                  type="password"
                  required
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Password Baru</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-bold mb-1">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl transition shadow cursor-pointer"
              >
                Simpan Password Baru ✓
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}