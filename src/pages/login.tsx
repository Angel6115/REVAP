// apps/web/src/pages/login.tsx
import React from 'react';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Lado izquierdo con logo */}
      <div className="w-1/2 bg-gradient-to-br from-[#04345C] to-[#117CA6] flex justify-center items-center">
        <Image src="/REVAP.png" alt="Logo REVAP" width={300} height={100} />
      </div>

      {/* Lado derecho con formulario */}
      <div className="w-1/2 bg-white flex justify-center items-center">
        <div className="bg-white shadow-xl p-10 rounded-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Bienvenido</h2>
          <form>
            <input type="email" placeholder="Correo" className="input-style" />
            <input type="password" placeholder="Contraseña" className="input-style" />
            <div className="flex items-center my-3">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm">Recordar</label>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
              Ingresar
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
