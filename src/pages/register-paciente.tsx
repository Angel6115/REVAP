import React, { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPaciente() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (form.password !== form.password2) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setLoading(true)
    // TODO: llamar a supabase.auth.signUp y persistir en tabla "pacientes"
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex flex-col bg-blue-50 w-1/3 p-8">
        <div className="flex flex-col items-center mb-12">
          <Image src="/REVAP.png" alt="RE-VAP" width={200} height={200} />
          <h2 className="mt-4 text-2xl font-bold text-blue-700">
            Bienvenido a RE-VAP
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Revalida y maximiza tu práctica profesional
          </p>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <Link href="/login" className="hover:text-blue-600">Iniciar sesión</Link>
        </nav>
      </aside>

      <main className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Registro de Pacientes
          </h1>

          {error && (
            <div className="mb-4 text-red-600 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  required
                  value={form.apellido}
                  onChange={e => setForm({ ...form, apellido: e.target.value })}
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                <input
                  type="password"
                  required
                  value={form.password2}
                  onChange={e => setForm({ ...form, password2: e.target.value })}
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Registrando…' : 'Registrar'}
            </button>
          </form>
        </div>
      </main>
    </div>
)
