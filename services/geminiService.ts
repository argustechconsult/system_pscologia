
export const generateRetentionMessage = async (clientName: string, lastSession: string | undefined) => {
  try {
    const response = await fetch('/api/generate-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'retention',
        clientName,
        lastSession,
      }),
    });

    if (!response.ok) throw new Error('API call failed');
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Olá ${clientName}, como você está? Notei que faz um tempo que não nos vemos. Gostaria de saber se está tudo bem e se gostaria de agendar um novo horário. Abraços, Soraia.`;
  }
};

export const generateConfirmationMessage = async (clientName: string, date: string, time: string, meetLink: string) => {
  try {
    const response = await fetch('/api/generate-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'confirmation',
        clientName,
        date,
        time,
        meetLink,
      }),
    });

    if (!response.ok) throw new Error('API call failed');

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Olá ${clientName}, sua consulta com a Dra. Soraia está confirmada para ${date} às ${time}. Link: ${meetLink}. Até lá!`;
  }
};
