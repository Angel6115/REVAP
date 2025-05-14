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
}
