import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import SellerDashboard from './pages/SellerDashboard';
import Cart from './pages/Cart';
import Notifications from './pages/Notifications';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}