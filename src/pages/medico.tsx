import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const perfil = {
  nombre: 'Paul Melone H.',
  departamento: 'Departamento de Pediatría',
  telefono: '(787) 123-1212',
  correo: 'paulmelone@gmail.com',
  oficina: '15A',
  especialidad: 'Pediatría',
  npi: '12345678911',
  pacientes: 185,
  enEspera: 59,
  actividades: [
    'Consulta Pediátrica | 01/08/2023',
    'Salud Mental Infantil | 30/07/2023',
    'Revisión Pediátrica | 24/07/2023',
    'Orientación Vocacional | 22/06/2023',
    'Salud Nutricional | 16/06/2023',
  ],
  proveedores: ['IPA 300', 'IPA 201', 'IPA 200', 'DEPR', 'AMSCA'],
  asignados: [
    {
      nombre: 'Lois Sans',
      edad: 4,
      ciudad: 'Ponce',
      fecha: '01/08/2023',
      id: '7333094356',
      motivo: 'Consulta Pediátrica',
      foto: '/kid1.jpg',
    },
    {
      nombre: 'Jessie Claroson',
      edad: 10,
      ciudad: 'Ponce',
      fecha: '30/07/2023',
      id: '7333094356',
      motivo: 'Salud Mental Infantil',
      foto: '/girl2.jpg',
    },
    {
      nombre: 'Lebron Wayde',
      edad: 9,
      ciudad: 'Ponce',
      fecha: '24/07/2023',
      id: '7333094356',
      motivo: 'Revisión Pediátrica',
      foto: '/kid2.jpg',
    },
  ],
};

export default function MedicoPage() {
  return (
    <div className="min-h-screen flex bg-[#F8F6F3] text-gray-800">
      {/* Sidebar */}
      <aside className="w-60 bg-[#04345C] text-white flex flex-col p-4">
        <div className="mb-8 text-center">
          <Image src="/REVAP.png" alt="RE-VAP" width={120} height={40} />
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          <Link href="/medico" className="hover:text-blue-300">👨‍⚕️ Perfil Médico</Link>
          <Link href="/ver-referidos" className="hover:text-blue-300">📋 Ver Referidos</Link>
          <Link href="/crear-referido" className="hover:text-blue-300">➕ Crear Referido</Link>
          <Link href="/ver-citas" className="hover:text-blue-300">📅 Ver Citas</Link>
          <Link href="/expedientes" className="hover:text-blue-300">🗂️ Expedientes</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white shadow rounded p-4 mb-6">
          <div className="flex items-center gap-4">
            <Image src="/doctor-placeholder.jpg" alt="Doctor" width={70} height={70} className="rounded-full" />
            <div>
              <h1 className="text-lg font-bold">{perfil.nombre}</h1>
              <p className="text-sm text-gray-600">{perfil.departamento}</p>
              <div className="text-xs mt-1">
                <p><strong>Tel:</strong> {perfil.telefono}</p>
                <p><strong>Oficina:</strong> {perfil.oficina} | <strong>Especialidad:</strong> {perfil.especialidad}</p>
                <p><strong>NPI:</strong> {perfil.npi}</p>
              </div>
            </div>
          </div>
          <Image src="/REVAP.png" alt="RE-VAP" width={100} height={40} />
        </div>

        {/* Dashboard de conteo */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-center text-sm">
          {[
            ['👨‍⚕️ En Sala', 35],
            ['🕒 En Espera', 59],
            ['🔁 Seguimientos', 28],
            ['🏫 DEPR', 32],
            ['🏥 AMSCA', 31],
          ].map(([label, count], i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <p className="text-blue-700 font-semibold">{label}</p>
              <div className="text-3xl font-bold text-blue-900">{count}</div>
            </div>
          ))}
        </div>

        {/* Actividades y Proveedores */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded shadow p-4">
            <p className="text-blue-700 font-bold mb-2">🗓️ Actividades Recientes</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {perfil.actividades.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded shadow p-4">
            <p className="text-blue-700 font-bold mb-2">🏥 Proveedores</p>
            <div className="flex flex-wrap gap-2">
              {perfil.proveedores.map((prov, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">
                  {prov}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla de Pacientes */}
        <div className="bg-white rounded shadow p-4">
          <p className="text-blue-700 font-bold mb-4">👶 Pacientes Asignados</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-2">Foto</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Edad</th>
                  <th className="p-2">Ciudad</th>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">ID</th>
                  <th className="p-2">Motivo</th>
                </tr>
              </thead>
              <tbody>
                {perfil.asignados.map((p, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">
                      <Image src={p.foto} alt={p.nombre} width={40} height={40} className="rounded-full" />
                    </td>
                    <td className="p-2">{p.nombre}</td>
                    <td className="p-2">{p.edad} años</td>
                    <td className="p-2">{p.ciudad}</td>
                    <td className="p-2">{p.fecha}</td>
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.motivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
