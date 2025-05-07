// src/lib/ia.ts
import OpenAI from 'openai';

export async function generateRecommendation(
  paciente: { nombre: string; servicio: string; analisis_ia: string | null },
  openai: OpenAI
): Promise<string> {
  const prompt = `
Eres un asistente clínico. Con los datos siguientes:
- Nombre: ${paciente.nombre}
- Servicio: ${paciente.servicio}
- Análisis IA: ${paciente.analisis_ia || 'Sin análisis disponible'}

Genera una recomendación clínica clara en español:
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.choices[0]?.message?.content.trim() ?? 'Sin recomendación';
}
