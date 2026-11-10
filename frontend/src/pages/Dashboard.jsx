import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'civitas';

  const handleBackToLogin = () => {
    // Tombol kembali mengarahkan dosen kembali ke halaman awal/login
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan Tombol Panah Kembali */}
      <header className="bg-blue-900 text-white p-4 flex items-center justify-between shadow-md">
        <button 
          onClick={handleBackToLogin}
          className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium transition"
        >
          <span>←</span> <span>Kembali ke Login</span>
        </button>
        
        <h1 className="font-bold text-base">Shop-Mate ({role === 'civitas' ? 'Civitas' : 'Penjual'})</h1>
        
        <div className="w-16"></div> {/* Spacer */}
      </header>

      {/* Konten Katalog / Dashboard Anda */}
      <main className="p-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Selamat Datang di Shop-Mate UNKLAB</h2>
          <p className="text-gray-600 text-sm">
            Anda masuk sebagai: <span className="font-semibold text-blue-600 uppercase">{role}</span>
          </p>
        </div>
      </main>
    </div>
  );
}