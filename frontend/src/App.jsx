import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard'; // Halaman Katalog / Pembeli
import BuyerProfile from './pages/BuyerProfile'; // Halaman Profil Pembeli
import SellerDashboard from './pages/SellerDashboard'; // Halaman Penjual

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<BuyerProfile />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}