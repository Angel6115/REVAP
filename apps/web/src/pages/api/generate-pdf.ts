<<<<<<< HEAD
// pages/api/generate-pdf.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { id } = req.query
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' })
  }

  // Traigo el expediente junto al paciente relacionado
  const { data, error } = await supabase
    .from('expedientes')
    .select(`
      id,
      fecha,
      titulo,
      contenido,
      paciente:paciente_id (
        nombre,
        edad,
        duplicidad_servicio
      )
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    return res
      .status(404)
      .json({ error: 'Expediente o paciente no encontrado', detail: error?.message })
  }

  const { fecha, titulo, contenido, paciente } = data

  // Genero PDF en memoria
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const { width, height } = page.getSize()

  // Encabezados
  page.drawText(`Expediente: ${titulo}`, {
    x: 50,
    y: height - 50,
    size: 18,
    font: timesRoman,
  })
  page.drawText(`Fecha: ${new Date(fecha).toLocaleDateString()}`, {
    x: 50,
    y: height - 80,
    size: 12,
    font: timesRoman,
  })

  // Datos del paciente
  page.drawText(`Paciente: ${paciente.nombre}`, {
    x: 50,
    y: height - 110,
    size: 12,
    font: timesRoman,
  })
  page.drawText(`Edad: ${paciente.edad}`, {
    x: 50,
    y: height - 130,
    size: 12,
    font: timesRoman,
  })
  page.drawText(`Duplicidad servicio: ${paciente.duplicidad_servicio}`, {
    x: 50,
    y: height - 150,
    size: 12,
    font: timesRoman,
  })

  // Contenido libre (separte en líneas de ~80 caracteres)
  page.drawText(`Contenido:`, {
    x: 50,
    y: height - 180,
    size: 12,
    font: timesRoman,
  })
  const lines = contenido.match(/.{1,80}/g) || []
  lines.forEach((line, i) => {
    page.drawText(line, {
      x: 50,
      y: height - 200 - i * 14,
      size: 10,
      font: timesRoman,
    })
  })

  const pdfBytes = await pdfDoc.save()

  // Devuelvo el PDF como descarga
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="expediente-${id}.pdf"`
  )
  return res.status(200).send(Buffer.from(pdfBytes))
=======
import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Inicializa Supabase con la service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { medico_id, nombre_medico, especialidad, correo, telefono, oficina } = req.body

  try {
    // 1. Crear PDF con jsPDF
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('RE-VAP - Reporte Médico', 14, 20)

    doc.setFontSize(12)
    doc.text(`Nombre: ${nombre_medico}`, 14, 35)
    doc.text(`Especialidad: ${especialidad}`, 14, 42)
    doc.text(`Correo: ${correo}`, 14, 49)
    doc.text(`Teléfono: ${telefono}`, 14, 56)
    doc.text(`Oficina: ${oficina}`, 14, 63)
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 70)

    autoTable(doc, {
      startY: 80,
      head: [['Fecha', 'Actividad']],
      body: [
        ['01/08/2023', 'Consulta Pediátrica'],
        ['30/07/2023', 'Salud Mental Infantil'],
        ['24/07/2023', 'Revisión Pediátrica']
      ]
    })

    // 2. Convertir PDF a Buffer
    const pdfBase64 = doc.output('datauristring').split(',')[1]
const pdfBuffer = Buffer.from(pdfBase64, 'base64')

    // 3. Subir a Supabase Storage
    const fileName = `reporte_medico_${uuidv4()}.pdf`
    const { error: uploadError } = await supabase.storage
      .from('reportes')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/reportes/${fileName}`

    // 4. Guardar en la tabla `reportes_medico`
    await supabase.from('reportes_medico').insert({
      medico_id,
      nombre_mec: nombre_medico,
      url_pdf: publicUrl
    })

    return res.status(200).json({ success: true, url: publicUrl })
  } catch (err) {
    console.error('Error al generar PDF:', err)
    return res.status(500).json({ error: 'Error al generar el reporte' })
  }
>>>>>>> mvp-supabase
}
