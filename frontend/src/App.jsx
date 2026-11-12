import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama / Login & Registrasi */}
        <Route path="/" element={<Login />} />
        
        {/* Halaman Dashboard Pembeli / Mahasiswa */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Halaman Profil Pembeli */}
        <Route path="/profile" element={<Profile />} />

        {/* Halaman Dashboard Penjual / Tenant Kampus */}
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        
        {/* Halaman Dashboard Administrator Sistem */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        {/* Halaman Portal Dosen & Staff */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;