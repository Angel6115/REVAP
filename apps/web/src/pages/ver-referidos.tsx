// src/pages/ver-referidos.tsx
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

interface Referido {
  nombre: string;
  sie: string;
  ss: string;
  contrato: string;
  depr: boolean;
  servicio: string;
  doctor: string;
  foto: string;
  fecha: string;
}

const REFERIDOS: Referido[] = [
  {
    nombre: "Lois Sans",
    sie: "20235200",
    ss: "1234",
    contrato: "456789",
    depr: true,
    servicio: "Terapia del Habla",
    doctor: "Dr. Brad Collins",
    foto: "/brad.jpg",
    fecha: "12/03/2024",
  },
  {
    nombre: "Jessie Claroson",
    sie: "20235201",
    ss: "5678",
    contrato: "123456",
    depr: false,
    servicio: "Evaluación Psicológica",
    doctor: "Dra. Martha López",
    foto: "/martha.jpg",
    fecha: "10/03/2024",
  },
  {
    nombre: "Lebron Wayde",
    sie: "20235202",
    ss: "9012",
    contrato: "789012",
    depr: true,
    servicio: "Terapia Ocupacional",
    doctor: "Dra. Natalie Ruiz",
    foto: "/natali.jpg",
    fecha: "08/03/2024",
  },
];

export default function VerReferidos() {
  const [filtro, setFiltro] = useState({
    sie: "",
    ss: "",
    contrato: "",
    depr: "",
  });

  const filtrados = REFERIDOS.filter((r) => {
    return (
      r.sie.includes(filtro.sie) &&
      r.ss.includes(filtro.ss) &&
      r.contrato.includes(filtro.contrato) &&
      (filtro.depr === ""
        ? true
        : filtro.depr === "si"
        ? r.depr
        : !r.depr)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#F8F6F3]">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">
          📂 Ver Referidos del Paciente
        </h1>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
          <input
            type="text"
            placeholder="Buscar por SIE"
            className="border border-gray-300 p-2 rounded"
            value={filtro.sie}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, sie: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Últimos 4 SS"
            className="border border-gray-300 p-2 rounded"
            value={filtro.ss}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, ss: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Contrato"
            className="border border-gray-300 p-2 rounded"
            value={filtro.contrato}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, contrato: e.target.value }))
            }
          />
          <select
            className="border border-gray-300 p-2 rounded"
            value={filtro.depr}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, depr: e.target.value }))
            }
          >
            <option value="">¿DEPR?</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded shadow p-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left p-2">Paciente</th>
                <th className="text-left p-2">SIE</th>
                <th className="text-left p-2">SS</th>
                <th className="text-left p-2">Contrato</th>
                <th className="text-left p-2">DEPR</th>
                <th className="text-left p-2">Servicio</th>
                <th className="text-left p-2">Profesional</th>
                <th className="text-left p-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((r, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2 flex items-center gap-2">
                    <Image
                      src={r.foto}
                      alt={r.nombre}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {r.nombre}
                  </td>
                  <td className="p-2">{r.sie}</td>
                  <td className="p-2">{r.ss}</td>
                  <td className="p-2">{r.contrato}</td>
                  <td className="p-2">{r.depr ? "Sí" : "No"}</td>
                  <td className="p-2">{r.servicio}</td>
                  <td className="p-2">{r.doctor}</td>
                  <td className="p-2">{r.fecha}</td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No se encontraron referidos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
