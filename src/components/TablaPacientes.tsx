import React from 'react'

const pacientes = [
  {
    nombre: 'Lois Sans',
    edad: 4,
    ciudad: 'Ponce',
    servicio: 'Consulta Pediátrica',
    fecha: '01/08/2023',
    proveedor: 'IPA 300',
  },
  {
    nombre: 'Jessie Clarcson',
    edad: 10,
    ciudad: 'Ponce',
    servicio: 'Salud Mental Infantil',
    fecha: '30/07/2023',
    proveedor: 'IPA 201',
  },
  {
    nombre: 'Lebron Wayde',
    edad: 9,
    ciudad: 'Ponce',
    servicio: 'Revisión Pediátrica',
    fecha: '24/07/2023',
    proveedor: 'IPA 100',
  },
]

export default function TablaPacientes() {
  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Pacientes Asignados</h3>
      <table className="w-full text-left border-collapse">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Edad</th>
            <th className="px-4 py-2">Ciudad</th>
            <th className="px-4 py-2">Servicio</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">{p.nombre}</td>
              <td className="px-4 py-2">{p.edad}</td>
              <td className="px-4 py-2">{p.ciudad}</td>
              <td className="px-4 py-2">{p.servicio}</td>
              <td className="px-4 py-2">{p.fecha}</td>
              <td className="px-4 py-2">{p.proveedor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
