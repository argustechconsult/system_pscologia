
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRetentionMessage = async (clientName: string, lastSession: string | undefined) => {
  const model = 'gemini-3-flash-preview';
  const prompt = `Escreva uma mensagem curta, acolhedora e profissional para o WhatsApp/Email de um paciente chamado ${clientName} que não comparece a uma sessão desde ${lastSession || 'algum tempo'}. O objetivo é demonstrar preocupação com o bem-estar dele e oferecer uma nova consulta de forma gentil, sem pressionar. A profissional é Soraia, Psicóloga Clínica e Neuropsicóloga. Mantenha o tom empático.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Olá ${clientName}, como você está? Notei que faz um tempo que não nos vemos. Gostaria de saber se está tudo bem e se gostaria de agendar um novo horário. Abraços, Soraia.`;
  }
};

export const generateConfirmationMessage = async (clientName: string, date: string, time: string, meetLink: string) => {
  const model = 'gemini-3-flash-preview';
  const prompt = `Escreva uma mensagem de confirmação de agendamento de consulta para o paciente ${clientName}. 
  Data: ${date} às ${time}. 
  Link da sessão: ${meetLink}. 
  A profissional é Soraia, Psicóloga Clínica e Neuropsicóloga. 
  A mensagem deve ser profissional, acolhedora e instruir o paciente a clicar no link no horário da sessão.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return `Olá ${clientName}, sua consulta com a Dra. Soraia está confirmada para ${date} às ${time}. Link: ${meetLink}. Até lá!`;
  }
};
