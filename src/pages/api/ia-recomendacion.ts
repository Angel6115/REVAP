// apps/web/src/pages/api/ia-recomendacion.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { generateRecommendation } from '@/lib/ia';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // debe existir
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, servicio } = req.body as { nombre?: string; servicio?: string };
  if (!nombre || !servicio) {
    return res.status(400).json({ error: 'Faltan "nombre" o "servicio"' });
  }

  try {
    const recomendacion = await generateRecommendation(
      { nombre, servicio, analisis_ia: null },
      openai
    );
    return res.status(200).json({ recomendacion });
  } catch (error) {
    console.error('Error IA:', error);
    return res.status(500).json({ error: 'Error interno al generar recomendación' });
  }
}
