"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function generateDossierAction(sessionData: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const clientName = sessionData.client?.name || "Cliente";
    const objective = sessionData.subjectiveProfile?.desiredImage || "Não especificado";
    const notes = sessionData.visagistNotes || "Sem observações manuais.";
    const temperament = sessionData.subjectiveProfile?.temperament || "A definir";
    const essence = sessionData.subjectiveProfile?.essencePrimary || "A definir";

    const prompt = `
      Você é um Master Visagista e Consultor de Imagem Estratégica.
      Sua missão é criar um Dossiê Visagista Premium que conecte a imagem externa com os objetivos internos do cliente.
      
      Contexto da Consultoria:
      - Cliente: ${clientName}
      - Objetivo de Imagem: ${objective}
      - Notas Técnicas do Visagista: ${notes}
      - Temperamento Identificado: ${temperament}
      - Essência Dominante: ${essence}
      
      Com base nesses dados, gere uma análise visagista profunda.
      
      Retorne estritamente um JSON com:
      {
        "analiseMorfotipo": "análise técnica do formato do rosto e o que ele comunica",
        "temperamento": "explicação de como o temperamento influencia a imagem",
        "recomendacaoCabelo": "justificativa técnica para o corte sugerido",
        "recomendacaoBarba": "justificativa técnica para o design de barba/rosto",
        "conclusao": "uma mensagem poderosa de encerramento para o cliente"
      }
      
      Não use markdown, responda apenas o JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Erro ao gerar dossiê com Gemini:", error);
    return {
      analiseMorfotipo: "Perfil Geométrico Equilibrado",
      temperamento: "Equilíbrio entre força e acolhimento",
      recomendacaoCabelo: "Corte estruturado para reforçar a mandíbula",
      recomendacaoBarba: "Linhas retas para aumentar a autoridade",
      conclusao: "Sua nova imagem agora é o espelho do seu sucesso profissional."
    };
  }
}

