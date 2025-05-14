import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
const filePath = path.join(__dirname, '../apps/web/public/data/revaptest.xlsx');
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);
const sqlStatements = data.map((row) => {
    const duplicidad = String(row.duplicidad).toUpperCase() === 'TRUE';
    return `INSERT INTO referidos (
    id, paciente_id, especialista, servicio, cpt_code, tipo, fecha, estado, duplicidad
  ) VALUES (
    '${row.id}', '${row.paciente_id}', '${row.especialista}', '${row.servicio}',
    '${row.cpt_code}', '${row.tipo}', '${row.fecha}', '${row.estado}', ${duplicidad}
  );`;
});
const outputPath = path.join(__dirname, 'insert_referidos.sql');
fs.writeFileSync(outputPath, sqlStatements.join('\n'), 'utf8');
console.log(`✅ Archivo SQL generado correctamente: ${outputPath}`);
