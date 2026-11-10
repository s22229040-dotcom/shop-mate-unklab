import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  // Diatur true agar saat pertama kali dibuka, pengguna melihat form Registrasi terlebih dahulu
  const [isRegister, setIsRegister] = useState(true); 
  const [role, setRole] = useState('civitas'); // 'civitas' atau 'penjual'
  
  // Penyimpanan data sementara untuk simulasi akun terdaftar
  const [registeredAccounts, setRegisteredAccounts] = useState([]);
  
  const [formData, setFormData] = useState({
    identityNumber: '', // NIM / NIDN atau NIK Penjual
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi domain email resmi UNKLAB untuk mahasiswa dan civitas
    if (role === 'civitas') {
      const isDomainValid = 
        formData.email.endsWith('@unklab.ac.id') || 
        formData.email.endsWith('@student.unklab.ac.id');
        
      if (!isDomainValid) {
        alert('Civitas UNKLAB wajib menggunakan email resmi berdomain @unklab.ac.id atau @student.unklab.ac.id!');
        return;
      }
    }

    if (isRegister) {
      // Proses Registrasi: Simpan akun baru beserta password buatannya sendiri
      setRegisteredAccounts([...registeredAccounts, formData]);
      alert('Registrasi berhasil! Akun Anda telah terdaftar. Silakan login menggunakan password yang telah dibuat.');
      
      // Bersihkan form password dan pindah ke halaman login
      setFormData({ identityNumber: '', email: '', password: '', name: '' });
      setIsRegister(false); // Beralih ke tampilan Login
    } else {
      // Proses Login: Wajib mencocokkan email & password yang sudah diregistrasi
      const foundAccount = registeredAccounts.find(
        (acc) => acc.email === formData.email && acc.password === formData.password
      );

      // Untuk kemudahan demo, kita beri opsi lolos jika belum sempat daftar, 
      // tapi idealnya harus terdaftar di registeredAccounts
      if (registeredAccounts.length > 0 && !foundAccount) {
        alert('Email atau Password salah! Pastikan Anda sudah registrasi atau memasukkan data dengan benar.');
        return;
      }

      alert('Login berhasil! Selamat datang di Shop-Mate UNKLAB.');
      // Masuk ke dashboard sesuai peran
      navigate(`/dashboard?role=${role}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            UNKLAB EXCLUSIVE
          </span>
          <h1 className="text-2xl font-bold text-slate-800 mt-2">Shop-Mate UNKLAB</h1>
          <p className="text-sm text-slate-500">
            {isRegister 
              ? 'Wajib Registrasi: Buat Password Akun Anda' 
              : 'Silakan Login dengan Password Anda'}
          </p>
        </div>

        {/* Pilihan Peran */}
        <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('civitas')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
              role === 'civitas' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            🎓 Student & Civitas
          </button>
          <button
            type="button"
            onClick={() => setRole('penjual')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
              role === 'penjual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            🛒 Penjual / Tenant
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              {role === 'civitas' ? 'NIM / NIDN (Mahasiswa/Dosen)' : 'ID Tenant / NIK Penjual'}
            </label>
            <input
              type="text"
              name="identityNumber"
              required
              placeholder={role === 'civitas' ? 'Contoh: S22229040' : 'ID Toko / NIK'}
              value={formData.identityNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email Resmi</label>
            <input
              type="email"
              name="email"
              required
              placeholder={role === 'civitas' ? 'nama@student.unklab.ac.id' : 'emailpenjual@gmail.com'}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              {isRegister ? 'Buat Password Baru' : 'Masukkan Password Anda'}
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py.2.5 py-2.5 rounded-xl transition shadow-md text-sm cursor-pointer"
          >
            {isRegister ? 'Daftar & Buat Akun' : 'Masuk (Login)'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
          >
            {isRegister ? 'Sudah pernah daftar? Login di sini' : 'Belum punya akun? Registrasi dulu'}
          </button>
        </div>
      </div>
    </div>
  );
}