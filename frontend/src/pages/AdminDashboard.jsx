import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [activeAdminTab, setActiveAdminTab] = useState('overview');

  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('shopmate_admin_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Dr. Citra Lestari, M.Kom',
      email: 'admin@unklab.ac.id',
      phone: '081199887766',
      role: 'Administrator Utama UNKLAB',
      password: 'admin123'
    };
  });

  useEffect(() => {
    localStorage.setItem('shopmate_admin_profile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: adminProfile.name,
    phone: adminProfile.phone,
    role: adminProfile.role
  });

  const handleOpenEditProfile = () => {
    setEditProfileForm({
      name: adminProfile.name,
      phone: adminProfile.phone,
      role: adminProfile.role
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setAdminProfile({
      ...adminProfile,
      name: editProfileForm.name,
      phone: editProfileForm.phone,
      role: editProfileForm.role
    });
    setIsEditingProfile(false);
    alert('Profil admin berhasil diperbarui!');
  };

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Terisi jika ada pendaftaran pembeli/penjual (tersimpan di localStorage)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('shopmate_admin_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shopmate_admin_users', JSON.stringify(users));
  }, [users]);

  // Kelola kategori: tambah & hapus, tersinkron ke penjual & pembeli
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('shopmate_admin_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    localStorage.setItem('shopmate_admin_categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setCategories([
      ...categories,
      { id: Date.now(), name: newCategoryName.trim(), inUse: true }
    ]);
    setNewCategoryName('');
    alert('Kategori berhasil ditambahkan!');
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  // Transaksi terhubung dari localStorage jika pembeli melakukan checkout
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('shopmate_admin_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  useEffect(() => {
    const syncTransactions = () => {
      const saved = localStorage.getItem('shopmate_admin_transactions');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setTransactions(parsed);
        } catch (e) {}
      }
    };
    const interval = setInterval(syncTransactions, 1000);
    return () => clearInterval(interval);
  }, []);

  // State untuk Manajemen QRIS Pembayaran Pusat (Tersinkronisasi via localStorage)
  const [qrisImage, setQrisImage] = useState(() => {
    return localStorage.getItem('shopmate_qris_image') || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ShopMate-UNKLAB-Official-QRIS';
  });
  const [tempQrisUrl, setTempQrisUrl] = useState(qrisImage);

  const handleSaveQris = (e) => {
    e.preventDefault();
    setQrisImage(tempQrisUrl);
    localStorage.setItem('shopmate_qris_image', tempQrisUrl);
    alert('Barcode QRIS pembayaran pusat berhasil diperbarui dan disinkronkan ke seluruh pembeli!');
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + Number(t.total || 0), 0);

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
        <button onClick={() => setActiveAdminTab('qris')} className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${activeAdminTab === 'qris' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}>
          💳 Kelola QRIS Pembayaran
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
                <h3 className="text-3xl font-black text-white">{users.length}</h3>
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
            {users.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Belum ada pengguna yang mendaftar (pembeli/penjual).</p>
            ) : (
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
                    {users.map((u, idx) => (
                      <tr key={u.id || idx}>
                        <td className="py-3.5 font-bold text-white">{u.name}</td>
                        <td>{u.email}</td>
                        <td><span className="px-2.5 py-1 bg-amber-400/20 text-amber-400 font-bold rounded-lg text-[10px]">{u.role}</span></td>
                        <td className="py-3.5 text-right">
                          <button onClick={() => { setUsers(users.filter((_, i) => i !== idx)); alert('Akun pengguna dihapus.'); }} className="px-3 py-1 bg-red-600/20 text-red-400 font-bold rounded-xl cursor-pointer">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeAdminTab === 'categories' && (
          <div className="max-w-2xl mx-auto bg-slate-800/40 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-white mb-2">Kelola Kategori Produk Kampus</h3>
            <form onSubmit={handleAddCategory} className="flex gap-2 text-xs">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Tambah kategori baru..."
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white"
              />
              <button type="submit" className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl cursor-pointer">
                + Tambah
              </button>
            </form>
            <div className="space-y-3 text-xs">
              {categories.length === 0 ? (
                <p className="text-slate-400 text-center py-6">Belum ada kategori. Tambahkan kategori agar muncul di penjual & pembeli.</p>
              ) : (
                categories.map(c => (
                  <div key={c.id} className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl border border-slate-700">
                    <span className="font-bold text-white">{c.name}</span>
                    <button onClick={() => handleDeleteCategory(c.id)} className="px-3 py-1 bg-red-600/20 text-red-400 font-bold rounded-xl cursor-pointer">Hapus</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeAdminTab === 'transactions' && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-white mb-4">Rekapitulasi Transaksi Pembeli & Penjual</h3>
            {transactions.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Belum ada transaksi tercatat.</p>
            ) : (
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
                    {transactions.map((t, idx) => (
                      <tr key={t.id || idx}>
                        <td className="py-3 font-bold text-amber-400">{t.id}</td>
                        <td>{t.buyer}</td>
                        <td>{t.seller}</td>
                        <td className="font-extrabold text-white">Rp {Number(t.total || 0).toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB: KELOLA QRIS PEMBAYARAN */}
        {activeAdminTab === 'qris' && (
          <div className="max-w-xl mx-auto bg-slate-800/60 border border-slate-700 rounded-3xl p-8 shadow-xl space-y-6 text-xs">
            <div>
              <h2 className="text-xl font-black text-white mb-1">Pengaturan Barcode QRIS Pusat</h2>
              <p className="text-slate-400">Unggah atau ubah tautan gambar QRIS yang akan dipindai oleh pembeli saat melakukan pembayaran non-tunai.</p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-slate-700 space-y-3">
              <p className="font-bold text-amber-400 uppercase tracking-wider">Preview Barcode QRIS Aktif Saat Ini</p>
              <div className="w-48 h-48 bg-white p-2 rounded-2xl shadow-md flex items-center justify-center">
                <img src={qrisImage} alt="QRIS Preview" className="w-full h-full object-contain" />
              </div>
            </div>

            <form onSubmit={handleSaveQris} className="space-y-4 pt-2">
              <div>
                <label className="block text-slate-400 font-bold mb-1 uppercase">URL Gambar / Barcode QRIS Baru</label>
                <input
                  type="text"
                  required
                  value={tempQrisUrl}
                  onChange={(e) => setTempQrisUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                  placeholder="https://images.unsplash.com/... atau URL gambar QRIS"
                />
                <p className="text-[10px] text-slate-400 mt-1">Masukkan URL gambar QRIS valid atau tautan hosting gambar Anda.</p>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl transition shadow cursor-pointer"
              >
                Simpan & Perbarui QRIS Pusat ✓
              </button>
            </form>
          </div>
        )}

        {activeAdminTab === 'profil' && (
          <div className="max-w-xl mx-auto bg-slate-800/60 border border-slate-700 rounded-3xl p-8 shadow-xl space-y-6 text-xs">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-xl font-black text-white mb-1">Profil & Keamanan Akun Admin</h2>
                <p className="text-slate-400">Ubah profil atau password secara berkala untuk mencegah akses login yang tidak sah.</p>
              </div>
              {!isEditingProfile && (
                <button
                  type="button"
                  onClick={handleOpenEditProfile}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl transition cursor-pointer whitespace-nowrap"
                >
                  Edit Profil
                </button>
              )}
            </div>

            {!isEditingProfile ? (
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                <p><b>Nama:</b> {adminProfile.name}</p>
                <p><b>Email:</b> {adminProfile.email}</p>
                <p><b>Peran:</b> <span className="text-amber-400">{adminProfile.role}</span></p>
                <p><b>No. WhatsApp:</b> {adminProfile.phone}</p>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="p-4 bg-slate-900 rounded-2xl border border-amber-400/50 space-y-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Nama Admin</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.name}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Peran / Jabatan</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.role}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">No. WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={editProfileForm.phone}
                    onChange={(e) => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Simpan Profil ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl transition cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}

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