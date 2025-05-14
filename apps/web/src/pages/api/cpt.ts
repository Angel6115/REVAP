// apps/web/src/pages/api/cpt.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = (req.query.q as string) || '';
  try {
    const { data, error } = await supabase
      .from('cpt_codes')
      .select('code, description')
      .ilike('description', `%${q}%`)
      .limit(20);
    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    console.error('CPT search error:', err);
    res.status(500).json({ error: err.message });
  }
}
