import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);
  
  const [loginRole, setLoginRole] = useState('Student (Mahasiswa)');
  const [registerRole, setRegisterRole] = useState('Pembeli');
  
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Menentukan placeholder email secara dinamis berdasarkan peran yang dipilih
  const getEmailPlaceholder = () => {
    if (loginRole.includes('Admin')) {
      return ''; // Dikosongkan khusus untuk Admin
    } else if (loginRole.includes('Dosen')) {
      return 'Contoh: nama.dosen@unklab.ac.id';
    } else if (loginRole.includes('Penjual')) {
      return 'Contoh: tenant.kantin@unklab.ac.id';
    } else {
      return 'Contoh: s12345678@student.unklab.ac.id';
    }
  };

  // Cek sesi login aktif secara otomatis (Persistent Login)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const savedUserStr = localStorage.getItem('shopmate_registered_user');
        let registeredRole = 'Pembeli';
        if (savedUserStr) {
          try {
            const savedUser = JSON.parse(savedUserStr);
            registeredRole = savedUser.role;
          } catch (e) {
            console.error(e);
          }
        }

        if (user.email.includes('admin')) {
          navigate('/admin-dashboard');
        } else if (registeredRole === 'Penjual') {
          navigate('/seller-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    
    try {
      if (isForgotPass) {
        if (!email) {
          alert('Silakan masukkan email resmi Unklab Anda terlebih dahulu.');
          return;
        }
        await sendPasswordResetEmail(auth, email);
        alert(`Tautan pemulihan kata sandi telah dikirim ke email ${email}. Silakan cek kotak masuk atau folder spam Anda.`);
        setIsForgotPass(false);

      } else if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        const newUser = { 
          uid: userCredential.user.uid,
          role: registerRole, 
          fullName, 
          address, 
          phone, 
          email 
        };
        localStorage.setItem('shopmate_registered_user', JSON.stringify(newUser));
        
        alert(`Registrasi sebagai ${registerRole} berhasil! Silakan masuk.`);
        setIsRegistering(false);
        setEmail('');
        setPassword('');

      } else {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('shopmate_active_user', email);

        const savedUserStr = localStorage.getItem('shopmate_registered_user');
        let registeredRole = 'Pembeli';
        if (savedUserStr) {
          try {
            const parsed = JSON.parse(savedUserStr);
            registeredRole = parsed.role;
          } catch (e) {
            console.error(e);
          }
        }

        if (registeredRole === 'Penjual' && loginRole !== 'Penjual / Tenant' && !email.includes('admin')) {
          alert('Akun ini terdaftar sebagai PENJUAL. Silakan pilih peran "Penjual / Tenant".');
          return;
        }

        if (registeredRole === 'Pembeli' && loginRole === 'Penjual / Tenant' && !email.includes('admin')) {
          alert('Akun ini terdaftar sebagai PEMBELI. Tidak dapat masuk ke dashboard penjual.');
          return;
        }

        if (loginRole.includes('Admin') || email.includes('admin')) {
          navigate('/admin-dashboard');
        } else if (loginRole.includes('Penjual')) {
          navigate('/seller-dashboard');
        } else if (loginRole.includes('Dosen')) {
          navigate('/faculty-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      alert('Autentikasi Gagal: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] flex items-center justify-center p-4 font-sans text-white">
      <div className="max-w-4xl w-full bg-[#131b2e] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2">
        
        {/* KIRI: BANNER */}
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
        <div className="p-8 flex flex-col justify-center bg-[#131b2e]">
          <h2 className="text-xl font-black text-white mb-1">
            {isForgotPass ? 'Pemulihan Kata Sandi' : isRegistering ? 'Form Registrasi Akun Civitas' : 'Masuk ke Akun Anda'}
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            {isForgotPass 
              ? 'Masukkan email kampus Anda untuk mereset sandi.' 
              : isRegistering 
              ? 'Lengkapi data diri untuk mendaftarkan akun baru.' 
              : 'Pilih peran dan masuk menggunakan email kampus terdaftar.'}
          </p>

          <form onSubmit={handleAuth} className="space-y-3">
            {!isRegistering && !isForgotPass && (
              <div>
                <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pilih Peran / Status Anda</label>
                <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)} 
                  className="w-full mt-1 bg-[#1e293b] border border-amber-400/40 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-amber-400 shadow-inner cursor-pointer">
                  <option value="Student (Mahasiswa)">Student (Mahasiswa)</option>
                  <option value="Dosen / Staff">Dosen / Staff</option>
                  <option value="Penjual / Tenant">Penjual / Tenant</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            )}

            {isRegistering && !isForgotPass && (
              <div>
                <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Pilih Peran / Status Anda</label>
                <select value={registerRole} onChange={(e) => setRegisterRole(e.target.value)} 
                  className="w-full mt-1 bg-[#1e293b] border border-amber-400/40 rounded-xl px-4 py-2 text-xs text-white font-bold focus:outline-none focus:border-amber-400 shadow-inner cursor-pointer">
                  <option value="Pembeli">Pembeli</option>
                  <option value="Penjual">Penjual</option>
                </select>
              </div>
            )}

            {isRegistering && !isForgotPass && (
              <>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Nama Lengkap</label>
                  <input type="text" placeholder="Masukkan nama lengkap" value={fullName} onChange={(e) => setFullName(e.target.value)} required
                    className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Alamat</label>
                  <input type="text" placeholder="Contoh: Asrama Putra / Tontalete" value={address} onChange={(e) => setAddress(e.target.value)} required
                    className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase">Nomor HP / WhatsApp</label>
                  <input type="text" placeholder="Contoh: 081234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required
                    className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400" />
                </div>
              </>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase">Email Resmi Unklab</label>
              <input 
                type="email" 
                placeholder={getEmailPlaceholder()} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                autoComplete="email"
                className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400" 
              />
            </div>

            {!isForgotPass && (
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase">
                  {isRegistering ? 'Buat Password Mandiri' : 'Password'}
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  autoComplete={isRegistering ? "new-password" : "current-password"}
                  className="w-full mt-1 bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400" 
                />
              </div>
            )}

            <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition shadow-lg cursor-pointer mt-2">
              {isForgotPass ? 'Kirim Instruksi Reset Sandi' : isRegistering ? 'Daftar Akun Baru' : 'Masuk Sekarang'}
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center">
            {!isForgotPass && !isRegistering && (
              <div>
                <button onClick={() => setIsForgotPass(true)} className="text-[11px] text-amber-400/90 hover:underline font-semibold cursor-pointer">
                  Lupa password Anda? Klik di sini
                </button>
              </div>
            )}

            <div>
              <button 
                onClick={() => { setIsRegistering(!isRegistering); setIsForgotPass(false); }} 
                className="text-xs text-amber-400 hover:underline font-bold cursor-pointer">
                {isRegistering ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar akun civitas'}
              </button>
            </div>

            {isForgotPass && (
              <div>
                <button onClick={() => setIsForgotPass(false)} className="text-xs text-slate-400 hover:underline cursor-pointer">
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