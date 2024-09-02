"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null });

  useEffect(() => {
    // Inicializar el token desde la sesión del navegador
    const token = sessionStorage.getItem('token');
    if (token) {
      setAuth({ token });
    }
  }, []);

  const login = (token) => {
    // Guardar el token en sessionStorage
    sessionStorage.setItem('token', token);
    setAuth({ token });
  };

  const logout = () => {
    // Eliminar el token de sessionStorage
    sessionStorage.removeItem('token');
    setAuth({ token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
