// src/pages/crear-referido.tsx

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function CrearReferido() {
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    seguro: "",
    especialidad: "",
    notas: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Referido creado correctamente");
    setForm({
      nombre: "",
      fecha: "",
      seguro: "",
      especialidad: "",
      notas: "",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Crear Referido</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre del Paciente"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            name="seguro"
            placeholder="Seguro Médico"
            value={form.seguro}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            name="especialidad"
            placeholder="Especialidad requerida"
            value={form.especialidad}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <textarea
            name="notas"
            placeholder="Notas adicionales"
            value={form.notas}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Crear Referido
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
