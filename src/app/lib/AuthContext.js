"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuth({ token });
    }
  }, []);

  const setCookie = (token) => {
    console.log(token)
    Cookies.set('token', token, { expires: 7, path: '/', secure: true, sameSite: 'Lax' });
    setAuth({ token });
  };

  const logout = () => {
    Cookies.remove('token');
    setAuth({ token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setCookie, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

