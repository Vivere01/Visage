/**
 * Serviço de recomendações via OpenAI
 */

import { SYSTEM_PROMPT, buildRecommendationPrompt, type AnalysisInput } from "./prompts";

export interface RecommendationResult {
  gap_analysis: string;
  haircut: {
    name: string;
    description: string;
    why_fits: string;
    care_tips: string;
  };
  beard: {
    style: string;
    description: string;
    why_fits: string;
    maintenance: string;
  };
  styling: string[];
  colors: string[];
}

export async function generateRecommendations(
  input: AnalysisInput
): Promise<RecommendationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY não configurada");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildRecommendationPrompt(input) },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} — ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) throw new Error("Resposta vazia da IA");

  return JSON.parse(content) as RecommendationResult;
}
