
import { GoogleGenAI } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API_KEY not configured' });
  }

  const { type, clientName, lastSession, date, time, meetLink } = req.body;
  
  const ai = new GoogleGenAI({ apiKey });

  let prompt = '';
  // Default values for fallback
  const fallbackRetention = `Olá ${clientName}, como você está? Notei que faz um tempo que não nos vemos. Gostaria de saber se está tudo bem e se gostaria de agendar um novo horário. Abraços, Soraia.`;
  const fallbackConfirmation = `Olá ${clientName}, sua consulta com a Dra. Soraia está confirmada para ${date} às ${time}. Link: ${meetLink}. Até lá!`;
  
  let fallbackMessage = '';

  if (type === 'retention') {
    prompt = `Escreva uma mensagem curta, acolhedora e profissional para o WhatsApp/Email de um paciente chamado ${clientName} que não comparece a uma sessão desde ${lastSession || 'algum tempo'}. O objetivo é demonstrar preocupação com o bem-estar dele e oferecer uma nova consulta de forma gentil, sem pressionar. A profissional é Soraia, Psicóloga Clínica e Neuropsicóloga. Mantenha o tom empático.`;
    fallbackMessage = fallbackRetention;
  } else if (type === 'confirmation') {
    prompt = `Escreva uma mensagem de confirmação de agendamento de consulta para o paciente ${clientName}. 
    Data: ${date} às ${time}. 
    Link da sessão: ${meetLink}. 
    A profissional é Soraia, Psicóloga Clínica e Neuropsicóloga. 
    A mensagem deve ser profissional, acolhedora e instruir o paciente a clicar no link no horário da sessão.`;
    fallbackMessage = fallbackConfirmation;
  } else {
    return res.status(400).json({ error: 'Invalid type' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
    });
    // @ts-ignore - The SDK returns text as property or function depending on version, treating as any to be safe or assuming property based on lint
    const text = typeof response.text === 'function' ? response.text() : response.text;
    return res.status(200).json({ text: text });
  } catch (error) {
    console.error("Gemini API Error (Using Fallback):", error);
    // Return fallback message with 200 OK so frontend handles it gracefully
    return res.status(200).json({ text: fallbackMessage });
  }
}
