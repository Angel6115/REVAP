import React from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';

const calcularEdad = (fechaNacimiento: string) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();
  if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
    meses += 12;
  }
  return { edad, meses };
};

export default function PerfilPaciente() {
  const fechaNacimiento = '2016-07-31';
  const { edad, meses } = calcularEdad(fechaNacimiento);

  const paciente = {
    nombre: 'Luis Hernández',
    nacimiento: '31 julio 2016',
    edad,
    meses,
    padre: 'Angel Hernández',
    sie: '#20235252',
    estudianteDEPR: true,
    ciudad: 'Ponce',
    contacto: '(787) 123-1212',
    escuela: 'Colegio Católico San Juan',
    id: '12345678911',
    correo: 'luishernandez@gmail.com',
    foto: '/kid1.jpg',
    motivoConsulta: [
      { fecha: '01/04/2023', motivo: 'Evaluación Psicológica' },
      { fecha: '15/06/2023', motivo: 'Evaluación de Lenguaje y Habla' },
      { fecha: '01/09/2023', motivo: 'Evaluación de Disfagia' },
    ],
    expediente: `
1. NACIMIENTO
- Fecha de nacimiento: 14/03/2017
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
    doc.text(`Expediente Clínico - ${paciente.nombre}`, 20, 20);
    doc.setFontSize(10);
    const lineas = doc.splitTextToSize(paciente.expediente.trim(), 170);
    doc.text(lineas, 20, 30);
    doc.save('expediente_luis_hernandez.pdf');
  };

  return (
    <div className="flex min-h-screen bg-[#F8F6F3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#04345C] text-white p-4">
        <Image src="/REVAP.png" alt="Logo" width={160} height={60} />
        <div className="mt-6 mb-4 flex flex-col items-center">
          <Image
            src="/doctor-placeholder.jpg"
            alt="Foto médico"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <p className="text-sm mt-2 font-semibold">Paul Melone H.</p>
          <p className="text-xs text-gray-300">Departamento de Pediatría</p>
        </div>
        <nav className="text-sm space-y-2 mt-6">
          <div>🏠 Dashboard</div>
          <div>➕ Crear Referido</div>
          <div>📂 Ver Referidos</div>
          <div className="text-blue-300">👤 Perfil del Paciente</div>
          <div>📅 Citas</div>
          <div>📊 Informes</div>
          <div className="mt-6">⚙️ Configuración</div>
          <div>🚪 Cerrar Sesión</div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row bg-white p-6 rounded shadow mb-6 gap-6">
          <Image
            src={paciente.foto}
            alt="Paciente"
            width={100}
            height={100}
            className="rrounded-full object-cover w-[100px] h-[100px]"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{paciente.nombre}</h2>
            <p className="text-md text-gray-600 mb-3">
              {paciente.edad} años y {paciente.meses} meses
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>📞 <strong>Contacto:</strong> {paciente.contacto}</div>
              <div>📍 <strong>Ciudad:</strong> {paciente.ciudad}</div>
              <div>🏫 <strong>Escuela:</strong> {paciente.escuela}</div>
              <div>🆔 <strong>ID:</strong> {paciente.id}</div>
              <div>✉️ <strong>Correo:</strong> {paciente.correo}</div>
              <div>👨‍👧 <strong>Padre:</strong> {paciente.padre}</div>
              <div>🧾 <strong>SIE:</strong> {paciente.sie}</div>
              {paciente.estudianteDEPR && (
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs w-max mt-1">
                  Estudiante DEPR
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motivo de consulta */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-blue-800 font-semibold text-base mb-2">📌 Motivo de Consulta</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {paciente.motivoConsulta.map((item, i) => (
              <li key={i}>{item.fecha} - {item.motivo}</li>
            ))}
          </ul>
        </div>

        {/* Expediente clínico */}
        <div className="bg-white p-6 rounded shadow relative">
          <h3 className="text-blue-800 font-semibold text-base mb-3">📋 Expediente Clínico Completo</h3>
          <pre className="text-sm whitespace-pre-wrap leading-relaxed text-gray-700 bg-gray-50 p-4 rounded max-h-[400px] overflow-auto">
            {paciente.expediente}
          </pre>
          <div className="mt-4 flex gap-4">
            <button
              onClick={exportarPDF}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Descargar PDF
            </button>
            <a
              href="/docs/ReferidoDEPR.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              📄 Ver Referido DEPR (PDF)
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
