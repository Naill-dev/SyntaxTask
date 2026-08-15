import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.stringify(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email === 'demo@devjoint.io' && password === 'Devjoint2026!') {
      const mockToken = 'mock-jwt-token-devjoint-2026';
      const userData = { id: 'u1', name: 'Nail Mammadov', email, role: 'Frontend Engineer' };

      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));

      setToken(mockToken);
      setUser(userData);
      return { success: true };
    }
    throw new Error('E-poçt və ya şifrə yanlışdır! (Demo: demo@devjoint.io / Devjoint2026!)');
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
