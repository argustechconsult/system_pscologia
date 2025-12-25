module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/generate-message.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__ = __turbopack_context__.i("[externals]/@google/genai [external] (@google/genai, esm_import, [project]/node_modules/@google/genai)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            error: 'API_KEY not configured'
        });
    }
    const { type, clientName, lastSession, date, time, meetLink } = req.body;
    const ai = new __TURBOPACK__imported__module__$5b$externals$5d2f40$google$2f$genai__$5b$external$5d$__$2840$google$2f$genai$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$google$2f$genai$29$__["GoogleGenAI"]({
        apiKey
    });
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
        return res.status(400).json({
            error: 'Invalid type'
        });
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: prompt
        });
        // @ts-ignore - The SDK returns text as property or function depending on version, treating as any to be safe or assuming property based on lint
        const text = typeof response.text === 'function' ? response.text() : response.text;
        return res.status(200).json({
            text: text
        });
    } catch (error) {
        console.error("Gemini API Error (Using Fallback):", error);
        // Return fallback message with 200 OK so frontend handles it gracefully
        return res.status(200).json({
            text: fallbackMessage
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__60ba3a74._.js.map