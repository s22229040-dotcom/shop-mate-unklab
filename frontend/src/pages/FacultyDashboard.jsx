import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [activeTab, setActiveTab] = useState('katalog');

  // State profil dosen/staff
  const [facultyProfile] = useState({
    name: 'Dr. Citra Lestari, M.Kom',
    email: 'citra.lestari@unklab.ac.id',
    nip: '198205122008012001',
    faculty: 'Fakultas Ilmu Komputer (FASILKOM)',
    phone: '081199887766',
    address: 'Ruang Dosen Gedung A, Fasilkom UNKLAB'
  });

  // Katalog khusus yang relevan dengan kebutuhan dosen/staff
  const [products] = useState([
    { 
      id: 1, 
      name: 'Modul Ajar & Buku Pemrograman Web Lanjut', 
      category: 'Buku & Modul', 
      price: 75000, 
      stock: 20, 
      tenant: 'Penerbit & Koperasi UNKLAB', 
      sellerPhone: '6281122334455',
      img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
      desc: 'Buku referensi resmi perkuliahan dan modul praktikum pembaruan kurikulum terbaru.' 
    },
    { 
      id: 2, 
      name: 'Coffee Break Paket Rapat Dosen (Box)', 
      category: 'Konsumsi Rapat', 
      price: 50000, 
      stock: 15, 
      tenant: 'Kantin Utama UNKLAB', 
      sellerPhone: '6281211112222',
      img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop',
      desc: 'Paket konsumsi higienis untuk rapat dosen, sidang skripsi, atau seminar fakultas.' 
    },
    { 
      id: 3, 
      name: 'Plakat / Cenderamata Resmi UNKLAB', 
      category: 'Atribut Kampus', 
      price: 150000, 
      stock: 10, 
      tenant: 'Koperasi Kampus', 
      sellerPhone: '6281234567891',
      img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop',
      desc: 'Plakat cinderamata eksklusif berlogo universitas untuk tamu narasumber atau dosen tamu.' 
    }
  ]);

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    { 
      id: 'TRX-D01', 
      item: 'Coffee Break Paket Rapat Dosen (2 Box)', 
      total: 'Rp 100.000', 
      status: 'Selesai diantar ke Ruang Dosen', 
      notification: 'Tenant: Pesanan rapat telah disiapkan dan diantar tepat waktu.' 
    }
  ]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    alert(`Berhasil menambahkan "${product.name}" ke keranjang instansi!`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* NAVBAR DOSEN */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black text-lg shadow">
            📚
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-wide">PORTAL DOSEN & STAFF</h1>
            <p className="text-[10px] text-amber-400 font-semibold uppercase">Shop-Mate Universitas Klabat</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('katalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'katalog' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            📋 Katalog & Kebutuhan Akademik
          </button>
          <button 
            onClick={() => setActiveTab('pesanan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'pesanan' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            🔔 Status Pesanan Rapat
          </button>
          <button 
            onClick={() => setActiveTab('profil')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'profil' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            👤 Profil Dosen
          </button>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="px-3.5 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
        >
          <span>&larr;</span> Keluar
        </button>
      </header>

      {/* KONTEN UTAMA */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: KATALOG */}
        {activeTab === 'katalog' && (
          <div>
            <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-slate-900 border border-slate-800 p-8 rounded-3xl mb-8 shadow-xl">
              <span className="px-3.5 py-1 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-full uppercase">
                AKADEMIK & KONSUMSI KAMPUS
              </span>
              <h2 className="text-2xl font-black text-white mt-2 mb-1">Selamat Datang, {facultyProfile.name}</h2>
              <p className="text-xs text-slate-300">Pesan kebutuhan modul perkuliahan, konsumsi rapat, atau cenderamata resmi instansi.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 text-amber-400 font-bold text-[10px] rounded-lg">
                        {p.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <p className="text-[10px] text-slate-400 font-semibold mb-1">Penyedia: <span className="text-amber-400">{p.tenant}</span></p>
                      <h3 className="text-sm font-extrabold text-white mb-2">{p.name}</h3>
                      <p className="text-xs text-slate-300 mb-3">{p.desc}</p>
                      <p className="text-sm font-black text-amber-400 mb-2">Rp {p.price.toLocaleString()}</p>
                      
                      <a
                        href={`https://wa.me/${p.sellerPhone}?text=Halo%20${encodeURIComponent(p.tenant)},%20saya%20${encodeURIComponent(facultyProfile.name)}%20tertarik%20dengan%20${encodeURIComponent(p.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:underline font-bold flex items-center gap-1 mb-3"
                      >
                        <span>💬</span> Chat Penyedia ({p.sellerPhone})
                      </a>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-2.5 rounded-xl transition text-xs shadow-md cursor-pointer"
                    >
                      🛒 + Tambah ke Pesanan Instansi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PESANAN */}
        {activeTab === 'pesanan' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-xl font-black text-white mb-4">Riwayat Pesanan & Rapat Fakultas</h2>
            {orders.map((ord, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl text-xs space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-amber-400">{ord.id} - {ord.item}</span>
                  <span className="text-emerald-400">{ord.status}</span>
                </div>
                <p className="text-slate-300 italic">💬 "{ord.notification}"</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PROFIL DOSEN */}
        {activeTab === 'profil' && (
          <div className="max-w-xl mx-auto bg-slate-800/60 border border-slate-700 rounded-3xl p-8 shadow-xl space-y-4">
            <h2 className="text-xl font-black text-white mb-2 pb-3 border-b border-slate-700">Profil Dosen & Staff</h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Nama Lengkap & Gelar:</span>
                <span className="text-white font-semibold">{facultyProfile.name}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">NIP / NIDN:</span>
                <span className="text-white font-semibold">{facultyProfile.nip}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Email UNKLAB:</span>
                <span className="text-white font-semibold">{facultyProfile.email}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Fakultas / Unit:</span>
                <span className="text-white font-semibold">{facultyProfile.faculty}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Nomor WhatsApp:</span>
                <span className="text-white font-semibold">{facultyProfile.phone}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl flex justify-between">
                <span className="text-slate-400 font-bold">Ruangan Kerja:</span>
                <span className="text-white font-semibold">{facultyProfile.address}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('katalog')}
              className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs cursor-pointer shadow"
            >
              &larr; Kembali ke Katalog
            </button>
          </div>
        )}

      </main>
    </div>
  );
}