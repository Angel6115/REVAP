// apps/web/src/pages/api/expedientes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { data, error } = await supabase
    .from('expedientes')
    .select(
      // ❌ Ya no pidas duplicidad_servicio aquí arriba
      // `id, fecha, duplicidad_servicio, paciente:paciente_id ( nombre, edad )`

      // ✅ Pide sólo id y fecha, y anida todo lo de paciente, incluyendo duplicidad_servicio
      `id,
       fecha,
       paciente:paciente_id (
         nombre,
         edad,
         duplicidad_servicio
       )`
    )
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error fetching expedientes:', error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
