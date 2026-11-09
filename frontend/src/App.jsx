import React, { useState } from 'react';
import { ShoppingCart, Search, Home, Package, User, Star, Store, LogIn, Lock, Mail, Shield, UserPlus, ArrowLeft, Phone, QrCode, GraduationCap, Briefcase, CreditCard, Wallet, Building2, Plus, Trash2, CheckCircle2, Clock, Truck } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('role-select'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('pembeli'); 
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // State Form Login & Register
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regRole, setRegRole] = useState('mahasiswa');

  // State Metode Pembayaran
  const [paymentMethod, setPaymentMethod] = useState('qris');

  // Data Katalog Produk & Stok Interaktif untuk Penjual & Pembeli
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Nasi Kuning Asrama UNKLAB', 
      price: 15000, 
      seller: 'Kantin Kejora', 
      phone: '081245678910',
      rating: 4.8, 
      stock: 25,
      description: 'Nasi kuning hangat khas asrama UNKLAB lengkap dengan abon, telur balado, dan kering tempe yang lezat.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600' 
    },
    { 
      id: 2, 
      name: 'Hoodie Resmi UNKLAB Merch', 
      price: 175000, 
      seller: 'Store Kampus', 
      phone: '081398765432',
      rating: 5.0, 
      stock: 10,
      description: 'Hoodie resmi berkualitas tinggi dengan logo bordir Universitas Klabat. Nyaman dipakai untuk kuliah.',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600' 
    },
    { 
      id: 3, 
      name: 'Es Teh Kampus & Snack', 
      price: 8000, 
      seller: 'Kantin Fasilkom', 
      phone: '082155443322',
      rating: 4.6, 
      stock: 40,
      description: 'Es teh manis segar pelepas dahaga di siang hari ditemani snack pilihan khas kantin.',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600' 
    },
    { 
      id: 4, 
      name: 'Buku Panduan Pemrograman Web', 
      price: 65000, 
      seller: 'Koperasi UNKLAB', 
      phone: '085299887766',
      rating: 4.9, 
      stock: 15,
      description: 'Referensi lengkap untuk mahasiswa Ilmu Komputer / Informatika dalam mempelajari pemrograman web modern.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600' 
    },
  ]);

  // State Daftar Pesanan (Tracking Status untuk Pembeli & Penjual)
  const [orders, setOrders] = useState([
    { id: 101, item: 'Nasi Kuning Asrama UNKLAB', qty: 2, total: 30000, status: 'Sedang Diproses Penjual' },
    { id: 102, item: 'Es Teh Kampus & Snack', qty: 1, total: 8000, status: 'Dalam Perjalanan / Tinggal Diantar' }
  ]);

  // State untuk Penjual menambah produk baru
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');

  const campusBgUrl = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200';

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    if (userRole === 'pembeli' && !loginEmail.includes('unklab.ac.id')) {
      alert('Akses Ditolak! Khusus Civitas Akademika Universitas Klabat yang menggunakan email kampus.');
      return;
    }

    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirmPassword) return;
    if (regPassword !== regConfirmPassword) {
      alert('Kata sandi tidak cocok!');
      return;
    }
    
    if (regRole === 'umum') {
      setUserRole('penjual');
    } else {
      setUserRole('pembeli');
    }
    setCurrentView('login');
  };

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('Maaf, stok barang ini sudah habis!');
      return;
    }
    setCart([...cart, product]);
    alert(`Berhasil memasukkan ${product.name} ke keranjang!`);
  };

  // Fungsi Penjual: Tambah Produk Baru
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdStock) return;
    const newProductObj = {
      id: products.length + 1,
      name: newProdName,
      price: Number(newProdPrice),
      seller: 'Toko Anda',
      phone: '081234567890',
      rating: 5.0,
      stock: Number(newProdStock),
      description: newProdDesc || 'Produk berkualitas dari mitra UNKLAB.',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600'
    };
    setProducts([...products, newProductObj]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('');
    setNewProdDesc('');
    alert('Produk berhasil ditambahkan ke katalog!');
  };

  // Fungsi Penjual: Hapus Produk
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    alert('Produk berhasil dihapus dari sistem.');
  };

  // Fungsi Penjual: Update Status Pesanan
  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    alert(`Status pesanan berhasil diubah menjadi: ${newStatus}`);
  };

  // 1. HALAMAN UTAMA SEBELUM LOGIN (PILIHAN PERAN)
  if (!isLoggedIn && currentView === 'role-select') {
    return (
      <div className="min-h-screen bg-[#3B1161] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-amber-400">
          
          <div 
            className="relative p-8 flex flex-col justify-between bg-cover bg-center min-h-[420px]"
            style={{ backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.65), rgba(59, 17, 97, 0.85)), url('${campusBgUrl}')` }}
          >
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-400 text-[#003366] font-extrabold px-3 py-1 rounded-md text-xs shadow">
                <span>UNKLAB EXCLUSIVE</span>
              </div>
            </div>

            <div className="text-center md:text-left space-y-3 z-10">
              <img src="/logo.png" alt="Shop-Mate Logo" className="w-16 h-16 object-contain bg-white/95 p-1.5 rounded-xl shadow-lg mx-auto md:mx-0" />
              <div>
                <h1 className="text-2xl font-black text-white tracking-wide">Shop-Mate</h1>
                <p className="text-sm font-bold text-amber-300">U N K L A B</p>
              </div>
              <div className="pt-2">
                <h2 className="text-lg font-bold text-white">Selamat datang di Shop-Mate</h2>
                <p className="text-xs text-slate-200 mt-1">Platform belanja eksklusif khusus civitas akademika Universitas Klabat.</p>
              </div>
            </div>

            <div className="text-[10px] text-slate-300 z-10">
              © 2026 Universitas Klabat • Restricted Access
            </div>
          </div>

          <div className="p-8 bg-amber-50/40 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Anda adalah?</h2>
              <p className="text-xs text-slate-500 mt-1">Pilih jenis pengguna sebelum melanjutkan.</p>
            </div>

            <div className="space-y-3">
              <div 
                onClick={() => { setUserRole('pembeli'); setCurrentView('login'); }}
                className="bg-white p-4 rounded-xl border-2 border-amber-400/80 shadow-sm hover:shadow-md cursor-pointer transition flex items-start space-x-4 group"
              >
                <div className="bg-[#003366] text-amber-400 p-2.5 rounded-xl group-hover:scale-105 transition">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Student & Civitas</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Mahasiswa & Staff aktif UNKLAB</p>
                  <p className="text-[11px] text-slate-400 mt-1">Wajib menggunakan email @unklab.ac.id</p>
                </div>
              </div>

              <div 
                onClick={() => { setUserRole('penjual'); setCurrentView('login'); }}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md cursor-pointer transition flex items-start space-x-4 group"
              >
                <div className="bg-[#003366] text-white p-2.5 rounded-xl group-hover:scale-105 transition">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Penjual</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Pengelola toko & tenant umum</p>
                  <p className="text-[11px] text-slate-400 mt-1">Akses manajemen produk & pesanan</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <span onClick={() => setCurrentView('register')} className="text-xs text-[#003366] font-bold cursor-pointer underline">
                Belum punya akun? Registrasi
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. HALAMAN REGISTRASI
  if (currentView === 'register') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 max-w-md mx-auto bg-cover bg-center relative"
        style={{ backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.9)), url('${campusBgUrl}')` }}
      >
        <div className="bg-white/95 backdrop-blur-sm w-full rounded-2xl shadow-2xl border border-slate-200 p-6 z-10">
          <div className="text-center mb-5">
            <div className="inline-block bg-[#003366] text-[#F59E0B] font-extrabold px-3 py-1 rounded-lg text-sm mb-2 shadow">UNKLAB</div>
            <h1 className="text-xl font-bold text-[#003366]">Registrasi Shop-Mate</h1>
          </div>
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
              <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Nama lengkap Anda" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Email</label>
              <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="email@unklab.ac.id" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi</label>
              <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ulangi Kata Sandi</label>
              <input type="password" value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Peran Pendaftaran</label>
              <select value={regRole} onChange={(e) => setRegRole(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none font-medium">
                <option value="mahasiswa">Pembeli - Mahasiswa</option>
                <option value="dosen-staff">Pembeli - Dosen / Staff</option>
                <option value="umum">Penjual</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-[#003366] hover:bg-blue-900 text-[#F59E0B] font-bold py-2.5 rounded-lg text-sm shadow-md mt-2">Daftar Sekarang</button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={() => setCurrentView('role-select')} className="text-xs text-[#003366] font-bold flex items-center justify-center space-x-1 mx-auto hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" /> <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. HALAMAN LOGIN
  if (!isLoggedIn && currentView === 'login') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 max-w-md mx-auto bg-cover bg-center relative"
        style={{ backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.9)), url('${campusBgUrl}')` }}
      >
        <div className="bg-white/95 backdrop-blur-sm w-full rounded-2xl shadow-2xl border border-slate-200 p-6 z-10">
          <div className="text-center mb-6">
            <div className="inline-block bg-[#003366] text-[#F59E0B] font-extrabold px-3 py-1 rounded-lg text-sm mb-2 shadow">UNKLAB</div>
            <h1 className="text-xl font-bold text-[#003366]">Shop-Mate Login</h1>
            <p className="text-[11px] text-slate-500 mt-1">Khusus Civitas Akademika Universitas Klabat</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Email Kampus</label>
              <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="nama@student.unklab.ac.id" className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi</label>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg outline-none" required />
            </div>
            <button type="submit" className="w-full bg-[#F59E0B] hover:bg-amber-500 text-[#003366] font-extrabold py-2.5 rounded-lg text-sm shadow-md">Masuk Sistem</button>
          </form>
          <div className="mt-5 text-center border-t pt-4 flex justify-between items-center text-xs">
            <span onClick={() => setCurrentView('role-select')} className="text-slate-600 font-semibold cursor-pointer flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Ganti Peran
            </span>
            <span onClick={() => setCurrentView('register')} className="text-[#003366] font-bold cursor-pointer underline">Registrasi</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. HALAMAN DETAIL PRODUK
  if (currentView === 'detail' && selectedProduct) {
    return (
      <div className="min-h-screen bg-slate-100 pb-20 max-w-md mx-auto relative shadow-2xl border-x">
        <header className="bg-[#003366] text-white p-4 sticky top-0 z-50 flex items-center space-x-3 shadow">
          <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => setCurrentView('dashboard')} />
          <h1 className="text-sm font-bold">Detail Produk</h1>
        </header>
        <div className="bg-white">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover" />
          <div className="p-4 space-y-3">
            <h2 className="text-lg font-bold text-slate-800">{selectedProduct.name}</h2>
            <p className="text-xl font-extrabold text-[#003366]">Rp {selectedProduct.price.toLocaleString()}</p>
            
            {/* Informasi Sisa Stok */}
            <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl flex justify-between items-center text-xs">
              <span className="font-semibold text-[#003366]">Sisa Stok Barang:</span>
              <span className="font-extrabold bg-[#003366] text-white px-2 py-0.5 rounded">{selectedProduct.stock} pcs</span>
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border">
              <div>
                <p className="text-xs font-bold text-slate-700">Penjual: {selectedProduct.seller}</p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-green-600" /> WhatsApp/Telp: <span className="font-semibold text-slate-700">{selectedProduct.phone}</span>
                </p>
              </div>
              <a href={`https://wa.me/${selectedProduct.phone}`} target="_blank" rel="noreferrer" className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow">Chat</a>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-700 mb-1">Deskripsi Produk</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedProduct.description}</p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-3 border-t flex gap-2 shadow-lg">
          <button onClick={() => addToCart(selectedProduct)} className="flex-1 bg-amber-100 text-[#003366] font-bold py-2.5 rounded-xl text-xs border border-amber-300"> + Keranjang </button>
          <button onClick={() => setCurrentView('checkout')} className="flex-1 bg-[#003366] text-[#F59E0B] font-bold py-2.5 rounded-xl text-xs shadow"> Beli Sekarang </button>
        </div>
      </div>
    );
  }

  // 5. HALAMAN CHECKOUT & PEMBAYARAN
  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-slate-100 pb-20 max-w-md mx-auto relative shadow-2xl border-x">
        <header className="bg-[#003366] text-white p-4 sticky top-0 z-50 flex items-center space-x-3 shadow">
          <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => setCurrentView('dashboard')} />
          <h1 className="text-sm font-bold">Checkout Pesanan</h1>
        </header>
        <div className="p-4 space-y-4">
          <div className="bg-white p-3 rounded-xl shadow-sm border">
            <h3 className="text-xs font-bold text-slate-700 mb-3">Pilih Metode Pembayaran</h3>
            <div className="space-y-2">
              <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${paymentMethod === 'qris' ? 'border-[#003366] bg-blue-50/50' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="payment" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><QrCode className="w-4 h-4 text-[#003366]" /> QRIS (Scan & Pay)</span>
                </div>
              </label>
              <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${paymentMethod === 'bank' ? 'border-[#003366] bg-blue-50/50' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#003366]" /> Transfer Bank (BCA / BNI / Mandiri)</span>
                </div>
              </label>
              <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${paymentMethod === 'gopay' ? 'border-[#003366] bg-blue-50/50' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="payment" checked={paymentMethod === 'gopay'} onChange={() => setPaymentMethod('gopay')} />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Wallet className="w-4 h-4 text-blue-600" /> GoPay</span>
                </div>
              </label>
              <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${paymentMethod === 'ovo' ? 'border-[#003366] bg-blue-50/50' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="payment" checked={paymentMethod === 'ovo'} onChange={() => setPaymentMethod('ovo')} />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Wallet className="w-4 h-4 text-purple-600" /> OVO</span>
                </div>
              </label>
              <label className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer ${paymentMethod === 'cash' ? 'border-[#003366] bg-blue-50/50' : 'border-slate-200'}`}>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-green-600" /> Cash / Bayar di Tempat (COD)</span>
                </div>
              </label>
            </div>
            {paymentMethod === 'qris' && (
              <div className="mt-3 p-4 bg-slate-50 text-center rounded-xl border border-dashed border-slate-300">
                <div className="bg-white inline-block p-2 rounded shadow mb-1">
                  <QrCode className="w-24 h-24 text-[#003366] mx-auto" />
                </div>
                <p className="text-[11px] text-slate-500">Scan QRIS menggunakan Mobile Banking atau E-Wallet Anda</p>
              </div>
            )}
          </div>

          <div className="bg-white p-3 rounded-xl shadow-sm border space-y-2 text-xs">
            <div className="flex justify-between font-semibold"><span>Total Belanja</span> <span className="font-bold text-[#003366]">Rp 15.000</span></div>
            <div className="flex justify-between text-slate-500"><span>Biaya Layanan Kampus</span> <span>Rp 0</span></div>
            <div className="border-t pt-2 flex justify-between font-bold text-sm"><span>Total Pembayaran</span> <span className="text-[#003366]">Rp 15.000</span></div>
          </div>
          <button onClick={() => { alert('Pesanan berhasil dibuat! Anda dapat melacak statusnya pada menu Pesanan.'); setCurrentView('dashboard'); setActiveTab('orders'); }} className="w-full bg-[#003366] text-[#F59E0B] font-bold py-3 rounded-xl text-sm shadow-md">
            Konfirmasi Pesanan (Checkout)
          </button>
        </div>
      </div>
    );
  }

  // 6. DASHBOARD UTAMA (DENGAN TABS: BERANDA, PESANAN DENGAN NOTIFIKASI STATUS, & PROFIL)
  return (
    <div className="min-h-screen bg-slate-100 pb-24 max-w-md mx-auto shadow-2xl border-x relative">
      
      <header className="bg-[#003366] text-white p-3 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Shop-Mate Logo" className="w-8 h-8 object-contain bg-white rounded-lg p-0.5 shadow" />
          <h1 className="text-xs font-bold tracking-wide">Shop-Mate ({userRole === 'penjual' ? 'Penjual' : 'Civitas'})</h1>
        </div>
        <div className="flex items-center space-x-3">
          {userRole === 'pembeli' && (
            <div className="relative cursor-pointer" onClick={() => setCurrentView('checkout')}>
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-[#003366] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
            </div>
          )}
          <button onClick={() => { setIsLoggedIn(false); setCurrentView('role-select'); }} className="text-[10px] bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded font-semibold shadow">Keluar</button>
        </div>
      </header>

      {/* VIEW: TAB BERANDA (HOME) */}
      {activeTab === 'home' && (
        userRole === 'penjual' ? (
          <main className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-[#003366] to-blue-900 text-white p-4 rounded-2xl shadow">
              <span className="bg-[#F59E0B] text-[#003366] text-[10px] font-bold px-2 py-0.5 rounded">Dashboard Penjual</span>
              <h2 className="text-sm font-bold mt-1">Kelola Toko & Statistik Stok Barang</h2>
              <p className="text-[11px] text-blue-100 mt-0.5">Tambah, hapus produk, serta pantau sisa stok dan pesanan masuk.</p>
            </div>

            {/* FORM TAMBAH PRODUK BARU */}
            <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
              <h3 className="text-xs font-bold text-[#003366] flex items-center gap-1.5"><Plus className="w-4 h-4" /> Tambah Produk Baru</h3>
              <form onSubmit={handleAddProduct} className="space-y-2.5">
                <input type="text" placeholder="Nama Produk" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none" required />
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Harga (Rp)" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none" required />
                  <input type="number" placeholder="Jumlah Stok" value={newProdStock} onChange={(e) => setNewProdStock(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none" required />
                </div>
                <textarea placeholder="Deskripsi Singkat" value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} className="w-full px-3 py-1.5 text-xs bg-slate-50 border rounded-lg outline-none" rows="2"></textarea>
                <button type="submit" className="w-full bg-[#003366] text-[#F59E0B] font-bold py-2 rounded-lg text-xs shadow">Simpan & Publikasikan Produk</button>
              </form>
            </div>

            {/* STATISTIK & DAFTAR PRODUK BESERTA SISA STOK */}
            <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
              <h3 className="text-xs font-bold text-slate-800">Statistik Sisa Stok Produk Anda</h3>
              <div className="space-y-2">
                {products.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
                    <div>
                      <p className="font-semibold text-slate-800">{p.name}</p>
                      <p className="text-[10px] text-slate-500">Rp {p.price.toLocaleString()} • Sisa Stok: <span className="font-bold text-[#003366]">{p.stock} pcs</span></p>
                    </div>
                    <button onClick={() => handleDeleteProduct(p.id)} className="bg-red-100 text-red-600 p-1.5 rounded-lg hover:bg-red-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* KELOLA STATUS PESANAN MASUK */}
            <div className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
              <h3 className="text-xs font-bold text-slate-800">Kelola Status Pesanan Masuk</h3>
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800">{ord.item} (x{ord.qty})</span>
                      <span className="font-bold text-[#003366]">Rp {ord.total.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Status Saat Ini: <span className="font-bold text-amber-600">{ord.status}</span></p>
                    <div className="flex gap-1 pt-1">
                      <button onClick={() => updateOrderStatus(ord.id, 'Sedang Diproses Penjual')} className="flex-1 bg-blue-100 text-[#003366] text-[10px] font-bold py-1 rounded">Proses</button>
                      <button onClick={() => updateOrderStatus(ord.id, 'Dalam Perjalanan / Tinggal Diantar')} className="flex-1 bg-amber-100 text-amber-800 text-[10px] font-bold py-1 rounded">Antar</button>
                      <button onClick={() => updateOrderStatus(ord.id, 'Pesanan Selesai / Tiba')} className="flex-1 bg-green-100 text-green-800 text-[10px] font-bold py-1 rounded">Selesai</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        ) : (
          <main className="p-4">
            <div className="bg-gradient-to-r from-[#003366] to-blue-800 text-white p-4 rounded-2xl mb-4 shadow flex justify-between items-center">
              <div>
                <span className="bg-[#F59E0B] text-[#003366] font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">Pusat Belanja & Kuliner UNKLAB</span>
                <h2 className="text-sm font-bold mt-1">Halo, Civitas Academica</h2>
                <p className="text-[11px] text-blue-100 mt-0.5">Pesan makanan & atribut tanpa antre.</p>
              </div>
              <Store className="w-8 h-8 text-[#F59E0B]" />
            </div>

            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-800 text-xs">Katalog Produk Terbaru</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {products.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => { setSelectedProduct(item); setCurrentView('detail'); }}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md transition"
                >
                  <div>
                    <img src={item.image} alt={item.name} className="w-full h-28 object-cover" />
                    <div className="p-2.5">
                      <h4 className="font-semibold text-xs text-slate-800 line-clamp-2">{item.name}</h4>
                      <span className="text-[9px] text-slate-500 block mt-0.5">{item.seller}</span>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                          <span className="text-[10px] text-slate-600">{item.rating}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-semibold">Stok: {item.stock}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 pt-0 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#003366]">Rp {item.price.toLocaleString()}</span>
                    <span className="text-[10px] bg-[#003366] text-[#F59E0B] px-2 py-1 rounded font-bold">Detail</span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )
      )}

      {/* VIEW: TAB PESANAN (DENGAN NOTIFIKASI STATUS PENGIRIMAN) */}
      {activeTab === 'orders' && (
        <main className="p-4 space-y-3">
          <div className="bg-[#003366] text-white p-4 rounded-2xl shadow">
            <h2 className="text-sm font-bold">Notifikasi Status Pesanan</h2>
            <p className="text-[11px] text-blue-100 mt-0.5">Pantau apakah pesanan Anda sedang diproses, diantar, atau sudah sampai.</p>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs border-b pb-2">
                  <span className="font-bold text-slate-800">ID Pesanan: #{ord.id}</span>
                  <span className="font-extrabold text-[#003366]">Rp {ord.total.toLocaleString()}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">{ord.item}</p>
                  <p className="text-[11px] text-slate-500">Jumlah: {ord.qty} pcs</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Status Pengiriman / Proses:</p>
                    <p className="text-xs font-bold text-amber-800">{ord.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW: TAB PROFIL */}
      {activeTab === 'profile' && (
        <main className="p-4 space-y-3">
          <div className="bg-white p-5 rounded-xl shadow-sm border text-center space-y-2">
            <div className="w-16 h-16 bg-[#003366] text-amber-400 font-bold rounded-full flex items-center justify-center text-xl mx-auto shadow">
              UN
            </div>
            <h2 className="text-sm font-bold text-slate-800">Civitas Akademika UNKLAB</h2>
            <p className="text-xs text-slate-500">Peran: <span className="font-bold uppercase text-[#003366]">{userRole}</span></p>
            <div className="pt-2">
              <button onClick={() => { setIsLoggedIn(false); setCurrentView('role-select'); }} className="bg-red-600 text-white text-xs px-4 py-2 rounded-xl font-bold shadow">Keluar Akun</button>
            </div>
          </div>
        </main>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 flex justify-around py-2.5 shadow-2xl z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-[#003366]' : 'text-slate-400'}`}>
          <Home className="w-5 h-5" /> <span className="text-[10px] mt-0.5 font-semibold">Beranda</span>
        </button>
        <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center ${activeTab === 'orders' ? 'text-[#003366]' : 'text-slate-400'}`}>
          <Package className="w-5 h-5" /> <span className="text-[10px] mt-0.5 font-semibold">Pesanan</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-[#003366]' : 'text-slate-400'}`}>
          <User className="w-5 h-5" /> <span className="text-[10px] mt-0.5 font-semibold">Profil</span>
        </button>
      </nav>
    </div>
  );
}