"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export interface DossierResult {
  analiseMorfotipo: string;
  temperamento: string;
  recomendacaoCabelo: string;
  recomendacaoBarba: string;
  conclusao: string;
}

// Função auxiliar para converter URL de imagem em formato que o Gemini entende
async function fileToGenerativePart(url: string) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(buffer).toString("base64"),
        mimeType: "image/jpeg",
      },
    };
  } catch (e) {
    console.error("Erro ao processar imagem para IA:", e);
    return null;
  }
}

import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

export async function generateDossierAction(sessionData: any): Promise<DossierResult> {
  try {
    // 1. Verificar se já existe um dossiê para esta sessão
    const existingDossier = await prisma.dossier.findUnique({
      where: { sessionId: sessionData.id }
    });

    if (existingDossier) {
      return existingDossier.sections as unknown as DossierResult;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const clientName = sessionData.client?.name || "Cliente";
    const objective = sessionData.subjectiveProfile?.desiredImage || "Não especificado";
    const notes = sessionData.visagistNotes || "Sem observações.";
    const temperament = sessionData.subjectiveProfile?.temperament || "A definir";

    // Prompt simplificado para velocidade máxima
    const prompt = `
      Gere um dossiê visagista simplificado para ${clientName}. 
      Objetivo: ${objective}. Notas: ${notes}. Temperamento: ${temperament}.
      Foque em organizar as informações para um design de luxo.
      
      RETORNE APENAS JSON:
      {
        "analiseMorfotipo": "Breve análise das linhas de imagem.",
        "temperamento": "Resumo do perfil comportamental.",
        "recomendacaoCabelo": "Sugestão de corte.",
        "recomendacaoBarba": "Sugestão de barba.",
        "conclusao": "Frase final de impacto."
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    const aiContent = JSON.parse(text);

    // 2. Salvar no banco de dados para persistência total
    await prisma.dossier.create({
      data: {
        sessionId: sessionData.id,
        publicSlug: generateSlug(),
        sections: aiContent
      }
    });

    return aiContent;
  } catch (error) {
    console.error("Erro no Dossiê:", error);
    return {
      analiseMorfotipo: "Perfil Geométrico Equilibrado",
      temperamento: "Equilíbrio",
      recomendacaoCabelo: "Corte Estruturado",
      recomendacaoBarba: "Design Alinhado",
      conclusao: "Sua nova imagem está pronta."
    };
  }
}
