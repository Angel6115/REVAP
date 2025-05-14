// src/pages/medico.tsx
import React from "react";
import Image from "next/image";

export default function PerfilMedico() {
  const perfil = {
    nombre: "Paul Melone H.",
    departamento: "Departamento de Pediatría",
    telefono: "(787) 123-1212",
    correo: "paulmelone@gmail.com",
    oficina: "15A",
    especialidad: "Pediatría",
    npi: "12345678911",
    pacientes: 185,
    enEspera: 59,
    actividades: [
      "Consulta Pediátrica - 01/08/2023",
      "Programa Salud Mental Infantil - 30/07/2023",
      "Revisión Pediátrica - 24/07/2023",
      "Orientación Vocacional - 22/06/2023",
      "Programa Salud Nutricional - 16/06/2023",
    ],
    proveedores: ["IPA 300", "IPA 201", "IPA 200", "IPA 100", "DEPR", "AMSCA"],
    asignados: [
      {
        nombre: "Lois Sans",
        edad: 4,
        ciudad: "Ponce",
        fecha: "01/08/2023",
        id: "7333094356",
        motivo: "Consulta Pediátrica",
        foto: "/kid1.jpg",
      },
      {
        nombre: "Jessie Claroson",
        edad: 10,
        ciudad: "Ponce",
        fecha: "30/07/2023",
        id: "7333094356",
        motivo: "Programa Salud Mental Infantil",
        foto: "/girl2.jpg",
      },
      {
        nombre: "Lebron Wayde",
        edad: 9,
        ciudad: "Ponce",
        fecha: "24/07/2023",
        id: "7333094356",
        motivo: "Revisión Pediátrica",
        foto: "/kid2.jpg",
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-[#F8F6F3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#04345C] text-white p-4">
        <Image src="/REVAP.png" alt="Logo" width={160} height={60} />
        <div className="mt-6 mb-4">
          <Image
            src="/doctor-placeholder.jpg"
            alt="Doctor"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="text-sm mt-2 font-semibold">Paul Melone H.</p>
          <p className="text-xs text-gray-300">Departamento de Pediatría</p>
        </div>
        <nav className="text-sm space-y-2 mt-6">
          <div>🏠 Dashboard</div>
          <div className="text-blue-300">👨‍⚕️ Perfil Médico</div>
          <div>📂 Ver Referidos</div>
          <div>➕ Crear Referido</div>
          <div>📅 Citas</div>
          <div>📊 Informes</div>
          <div className="mt-6">⚙️ Configuración</div>
          <div>🚪 Cerrar Sesión</div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Image
                src="/doctor-placeholder.jpg"
                alt="Doctor"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{perfil.nombre}</h2>
                <p className="text-sm text-gray-500">{perfil.departamento}</p>
              </div>
            </div>
            <Image src="/REVAP.png" alt="RE-VAP Logo" width={120} height={40} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
          <div className="bg-white p-4 rounded shadow">📞 <strong>Teléfono:</strong> {perfil.telefono}</div>
          <div className="bg-white p-4 rounded shadow">📍 <strong>Oficina:</strong> {perfil.oficina}</div>
          <div className="bg-white p-4 rounded shadow">🏥 <strong>Especialidad:</strong> {perfil.especialidad}</div>
          <div className="bg-white p-4 rounded shadow">🆔 <strong>NPI:</strong> {perfil.npi}</div>
          <div className="bg-white p-4 rounded shadow col-span-2">✉️ <strong>Email:</strong> {perfil.correo}</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded shadow p-6 text-center">
            <p className="text-blue-700 font-bold text-lg">N° de Pacientes</p>
            <div className="text-4xl font-extrabold text-blue-900 my-2">{perfil.pacientes}</div>
            <p className="text-sm text-gray-500">{perfil.enEspera} en espera</p>
          </div>

          <div className="bg-white rounded shadow p-6">
            <p className="text-blue-700 font-bold mb-2">Actividades Recientes</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {perfil.actividades.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded shadow p-6">
            <p className="text-blue-700 font-bold mb-2">Proveedores</p>
            <div className="grid grid-cols-2 gap-2">
              {perfil.proveedores.map((prov, idx) => (
                <div
                  key={idx}
                  className="bg-blue-100 text-blue-800 rounded p-2 text-center text-sm font-semibold"
                >
                  {prov}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-6">
          <p className="text-blue-700 font-bold mb-2">Pacientes Asignados</p>
          <div className="grid md:grid-cols-3 gap-4">
            {perfil.asignados.map((paciente, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded shadow flex items-center gap-4">
                <Image
                  src={paciente.foto}
                  alt={paciente.nombre}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{paciente.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {paciente.edad} años • {paciente.ciudad}
                  </p>
                  <p className="text-xs text-gray-600">{paciente.fecha} — {paciente.motivo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
