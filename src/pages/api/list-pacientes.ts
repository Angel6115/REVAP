// src/pages/api/list-pacientes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase
    .from('pacientes')
    .select('id, nombre');
  if (error) {
    console.error('Error listando pacientes:', error);
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
}
