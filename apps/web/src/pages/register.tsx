// src/pages/register.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !apellido || !correo || !password || !confirmPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Aquí puedes implementar lógica real de registro
    alert("Registro exitoso.");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-900 to-teal-600">
      <div className="flex items-center justify-center w-full">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Regístrate</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded"
            />
          </div>

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

          <input
            type="password"
            placeholder="Confirma la contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
