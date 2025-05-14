// src/pages/ayuda.tsx
import React from 'react';
import Image from 'next/image';

export default function Ayuda() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#04345C] text-white p-4">
        <Image src="/REVAP.png" alt="Logo RE-VAP" width={150} height={60} className="mb-6" />
        <div className="flex items-center space-x-2 mb-4">
          <Image src="/doctor-placeholder.jpg" alt="Paul Melone" width={40} height={40} className="rounded-full" />
          <div>
            <p className="text-sm font-semibold">Paul Melone H.</p>
            <p className="text-xs text-gray-300">Departamento de Pediatría</p>
          </div>
        </div>
        <nav className="text-sm space-y-2 mt-6">
          <div>✅ Validación de Referido</div>
          <div>➕ Crear Referido</div>
          <div>📝 Registrar Visita</div>
          <div>📊 Informes</div>
          <div className="mt-4 text-white font-bold">❓ Ayuda</div>
          <div>🔒 Cambiar Contraseña</div>
          <div>🚪 Log out</div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-[#f9f9f9]">
        <h1 className="text-xl font-semibold mb-4">Todas las preguntas <span className="text-gray-500">(6,234)</span></h1>

        <div className="flex gap-6">
          {/* Centro */}
          <div className="w-2/3">
            <input
              type="text"
              placeholder="Por favor ingrese su pregunta"
              className="w-full p-2 mb-6 border border-gray-300 rounded"
            />

            <div className="space-y-6">
              {[
                {
                  pregunta: '¿Por qué no me puedo registrar?',
                  detalle: 'Me he registrado. Sin embargo, ahora aparece un mensaje de error "Se requiere registro" cuando intento iniciar sesión. ¿Qué debo hacer?',
                  usuario: 'James Hunt',
                  hace: '24 minutes ago',
                  respuestas: 16
                },
                {
                  pregunta: '¿Por qué no puedo iniciar sesión?',
                  detalle: 'Cuando intento acceder, aparece un error que dice "No se puede llegar desde aquí". ¿Qué sucede?',
                  usuario: 'Sandra Piquet',
                  hace: '1 day ago',
                  respuestas: 2
                },
                {
                  pregunta: '¿Cómo debo validar un referido?',
                  detalle: 'Tengo una duda sobre cómo validar un referido, si no tengo alguno de los datos que se solicita ¿puedo validar un referido?',
                  usuario: 'Niko Roseberg',
                  hace: '1 day ago',
                  respuestas: 4
                },
                {
                  pregunta: '¿Cómo puedo registrar una visita?',
                  detalle: 'Tengo una duda sobre cómo registrar una visita, si no tengo alguno de los datos que se solicita ¿puedo registrar una visita?',
                  usuario: 'James Hunt',
                  hace: '24 minutes ago',
                  respuestas: 23
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <h2 className="font-semibold">{item.pregunta}</h2>
                  <p className="text-sm text-gray-700">{item.detalle}</p>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{item.usuario} • {item.hace}</span>
                    <span>{item.respuestas} respuestas</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-6 space-x-2 text-sm">
              <button className="px-3 py-1 bg-gray-200 rounded">1</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded">2</button>
              <button className="px-3 py-1 bg-gray-200 rounded">3</button>
              <button className="px-3 py-1 bg-gray-200 rounded">4</button>
              <button className="px-3 py-1 bg-gray-200 rounded">5</button>
              <span className="px-2">…</span>
              <button className="px-3 py-1 bg-gray-200 rounded">17</button>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="w-1/3 space-y-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">📌 Popular Questions</h3>
              <ul className="text-sm space-y-1 text-blue-800">
                <li>¿Por qué no me puedo registrar?</li>
                <li>¿Por qué no puedo iniciar sesión?</li>
                <li>¿Cómo debo validar un referido?</li>
                <li>¿Cómo puedo registrar una visita?</li>
                <li>Necesito informes</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">📘 Notable Tutorials</h3>
              <ul className="text-sm space-y-1 text-blue-800">
                <li>¿Cómo obtengo informe de recobro histórico?</li>
                <li>¿Cómo obtengo informe de recobro referido?</li>
                <li>¿Se puede crear un referido sin saber un dato?</li>
                <li>¿Se puede iniciar sesión?</li>
                <li>¿Se puede registrar una visita sin saber un dato?</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
