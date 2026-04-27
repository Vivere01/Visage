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

export async function generateDossierAction(sessionData: any): Promise<DossierResult> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const clientName = sessionData.client?.name || "Cliente";
    const objective = sessionData.subjectiveProfile?.desiredImage || "Não especificado";
    const notes = sessionData.visagistNotes || "Sem observações manuais.";
    const temperament = sessionData.subjectiveProfile?.temperament || "A definir";
    const essence = sessionData.subjectiveProfile?.essencePrimary || "A definir";

    // Preparar imagens se existirem
    const imageParts = [];
    if (sessionData.photoBefore) {
      const part = await fileToGenerativePart(sessionData.photoBefore);
      if (part) imageParts.push(part);
    }

    const prompt = `
      Você é o maior especialista em Visagismo e Consultoria de Imagem do mundo. 
      Sua linguagem é sofisticada, técnica, mas inspiradora.
      
      OBJETIVO: Gerar um Dossiê Visagista Premium para o cliente ${clientName}.
      
      DADOS COLETADOS:
      - Objetivo do Cliente: "${objective}"
      - Notas do Barbeiro: "${notes}"
      - Temperamento: ${temperament}
      - Essência: ${essence}
      
      TAREFA:
      1. Se houver imagem anexada, analise meticulosamente as linhas faciais, inclinação da mandíbula, testa e proporções.
      2. Explique como o formato do rosto (Morfotipo) comunica a personalidade atual dele.
      3. Conecte o desejo do cliente ("${objective}") com recomendações práticas de corte e barba.
      4. Use termos como "projeção de imagem", "linhas de força", "acolhimento", "dinamismo".

      RETORNE ESTRITAMENTE UM JSON (sem markdown, sem textos extras):
      {
        "analiseMorfotipo": "Descreva o formato do rosto e o que as linhas atuais comunicam (ex: autoridade, passividade, dinamismo).",
        "temperamento": "Como o temperamento ${temperament} se manifesta na beleza dele.",
        "recomendacaoCabelo": "Indique o corte ideal justificando com base no visagismo e no objetivo de ${objective}.",
        "recomendacaoBarba": "Design de barba que harmoniza ou cria o contraste necessário para a nova imagem.",
        "conclusao": "Uma frase de impacto que valide a nova identidade do cliente."
      }
    `;

    // Enviar prompt + imagens
    const result = await model.generateContent([prompt, ...imageParts]);
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
