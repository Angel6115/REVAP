const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const especialistas = ["Dra. Rivera", "Dra. López", "Dr. Ramos"];
const servicios = ["Terapia ocupacional", "Evaluación psicológica", "Consulta cardiológica"];
const estados = ["Pendiente", "Rechazado", "Completado"];
const tipos = ["consulta", "servicio"];
const cptCodes = ["00000", "11111", "22222"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const today = new Date();
  const offset = Math.floor(Math.random() * 30);
  const date = new Date(today.getTime() - offset * 86400000);
  return date.toISOString().split('T')[0];
}

// Generar pacientes
let pacientes = [];
for (let i = 0; i < 100; i++) {
  pacientes.push({ uuid: uuidv4(), duplicado: false });
}

// Marcar 30 como duplicados
for (let i = 0; i < 30; i++) {
  pacientes[i].duplicado = true;
  pacientes.push({ uuid: pacientes[i].uuid, duplicado: true });
}

// Generar referidos
const lines = [
  "INSERT INTO referidos (paciente_id, especialista, servicio, fecha, estado, tipo, cpt_code, duplicidad) VALUES"
];

pacientes.forEach((p, index) => {
  const line = `('${p.uuid}', '${randomItem(especialistas)}', '${randomItem(servicios)}', '${randomDate()}', '${randomItem(estados)}', '${randomItem(tipos)}', '${randomItem(cptCodes)}', ${p.duplicado})${index === pacientes.length - 1 ? ';' : ','}`;
  lines.push(line);
});

const outputPath = path.join(__dirname, '../public/data/insert_referidos_uuid.sql');
fs.writeFileSync(outputPath, lines.join('\n'));
console.log('✅ Archivo generado en:', outputPath);
