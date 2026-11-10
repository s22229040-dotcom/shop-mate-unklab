import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Saat tombol peran diklik, arahkan ke halaman dashboard sesuai peran
    navigate(`/dashboard?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Shop-Mate UNKLAB</h1>
        <p className="text-sm text-slate-500 mb-6">Silakan pilih peran Anda untuk melanjutkan</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('civitas')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-xl transition shadow-md"
          >
            🎓 Student & Civitas
          </button>
          
          <button 
            onClick={() => handleLogin('penjual')}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium p-3 rounded-xl transition shadow-md"
          >
            🛒 Penjual / Tenant
          </button>
        </div>
      </div>
    </div>
  );
}