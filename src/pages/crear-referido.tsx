// src/pages/crear-referido.tsx
import React from 'react';

export default function CrearReferido() {
  return (
    <div className="flex min-h-screen bg-white text-[#04345C]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#04345C] text-white p-4">
        <img src="/REVAP.png" alt="Logo" className="w-32 mb-6 mx-auto" />
        <div className="flex flex-col items-center mb-6">
          <img src="/doctor-placeholder.jpg" alt="Paul Melone" className="w-16 h-16 rounded-full object-cover" />
          <p className="mt-2 font-semibold text-sm">Paul Melone H.</p>
          <p className="text-xs text-gray-300">Departamento de Pediatría</p>
        </div>
        <nav className="text-sm space-y-2">
          <div className="text-white">✔️ Validación de Referido</div>
          <div className="text-blue-300">➕ Crear Referido</div>
          <div>📝 Registrar Visita</div>
          <div>📊 Informes</div>
          <div className="mt-4">❓ Ayuda</div>
          <div>🔒 Cambiar Contraseña</div>
          <div>🚪 Log out</div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-12 py-10 bg-[#F8F6F3]">
        <h1 className="text-2xl font-bold mb-8 text-[#04345C]">Crear Referido</h1>
        <form className="grid grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-md text-sm">
          {/* Columna 1 */}
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Seguro Social:</label>
              <input type="text" placeholder="***-**-1111" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Por favor ingrese el número del seguro social</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Nombre del Paciente:</label>
              <input type="text" placeholder="Nombre y Apellido" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Por favor ingrese el nombre completo del paciente</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Proveedor:</label>
              <input type="text" placeholder="Ej. IPA 100" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Por favor ingrese el nombre del proveedor</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Médico de Atención Primaria (PCP):</label>
              <input type="text" placeholder="Nombre y Apellido" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Ingrese nombre y apellido del médico</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">NPI del Especialista:</label>
              <input type="text" placeholder="0000000000" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Ingrese número de identificación del especialista</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Nota o Comentario:</label>
              <textarea rows={3} placeholder="Describa el motivo del referido..." className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Por favor escriba un comentario</p>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Fecha de Referido:</label>
              <input type="date" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Ingrese la fecha del referido</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">ID del Paciente (MP):</label>
              <input type="text" placeholder="0000000000" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Ingrese el número de identificación del paciente</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">ID del Proveedor (NPI PCP):</label>
              <input type="text" placeholder="0000000000" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Ingrese el NPI del proveedor</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Código de Diagnóstico:</label>
              <input type="text" placeholder="Ej. 90834" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Ingrese código de diagnóstico</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Especialista:</label>
              <input type="text" placeholder="Nombre y Apellido" className="w-full px-4 py-2 rounded border border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Ingrese nombre y apellido del especialista</p>
            </div>
          </div>
        </form>

        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100">Cancelar</button>
          <button className="px-6 py-2 rounded bg-blue-700 text-white hover:bg-blue-800">Crear</button>
        </div>
      </main>
    </div>
  );
}
