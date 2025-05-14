import { Button } from './ui/Button'
import { useState } from 'react'

export default function BotonesAccion({ onReporteGenerado }: { onReporteGenerado: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleGenerarReporte = async () => {
    setLoading(true)

    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medico_id: 'demo-uuid-1234',
        nombre_medico: 'Paul Melone H.',
        especialidad: 'Pediatría',
        correo: 'paulmelone@gmail.com',
        telefono: '+56 0000 00000',
        oficina: '15A'
      })
    })

    const data = await response.json()
    setLoading(false)

    if (data?.url) {
      window.open(data.url, '_blank')
      onReporteGenerado() // ✅ Actualiza historial
    } else {
      alert('Error al generar el reporte.')
    }
  }

  return (
    <div className="flex gap-3 justify-end">
      <Button variant="outline" onClick={handleGenerarReporte} disabled={loading}>
        {loading ? 'Generando...' : 'Exportar PDF'}
      </Button>
    </div>
  )
}
