import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, category: 'Atribut Kampus', name: 'Lanyard Resmi UNKLAB Premium', price: 25000, tenant: 'Koperasi UNKLAB', phone: '6281234567891', desc: 'Lanyard resmi standar universitas dengan bahan berkualitas tinggi.' },
    { id: 2, category: 'Makanan', name: 'Nasi Kuning Special Asrama', price: 15000, tenant: 'Kantin Asrama Putra', phone: '6281298765432', desc: 'Nasi kuning hangat lengkap dengan abon, telur, dan sambal khas kantin.' },
    { id: 3, category: 'Minuman', name: 'Air Mineral Aqua / Cleo 600ml', price: 4000, tenant: 'Tenant Fasilkom', phone: '6281355556666', desc: 'Air mineral segar ukuran 600ml.' },
    { id: 4, category: 'Minuman', name: 'Es Teh Manis Segar Kampus', price: 5000, tenant: 'Kantin Utama', phone: '6281112223334', desc: 'Es teh manis segar pelepas dahaga.' }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Berhasil menambahkan "${product.name}" ke Keranjang!`);
  };

  return (
    <div className="min-h-screen bg-[#131b2e] font-sans text-white">
      {/* NAVBAR ATAS */}
      <div className="bg-[#0b101d] px-8 py-4 flex justify-between items-center border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-slate-900 font-black">🛒</div>
          <div>
            <h1 className="text-sm font-black tracking-wider text-white">SHOP-MATE UNKLAB</h1>
            <p className="text-[10px] text-amber-400 font-bold">PORTAL BELANJA CIVITAS AKADEMIKA</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-xs font-semibold">
          <span className="text-amber-400 font-bold cursor-pointer">Katalog</span>
          <button onClick={() => navigate('/cart')} className="hover:text-amber-400 transition cursor-pointer">Keranjang</button>
          <button onClick={() => navigate('/notifications')} className="hover:text-amber-400 transition cursor-pointer">Notifikasi</button>
          <button onClick={() => { localStorage.removeItem('shopmate_active_user'); navigate('/login'); }} className="bg-rose-500/20 text-rose-400 px-4 py-2 rounded-xl font-bold hover:bg-rose-500/30 transition cursor-pointer">
            Keluar
          </button>
        </div>
      </div>

      {/* KONTEN KATALOG */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-white">Katalog Produk Kampus</h2>
          <p className="text-xs text-slate-400 mt-1">Temukan berbagai kebutuhan kuliah, makanan, dan minuman dari tenant resmi UNKLAB.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-700 shadow-xl flex flex-col justify-between">
              <div>
                <div className="h-40 bg-slate-800 flex items-center justify-center text-slate-500 font-bold relative">
                  <span className="absolute top-3 left-3 bg-amber-400/90 text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                    {item.category}
                  </span>
                  🛒 Produk UNKLAB
                </div>
                <div className="p-5">
                  <p className="text-[11px] text-amber-400 font-bold uppercase">Tenant: {item.tenant}</p>
                  <h3 className="text-sm font-black text-white mt-1">{item.name}</h3>
                  <p className="text-xs font-extrabold text-amber-300 mt-2">Rp {item.price.toLocaleString()}</p>
                  <p className="text-[11px] text-slate-400 mt-2">💬 WhatsApp: {item.phone}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <button onClick={() => setSelectedProduct(item)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer">
                  Detail
                </button>
                <button onClick={() => addToCart(item)}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-2.5 rounded-xl text-xs transition shadow cursor-pointer">
                  + Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] max-w-lg w-full p-6 rounded-3xl border border-slate-700 shadow-2xl relative">
            <h3 className="text-lg font-black text-white mb-2">{selectedProduct.name}</h3>
            <p className="text-xs text-amber-400 font-bold mb-4">Tenant: {selectedProduct.tenant}</p>
            <p className="text-xs text-slate-300 bg-[#131b2e] p-4 rounded-2xl border border-slate-700 mb-4 leading-relaxed">
              {selectedProduct.desc}
            </p>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-extrabold text-amber-300">Harga: Rp {selectedProduct.price.toLocaleString()}</span>
              <span className="text-xs text-slate-400">Kontak: {selectedProduct.phone}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3 rounded-xl text-xs transition cursor-pointer">
                Tambah ke Keranjang
              </button>
              <button onClick={() => setSelectedProduct(null)}
                className="px-6 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition cursor-pointer">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}