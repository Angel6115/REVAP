// src/pages/vista-duplicados.tsx
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Referral = {
  id: number
  estudiante: string
  servicio: string
  agencia: string
  fecha: string
  validado: boolean
}

type DuplicadoGrupo = {
  estudiante: string
  servicio: string
  referidos: Referral[]
}

type Props = {
  duplicadosInicial: DuplicadoGrupo[]
  serviciosLista: string[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // 1) Traer todos los referidos
  const { data: referidos, error } = await supabase
    .from<Referral>('referidos')
    .select('*')
  if (error) throw error

  // 2) Agrupar por estudiante+servicio
  const map: Record<string, DuplicadoGrupo> = {}
  referidos!.forEach(ref => {
    const key = `${ref.estudiante}::${ref.servicio}`
    if (!map[key]) {
      map[key] = { estudiante: ref.estudiante, servicio: ref.servicio, referidos: [] }
    }
    map[key].referidos.push(ref)
  })
  // 3) Solo duplicados (más de 1)
  const duplicadosInicial = Object.values(map).filter(g => g.referidos.length > 1)

  // 4) Lista de todos los servicios (para filtro)
  const serviciosLista = Array.from(new Set(referidos!.map(r => r.servicio))).sort()

  return { props: { duplicadosInicial, serviciosLista } }
}

const VistaDuplicados: NextPage<Props> = ({ duplicadosInicial, serviciosLista }) => {
  const [duplicados, setDuplicados] = useState<DuplicadoGrupo[]>(duplicadosInicial)
  const [servicioFiltro, setServicioFiltro] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const aplicarFiltros = async () => {
    let builder = supabase
      .from<Referral>('referidos')
      .select('*')
    if (servicioFiltro) builder = builder.eq('servicio', servicioFiltro)
    if (fechaInicio)    builder = builder.gte('fecha', fechaInicio)
    if (fechaFin)       builder = builder.lte('fecha', fechaFin)

    const { data, error } = await builder
    if (error) {
      console.error('Error filtrando:', error.message)
      return
    }
    // reagrupar
    const map: Record<string, DuplicadoGrupo> = {}
    data!.forEach(ref => {
      const key = `${ref.estudiante}::${ref.servicio}`
      if (!map[key]) {
        map[key] = { estudiante: ref.estudiante, servicio: ref.servicio, referidos: [] }
      }
      map[key].referidos.push(ref)
    })
    setDuplicados(Object.values(map).filter(g => g.referidos.length > 1))
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Referidos Duplicados</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block mb-1">Servicio</label>
          <select
            className="border px-3 py-1 rounded"
            value={servicioFiltro}
            onChange={e => setServicioFiltro(e.target.value)}
          >
            <option value="">— Todos —</option>
            {serviciosLista.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Desde</label>
          <input
            type="date"
            className="border px-3 py-1 rounded"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Hasta</label>
          <input
            type="date"
            className="border px-3 py-1 rounded"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
          />
        </div>
        <button
          className="self-end bg-blue-600 text-white px-4 py-1 rounded"
          onClick={aplicarFiltros}
        >
          Aplicar filtros
        </button>
      </div>

      {/* Resultados */}
      {duplicados.length === 0 ? (
        <p>No se encontraron duplicados.</p>
      ) : (
        duplicados.map((grupo, idx) => (
          <div key={idx} className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold">
              {grupo.estudiante} – {grupo.servicio} ({grupo.referidos.length})
            </h3>
            <ul className="list-disc pl-5">
              {grupo.referidos.map(r => (
                <li key={r.id}>
                  {r.agencia} • ID {r.id} • {r.fecha} • {r.validado ? '✅ Validado' : 'Pendiente'}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

export default VistaDuplicados
