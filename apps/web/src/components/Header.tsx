// src/components/Header.tsx
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface HeaderProps {
  titulo: string;
  subtitulo?: string;
}

export default function Header({ titulo, subtitulo }: HeaderProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Aquí podrías limpiar datos del usuario o token en el futuro
    router.push("/login");
  };

  return (
    <header className="bg-[#F8F6F3] shadow-sm px-6 py-4 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">{titulo}</h1>
          {subtitulo && <p className="text-sm text-gray-600">{subtitulo}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Image
          src="/REVAP.png"
          alt="Logo REVAP"
          width={120}
          height={40}
          className="object-contain hidden md:block"
        />
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-red-600 transition"
        >
          🔒 Cerrar sesión
        </button>
      </div>

      {/* Menú lateral colapsable */}
      {menuAbierto && (
        <div className="absolute top-full left-0 w-full bg-white border-t mt-2 shadow-md z-10 md:hidden">
          <nav className="flex flex-col px-4 py-2 text-sm text-gray-800">
            <a href="/medico" className="py-1 hover:text-blue-600">🏥 Panel Médico</a>
            <a href="/paciente" className="py-1 hover:text-blue-600">👦 Perfil Paciente</a>
            <a href="/ver-referidos" className="py-1 hover:text-blue-600">📂 Ver Referidos</a>
            <a href="/verificar-expediente" className="py-1 hover:text-blue-600">🔍 Verificar Expediente</a>
            <button
              onClick={handleLogout}
              className="py-1 mt-2 text-left text-red-600"
            >
              🔒 Cerrar sesión
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
