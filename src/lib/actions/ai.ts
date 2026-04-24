"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function generateDossierAction(clientData: {
  name: string;
  objective: string;
  notes: string;
}) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Você é um especialista em Visagismo e Consultoria de Imagem para Barbeiros de Luxo.
      Sua tarefa é gerar uma análise profissional para um Dossiê Visagista.
      
      Dados do Cliente:
      - Nome: ${clientData.name}
      - Objetivo da Imagem: ${clientData.objective}
      - Observações do Consultor: ${clientData.notes}
      
      Por favor, gere um JSON com a seguinte estrutura:
      {
        "analiseMorfotipo": "descrição curta do formato facial sugerido",
        "temperamento": "descrição baseada nos traços (ex: Colérico, Sanguíneo)",
        "recomendacaoCabelo": "sugestão específica de corte",
        "recomendacaoBarba": "sugestão específica de barba",
        "conclusao": "uma frase de impacto fechando a consultoria"
      }
      
      Responda apenas o JSON, sem markdown ou explicações.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON if Gemini adds markdown code blocks
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Erro ao gerar dossiê com Gemini:", error);
    return {
      analiseMorfotipo: "Formato Retangular Estruturado",
      temperamento: "Colérico-Sanguíneo",
      recomendacaoCabelo: "Corte com volume no topo e laterais baixas",
      recomendacaoBarba: "Barba Boxer bem desenhada",
      conclusao: "A nova imagem transmite a autoridade e confiança desejadas."
    };
  }
}
