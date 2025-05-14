import React from 'react'

export default function ResumenPaneles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Panel 1: Pacientes */}
      <div className="bg-white rounded-lg shadow p-4 text-center">
        <h3 className="text-lg font-semibold">N° de Pacientes</h3>
        <p className="text-4xl text-blue-600 font-bold my-2">185</p>
        <p className="text-sm text-gray-500">59 en espera</p>
      </div>

      {/* Panel 2: Actividades Recientes */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Actividades Recientes</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>01/08/2023:</strong> Consulta Pediátrica</li>
          <li><strong>30/07/2023:</strong> Salud Mental Infantil</li>
          <li><strong>24/07/2023:</strong> Revisión Pediátrica</li>
          <li><strong>22/06/2023:</strong> Orientación Vocacional</li>
          <li><strong>16/06/2023:</strong> Salud Nutricional</li>
        </ul>
      </div>

      {/* Panel 3: Proveedores */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Proveedores</h3>
        <div className="grid grid-cols-2 gap-2">
          {['IPA 300', 'IPA 201', 'IPA 200', 'IPA 100'].map((ipa) => (
            <div key={ipa} className="bg-blue-100 text-blue-800 p-2 rounded text-center font-medium">
              {ipa}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
