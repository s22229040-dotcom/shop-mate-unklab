import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get('role') || 'Student (Mahasiswa)';

  const [activeTab, setActiveTab] = useState('katalog');

  // State untuk Tema (Dark / Light Mode) yang membaca pilihan dari halaman login
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('shopmate_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('shopmate_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Sinkronisasi kategori yang dikelola Admin
  const [adminCategories, setAdminCategories] = useState(() => {
    const savedCategories = localStorage.getItem('shopmate_admin_categories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  useEffect(() => {
    const syncCategories = () => {
      const savedCategories = localStorage.getItem('shopmate_admin_categories');
      if (savedCategories) {
        try {
          const parsed = JSON.parse(savedCategories);
          if (Array.isArray(parsed)) setAdminCategories(parsed);
        } catch (e) {}
      }
    };
    window.addEventListener('storage', syncCategories);
    const interval = setInterval(syncCategories, 1000);
    return () => {
      window.removeEventListener('storage', syncCategories);
      clearInterval(interval);
    };
  }, []);

  // Sinkronisasi QRIS pembayaran pusat yang diatur Admin
  const [qrisImage, setQrisImage] = useState(() => {
    return (
      localStorage.getItem('shopmate_qris_image') ||
      'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ShopMateUNKLAB-QRIS'
    );
  });

  useEffect(() => {
    const syncQris = () => {
      const savedQris = localStorage.getItem('shopmate_qris_image');
      if (savedQris) {
        setQrisImage(savedQris);
      }
    };
    window.addEventListener('storage', syncQris);
    const interval = setInterval(syncQris, 1000);
    return () => {
      window.removeEventListener('storage', syncQris);
      clearInterval(interval);
    };
  }, []);

  // Katalog Produk disinkronkan dengan localStorage agar terhubung dengan Penjual
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('shopmate_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    const defaultProducts = [
      { 
        id: 1, 
        name: 'Lanyard Resmi UNKLAB Premium', 
        category: 'Atribut Kampus', 
        price: 25000, 
        stock: 15, 
        tenant: 'Koperasi UNKLAB', 
        sellerPhone: '6281234567891', 
        img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop',
        desc: 'Lanyard resmi berstandar universitas dengan bahan berkualitas tinggi.',
        isActive: true
      },
      { 
        id: 2, 
        name: 'Nasi Kuning Special Asrama', 
        category: 'Makanan', 
        price: 15000, 
        stock: 25, 
        tenant: 'Kantin Asrama Putra', 
        sellerPhone: '6281298765432', 
        img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop',
        desc: 'Nasi kuning hangat dengan lauk abon dan telur pindang khas kantin asrama.',
        isActive: true
      },
      { 
        id: 3, 
        name: 'Air Mineral Aqua / Cleo 600ml', 
        category: 'Minuman', 
        price: 4000, 
        stock: 50, 
        tenant: 'Tenant Fasilkom', 
        sellerPhone: '6281355556666', 
        img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=600&auto=format&fit=crop',
        desc: 'Air mineral steril kemasan botol 600ml untuk menyegarkan hari kuliah.',
        isActive: true
      },
      { 
        id: 4, 
        name: 'Es Teh Manis Segar Kampus', 
        category: 'Minuman', 
        price: 5000, 
        stock: 30, 
        tenant: 'Kantin Utama', 
        sellerPhone: '6281211112222', 
        img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop',
        desc: 'Teh melati manis segar disajikan dingin dengan es batu pilihan.',
        isActive: true
      }
    ];
    localStorage.setItem('shopmate_products', JSON.stringify(defaultProducts));
    return defaultProducts;
  });

  // Sinkronisasi otomatis setiap ada perubahan produk dari Penjual
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = localStorage.getItem('shopmate_products');
      if (updated) {
        try {
          const parsed = JSON.parse(updated);
          if (Array.isArray(parsed)) setProducts(parsed);
        } catch (e) {
          console.error(e);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State keranjang dengan fitur checkbox ala Shopee
  const [cart, setCart] = useState([]);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');

  // State Profil dengan Fitur Edit Profil
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('shopmate_active_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    const registered = localStorage.getItem('shopmate_registered_user');
    if (registered) {
      try {
        const regData = JSON.parse(registered);
        return {
          name: regData.fullName || 'Michael Tendean',
          email: regData.email || 's22229040@student.unklab.ac.id',
          phone: regData.phone || '081234567890',
          address: regData.address || 'Asrama Putra UNKLAB, Kamar 204'
        };
      } catch(e) {}
    }
    return {
      name: 'Michael Tendean',
      email: 's22229040@student.unklab.ac.id',
      phone: '081234567890',
      address: 'Asrama Putra UNKLAB, Kamar 204'
    };
  });

  const handleProfileChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('shopmate_active_profile', JSON.stringify(userProfile));
    setIsEditingProfile(false);
    alert('Profil berhasil diperbarui!');
  };

  // State Pesanan / Notifikasi
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('shopmate_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  // Sinkronisasi otomatis notifikasi status pesanan
  useEffect(() => {
    const syncOrders = () => {
      const savedOrders = localStorage.getItem('shopmate_orders');
      if (savedOrders) {
        try {
          const parsed = JSON.parse(savedOrders);
          if (Array.isArray(parsed)) setOrders(parsed);
        } catch (e) {}
      }
    };
    const interval = setInterval(syncOrders, 1000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1, selected: true }]);
    }
    alert(`Berhasil menambahkan "${product.name}" ke keranjang!`);
  };

  const toggleSelectCartItem = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const updateCartQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const confirmCheckout = () => {
    const selectedItems = cart.filter(i => i.selected);
    if (selectedItems.length === 0) {
      alert('Pilih minimal satu produk yang ingin dibeli terlebih dahulu!');
      return;
    }

    const totalAmount = selectedItems.reduce((sum, i) => sum + (Number(i.price) * i.qty), 0);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      item: selectedItems.map(i => `${i.name} (${i.qty}x)`).join(', '),
      total: `Rp ${totalAmount.toLocaleString()}`,
      payment: paymentMethod === 'QRIS' ? 'QRIS (Verified)' : 'Cash on Delivery (COD)',
      status: 'Menunggu Konfirmasi Tenant',
      notification: 'Pesanan diterima oleh sistem. Tenant sedang menyiapkan pesanan Anda.'
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('shopmate_orders', JSON.stringify(updatedOrders));

    // Sinkronkan transaksi baru ke Laporan Transaksi Admin
    try {
      const existingTrx = JSON.parse(localStorage.getItem('shopmate_admin_transactions') || '[]');
      const sellerNames = [...new Set(selectedItems.map(i => i.tenant).filter(Boolean))].join(', ') || 'Tenant Kampus';
      const newTrx = {
        id: orderId,
        buyer: userProfile.name || 'Civitas UNKLAB',
        seller: sellerNames,
        total: totalAmount,
        payment: paymentMethod
      };
      const updatedTrx = Array.isArray(existingTrx) ? [newTrx, ...existingTrx] : [newTrx];
      localStorage.setItem('shopmate_admin_transactions', JSON.stringify(updatedTrx));
    } catch (e) {
      console.error(e);
    }

    setCart(cart.filter(i => !i.selected));
    setIsCheckoutModal(false);
    setActiveTab('pesanan');
    alert(`Checkout Berhasil via ${paymentMethod}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('shopmate_active_user');
    navigate('/');
  };

  // FILTER PRODUK: Menyembunyikan produk yang dinonaktifkan oleh penjual (isActive === false)
  const filteredProducts = products.filter(p => {
    const isNotDisabled = p.isActive !== false;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return isNotDisabled && matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* NAVBAR */}
      <header className={`border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          {/* LOGO DI TEKAN 2 KALI UNTUK GANTI TEMA DI HP */}
          <div 
            onDoubleClick={() => setIsDarkMode(!isDarkMode)}
            title="Klik 2 kali untuk ubah tema (khusus HP)"
            className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black text-lg shadow cursor-pointer select-none active:scale-95 transition"
          >
            🛒
          </div>
          <div>
            <h1 className={`font-extrabold text-sm tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>SHOP-MATE UNKLAB</h1>
            <p className="text-[10px] text-amber-500 font-semibold uppercase">Portal Belanja Civitas Akademika</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('katalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'katalog' 
                ? 'bg-amber-400 text-slate-950 shadow-md' 
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🛍️ Katalog
          </button>
          <button 
            onClick={() => setActiveTab('keranjang')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer relative ${
              activeTab === 'keranjang' 
                ? 'bg-amber-400 text-slate-950 shadow-md' 
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🛒 Keranjang {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('pesanan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'pesanan' 
                ? 'bg-amber-400 text-slate-950 shadow-md' 
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🔔 Notifikasi
          </button>
          <button 
            onClick={() => setActiveTab('profil')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'profil' 
                ? 'bg-amber-400 text-slate-950 shadow-md' 
                : isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            👤 Profil Saya
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* TOMBOL PENGALIH TEMA KHUSUS DI LAPTOP/LAYAR LUAS */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-3 py-2 rounded-xl text-xs font-bold shadow transition cursor-pointer flex items-center gap-1.5 border ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title={isDarkMode ? "Ubah ke Light Mode" : "Ubah ke Dark Mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button 
            onClick={handleLogout}
            className="px-3.5 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-500 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
          >
            <span>&larr;</span> Keluar
          </button>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {activeTab === 'katalog' && (
          <div>
            <div className={`border p-8 rounded-3xl mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-300 ${
              isDarkMode ? 'bg-gradient-to-r from-purple-900 via-slate-900 to-slate-900 border-slate-800' : 'bg-gradient-to-r from-purple-100 via-white to-white border-slate-200'
            }`}>
              <div>
                <span className="px-3.5 py-1 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                  KAMPUS E-COMMERCE
                </span>
                <h2 className={`text-2xl sm:text-3xl font-black mt-2 mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Cari Kebutuhan Kuliah & Konsumsi Anda</h2>
                <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Klik produk untuk detail atau hubungi langsung WhatsApp penjual.</p>
              </div>

              <div className="w-full md:w-80">
                <input
                  type="text"
                  placeholder="Cari lanyard, makanan, minuman..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    isDarkMode ? 'bg-slate-950/80 border-slate-700 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-950 placeholder-slate-500'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className={`border rounded-2xl overflow-hidden shadow-lg transition flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/60 hover:border-amber-400/50' : 'bg-white border-slate-200 hover:border-amber-500'
                }`}>
                  <div>
                    <div 
                      onClick={() => setSelectedProduct(p)}
                      className="h-48 overflow-hidden relative cursor-pointer group"
                    >
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="bg-slate-950/80 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold shadow">🔍 Lihat Detail</span>
                      </div>
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-[10px] rounded-lg">
                        {p.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className={`text-[10px] font-semibold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tenant: <span className="text-amber-500 font-bold">{p.tenant}</span></p>
                      <h3 
                        onClick={() => setSelectedProduct(p)}
                        className={`text-sm font-extrabold mb-2 cursor-pointer transition ${isDarkMode ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-amber-600'}`}
                      >
                        {p.name}
                      </h3>
                      <p className="text-sm font-black text-amber-500 mb-2">Rp {Number(p.price).toLocaleString()}</p>
                      <p className={`text-xs line-clamp-2 mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{p.desc}</p>
                      
                      <a
                        href={`https://wa.me/${p.sellerPhone}?text=Halo%20${encodeURIComponent(p.tenant)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(p.name)}%20di%20Shop-Mate%20UNKLAB.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-500 hover:underline font-bold flex items-center gap-1 mb-3"
                      >
                        <span>💬</span> Chat WhatsApp Penjual ({p.sellerPhone})
                      </a>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-2.5 rounded-xl transition text-xs shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>🛒 + Tambah ke Keranjang</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'keranjang' && (
          <div className={`max-w-3xl mx-auto border rounded-3xl p-8 shadow-xl transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-xl font-black mb-2 pb-2 border-b ${isDarkMode ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'}`}>Keranjang Belanja Anda</h2>
            <p className={`text-xs mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Pilih (centang) produk dari tenant/penjual yang ingin kamu beli terlebih dahulu.</p>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-3xl mb-3">🛒</p>
                <p className={`text-sm font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Keranjang belanja Anda masih kosong.</p>
                <button 
                  onClick={() => setActiveTab('katalog')}
                  className="px-5 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-500 transition cursor-pointer"
                >
                  Mulai Belanja Sekarang
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border transition ${
                    item.selected 
                      ? isDarkMode ? 'bg-slate-900/80 border-amber-400/60' : 'bg-amber-50/50 border-amber-400' 
                      : isDarkMode ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        checked={item.selected} 
                        onChange={() => toggleSelectCartItem(item.id)}
                        className="w-5 h-5 accent-amber-400 cursor-pointer rounded" 
                      />
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                      <div>
                        <span className="text-[10px] text-amber-500 font-semibold">Tenant: {item.tenant}</span>
                        <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                        <p className={`text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Rp {Number(item.price).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 mt-3 sm:mt-0">
                      <div className={`flex items-center border rounded-xl overflow-hidden ${isDarkMode ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-white'}`}>
                        <button 
                          onClick={() => updateCartQty(item.id, -1)}
                          className={`px-3 py-1.5 font-bold text-xs transition cursor-pointer ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
                        >
                          -
                        </button>
                        <span className={`px-3 py-1.5 text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.qty}</span>
                        <button 
                          onClick={() => updateCartQty(item.id, 1)}
                          className={`px-3 py-1.5 font-bold text-xs transition cursor-pointer ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
                        >
                          +
                        </button>
                      </div>

                      <span className={`text-xs font-black w-24 text-right ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Rp {(Number(item.price) * item.qty).toLocaleString()}</span>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold p-2 cursor-pointer"
                        title="Hapus produk"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}

                <div className={`pt-6 border-t flex items-center justify-between font-black text-base ${isDarkMode ? 'border-slate-700 text-white' : 'border-slate-200 text-slate-900'}`}>
                  <span>Total Pembayaran (Dipilih):</span>
                  <span className="text-amber-500">
                    Rp {cart.filter(i => i.selected).reduce((sum, i) => sum + (Number(i.price) * i.qty), 0).toLocaleString()}
                  </span>
                </div>

                <div className={`mt-4 p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <label className={`block text-xs font-bold uppercase mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Pilih Metode Pembayaran</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('QRIS')}
                      className={`p-3 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-2 ${
                        paymentMethod === 'QRIS' 
                          ? 'border-amber-400 bg-amber-400/10 text-amber-500' 
                          : isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
                      }`}
                    >
                      📱 QRIS (Digital)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash')}
                      className={`p-3 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-2 ${
                        paymentMethod === 'Cash' 
                          ? 'border-amber-400 bg-amber-400/10 text-amber-500' 
                          : isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
                      }`}
                    >
                      💵 Cash on Delivery (COD)
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutModal(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3.5 rounded-xl transition text-xs shadow-lg cursor-pointer mt-4"
                >
                  Lanjut ke Pembayaran ({paymentMethod}) &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pesanan' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className={`border rounded-3xl p-6 shadow-xl transition-colors duration-300 ${
              isDarkMode ? 'bg-gradient-to-r from-amber-500/20 to-purple-900/40 border-amber-500/40' : 'bg-gradient-to-r from-amber-100 to-purple-100 border-amber-300'
            }`}>
              <h3 className="text-sm font-black text-amber-500 mb-3 flex items-center gap-2">
                <span>🔔</span> Notifikasi Status Pesanan (Real-time dari Tenant)
              </h3>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-2xl mb-2">📭</p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Belum ada pesanan aktif. Silakan lakukan checkout produk dari katalog terlebih dahulu.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border text-xs space-y-1 ${
                      isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                    }`}>
                      <div className="flex justify-between font-bold">
                        <span className="text-amber-500">{ord.id} - {ord.item}</span>
                        <span className="text-emerald-500">{ord.status}</span>
                      </div>
                      <p className={`italic ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>💬 "{ord.notification}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profil' && (
          <div className={`max-w-xl mx-auto border rounded-3xl p-8 shadow-xl space-y-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Profil Pembeli Civitas</h2>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs cursor-pointer shadow"
                >
                  ✏️ Edit Profil
                </button>
              )}
            </div>

            {!isEditingProfile ? (
              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Nama:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{userProfile.name}</span>
                </div>
                <div className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Email UNKLAB:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{userProfile.email}</span>
                </div>
                <div className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Nomor WhatsApp:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{userProfile.phone}</span>
                </div>
                <div className={`p-3 rounded-xl flex justify-between ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                  <span className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Alamat / Asrama:</span>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{userProfile.address}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className={`block font-bold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Nama</label>
                  <input type="text" value={userProfile.name} disabled className={`w-full p-3 rounded-xl border cursor-not-allowed ${isDarkMode ? 'bg-slate-950 border-slate-700 text-slate-500' : 'bg-slate-100 border-slate-300 text-slate-500'}`} />
                </div>
                <div>
                  <label className={`block font-bold mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Email UNKLAB</label>
                  <input type="email" value={userProfile.email} disabled className={`w-full p-3 rounded-xl border cursor-not-allowed ${isDarkMode ? 'bg-slate-950 border-slate-700 text-slate-500' : 'bg-slate-100 border-slate-300 text-slate-500'}`} />
                </div>
                <div>
                  <label className="block font-bold text-amber-500 mb-1">Nomor WhatsApp</label>
                  <input type="text" name="phone" value={userProfile.phone} onChange={handleProfileChange} required className={`w-full p-3 rounded-xl border border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`} />
                </div>
                <div>
                  <label className="block font-bold text-amber-500 mb-1">Alamat / Asrama</label>
                  <textarea name="address" rows="3" value={userProfile.address} onChange={handleProfileChange} required className={`w-full p-3 rounded-xl border border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3 rounded-xl cursor-pointer">
                    Simpan Perubahan
                  </button>
                  <button type="button" onClick={() => setIsEditingProfile(false)} className={`px-5 font-bold py-3 rounded-xl cursor-pointer ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-300 text-slate-800'}`}>
                    Batal
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={() => setActiveTab('katalog')}
              className={`w-full mt-4 font-bold py-3 rounded-xl text-xs cursor-pointer shadow ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
            >
              &larr; Kembali ke Katalog Belanja
            </button>
          </div>
        )}

      </main>

      {/* MODAL DETAIL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="h-64 relative">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-slate-950/80 text-white rounded-full font-bold flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              <span className="px-3 py-1 bg-amber-400/20 text-amber-500 text-[10px] font-bold rounded-lg">
                {selectedProduct.category}
              </span>
              <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedProduct.name}</h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Penjual: <span className="text-amber-500 font-semibold">{selectedProduct.tenant}</span></p>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{selectedProduct.desc}</p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${selectedProduct.sellerPhone}?text=Halo%20${encodeURIComponent(selectedProduct.tenant)},%20saya%20mau%20bertanya%20tentang%20${encodeURIComponent(selectedProduct.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-950/20 border border-emerald-500/30 px-4 py-2 rounded-xl"
                >
                  <span>💬</span> Hubungi Penjual via WhatsApp ({selectedProduct.sellerPhone})
                </a>
              </div>
              <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className="text-lg font-black text-amber-500">Rp {Number(selectedProduct.price).toLocaleString()}</span>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs transition cursor-pointer shadow"
                >
                  🛒 + Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHECKOUT */}
      {isCheckoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-lg font-black">Konfirmasi Pembayaran ({paymentMethod})</h3>
            
            {paymentMethod === 'QRIS' ? (
              <div className="space-y-3">
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Scan kode QR berikut menggunakan E-Wallet / Mobile Banking:</p>
                <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center shadow">
                  <img src={qrisImage} alt="QRIS" className="w-full h-full object-contain" />
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-6">
                <p className="text-3xl">💵</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Pembayaran <b>Cash on Delivery (COD)</b>. Siapkan uang pas saat pesanan diantarkan ke alamat Anda.</p>
              </div>
            )}

            <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                onClick={() => setIsCheckoutModal(false)}
                className={`flex-1 py-3 font-bold rounded-xl text-xs cursor-pointer ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'}`}
              >
                Batal
              </button>
              <button
                onClick={confirmCheckout}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs cursor-pointer shadow"
              >
                Konfirmasi Selesai ✓
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}