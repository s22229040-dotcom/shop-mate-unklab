import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SellerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Sidebar Penjual */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
              🏪
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900">Tenant / Penjual</h1>
              <p className="text-[10px] text-amber-600 font-semibold">Shop-Mate UNKLAB</p>
            </div>
          </div>

          <nav className="space-y-2 text-xs font-semibold">
            <a href="#products" className="block px-4 py-2.5 bg-amber-400 text-slate-950 rounded-xl shadow-sm">📦 Kelola Produk & Menu</a>
            <a href="#orders" className="block px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl">🛒 Pesanan Masuk (0)</a>
            <a href="#finance" className="block px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl">💰 Keuangan & Saldo</a>
            <a href="#settings" className="block px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl">⚙️ Pengaturan Toko</a>
          </nav>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
        >
          Keluar (Logout)
        </button>
      </div>

      {/* Konten Utama Penjual */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900">Dashboard Manajemen Toko Anda</h2>
            <p className="text-xs text-slate-500">Kelola produk makanan, barang, dan pesanan civitas UNKLAB di sini.</p>
          </div>
          <button className="px-4 py-2.5 bg-[#3a105c] hover:bg-[#4d167a] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer">
            + Tambah Produk Baru
          </button>
        </header>

        {/* Ringkasan Penjualan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-semibold mb-1">Pendapatan Hari Ini</p>
            <h3 className="text-2xl font-black text-slate-900">Rp 350.000</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-2 inline-block">5 transaksi selesai</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-semibold mb-1">Pesanan Perlu Diproses</p>
            <h3 className="text-2xl font-black text-amber-600">2</h3>
            <span className="text-[10px] text-slate-500 mt-2 inline-block">Mohon segera disiapkan</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-semibold mb-1">Total Produk Aktif</p>
            <h3 className="text-2xl font-black text-slate-900">12 Item</h3>
            <span className="text-[10px] text-emerald-600 font-bold mt-2 inline-block">Stok aman</span>
          </div>
        </div>

        {/* Daftar Produk Toko */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Datalog Produk Jualan Toko</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center font-bold text-lg">
                  🍔
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Nasi Kuning Special UNKLAB</h4>
                  <p className="text-[11px] text-slate-500">Rp 15.000 • Stok: 20 Porsi</p>
                </div>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg">Edit</button>
                <button className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold rounded-lg">Hapus</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center font-bold text-lg">
                  🧋
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Es Teh Manis / Boba Kampus</h4>
                  <p className="text-[11px] text-slate-500">Rp 8.000 • Stok: 45 Cup</p>
                </div>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg">Edit</button>
                <button className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold rounded-lg">Hapus</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}