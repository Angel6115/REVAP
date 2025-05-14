// apps/web/src/pages/expedientes.tsx
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { format } from 'date-fns';

interface Servicio {
  cpt: string;
  desc: string;
}
interface Expediente {
  id: string;
  fecha: string;
  tipo: string | null;
  sie?: string | null;
  educacion_especial: boolean;
  duplicidad: number;
  servicios?: Servicio[];
  paciente: {
    nombre: string;
    edad: number;
  };
}

export default function ExpedientesPage() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/api/expedientes')
      .then(res => res.json())
      .then((data: Expediente[]) => setExpedientes(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-lg">Cargando expedientes…</p>;
  if (error) return <p className="p-6 text-lg text-red-600">Error: {error}</p>;

  const start = (page - 1) * perPage;
  const paged = expedientes.slice(start, start + perPage);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Expedientes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paged.map(exp => (
            <div key={exp.id} className="bg-white shadow rounded-lg p-4 text-base">
              <p><span className="font-semibold">ID:</span> {exp.id.slice(0,8)}</p>
              <p><span className="font-semibold">Nombre:</span> {exp.paciente.nombre}</p>
              <p><span className="font-semibold">Edad:</span> {exp.paciente.edad}</p>
              <p><span className="font-semibold">Tipo:</span> {exp.tipo || '—'}</p>
              {exp.tipo === 'DEPR' && exp.sie && (
                <p><span className="font-semibold">Num. SIE:</span> {exp.sie}</p>
              )}
              <p><span className="font-semibold">Educ. Esp.:</span> {exp.educacion_especial ? 'Sí' : 'No'}</p>
              <p><span className="font-semibold">Fecha:</span> {format(new Date(exp.fecha), 'd/MM/yyyy')}</p>
              {exp.duplicidad > 1 && (
                <div className="inline-block mt-1 mb-2 px-2 py-1 bg-red-100 text-red-800 text-sm rounded">Duplicidad: {exp.duplicidad}</div>
              )}
              {exp.servicios && exp.servicios.length > 0 && (
                <>
                  <hr className="my-2"/>
                  <strong className="text-sm">Servicios:</strong>
                  <ul className="list-disc list-inside text-sm mb-2">
                    {exp.servicios.map(s => (
                      <li key={s.cpt} title={s.desc}>{s.cpt} ({s.desc})</li>
                    ))}
                  </ul>
                </>
              )}
              <button
                className="mt-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                onClick={() => window.open(`/api/generate-pdf?id=${exp.id}`)}
              >PDF</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 space-x-3">
          <button
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(p => p - 1)}
          >Anterior</button>
          <span className="px-3 py-1">Página {page}</span>
          <button
            disabled={start + perPage >= expedientes.length}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(p => p + 1)}
          >Siguiente</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
