import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);
  
  // State untuk Toggle Lihat/Sembunyikan Password
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk Tema (Dark / Light Mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('shopmate_theme');
    return savedTheme ? savedTheme === 'dark' : true; // Default Dark Mode
  });

  useEffect(() => {
    localStorage.setItem('shopmate_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  // State form Login & Registrasi
  const [loginRole, setLoginRole] = useState('Student (Mahasiswa)');
  const [registerRole, setRegisterRole] = useState('Pembeli');
  
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fungsi Dinamis untuk Placeholder Contoh Email Berdasarkan Peran
  const getEmailPlaceholder = () => {
    if (isRegistering) {
      return registerRole === 'Penjual' ? 'Contoh: tenant@unklab.ac.id / s23142847@student.unklab.ac.id' : 'Contoh: s23142847@student.unklab.ac.id atau 12342734@student.unklab.ac.id';
    }
    if (loginRole === 'Student (Mahasiswa)') return 'Contoh: s23142847@student.unklab.ac.id';
    if (loginRole === 'Dosen / Staff') return 'Contoh: nikdosen@unklab.ac.id';
    if (loginRole === 'Penjual / Tenant') return 'Contoh: tenant@unklab.ac.id';
    if (loginRole === 'Admin') return 'Contoh: admin@unklab.ac.id';
    return 'Contoh: email@unklab.ac.id';
  };

  const handleAuth = (e) => {
    e.preventDefault();
    
    if (isForgotPass) {
      if (!email) {
        alert('Silakan masukkan email resmi Unklab Anda terlebih dahulu.');
        return;
      }
      localStorage.setItem('shopmate_reset_email', email);
      alert(`Instruksi pemulihan sandi telah dikirim ke email ${email}.`);
      setIsForgotPass(false);
    } else if (isRegistering) {
      const lowerEmail = email.toLowerCase();
      
      // Validasi Format Email Berdasarkan Peran Registrasi
      if (registerRole === 'Pembeli') {
        const studentPattern = /^(s\d+|\d+)@student\.unklab\.ac\.id$/;
        if (!studentPattern.test(lowerEmail)) {
          alert('Format Email Mahasiswa salah!\n\nContoh yang benar:\n- s23142847@student.unklab.ac.id\n- 12342734@student.unklab.ac.id');
          return;
        }
      } else if (registerRole === 'Penjual') {
        if (!lowerEmail.endsWith('@unklab.ac.id') && !lowerEmail.endsWith('@student.unklab.ac.id')) {
          alert('Format Email Penjual harus menggunakan domain resmi @unklab.ac.id atau @student.unklab.ac.id');
          return;
        }
      }

      let allAccounts = JSON.parse(localStorage.getItem('shopmate_accounts')) || [];
      const existingAccount = allAccounts.find(acc => acc.email.toLowerCase() === lowerEmail);

      if (existingAccount) {
        alert(`Email ini sudah terdaftar sebagai "${existingAccount.role}". Anda tidak dapat mendaftar dengan peran yang berbeda. Silakan langsung masuk (login)!`);
        setIsRegistering(false);
        return;
      }

      const newUser = { 
        role: registerRole, 
        name: fullName, 
        fullName, 
        address, 
        phone, 
        email: lowerEmail, 
        password 
      };

      allAccounts.push(newUser);
      localStorage.setItem('shopmate_accounts', JSON.stringify(allAccounts));

      // Sinkronkan pendaftar baru ke daftar Kelola Pengguna di AdminDashboard
      const adminUsers = JSON.parse(localStorage.getItem('shopmate_admin_users')) || [];
      if (!adminUsers.some(u => u.email.toLowerCase() === lowerEmail)) {
        adminUsers.push({
          id: Date.now(),
          name: fullName,
          email: lowerEmail,
          role: registerRole === 'Penjual' ? 'seller' : 'buyer',
          status: 'Aktif'
        });
        localStorage.setItem('shopmate_admin_users', JSON.stringify(adminUsers));
      }

      alert(`Registrasi berhasil! Silakan masuk (login) menggunakan akun yang baru dibuat.`);
      setIsRegistering(false);
    } else {
      const lowerEmail = email.toLowerCase();
      const allAccounts = JSON.parse(localStorage.getItem('shopmate_accounts')) || [];
      const matchedUser = allAccounts.find(acc => acc.email.toLowerCase() === lowerEmail);

      if (!matchedUser && !lowerEmail.includes('admin') && lowerEmail !== 'admin@unklab.ac.id') {
        alert('Email belum terdaftar! Silakan lakukan registrasi terlebih dahulu.');
        return;
      }

      if (matchedUser) {
        if (matchedUser.password && matchedUser.password !== password) {
          alert('Password salah! Silakan periksa kembali kata sandi Anda.');
          return;
        }
      }

      let userRole = matchedUser ? matchedUser.role : 'Pembeli';
      if (lowerEmail.includes('admin')) userRole = 'Admin';

      if (userRole === 'Pembeli' && loginRole === 'Penjual / Tenant') {
        alert('Akun ini terdaftar sebagai PEMBELI (Mahasiswa). Anda tidak dapat masuk ke dashboard penjual!');
        return;
      }
      if (userRole === 'Penjual' && loginRole !== 'Penjual / Tenant' && !lowerEmail.includes('admin')) {
        alert('Akun ini terdaftar sebagai PENJUAL. Silakan pilih peran "Penjual / Tenant" di atas untuk masuk.');
        return;
      }

      const activeUserData = matchedUser || {
        name: 'Civitas UNKLAB',
        email: email,
        phone: '081234567890',
        address: 'Kampus Universitas Klabat, Airmadidi',
        role: loginRole
      };

      // Pastikan akun terdaftar juga tercatat di Kelola Pengguna Admin
      if (matchedUser && !lowerEmail.includes('admin')) {
        const adminUsers = JSON.parse(localStorage.getItem('shopmate_admin_users')) || [];
        if (!adminUsers.some(u => u.email.toLowerCase() === lowerEmail)) {
          adminUsers.push({
            id: Date.now(),
            name: matchedUser.name || matchedUser.fullName || 'Civitas UNKLAB',
            email: lowerEmail,
            role: matchedUser.role === 'Penjual' ? 'seller' : 'buyer',
            status: 'Aktif'
          });
          localStorage.setItem('shopmate_admin_users', JSON.stringify(adminUsers));
        }
      }

      localStorage.setItem('shopmate_active_user', lowerEmail);
      localStorage.setItem('shopmate_active_profile', JSON.stringify(activeUserData));
      
      if (loginRole.includes('Admin') || lowerEmail.includes('admin')) {
        navigate('/admin-dashboard');
      } else if (loginRole.includes('Penjual') || userRole === 'Penjual') {
        navigate('/seller-dashboard');
      } else if (loginRole.includes('Dosen')) {
        navigate('/faculty-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#070913] text-white' : 'bg-slate-100 text-slate-900'}`}>
      
      {/* TOMBOL PENGALIH TEMA (DARK/LIGHT MODE) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md transition cursor-pointer flex items-center gap-2 border ${
          isDarkMode 
            ? 'bg-[#131b2e] border-slate-700 text-amber-400 hover:bg-slate-800' 
            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
        }`}
        title={isDarkMode ? "Ubah ke Light Mode" : "Ubah ke Dark Mode"}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className={`max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border grid grid-cols-1 md:grid-cols-2 transition-colors duration-300 ${
        isDarkMode ? 'bg-[#131b2e] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* KIRI: BANNER KAMPUS */}
        <div className="p-8 flex flex-col justify-between items-center text-center relative overflow-hidden bg-indigo-950">
          <div className="absolute inset-0 bg-cover bg-center opacity-70" 
               style={{ backgroundImage: `url('/download.jpg')` }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/95 via-[#131b2e]/60 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-6">
            <div className="w-28 h-28 bg-[#131b2e]/80 rounded-3xl flex items-center justify-center p-3 mb-6 border-2 border-amber-400 shadow-2xl backdrop-blur-md">
              <img src="/logo.png" alt="Logo Unklab" className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />
            </div>
            <h1 className="text-2xl font-black text-amber-300 tracking-wide drop-shadow-md">Shop-Mate UNKLAB</h1>
            <p className="text-xs text-slate-100 mt-2 leading-relaxed max-w-xs font-semibold drop-shadow">
              Platform e-commerce eksklusif civitas akademika Universitas Klabat menggunakan Email Resmi Kampus.
            </p>
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] text-amber-300 font-bold tracking-wider drop-shadow">© 2026 Universitas Klabat • Restricted Access</p>
          </div>
        </div>

        {/* KANAN: FORM */}
        <div className={`p-8 flex flex-col justify-center ${isDarkMode ? 'bg-[#131b2e]' : 'bg-white'}`}>
          <h2 className={`text-xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isForgotPass ? 'Pemulihan Kata Sandi' : isRegistering ? 'Form Registrasi Akun Civitas' : 'Masuk ke Akun Anda'}
          </h2>
          <p className={`text-xs mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isForgotPass 
              ? 'Masukkan email kampus Anda untuk mereset sandi.' 
              : isRegistering 
              ? 'Lengkapi data diri untuk mendaftarkan akun baru.' 
              : 'Pilih peran dan masuk menggunakan email kampus terdaftar.'}
          </p>

          <form onSubmit={handleAuth} className="space-y-3">
            
            {!isRegistering && !isForgotPass && (
              <div>
                <label className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Pilih Peran / Status Anda</label>
                <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)} 
                  className={`w-full mt-1 border rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-400 shadow-inner ${
                    isDarkMode ? 'bg-[#1e293b] border-amber-400/40 text-white' : 'bg-slate-50 border-amber-500/50 text-slate-900'
                  }`}>
                  <option value="Student (Mahasiswa)">Student (Mahasiswa)</option>
                  <option value="Dosen / Staff">Dosen / Staff</option>
                  <option value="Penjual / Tenant">Penjual / Tenant</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            )}

            {isRegistering && !isForgotPass && (
              <div>
                <label className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Pilih Peran / Status Anda</label>
                <select value={registerRole} onChange={(e) => setRegisterRole(e.target.value)} 
                  className={`w-full mt-1 border rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-amber-400 shadow-inner ${
                    isDarkMode ? 'bg-[#1e293b] border-amber-400/40 text-white' : 'bg-slate-50 border-amber-500/50 text-slate-900'
                  }`}>
                  <option value="Pembeli">Pembeli (Mahasiswa)</option>
                  <option value="Penjual">Penjual / Tenant</option>
                </select>
              </div>
            )}

            {isRegistering && !isForgotPass && (
              <>
                <div>
                  <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama lengkap" value={fullName} onChange={(e) => setFullName(e.target.value)} required
                    className={`w-full mt-1 border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 ${
                      isDarkMode ? 'bg-[#1e293b] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`} />
                </div>

                <div>
                  <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Alamat</label>
                  <input type="text" placeholder="Contoh: Asrama Putra / Tontalete" value={address} onChange={(e) => setAddress(e.target.value)} required
                    className={`w-full mt-1 border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 ${
                      isDarkMode ? 'bg-[#1e293b] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`} />
                </div>

                <div>
                  <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nomor HP / WhatsApp</label>
                  <input type="text" placeholder="Contoh: 081234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required
                    className={`w-full mt-1 border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 ${
                      isDarkMode ? 'bg-[#1e293b] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`} />
                </div>
              </>
            )}

            <div>
              <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Resmi Unklab</label>
              <input 
                type="email" 
                placeholder={getEmailPlaceholder()} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                autoComplete="username"
                className={`w-full mt-1 border rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-400 ${
                  isDarkMode ? 'bg-[#1e293b] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`} 
              />
            </div>

            {/* INPUT PASSWORD DENGAN IKON MATA SVG */}
            {!isForgotPass && (
              <div>
                <label className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRegistering ? 'Buat Password Mandiri' : 'Password'}
                </label>
                <div className="relative mt-1">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    autoComplete={isRegistering ? "new-password" : "current-password"}
                    className={`w-full border rounded-xl px-4 py-2 pr-10 text-xs focus:outline-none focus:border-amber-400 ${
                      isDarkMode ? 'bg-[#1e293b] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 cursor-pointer focus:outline-none"
                    title={showPassword ? "Sembunyikan password" : "Lihat password"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.23-3.66m2.5-2.07A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition shadow-lg cursor-pointer mt-2">
              {isForgotPass ? 'Kirim Instruksi Reset Sandi' : isRegistering ? 'Daftar Akun Baru' : 'Masuk Sekarang'}
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center">
            {!isForgotPass && !isRegistering && (
              <div>
                <button onClick={() => setIsForgotPass(true)} className="text-[11px] text-amber-500 hover:underline font-semibold cursor-pointer">
                  Lupa password Anda? Klik di sini
                </button>
              </div>
            )}

            <div>
              <button 
                onClick={() => { setIsRegistering(!isRegistering); setIsForgotPass(false); }} 
                className="text-xs text-amber-500 hover:underline font-bold cursor-pointer">
                {isRegistering ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar akun civitas'}
              </button>
            </div>

            {isForgotPass && (
              <div>
                <button onClick={() => setIsForgotPass(false)} className={`text-xs hover:underline cursor-pointer ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  ← Kembali ke halaman Masuk
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}