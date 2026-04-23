/**
 * Prompts de IA para o Visagê
 * Centralizados aqui para versionamento e fácil iteração
 */

export const SYSTEM_PROMPT = `Você é um consultor de visagismo especializado em barbearia masculina premium.
Você analisa tipo de rosto, traços faciais, essência pessoal e objetivos de imagem para gerar recomendações precisas e convincentes.
Sempre responda em português brasileiro, de forma direta e profissional.
Suas recomendações devem ser práticas — coisas que o barbeiro pode executar agora.`;

export interface AnalysisInput {
  faceShape: string;
  foreheadType: string;
  jawType: string;
  cheekType: string;
  skinTone: string;
  season: string;
  essencePrimary: string;
  essenceSecondary?: string;
  currentStyle: string;
  desiredImage: string;
  lifestyle?: string;
  profession?: string;
}

export function buildRecommendationPrompt(input: AnalysisInput): string {
  return `DADOS DO CLIENTE:
- Tipo facial: ${input.faceShape}
- Traços: testa ${input.foreheadType}, mandíbula ${input.jawType}, maçãs ${input.cheekType}
- Subtom de pele: ${input.skinTone}
- Estação: ${input.season}
- Essência dominante: ${input.essencePrimary}
${input.essenceSecondary ? `- Essência secundária: ${input.essenceSecondary}` : ""}
- Estilo atual: ${input.currentStyle}
- Imagem desejada: ${input.desiredImage}
${input.lifestyle ? `- Lifestyle: ${input.lifestyle}` : ""}
${input.profession ? `- Profissão: ${input.profession}` : ""}

Responda EXCLUSIVAMENTE em JSON válido com esta estrutura:
{
  "gap_analysis": "2-3 frases sobre a distância entre imagem atual e desejada",
  "haircut": {
    "name": "nome do corte",
    "description": "descrição visual do corte",
    "why_fits": "por que combina com o tipo facial e essência",
    "care_tips": "dicas de manutenção"
  },
  "beard": {
    "style": "estilo de barba",
    "description": "descrição visual",
    "why_fits": "por que combina",
    "maintenance": "como manter"
  },
  "styling": ["dica 1", "dica 2", "dica 3"],
  "colors": ["cor 1", "cor 2", "cor 3", "cor 4"]
}`;
}
