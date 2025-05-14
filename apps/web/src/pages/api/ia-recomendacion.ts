<<<<<<< HEAD
// src/pages/api/ia-recomendacion.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
=======
// apps/web/src/pages/api/ia-recomendacion.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { generateRecommendation } from '@/lib/ia';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // debe existir
>>>>>>> mvp-supabase
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
<<<<<<< HEAD
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { servicio } = req.body;

  if (!servicio) {
    return res.status(400).json({ error: 'Missing servicio in request body' });
  }

  try {
    const prompt = `Eres un especialista médico. Basado en el servicio "${servicio}", genera una recomendación clínica breve y específica para un informe médico.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Eres un profesional clínico redactando recomendaciones.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const respuesta = completion.choices[0].message.content;
    res.status(200).json({ recommendation: respuesta });
  } catch (error) {
    console.error('Error generando recomendación:', error);
    res.status(500).json({ error: 'Error generando recomendación IA' });
=======
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
>>>>>>> mvp-supabase
  }
}
