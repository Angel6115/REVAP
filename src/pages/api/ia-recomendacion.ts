// src/pages/api/ia-recomendacion.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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
  }
}
