import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // State navigasi tab admin sesuai layout kode referensi
  const [activeAdminTab, setActiveAdminTab] = useState('overview');

  // Database / State simulasi admin
  const [currentUser] = useState({
    name: 'Dr. Citra Lestari, M.Kom',
    email: 'citra.lestari@unklab.ac.id'
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Christina Pattilamonia', email: 'christina@student.unklab.ac.id', role: 'buyer', userType: 'student', phone: '081234567890', address: 'Asrama Putri UNKLAB' },
    { id: 2, name: 'Kantin Asri UNKLAB', email: 'kantinasri@student.unklab.ac.id', role: 'seller', userType: 'student', phone: '082198765432', address: 'Pusat Kuliner Kampus' },
    { id: 3, name: 'Dr. Citra Lestari, M.Kom', email: 'citra.lestari@unklab.ac.id', role: 'admin', userType: 'staff', phone: '081199887766', address: 'Fakultas Fasilkom' }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Buku & Modul Kuliah', inUse: true },
    { id: 2, name: 'Atribut & Merchandise UNKLAB', inUse: true },
    { id: 3, name: 'Makanan & Minuman Kampus', inUse: true }
  ]);

  const [products] = useState([
    { id: 101, sellerName: 'Kantin Asri & Snack', name: 'Nasi Kuning Special UNKLAB', price: 15000, stock: 45, visible: true, views: 342, soldCount: 88 },
    { id: 102, sellerName: 'Kantin Asri & Snack', name: 'Es Teh Manis & Pisang Goroho', price: 10000, stock: 30, visible: true, views: 198, soldCount: 45 }
  ]);

  const [transactions] = useState([
    { id: 'TRX-501', date: '2026-11-10 10:30', buyer: 'Christina Pattilamonia', seller: 'Kantin Asri & Snack', total: 30000, status: 'Berhasil', method: 'QRIS UNKLAB' },
    { id: 'TRX-502', date: '2026-11-09 14:15', buyer: 'Sisiani Palari', seller: 'Ayu Merchandise', total: 185000, status: 'Berhasil', method: 'Transfer BSI' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, admin: 'Dr. Citra Lestari', action: 'Menyetujui pendaftaran tenant baru: Ayu Merchandise', time: 'Hari ini, 09:15' },
    { id: 2, admin: 'Dr. Citra Lestari', action: 'Memperbarui komisi platform marketplace menjadi 2.5%', time: 'Kemarin, 14:30' }
  ]);

  const [settings, setSettings] = useState({
    platformFee: 2.5,
    autoApproveStudent: true
  });

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);

  // Handler Hapus Kategori dengan Validasi UC-26
  const handleDeleteCategory = (catId, catName, inUse) => {
    if (inUse) {
      alert(`Penghapusan Ditolak (UC-26): Kategori "${catName}" masih digunakan oleh produk aktif dalam sistem!`);
      return;
    }
    setCategories(categories.filter(c => c.id !== catId));
    setAuditLogs([{ id: Date.now(), admin: currentUser.name, action: `Menghapus kategori: ${catName}`, time: 'Baru saja' }, ...auditLogs]);
    alert('Kategori berhasil dihapus.');
  };

  const handleAddCategory = () => {
    const name = prompt('Masukkan nama kategori produk baru:');
    if (name && name.trim() !== '') {
      setCategories([...categories, { id: Date.now(), name: name.trim(), inUse: false }]);
      setAuditLogs([{ id: Date.now(), admin: currentUser.name, action: `Menambahkan kategori produk: ${name}`, time: 'Baru saja' }, ...auditLogs]);
      alert('Kategori baru berhasil ditambahkan!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans">
      
      {/* Top Brand Header */}
      <header className="bg-[#0F2C59] text-white shadow-xl sticky top-0 z-40 border-b-4 border-[#F4CE14]">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F4CE14] text-[#0F2C59] font-bold flex items-center justify-center text-xl shadow-lg">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base tracking-wide">SHOP-MATE UNKLAB</h1>
                <span className="bg-[#F4CE14] text-[#0F2C59] text-[10px] font-extrabold px-2 py-0.5 rounded-full">ADMIN PORTAL</span>
              </div>
              <p className="text-xs text-slate-300">Universitas Klabat Airmadidi • Sistem Kontrol & Manajemen</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-xs font-bold text-white">{currentUser.name}</p>
              <p className="text-[10px] text-yellow-300">{currentUser.email}</p>
            </div>
            <button onclick={() => navigate('/')} className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow cursor-pointer">
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-2 py-2.5">
          <button onClick={() => setActiveAdminTab('overview')} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeAdminTab === 'overview' ? 'bg-[#0F2C59] text-[#F4CE14] shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
            📊 Dashboard Overview
          </button>
          <button onClick={() => setActiveAdminTab('users')} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeAdminTab === 'users' ? 'bg-[#0F2C59] text-[#F4CE14] shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
            👥 Kelola Pengguna (UC-21)
          </button>
          <button onClick={() => setActiveAdminTab('products')} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeAdminTab === 'products' ? 'bg-[#0F2C59] text-[#F4CE14] shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
            📦 Kelola Produk (UC-25)
          </button>
          <button onClick={() => setActiveAdminTab('categories')} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeAdminTab === 'categories' ? 'bg-[#0F2C59] text-[#F4CE14] shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
            🏷️ Kelola Kategori (UC-26)
          </button>
          <button onClick={() => setActiveAdminTab('transactions')} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeAdminTab === 'transactions' ? 'bg-[#0F2C59] text-[#F4CE14] shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
            💰 Transaksi & Keuangan (UC-27)
          </button>
          <button onClick={() => setActiveAdminTab('settings')} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${activeAdminTab === 'settings' ? 'bg-[#0F2C59] text-[#F4CE14] shadow' : 'text-slate-600 hover:bg-slate-100'}`}>
            ⚙️ Pengaturan Sistem & Audit
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 pb-20">
        
        {/* 1. OVERVIEW TAB */}
        {activeAdminTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Pengguna</p>
                  <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{totalUsers}</h3>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">Domain @student.unklab.ac.id</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-inner">👥</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Produk</p>
                  <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{totalProducts}</h3>
                  <span className="text-[10px] text-blue-600 font-semibold mt-1 inline-block">Aktif di Katalog Utama</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-inner">📦</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Transaksi Bruto</p>
                  <h3 className="text-2xl font-extrabold text-[#0F2C59] mt-1">Rp {totalRevenue.toLocaleString('id-ID')}</h3>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">QRIS & Transfer Verified</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-inner">💳</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Komisi Platform ({settings.platformFee}%)</p>
                  <h3 className="text-2xl font-extrabold text-emerald-800 mt-1">Rp {(totalRevenue * (settings.platformFee/100)).toLocaleString('id-ID')}</h3>
                  <span className="text-[10px] text-slate-500 mt-1 inline-block">Kas Kemahasiswaan UNKLAB</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-inner">🏛️</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-6">Transaksi Terbaru Sistem (UC-27)</h3>
                <div className="space-y-4">
                  {transactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{t.id}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{t.status}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Pembeli: <span className="font-semibold text-slate-700">{t.buyer}</span> • Tenant: {t.seller}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">{t.date}</p>
                        <p className="font-extrabold text-[#0F2C59] mt-0.5">Rp {t.total.toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-4">Log Aktivitas Admin</h3>
                  <div className="space-y-3">
                    {auditLogs.map(log => (
                      <div key={log.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-800">{log.action}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[10px] text-blue-600 font-medium">{log.admin}</span>
                          <span className="text-[10px] text-slate-400">{log.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. KELOLA PENGGUNA TAB */}
        {activeAdminTab === 'users' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Manajemen Pengguna Sistem Shop-Mate (UC-21)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400 uppercase">
                    <th className="pb-3">Nama Lengkap</th>
                    <th className="pb-3">Email UNKLAB</th>
                    <th className="pb-3">Peran (Role)</th>
                    <th className="pb-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="py-3.5 font-bold text-slate-800">{u.name}</td>
                      <td className="py-3.5 text-slate-600 font-mono text-xs">{u.email}</td>
                      <td className="py-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">{u.role.toUpperCase()}</span></td>
                      <td className="py-3.5 text-right">
                        <button onClick={() => { setUsers(users.filter(x => x.id !== u.id)); alert('Pengguna dihapus.'); }} className="bg-rose-50 text-rose-600 px-3 py-1 rounded-xl text-xs font-bold cursor-pointer">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. KELOLA PRODUK TAB */}
        {activeAdminTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Pemantauan & Pengelolaan Produk Kampus (UC-25)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-slate-50 rounded-3xl p-5 border border-slate-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-800">{p.name}</h3>
                    <p className="text-xs text-slate-500">Tenant: {p.sellerName}</p>
                    <p className="text-sm font-extrabold text-[#0F2C59] mt-1">Rp {p.price.toLocaleString('id-ID')}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Aktif</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. KELOLA KATEGORI TAB */}
        {activeAdminTab === 'categories' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Manajemen Kategori Produk (UC-26)</h2>
              <button onClick={handleAddCategory} className="bg-[#0F2C59] text-[#F4CE14] font-bold px-4 py-2.5 rounded-xl text-xs shadow cursor-pointer">
                + Tambah Kategori
              </button>
            </div>
            <div className="space-y-3">
              {categories.map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-800">{c.name}</h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.inUse ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'}`}>
                      {c.inUse ? 'Digunakan Produk' : 'Kosong'}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteCategory(c.id, c.name, c.inUse)} className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer">
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TRANSAKSI TAB */}
        {activeAdminTab === 'transactions' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Melihat & Mengelola Transaksi Kampus (UC-27)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400 uppercase">
                    <th className="pb-3">ID Transaksi</th>
                    <th className="pb-3">Pembeli</th>
                    <th className="pb-3">Tenant Penjual</th>
                    <th className="pb-3">Total Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {transactions.map(t => (
                    <tr key={t.id}>
                      <td className="py-3.5 font-bold text-slate-800">{t.id}</td>
                      <td className="py-3.5">{t.buyer}</td>
                      <td className="py-3.5">{t.seller}</td>
                      <td className="py-3.5 font-extrabold text-[#0F2C59]">Rp {t.total.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. SETTINGS TAB */}
        {activeAdminTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Pengaturan Komisi & Sistem Marketplace</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Persentase Komisi Platform (%)</label>
                <input type="number" step="0.1" value={settings.platformFee} onChange={(e) => setSettings({...settings, platformFee: parseFloat(e.target.value)})} className="w-full border rounded-xl p-3 text-sm" />
              </div>
              <button onClick={() => alert('Pengaturan berhasil disimpan!')} className="w-full bg-[#0F2C59] text-[#F4CE14] font-bold py-3.5 rounded-xl shadow cursor-pointer">
                Simpan Pengaturan Sistem ✓
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}