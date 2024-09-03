// src/app/dashboard/AuthGuard.js
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Importa el router para la navegación
import { useAuth } from '../lib/AuthContext';
import Spinner from './Spinner';

const AuthGuard = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.token) {
      router.push('/login'); // Redirige al login si no está autenticado
    }
  }, [auth.token, router]);

  // Mostrar un loader o una pantalla en blanco mientras verifica la autenticación
  if (!auth.token) {
    return <Spinner />;
  }

  // Si está autenticado, renderiza el contenido de la página
  return <>{children}</>;
};

export default AuthGuard;
