import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loader-screen">Məlumatlar yüklənir...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
