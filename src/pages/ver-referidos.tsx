import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function VerReferidos() {
  const referidos = [
    {
      foto: 'brad.jpg',
      nombre: 'Brad Simmons',
      referido: '094356',
      motivo: 'Servicio de Terapia Psicológica',
      paciente: 'Logan Smith',
      fecha: '01/08/2023',
      proveedor: 'IPA 300',
      idProveedor: '7333094356',
    },
    {
      foto: 'jessie.jpg',
      nombre: 'Jessie Claroson',
      referido: '0943545',
      motivo: 'Servicio Exámen de Hemoglobina',
      paciente: 'Sarah Williams',
      fecha: '13/07/2023',
      proveedor: 'IPA 100',
      idProveedor: '7730943545',
    },
    {
      foto: 'lebron.jpg',
      nombre: 'Lebron Wayde',
      referido: '094334',
      motivo: 'Servicio Exámen de Alergias',
      paciente: 'Kate Johnson',
      fecha: '23/05/2023',
      proveedor: 'IPA 201',
      idProveedor: '789094334',
    },
    {
      foto: 'natali.jpg',
      nombre: 'Natali Trump',
      referido: '094336',
      motivo: 'Servicio Análisis dental',
      paciente: 'Demi Brown',
      fecha: '12/04/2023',
      proveedor: 'IPA 300',
      idProveedor: '745094336',
    },
    {
      foto: 'carl.jpg',
      nombre: 'Carl Simmons',
      referido: '094356',
      motivo: 'Servicio de Terapia Psicológica',
      paciente: 'Taylor Miller',
      fecha: '21/03/2023',
      proveedor: 'IPA 100',
      idProveedor: '789094356',
    },
    {
      foto: 'martha.jpg',
      nombre: 'Martha Claroson',
      referido: '094366',
      motivo: 'Servicio Exámen de Hemoglobina',
      paciente: 'Janice Jones',
      fecha: '14/02/2023',
      proveedor: 'IPA 201',
      idProveedor: '772094366',
    },
    {
      foto: 'marc.jpg',
      nombre: 'Marc Wayde',
      referido: '094395',
      motivo: 'Servicio Exámen de Alergias',
      paciente: 'Janeth Harris',
      fecha: '13/01/2023',
      proveedor: 'IPA 100',
      idProveedor: '768094395',
    },
    {
      foto: 'lois.jpg',
      nombre: 'Lois Trump',
      referido: '094344',
      motivo: 'Servicio de Terapia Psicológica',
      paciente: 'Jack Thomas',
      fecha: '02/01/2023',
      proveedor: 'IPA 201',
      idProveedor: '791094344',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#04345C] text-white min-h-screen flex flex-col p-4">
        <div className="mb-6">
          <Image src="/REVAP.png" alt="Logo" width={150} height={60} />
        </div>
        <div className="mb-6 flex items-center gap-2">
          <Image src="/doctor-placeholder.jpg" alt="Doctor" width={40} height={40} className="rounded-full" />
          <div>
            <p className="text-sm font-semibold">Paul Melone H.</p>
            <p className="text-xs text-gray-300">Departamento de Pediatría</p>
          </div>
        </div>
        <nav className="space-y-3 text-sm">
          <Link href="/dashboard" className="block">📊 Dashboard</Link>
          <Link href="/crear-referido" className="block">📝 Crear Referido</Link>
          <Link href="/ver-referidos" className="block font-bold underline">📁 Ver Referidos</Link>
          <Link href="/citas" className="block">📆 Citas</Link>
          <Link href="/informes" className="block">📑 Informes</Link>
        </nav>
        <div className="mt-auto space-y-2 text-sm pt-4 border-t border-gray-600">
          <div>⚙️ Configuración</div>
          <div>🚪 Cerrar Sesión</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Validación de Referidos</h2>

        {/* Filtros */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <input type="text" placeholder="SIE" className="border rounded px-3 py-2 w-full" />
          <input type="text" placeholder="Seguro Social (últimos 4)" className="border rounded px-3 py-2 w-full" />
          <input type="text" placeholder="Contrato (Plan Médico)" className="border rounded px-3 py-2 w-full" />
          <select className="border rounded px-3 py-2 w-full">
            <option>Estudiante DEPR?</option>
            <option>Sí</option>
            <option>No</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Nombre del Médico</th>
                <th className="px-4 py-3"># Referido</th>
                <th className="px-4 py-3">Motivo</th>
                <th className="px-4 py-3">Paciente</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Proveedor</th>
                <th className="px-4 py-3">ID Proveedor</th>
              </tr>
            </thead>
            <tbody>
              {referidos.map((r, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Image src={`/${r.foto}`} alt={r.nombre} width={32} height={32} className="rounded-full" />
                    <span>{r.nombre}</span>
                  </td>
                  <td className="px-4 py-3">{r.referido}</td>
                  <td className="px-4 py-3">{r.motivo}</td>
                  <td className="px-4 py-3">{r.paciente}</td>
                  <td className="px-4 py-3">{r.fecha}</td>
                  <td className="px-4 py-3">{r.proveedor}</td>
                  <td className="px-4 py-3">{r.idProveedor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
