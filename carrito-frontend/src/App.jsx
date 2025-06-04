import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { useAuth } from './context/AuthContext';
import ProtectedLayout from './components/ProtectedLayout';
import ProfilePage from './pages/ProfilePage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';

function App() {
  const { auth } = useAuth();
  const isAuthenticated = !!auth?.token;

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
      {isAuthenticated && (
        <>
          <Route path="/" element={<ProtectedLayout><HomePage /></ProtectedLayout>} />
          <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
          <Route path="/catalog" element={<ProtectedLayout><CatalogPage /></ProtectedLayout>} />
          <Route path="/cart" element={<ProtectedLayout><CartPage /></ProtectedLayout>} />
        </>
      )}

    </Routes>
  );
}

export default App
