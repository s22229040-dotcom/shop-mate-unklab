import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('produk');

  // State produk tenant disinkronkan dengan localStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shopmate_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 1, name: 'Nasi Kuning Special Asrama', price: 15000, stock: 25, category: 'Makanan', tenant: 'Kantin Asrama Putra', sellerPhone: '6281298765432', img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=400&auto=format&fit=crop', desc: 'Nasi kuning hangat dengan lauk abon dan telur pindang khas kantin asrama.' },
      { id: 2, name: 'Es Teh Manis Segar', price: 5000, stock: 40, category: 'Minuman', tenant: 'Kantin Utama', sellerPhone: '6281211112222', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop', desc: 'Teh melati manis segar disajikan dingin dengan es batu pilihan.' }
    ];
  });

  // Simpan ke localStorage setiap kali products berubah agar sinkron dengan pembeli
  useEffect(() => {
    localStorage.setItem('shopmate_products', JSON.stringify(products));
  }, [products]);

  // State Form Tambah / Edit Produk (Dilengkapi Deskripsi)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: 'Makanan', img: '', desc: '' });
  const [isAddModal, setIsAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Mode Edit

  // State Pesanan Masuk
  const [incomingOrders, setIncomingOrders] = useState([
    { id: 'ORD-9821', buyer: 'Michael Tendean (Student)', item: 'Nasi Kuning Special Asrama (1x)', total: 'Rp 15.000', payment: 'QRIS', status: 'Menunggu Disiapkan' },
    { id: 'ORD-9822', buyer: 'Christina P. (Student)', item: 'Es Teh Manis Segar (2x)', total: 'Rp 10.000', payment: 'Cash (COD)', status: 'Menunggu Disiapkan' }
  ]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      // Logika Update / Edit Produk
      const updatedList = products.map(p => p.id === editingProduct.id ? {
        ...p,
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        img: newProduct.img || p.img
      } : p);
      setProducts(updatedList);
      setEditingProduct(null);
      alert('Produk berhasil diperbarui dan disinkronkan ke pembeli!');
    } else {
      // Logika Tambah Produk Baru
      const productToAdd = {
        id: Date.now(), // Unique ID berdasarkan timestamp
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        tenant: 'Tenant Kampus UNKLAB',
        sellerPhone: '6281234567890',
        img: newProduct.img || 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=400&auto=format&fit=crop',
        desc: newProduct.desc || 'Produk berkualitas pilihan civitas akademika UNKLAB.'
      };
      setProducts([...products, productToAdd]);
      alert('Produk baru berhasil ditambahkan ke katalog toko!');
    }

    setNewProduct({ name: '', price: '', stock: '', category: 'Makanan', img: '', desc: '' });
    setIsAddModal(false);
  };

  const startEditProduct = (p) => {
    setEditingProduct(p);
    setNewProduct({
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category,
      img: p.img,
      desc: p.desc || ''
    });
    setIsAddModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini dari katalog?')) {
      setProducts(products.filter(p => p.id !== id));
      alert('Produk berhasil dihapus.');
    }
  };

  const updateOrderStatus = (id, newStatus) => {
    setIncomingOrders(incomingOrders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    alert(`Status pesanan ${id} diperbarui menjadi: "${newStatus}". Notifikasi terkirim ke pembeli!`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      
      {/* Sidebar Penjual */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-bold text-lg shadow">
              🏪
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white">Tenant / Penjual</h1>
              <p className="text-[10px] text-amber-400">Shop-Mate UNKLAB</p>
            </div>
          </div>

          <nav className="space-y-2 text-xs font-semibold">
            <button 
              onClick={() => setActiveTab('produk')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${activeTab === 'produk' ? 'bg-amber-400 text-slate-950 font-extrabold shadow' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>📦</span> Kelola Produk & Stok
            </button>
            <button 
              onClick={() => setActiveTab('pesanan')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${activeTab === 'pesanan' ? 'bg-amber-400 text-slate-950 font-extrabold shadow' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>🛒</span> Pesanan Masuk ({incomingOrders.length})
            </button>
            <button 
              onClick={() => setActiveTab('keuangan')}
              className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2.5 ${activeTab === 'keuangan' ? 'bg-amber-400 text-slate-950 font-extrabold shadow' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <span>💰</span> Laporan Saldo & Keuangan
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

      {/* Konten Utama */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-black text-white">
              {activeTab === 'produk' && 'Manajemen Produk Toko / Tenant'}
              {activeTab === 'pesanan' && 'Kelola Pesanan Masuk & Kirim Notifikasi'}
              {activeTab === 'keuangan' && 'Rekapitulasi Saldo & Pendapatan Penjual'}
            </h2>
            <p className="text-xs text-slate-400">Dashboard operasional penjual resmi civitas akademika UNKLAB.</p>
          </div>
          {activeTab === 'produk' && (
            <button 
              onClick={() => {
                setEditingProduct(null);
                setNewProduct({ name: '', price: '', stock: '', category: 'Makanan', img: '', desc: '' });
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
                <div>
                  <div className="h-40 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] bg-slate-900 text-amber-400 px-2 py-0.5 rounded font-bold">{p.category}</span>
                    <h3 className="text-sm font-extrabold text-white mt-1 mb-1">{p.name}</h3>
                    <p className="text-xs text-amber-400 font-black mb-1">Rp {Number(p.price).toLocaleString()} | Stok: {p.stock}</p>
                    <p className="text-[11px] text-slate-300 line-clamp-2">{p.desc}</p>
                  </div>
                </div>
                <div className="p-4 pt-0 flex gap-2">
                  <button onClick={() => startEditProduct(p)} className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-xl cursor-pointer">
                    Edit Detail
                  </button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-bold rounded-xl cursor-pointer">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PESANAN MASUK & NOTIFIKASI */}
        {activeTab === 'pesanan' && (
          <div className="space-y-4">
            {incomingOrders.map((ord) => (
              <div key={ord.id} className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold text-amber-400">{ord.id}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">Bayar: {ord.payment}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">{ord.status}</span>
                  </div>
                  <p className="text-xs font-bold text-white">{ord.item}</p>
                  <p className="text-[11px] text-slate-400">Pemesan: {ord.buyer}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => updateOrderStatus(ord.id, 'Sedang Disiapkan')} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs cursor-pointer">
                    1. Siapkan Pesanan
                  </button>
                  <button onClick={() => updateOrderStatus(ord.id, 'Sedang Diantar Kurir')} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer">
                    2. Kirim Kurir
                  </button>
                  <button onClick={() => updateOrderStatus(ord.id, 'Selesai diantar')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer">
                    3. Selesai ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: KEUANGAN */}
        {activeTab === 'keuangan' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Total Pendapatan (Bulan Ini)</p>
                <h3 className="text-2xl font-black text-amber-400">Rp 1.450.000</h3>
              </div>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Saldo Siap Dicairkan</p>
                <h3 className="text-2xl font-black text-emerald-400">Rp 980.000</h3>
              </div>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
                <p className="text-xs text-slate-400 mb-1">Transaksi Sukses</p>
                <h3 className="text-2xl font-black text-white">45 Pesanan</h3>
              </div>
            </div>

            <button onClick={() => alert('Permintaan pencairan saldo berhasil dikirim ke Admin UNKLAB!')} className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs cursor-pointer shadow">
              Withdraw (Cairkan Saldo ke Rekening Kampus)
            </button>
          </div>
        )}

      </div>

      {/* MODAL TAMBAH / EDIT PRODUK DENGAN DETAIL LENGKAP */}
      {isAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-slate-100 space-y-4">
            <h3 className="text-lg font-black">{editingProduct ? 'Edit Detail Produk Toko' : 'Tambah Produk Toko Baru'}</h3>
            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Nama Produk</label>
                <input
                  type="text"
                  placeholder="Contoh: Burger Khas Kampus"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    placeholder="15000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 uppercase mb-1">Stok Awal</label>
                  <input
                    type="number"
                    placeholder="20"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full px-3.5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Kategori</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white cursor-pointer"
                >
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Atribut Kampus">Atribut Kampus</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Deskripsi / Detail Produk</label>
                <textarea
                  placeholder="Jelaskan detail bahan, rasa, atau ukuran produk..."
                  value={newProduct.desc}
                  onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white h-20 resize-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-400 uppercase mb-1">Link Gambar Produk (URL)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newProduct.img}
                  onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setIsAddModal(false)} className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="flex-1 py-3 bg-amber-400 text-slate-950 font-extrabold rounded-xl cursor-pointer">
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