// src/pages/paciente.tsx
import React from "react";
import Image from "next/image";
import jsPDF from "jspdf";

export default function PerfilPaciente() {
  const paciente = {
    nombre: "Luis Hernández",
    nacimiento: "31 julio 2016",
    edad: "8 años, 9 meses",
    padre: "Angel Hernández",
    sie: "#20235252",
    ciudad: "Ponce",
    contacto: "(787) 123-1212",
    escuela: "Colegio Católico San Juan",
    id: "12345678911",
    correo: "luishernandez@gmail.com",
    foto: "/kid1.jpg",
    motivoConsulta: [
      { fecha: "01/04/2023", motivo: "Evaluación Psicológica" },
      { fecha: "15/06/2023", motivo: "Evaluación de Lenguaje y Habla" },
      { fecha: "01/09/2023", motivo: "Evaluación de Disfagia" },
    ],
    expediente: `
1. NACIMIENTO
- Fecha de nacimiento: 31/07/2016
- Embarazo a término, parto natural sin complicaciones
- Peso al nacer: 6 lbs 9 oz

2. DESARROLLO TEMPRANO
- Caminó a los 12 meses
- Dijo sus primeras palabras a los 13 meses
- Control de esfínteres a los 2 años y medio

3. HISTORIAL MÉDICO GENERAL
- Asma leve diagnosticada a los 5 años
- Alergia alimentaria a nueces
- No ha requerido hospitalizaciones

4. EVALUACIONES PSICOLÓGICAS
- Evaluación inicial a los 6 años indicó dificultades en atención sostenida
- Se sugiere evaluación para TDAH, actualmente en observación

5. EVALUACIÓN DE HABLA Y LENGUAJE
- Presenta dificultad en articulación de fonemas /r/ y /s/
- Entiende instrucciones simples y complejas
- Se recomienda terapia semanal

6. EVALUACIÓN DE DISFAGIA
- Muestra leves dificultades al tragar sólidos secos
- Se sugieren ejercicios orales y seguimiento con terapia

7. TERAPIAS
- Asiste a terapia de habla desde agosto 2023
- Inició terapia ocupacional en septiembre 2023 por dificultades de motricidad fina

8. ESCUELA
- Asiste a 2do grado en Colegio Católico San Juan
- Reporta buena conducta, dificultad con atención en clase

9. CONTACTOS
- Madre: Ana López - (787) 555-9898
- Tutor legal: Jorge Hernández - jorgeh@gmail.com

10. OBSERVACIONES
- Se recomienda seguimiento cada 3 meses
- Padres comprometidos con las terapias
    `,
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Expediente Clínico - Luis Hernández", 20, 20);
    doc.setFontSize(10);
    const lineas = doc.splitTextToSize(paciente.expediente.trim(), 170);
    doc.text(lineas, 20, 30);
    doc.save("expediente_luis_hernandez.pdf");
  };

  return (
    <div className="flex min-h-screen bg-[#F8F6F3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#04345C] text-white p-4">
        <Image src="/REVAP.png" alt="Logo" width={160} height={60} />
        <div className="mt-6 mb-4 text-center">
          <Image
            src="/doctor-placeholder.jpg"
            alt="Doctor"
            width={50}
            height={50}
            className="rounded-full mx-auto"
          />
          <p className="text-sm mt-2 font-semibold">Paul Melone H.</p>
          <p className="text-xs text-gray-300">Departamento de Pediatría</p>
        </div>
        <nav className="text-sm space-y-2 mt-6">
          <div>🏠 Dashboard</div>
          <div>👨‍⚕️ Perfil Médico</div>
          <div className="text-blue-300">📁 Paciente</div>
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
        {/* Header Paciente */}
        <div className="bg-white shadow rounded-lg p-6 mb-6 flex items-center gap-6">
          <Image
            src={paciente.foto}
            alt="Foto paciente"
            width={90}
            height={90}
            className="rounded-full object-cover"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div><strong>Nombre:</strong> {paciente.nombre}</div>
            <div><strong>Nacimiento:</strong> {paciente.nacimiento}</div>
            <div><strong>Edad:</strong> {paciente.edad}</div>
            <div><strong>Padre:</strong> {paciente.padre}</div>
            <div><strong>SIE:</strong> {paciente.sie}</div>
            <div><strong>Ciudad:</strong> {paciente.ciudad}</div>
            <div><strong>Escuela:</strong> {paciente.escuela}</div>
            <div><strong>Correo:</strong> {paciente.correo}</div>
            <div><strong>ID:</strong> {paciente.id}</div>
            <div className="text-green-700 col-span-2 md:col-span-3">
              ✅ Estudiante del DEPR
            </div>
          </div>
        </div>

        {/* Motivo de consulta */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-blue-800 font-semibold text-sm mb-2">
            📌 Motivo de Consulta
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {paciente.motivoConsulta.map((item, i) => (
              <li key={i}>
                {item.fecha} - {item.motivo}
              </li>
            ))}
          </ul>
        </div>

        {/* Expediente clínico */}
        <div className="bg-white p-6 rounded shadow relative">
          <h3 className="text-blue-800 font-semibold text-sm mb-2">
            📋 Expediente Clínico Completo
          </h3>
          <pre className="text-xs whitespace-pre-wrap leading-relaxed text-gray-700 bg-gray-50 p-4 rounded max-h-[400px] overflow-auto">
            {paciente.expediente}
          </pre>
          <div className="flex justify-between mt-4">
            <button
              onClick={exportarPDF}
              className="px-4 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
            >
              📄 Descargar PDF
            </button>
            <a
              href="/docs/ReferidoDEPR.pdf"
              target="_blank"
              className="text-blue-700 underline text-sm"
            >
              Ver Referido DEPR
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
