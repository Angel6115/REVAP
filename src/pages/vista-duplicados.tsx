// src/pages/vista-duplicados.tsx
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function VistaDuplicados() {
  const [data, setData] = useState<any[]>([]);
  const [servicio, setServicio] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    let query = supabase.from('vista_duplicados_filtrable').select('*');

    if (servicio) {
      query = query.ilike('descripcion', `%${servicio}%`);
    }

    if (fechaDesde) {
      query = query.gte('fecha_creado', fechaDesde);
    }

    if (fechaHasta) {
      query = query.lte('fecha_creado', fechaHasta);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error:', error);
    } else {
      setData(data || []);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Duplicidad de Servicios</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por servicio (ej. Terapia)"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
          className="border px-2 py-1"
        />
        <input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
          className="border px-2 py-1"
        />
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2">Paciente ID</th>
              <th className="border px-2">CPT</th>
              <th className="border px-2">Descripción</th>
              <th className="border px-2">Fuente</th>
              <th className="border px-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-2">{row.paciente_id}</td>
                <td className="border px-2">{row.cpt_code}</td>
                <td className="border px-2">{row.descripcion}</td>
                <td className="border px-2">{row.fuente}</td>
                <td className="border px-2">{row.fecha_creado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
