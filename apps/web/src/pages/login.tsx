// src/pages/login.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Simulación de login (puedes integrar Supabase más adelante)
    alert("Inicio de sesión exitoso");
    router.push("/medico");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-900 to-teal-600">
      <div className="flex items-center justify-center w-full">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Bienvenido</h2>

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="mb-4 w-full px-3 py-2 border border-gray-300 rounded"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full px-3 py-2 border border-gray-300 rounded"
          />

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <label>Recordar</label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
