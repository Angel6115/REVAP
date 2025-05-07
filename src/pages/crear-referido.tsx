// src/pages/crear-referido.tsx

import { useState, FormEvent } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import Button from '@/components/ui/Button'   // ↩️ ¡Fíjate en la B mayúscula y la ruta exacta!

export default function CrearReferido() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      // Aquí puedes llamar a tu API /supabase para insertar el referido
      // await fetch('/api/referidos', { method: 'POST', body: JSON.stringify({ nombre, email, mensaje }) })
      setStatus('Referido creado correctamente.')
    } catch (err) {
      console.error(err)
      setStatus('Error al crear el referido.')
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-background min-h-full">
        <h1 className="text-2xl font-bold mb-4">Crear Referido</h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mensaje</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={4}
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Enviar Referido</Button>
        </form>

        {status && (
          <p className="mt-4 text-sm text-gray-700">
            {status}
          </p>
        )}
      </div>
    </DashboardLayout>
  )
}
