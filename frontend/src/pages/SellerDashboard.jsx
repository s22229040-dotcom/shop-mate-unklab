import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('produk');

  // Membaca tema (Dark / Light Mode) dari halaman login (shopmate_theme)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('shopmate_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    const syncTheme = () => {
      const savedTheme = localStorage.getItem('shopmate_theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    window.addEventListener('storage', syncTheme);
    const interval = setInterval(syncTheme, 500);
    return () => {
      window.removeEventListener('storage', syncTheme);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('shopmate_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Sinkronisasi kategori yang dikelola Admin via localStorage
  const [categoriesList, setCategoriesList] = useState(() => {
    const saved = localStorage.getItem('shopmate_admin_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    const syncCategories = () => {
      const saved = localStorage.getItem('shopmate_admin_categories');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCategoriesList((prev) =>
              JSON.stringify(prev) !== JSON.stringify(parsed) ? parsed : prev
            );
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    window.addEventListener('storage', syncCategories);
    const interval = setInterval(syncCategories, 1000);
    return () => {
      window.removeEventListener('storage', syncCategories);
      clearInterval(interval);
    };
  }, []);

  // State produk tenant kosong di awal dan disinkronkan dengan localStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shopmate_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shopmate_products', JSON.stringify(products));
  }, [products]);

  // State Form Tambah / Edit Produk
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    img: '',
    desc: ''
  });
  const [isAddModal, setIsAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Pastikan kategori terpilih otomatis menyesuaikan kategori dari Admin jika kosong atau terhapus
  useEffect(() => {
    if (categoriesList.length > 0) {
      const isCurrentValid = categoriesList.some((c) => c.name === newProduct.category);
      if (!newProduct.category || !isCurrentValid) {
        setNewProduct((prev) => ({ ...prev, category: categoriesList[0].name }));
      }
    }
  }, [categoriesList, newProduct.category]);

  // State Profil Penjual
  const [sellerProfile, setSellerProfile] = useState(() => {
    const savedProfile = localStorage.getItem('shopmate_seller_profile');
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Ibu Hesti M.',
      tenantName: 'Kantin Asrama Putra UNKLAB',
      email: 'hesti@unklab.ac.id',
      phone: '6281298765432',
      address: 'Kantin Utama / Asrama Putra UNKLAB'
    };
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(sellerProfile);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSellerProfile(tempProfile);
    localStorage.setItem('shopmate_seller_profile', JSON.stringify(tempProfile));
    setIsEditingProfile(false);
    alert('Profil Penjual / Tenant berhasil diperbarui!');
  };

  // State Pesanan Masuk
  const [incomingOrders, setIncomingOrders] = useState(() => {
    const saved = localStorage.getItem('shopmate_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((o) => ({
            id: o.id,
            buyer: 'Civitas UNKLAB',
            item: o.item,
            total: o.total,
            payment: o.payment,
            status: o.status === 'Menunggu Konfirmasi Tenant' ? 'Menunggu Disiapkan' : o.status
          }));
        }
      } catch (e) {}
    }
    return [];
  });

  useEffect(() => {
    const syncOrders = () => {
      const saved = localStorage.getItem('shopmate_orders');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const formatted = parsed.map((o) => ({
              id: o.id,
              buyer: 'Civitas UNKLAB',
              item: o.item,
              total: o.total,
              payment: o.payment,
              status: o.status === 'Menunggu Konfirmasi Tenant' ? 'Menunggu Disiapkan' : o.status
            }));
            setIncomingOrders(formatted);
          }
        } catch (e) {}
      }
    };
    const interval = setInterval(syncOrders, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const chosenCategory = newProduct.category || categoriesList[0]?.name;
    if (!chosenCategory) {
      alert('Belum ada kategori produk dari Admin. Silakan minta Admin menambahkan kategori terlebih dahulu.');
      return;
    }

    let updatedProducts;

    if (editingProduct) {
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              ...newProduct,
              category: chosenCategory,
              price: Number(newProduct.price),
              stock: Number(newProduct.stock),
              tenant: sellerProfile.tenantName,
              sellerPhone: sellerProfile.phone,
              img: newProduct.img || p.img
            }
          : p
      );
      setEditingProduct(null);
      alert('Produk berhasil diperbarui dan disinkronkan ke pembeli!');
    } else {
      const productToAdd = {
        id: Date.now(),
        ...newProduct,
        category: chosenCategory,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        tenant: sellerProfile.tenantName,
        sellerPhone: sellerProfile.phone,
        img:
          newProduct.img ||
          'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=400&auto=format&fit=crop',
        desc: newProduct.desc || 'Produk berkualitas pilihan civitas akademika UNKLAB.',
        isActive: true
      };
      updatedProducts = [...products, productToAdd];
      alert('Produk baru berhasil ditambahkan ke katalog toko!');
    }

    setProducts(updatedProducts);
    localStorage.setItem('shopmate_products', JSON.stringify(updatedProducts));

    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: categoriesList[0]?.name || '',
      img: '',
      desc: ''
    });
    setIsAddModal(false);
  };

  const startEditProduct = (p) => {
    setEditingProduct(p);
    setNewProduct({
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category || categoriesList[0]?.name || '',
      img: p.img,
      desc: p.desc || ''
    });
    setIsAddModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini dari katalog?')) {
      const filtered = products.filter((p) => p.id !== id);
      setProducts(filtered);
      localStorage.setItem('shopmate_products', JSON.stringify(filtered));
      alert('Produk berhasil dihapus.');
    }
  };

  const toggleProductStatus = (id) => {
    const updatedProducts = products.map((p) => {
      if (p.id === id) {
        const newStatus = p.isActive === false ? true : false;
        return { ...p, isActive: newStatus };
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('shopmate_products', JSON.stringify(updatedProducts));
    alert('Status produk berhasil diperbarui!');
  };

  const updateOrderStatus = (id, newStatus) => {
    let notifMessage = 'Pesanan sedang diproses oleh tenant.';
    if (newStatus === 'Sedang Diantar Kurir') {
      notifMessage = 'Kurir sedang mengantarkan pesanan ke alamat Anda.';
    }
    if (newStatus === 'Selesai diantar') {
      notifMessage = 'Tenant telah mengonfirmasi: Pesanan Anda telah sampai di lobi asrama!';
    }

    const updatedOrders = incomingOrders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    setIncomingOrders(updatedOrders);

    const saved = localStorage.getItem('shopmate_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const synced = parsed.map((o) =>
          o.id === id ? { ...o, status: newStatus, notification: notifMessage } : o
        );
        localStorage.setItem('shopmate_orders', JSON.stringify(synced));
      } catch (e) {}
    }

    alert(`Status pesanan ${id} diperbarui menjadi: "${newStatus}". Notifikasi terkirim ke pembeli!`);
  };

  return (
    <div
      className={`min-h-screen flex font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Sidebar Penjual */}
      <div
        className={`w-64 border-r p-6 flex flex-col justify-between transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-bold text-lg shadow">
              🏪
            </div>
            <div>
              <h1 className={`font-extrabold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {sellerProfile.tenantName}
              </h1>
              <p className="text-[10px] text-amber-500 font-semibold">Shop-Mate UNKLAB</p>
            </div>
          </div>

          <nav className="space-y-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('produk')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${
                activeTab === 'produk'
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>📦</span> Kelola Produk & Stok
            </button>
            <button
              onClick={() => setActiveTab('pesanan')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${
                activeTab === 'pesanan'
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>🛒</span> Pesanan Masuk ({incomingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('keuangan')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${
                activeTab === 'keuangan'
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>💰</span> Laporan Saldo & Keuangan
            </button>
            <button
              onClick={() => setActiveTab('profil')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${
                activeTab === 'profil'
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>👤</span> Profil Saya
            </button>
          </nav>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold shadow transition cursor-pointer flex items-center justify-center gap-2 border ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title={isDarkMode ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode'}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 font-bold py-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🚪</span> Keluar (Logout)
          </button>
        </div>
      </div>

      {/* Konten Utama */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header
          className={`flex justify-between items-center mb-8 pb-4 border-b transition-colors duration-300 ${
            isDarkMode ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div>
            <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeTab === 'produk' && 'Manajemen Produk Toko / Tenant'}
              {activeTab === 'pesanan' && 'Kelola Pesanan Masuk & Kirim Notifikasi'}
              {activeTab === 'keuangan' && 'Rekapitulasi Saldo & Pendapatan Penjual'}
              {activeTab === 'profil' && 'Profil Toko & Informasi Penjual'}
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Dashboard operasional penjual resmi civitas akademika UNKLAB.
            </p>
          </div>
          {activeTab === 'produk' && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setNewProduct({
                  name: '',
                  price: '',
                  stock: '',
                  category: categoriesList[0]?.name || '',
                  img: '',
                  desc: ''
                });
                setIsAddModal(true);
              }}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow transition cursor-pointer"
            >
              + Tambah Produk Baru
            </button>
          )}
        </header>

        {/* TAB 1: PRODUK */}
        {activeTab === 'produk' && (
          products.length === 0 ? (
            <div
              className={`border rounded-3xl p-12 text-center shadow-lg transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <p className="text-3xl mb-3">📦</p>
              <h3 className={`text-sm font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Belum Ada Produk di Katalog Toko
              </h3>
              <p className={`text-xs mb-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Pastikan Admin sudah menambahkan kategori terlebih dahulu, lalu klik tombol di bawah untuk menambah produk baru.
              </p>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setNewProduct({
                    name: '',
                    price: '',
                    stock: '',
                    category: categoriesList[0]?.name || '',
                    img: '',
                    desc: ''
                  });
                  setIsAddModal(true);
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow transition cursor-pointer"
              >
                + Tambah Produk Baru
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`border rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition ${
                    p.isActive === false
                      ? isDarkMode
                        ? 'bg-slate-900/40 border-slate-800 opacity-60'
                        : 'bg-slate-100 border-slate-300 opacity-60'
                      : isDarkMode
                      ? 'bg-slate-800/60 border-slate-700/60'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="h-40 overflow-hidden relative">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      {p.isActive === false && (
                        <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-black text-red-400 uppercase tracking-widest">
                          Produk Nonaktif
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          isDarkMode ? 'bg-slate-900 text-amber-400' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {p.category}
                      </span>
                      <h3 className={`text-sm font-extrabold mt-1 mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {p.name}
                      </h3>
                      <p className="text-xs text-amber-500 font-black mb-1">
                        Rp {Number(p.price).toLocaleString()} | Stok: {p.stock}
                      </p>
                      <p className={`text-[11px] line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditProduct(p)}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl cursor-pointer transition ${
                          isDarkMode
                            ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        }`}
                      >
                        Edit Detail
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>

                    <button
                      onClick={() => toggleProductStatus(p.id)}
                      className={`w-full py-2 text-xs font-bold rounded-xl cursor-pointer transition ${
                        p.isActive === false
                          ? 'bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600/30'
                          : 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30'
                      }`}
                    >
                      {p.isActive === false ? '✓ Aktifkan Kembali Produk' : '🚫 Nonaktifkan Produk'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* TAB 2: PESANAN MASUK */}
        {activeTab === 'pesanan' && (
          <div className="space-y-4">
            {incomingOrders.length === 0 ? (
              <div className={`text-center py-12 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                Belum ada pesanan masuk.
              </div>
            ) : (
              incomingOrders.map((ord) => (
                <div
                  key={ord.id}
                  className={`border p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors duration-300 ${
                    isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-amber-500">{ord.id}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Bayar: {ord.payment}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded font-bold">
                        {ord.status}
                      </span>
                    </div>
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{ord.item}</p>
                    <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Total: {ord.total} | Pemesan: {ord.buyer}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Sedang Disiapkan')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      1. Siapkan Pesanan
                    </button>
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Sedang Diantar Kurir')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      2. Kirim Kurir
                    </button>
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Selesai diantar')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      3. Selesai ✓
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: KEUANGAN */}
        {activeTab === 'keuangan' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <p className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Total Pendapatan (Bulan Ini)
                </p>
                <h3 className="text-2xl font-black text-amber-500">Rp 1.450.000</h3>
              </div>
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <p className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Saldo Siap Dicairkan
                </p>
                <h3 className="text-2xl font-black text-emerald-500">Rp 980.000</h3>
              </div>
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <p className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Transaksi Sukses</p>
                <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>45 Pesanan</h3>
              </div>
            </div>

            <button
              onClick={() =>
                alert('Permintaan pencairan saldo berhasil dikirim ke Admin UNKLAB!')
              }
              className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs cursor-pointer shadow"
            >
              Withdraw (Cairkan Saldo ke Rekening Kampus)
            </button>
          </div>
        )}

        {/* TAB 4: PROFIL PENJUAL */}
        {activeTab === 'profil' && (
          <div
            className={`max-w-xl mx-auto border rounded-3xl p-8 shadow-xl space-y-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`flex justify-between items-center pb-3 border-b ${
                isDarkMode ? 'border-slate-700' : 'border-slate-200'
              }`}
            >
              <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Profil Toko & Informasi Penjual
              </h2>
              {!isEditingProfile && (
                <button
                  onClick={() => {
                    setTempProfile(sellerProfile);
                    setIsEditingProfile(true);
                  }}
                  className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-500 transition cursor-pointer"
                >
                  ✏️ Edit Profil
                </button>
              )}
            </div>

            {!isEditingProfile ? (
              <div className="space-y-3 text-xs">
                <div
                  className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
                >
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Nama Penjual:
                  </span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {sellerProfile.name}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
                >
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Nama Tenant / Toko:
                  </span>
                  <span className="text-amber-500 font-bold">{sellerProfile.tenantName}</span>
                </div>
                <div
                  className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
                >
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Email UNKLAB:
                  </span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {sellerProfile.email}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
                >
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Nomor WhatsApp:
                  </span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {sellerProfile.phone}
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
                >
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Lokasi / Alamat Toko:
                  </span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {sellerProfile.address}
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Nama Penjual
                  </label>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Nama Tenant / Toko
                  </label>
                  <input
                    type="text"
                    value={tempProfile.tenantName}
                    onChange={(e) =>
                      setTempProfile({ ...tempProfile, tenantName: e.target.value })
                    }
                    className={`w-full px-3.5 py-2.5 border rounded-xl ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Email Resmi Unklab
                  </label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Nomor WhatsApp
                  </label>
                  <input
                    type="text"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Lokasi / Alamat Toko
                  </label>
                  <input
                    type="text"
                    value={tempProfile.address}
                    onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className={`flex-1 py-3 font-bold rounded-xl cursor-pointer ${
                      isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-400 text-slate-950 font-extrabold rounded-xl cursor-pointer"
                  >
                    Simpan Perubahan ✓
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      {/* MODAL TAMBAH / EDIT PRODUK */}
      {isAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`border rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <h3 className="text-lg font-black">
              {editingProduct ? 'Edit Detail Produk Toko' : 'Tambah Produk Toko Baru'}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Nama Produk
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Burger Khas Kampus"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl ${
                    isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    placeholder="15000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Stok Awal
                  </label>
                  <input
                    type="number"
                    placeholder="20"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Kategori (Sinkron dari Admin)
                </label>
                {categoriesList.length === 0 ? (
                  <div className="w-full px-3.5 py-2.5 bg-amber-500/10 border border-amber-500/40 rounded-xl text-amber-500 text-[11px]">
                    Belum ada kategori dari Admin. Tambahkan kategori terlebih dahulu di Admin Control Center.
                  </div>
                ) : (
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className={`w-full px-3.5 py-2.5 border rounded-xl cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className={`block font-bold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Deskripsi / Detail Produk
                </label>
                <textarea
                  placeholder="Jelaskan detail bahan, rasa, atau ukuran produk..."
                  value={newProduct.desc}
                  onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                  className={`w-full px-3.5 py-2.5 border rounded-xl h-20 resize-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-amber-500 uppercase mb-1">
                  Upload Gambar dari Galeri Perangkat
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewProduct({ ...newProduct, img: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className={`w-full p-2 border rounded-xl text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-500 cursor-pointer ${
                    isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                {newProduct.img && (
                  <p className="text-[10px] text-emerald-500 mt-1">
                    ✓ Gambar berhasil dipilih dan siap disimpan.
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModal(false)}
                  className={`flex-1 py-3 font-bold rounded-xl cursor-pointer ${
                    isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-400 text-slate-950 font-extrabold rounded-xl cursor-pointer"
                >
                  {editingProduct ? 'Simpan Perubahan ✓' : 'Simpan Produk ✓'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}