import React, { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterProfesionales() {
  const [form, setForm] = useState({
    nombre: '',
    inicial: '',
    paterno: '',
    materno: '',
    email: '',
    password: '',
    password2: '',
    especialidad: 'medico',
    licencia: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    zip: '',
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
    // TODO: supabase.auth.signUp + insertar en tabla "profesionales"
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex flex-col bg-blue-50 w-1/3 p-8">
        <div className="flex flex-col items-center mb-12">
          <Image src="/REVAP.png" alt="RE-VAP" width={200} height={200} />
          <h2 className="mt-4 text-2xl font-bold text-blue-700">Bienvenido a RE-VAP</h2>
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
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Registro de Profesionales
          </h1>
          {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                { key: 'nombre', label: 'Nombre', req: true },
                { key: 'inicial', label: 'Inicial', req: false },
                { key: 'paterno', label: 'Apellido Paterno', req: true },
                { key: 'materno', label: 'Apellido Materno', req: true },
              ].map(({ key, label, req }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type="text"
                    required={req}
                    value={(form as any)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={key === 'inicial' ? 'Opcional' : undefined}
                    className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
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
              {[
                { key: 'password', label: 'Contraseña' },
                { key: 'password2', label: 'Confirmar Contraseña' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type="password"
                    required
                    value={(form as any)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Especialidad</label>
              <select
                required
                value={form.especialidad}
                onChange={e => setForm({ ...form, especialidad: e.target.value })}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="medico">Médico</option>
                <option value="especialista">Especialista</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Licencia</label>
                <input
                  type="text"
                  required
                  value={form.licencia}
                  onChange={e => setForm({ ...form, licencia: e.target.value })}
                    className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })}
                  className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección Postal</label>
              <input
                type="text"
                required
                placeholder="Calle, número, edificio"
                value={form.direccion}
                onChange={e => setForm({ ...form, direccion: e.target.value })}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                <input
                  type="text"
                    required
                    value={form.ciudad}
                    onChange={e => setForm({ ...form, ciudad: e.target.value })}
                    className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                <input
                  type="text"
                  required
                    value={form.zip}
                    onChange={e => setForm({ ...form, zip: e.target.value })}
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
