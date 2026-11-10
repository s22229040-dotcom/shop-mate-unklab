import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const userRole = queryParams.get('role') || 'Student (Mahasiswa)';

  const [activeTab, setActiveTab] = useState('katalog');

  // Katalog Produk Lengkap (Lanyard, Makanan, Minuman)
  const [products] = useState([
    { 
      id: 1, 
      name: 'Lanyard Resmi UNKLAB Premium', 
      category: 'Atribut Kampus', 
      price: 25000, 
      stock: 15, 
      tenant: 'Koperasi UNKLAB', 
      img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop',
      desc: 'Lanyard resmi berstandar universitas dengan bahan berkualitas tinggi, nyaman dipakai, dan dilengkapi ID card holder eksklusif UNKLAB.' 
    },
    { 
      id: 2, 
      name: 'Nasi Kuning Special Asrama', 
      category: 'Makanan', 
      price: 15000, 
      stock: 25, 
      tenant: 'Kantin Asrama Putra', 
      img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop',
      desc: 'Nasi kuning hangat dengan lauk abon, telur pindang, sambal sedap, dan kering tempe khas kantin asrama UNKLAB.' 
    },
    { 
      id: 3, 
      name: 'Air Mineral Aqua / Cleo 600ml', 
      category: 'Minuman', 
      price: 4000, 
      stock: 50, 
      tenant: 'Tenant Fasilkom', 
      img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=600&auto=format&fit=crop',
      desc: 'Air mineral steril kemasan botol 600ml untuk menyegarkan hari kuliah Anda di kampus.' 
    },
    { 
      id: 4, 
      name: 'Es Teh Manis Segar Kampus', 
      category: 'Minuman', 
      price: 5000, 
      stock: 30, 
      tenant: 'Kantin Utama', 
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop',
      desc: 'Teh melati manis segar disajikan dingin dengan es batu kristal pilihan.' 
    },
    { 
      id: 5, 
      name: 'Roti Bakar Coklat Keju', 
      category: 'Makanan', 
      price: 10000, 
      stock: 12, 
      tenant: 'Bakery UNKLAB', 
      img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop',
      desc: 'Roti tebal dipanggang dengan mentega wangi, lumeran coklat, dan parutan keju melimpah.' 
    },
    { 
      id: 6, 
      name: 'Jaket Almamater UNKLAB', 
      category: 'Atribut Kampus', 
      price: 175000, 
      stock: 8, 
      tenant: 'Koperasi Kampus', 
      img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
      desc: 'Jaket almamater resmi Universitas Klabat wajib untuk kegiatan akademik dan acara kampus.' 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');

  // State Profil Pembeli
  const [userProfile, setUserProfile] = useState({
    name: 'Michael Tendean',
    email: 's22229040@student.unklab.ac.id',
    phone: '081234567890',
    address: 'Asrama Putra UNKLAB, Kamar 204'
  });

  const [orders, setOrders] = useState([
    { 
      id: 'ORD-9821', 
      item: 'Nasi Kuning Special Asrama (1x)', 
      total: 'Rp 15.000', 
      payment: 'QRIS (Paid)',
      status: 'Selesai diantar ke Asrama', 
      notification: 'Tenant telah mengonfirmasi: Pesanan Anda telah sampai di lobi asrama!' 
    }
  ]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    alert(`Berhasil menambahkan "${product.name}" ke keranjang!`);
  };

  const confirmCheckout = () => {
    const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      item: cart.map(i => `${i.name} (${i.qty}x)`).join(', '),
      total: `Rp ${totalAmount.toLocaleString()}`,
      payment: paymentMethod === 'QRIS' ? 'QRIS (Verified)' : 'Cash on Delivery (COD)',
      status: 'Menunggu Konfirmasi Tenant',
      notification: 'Pesanan diterima oleh sistem. Tenant sedang menyiapkan pesanan Anda.'
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutModal(false);
    setActiveTab('pesanan');
    alert(`Checkout Berhasil via ${paymentMethod}!`);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* NAVBAR */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black text-lg shadow">
            🛒
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-wide">SHOP-MATE UNKLAB</h1>
            <p className="text-[10px] text-amber-400 font-semibold uppercase">Portal Belanja Civitas Akademika</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('katalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'katalog' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            🛍️ Katalog
          </button>
          <button 
            onClick={() => setActiveTab('keranjang')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer relative ${activeTab === 'keranjang' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            🛒 Keranjang {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('pesanan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'pesanan' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            🔔 Notifikasi
          </button>
          <button 
            onClick={() => setActiveTab('profil')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'profil' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            👤 Profil Saya
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="px-3.5 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
          >
            <span>&larr;</span> Keluar
          </button>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: KATALOG */}
        {activeTab === 'katalog' && (
          <div>
            <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-slate-900 border border-slate-800 p-8 rounded-3xl mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="px-3.5 py-1 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                  KAMPUS E-COMMERCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-1">Cari Kebutuhan Kuliah & Konsumsi Anda</h2>
                <p className="text-xs text-slate-300">Klik pada gambar produk untuk melihat detail lengkap sebelum membeli.</p>
              </div>

              <div className="w-full md:w-80">
                <input
                  type="text"
                  placeholder="Cari lanyard, nasi kuning, air..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {['Semua', 'Atribut Kampus', 'Makanan', 'Minuman'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${selectedCategory === cat ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg hover:border-amber-400/50 transition flex flex-col justify-between">
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
                      <p className="text-[10px] text-slate-400 font-semibold mb-1">Tenant: <span className="text-amber-400">{p.tenant}</span></p>
                      <h3 
                        onClick={() => setSelectedProduct(p)}
                        className="text-sm font-extrabold text-white mb-2 cursor-pointer hover:text-amber-400 transition"
                      >
                        {p.name}
                      </h3>
                      <p className="text-sm font-black text-amber-400">Rp {p.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-2.5 rounded-xl transition text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>🛒 + Tambah ke Keranjang</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: KERANJANG */}
        {activeTab === 'keranjang' && (
          <div className="max-w-3xl mx-auto bg-slate-800/40 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-black text-white mb-6 pb-4 border-b border-slate-700">Keranjang Belanja Anda</h2>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-3xl mb-3">🛒</p>
                <p className="text-sm text-slate-400 font-medium mb-4">Keranjang belanja Anda masih kosong.</p>
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
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-900/80 rounded-2xl border border-slate-700">
                    <div className="flex items-center gap-4">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        <p className="text-[11px] text-amber-400">Rp {item.price.toLocaleString()} x {item.qty}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-white">Rp {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}

                <div className="pt-6 border-t border-slate-700 flex items-center justify-between font-black text-base">
                  <span>Total Pembayaran:</span>
                  <span className="text-amber-400">
                    Rp {cart.reduce((sum, i) => sum + (i.price * i.qty), 0).toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-700">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-3">Pilih Metode Pembayaran</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('QRIS')}
                      className={`p-3 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-2 ${paymentMethod === 'QRIS' ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-slate-700 text-slate-400'}`}
                    >
                      📱 QRIS (Digital)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash')}
                      className={`p-3 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-2 ${paymentMethod === 'Cash' ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-slate-700 text-slate-400'}`}
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

        {/* TAB 3: NOTIFIKASI */}
        {activeTab === 'pesanan' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-amber-500/20 to-purple-900/40 border border-amber-500/40 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-black text-amber-400 mb-3 flex items-center gap-2">
                <span>🔔</span> Notifikasi Status Pesanan (Real-time dari Tenant)
              </h3>
              <div className="space-y-3">
                {orders.map((ord, idx) => (
                  <div key={idx} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-amber-400">{ord.id} - {ord.item}</span>
                      <span className="text-emerald-400">{ord.status}</span>
                    </div>
                    <p className="text-slate-300 italic">💬 "{ord.notification}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFIL SAYA */}
        {activeTab === 'profil' && (
          <div className="max-w-xl mx-auto bg-slate-800/60 border border-slate-700 rounded-3xl p-8 shadow-xl space-y-4">
            <h2 className="text-xl font-black text-white mb-2 pb-3 border-b border-slate-700">Profil Pembeli Civitas</h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Nama:</span>
                <span className="text-white font-semibold">{userProfile.name}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Email UNKLAB:</span>
                <span className="text-white font-semibold">{userProfile.email}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Nomor WhatsApp:</span>
                <span className="text-white font-semibold">{userProfile.phone}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Alamat / Asrama:</span>
                <span className="text-white font-semibold">{userProfile.address}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('katalog')}
              className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs cursor-pointer shadow"
            >
              &larr; Kembali ke Katalog Belanja
            </button>
          </div>
        )}

      </main>

      {/* MODAL DETAIL PRODUK */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-100">
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
              <span className="px-3 py-1 bg-amber-400/20 text-amber-400 text-[10px] font-bold rounded-lg">
                {selectedProduct.category}
              </span>
              <h2 className="text-xl font-black text-white">{selectedProduct.name}</h2>
              <p className="text-xs text-slate-400">Tenant / Penjual: <span className="text-amber-400 font-semibold">{selectedProduct.tenant}</span></p>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedProduct.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-lg font-black text-amber-400">Rp {selectedProduct.price.toLocaleString()}</span>
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl text-slate-100 text-center space-y-4">
            <h3 className="text-lg font-black">Konfirmasi Pembayaran ({paymentMethod})</h3>
            
            {paymentMethod === 'QRIS' ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Scan kode QR berikut menggunakan E-Wallet / Mobile Banking:</p>
                <div className="w-48 h-48 bg-white p-3 rounded-2xl mx-auto flex items-center justify-center shadow">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ShopMateUNKLAB-QRIS" alt="QRIS" className="w-full h-full object-contain" />
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-6">
                <p className="text-3xl">💵</p>
                <p className="text-xs text-slate-300">Pembayaran <b>Cash on Delivery (COD)</b>. Siapkan uang pas saat pesanan diantarkan ke alamat Anda.</p>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsCheckoutModal(false)}
                className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs cursor-pointer"
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