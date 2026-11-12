import React, { useState, useEffect } from 'react';

export default function SellerDashboard() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shopmate_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Tas Backpack UNKLAB', price: 180000, stock: 15, category: 'Atribut', image: '📦' },
      { id: 2, name: 'Set Alat Tulis Kuliah', price: 45000, stock: 20, category: 'Alat Tulis', image: '✏️' }
    ];
  });

  const [form, setForm] = useState({ name: '', price: '', stock: '', category: 'Atribut', image: '🛍️' });

  // Simpan produk otomatis ke localStorage agar tidak hilang saat keluar/masuk ulang
  useEffect(() => {
    localStorage.setItem('shopmate_products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
      image: form.image
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    alert('Produk berhasil ditambahkan dan langsung tersedia di Katalog Pembeli secara permanen!');
    setForm({ name: '', price: '', stock: '', category: 'Atribut', image: '🛍️' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="bg-[#3a105c] text-white p-6 rounded-3xl shadow-xl flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black">Dashboard Penjual (Tenant Kampus)</h1>
            <p className="text-xs text-amber-200 mt-1">Kelola produk toko Anda di Shop-Mate UNKLAB.</p>
          </div>
        </div>

        {/* Form Tambah Produk */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100">
          <h2 className="text-sm font-extrabold text-[#3a105c] mb-4">🏪 Tambah Produk Baru ke Katalog</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nama Produk</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Contoh: Kemeja Formal"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Harga (Rp)</label>
              <input type="number" required value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="Contoh: 150000"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Stok</label>
              <input type="number" required value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} placeholder="Contoh: 10"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-xs" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-[#3a105c] hover:bg-[#4d167a] text-amber-300 font-bold py-2.5 rounded-xl text-xs shadow">
                + Tambah Produk
              </button>
            </div>
          </form>
        </div>

        {/* Daftar Produk Toko */}
        <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100">
          <h2 className="text-sm font-extrabold text-[#3a105c] mb-4">📦 Daftar Produk Toko Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="p-4 bg-slate-50 border rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-2xl">{p.image}</span>
                  <h3 className="text-xs font-bold text-slate-800 mt-1">{p.name}</h3>
                  <p className="text-[11px] text-amber-700 font-extrabold">Rp {p.price.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500">Stok: {p.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}