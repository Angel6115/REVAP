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
}
