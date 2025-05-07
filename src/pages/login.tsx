// src/pages/login.tsx
import React from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    // Modo desarrollo: guardamos un token dummy
    localStorage.setItem('token', 'dev-token');
    // Redirigimos al dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 shadow-md rounded-lg w-80">
        <h1 className="text-lg font-semibold mb-4 text-center">Ingreso a REVAP</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Entrar (modo desarrollo)
        </button>
      </div>
    </div>
  );
};

export default Login;
