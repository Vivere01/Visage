/**
 * Análise facial usando MediaPipe Face Mesh (client-side)
 *
 * Classifica o tipo de rosto baseado em proporções dos landmarks.
 * Roda inteiramente no browser — zero custo, sem latência de rede.
 */

import type { FaceShape } from "@prisma/client";

interface FaceLandmark {
  x: number;
  y: number;
  z: number;
}

interface FaceProportions {
  foreheadWidth: number;
  cheekboneWidth: number;
  jawWidth: number;
  faceLength: number;
  foreheadHeight: number;
  jawAngle: number;
}

/**
 * Pontos-chave do MediaPipe Face Mesh (dos 468 landmarks)
 */
const LANDMARK_INDICES = {
  // Testa
  foreheadLeft: 54,
  foreheadRight: 284,
  foreheadTop: 10,
  // Maçãs
  cheekLeft: 234,
  cheekRight: 454,
  // Mandíbula
  jawLeft: 172,
  jawRight: 397,
  jawAngleLeft: 132,
  jawAngleRight: 361,
  // Queixo
  chinBottom: 152,
  // Sobrancelhas (base do terço superior)
  browLeft: 66,
  browRight: 296,
};

/**
 * Calcula distância euclidiana 2D entre dois landmarks
 */
function distance(a: FaceLandmark, b: FaceLandmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

/**
 * Extrai proporções faciais dos landmarks
 */
export function extractProportions(landmarks: FaceLandmark[]): FaceProportions {
  const idx = LANDMARK_INDICES;

  const foreheadWidth = distance(landmarks[idx.foreheadLeft], landmarks[idx.foreheadRight]);
  const cheekboneWidth = distance(landmarks[idx.cheekLeft], landmarks[idx.cheekRight]);
  const jawWidth = distance(landmarks[idx.jawLeft], landmarks[idx.jawRight]);
  const faceLength = distance(landmarks[idx.foreheadTop], landmarks[idx.chinBottom]);
  const foreheadHeight = distance(landmarks[idx.foreheadTop], landmarks[idx.browLeft]);

  // Ângulo da mandíbula (quanto maior, mais angular)
  const jawAngle = Math.atan2(
    Math.abs(landmarks[idx.jawAngleLeft].y - landmarks[idx.jawLeft].y),
    Math.abs(landmarks[idx.jawAngleLeft].x - landmarks[idx.jawLeft].x)
  ) * (180 / Math.PI);

  return {
    foreheadWidth,
    cheekboneWidth,
    jawWidth,
    faceLength,
    foreheadHeight,
    jawAngle,
  };
}

/**
 * Classifica o tipo de rosto baseado nas proporções
 */
export function classifyFaceShape(proportions: FaceProportions): FaceShape {
  const { foreheadWidth, cheekboneWidth, jawWidth, faceLength, jawAngle } = proportions;

  const widthToLength = cheekboneWidth / faceLength;
  const foreheadToJaw = foreheadWidth / jawWidth;
  const cheekToJaw = cheekboneWidth / jawWidth;

  // Rosto redondo: largura ≈ comprimento
  if (widthToLength > 0.85 && jawAngle < 35) {
    return "ROUND";
  }

  // Rosto quadrado: mandíbula larga e angulosa
  if (widthToLength > 0.8 && jawAngle > 40 && cheekToJaw < 1.15) {
    return "SQUARE";
  }

  // Rosto oblongo: muito mais longo que largo
  if (widthToLength < 0.7) {
    return "OBLONG";
  }

  // Rosto coração: testa larga, queixo estreito
  if (foreheadToJaw > 1.4) {
    return "HEART";
  }

  // Rosto losango: maçãs mais largas que testa e mandíbula
  if (cheekToJaw > 1.25 && cheekboneWidth > foreheadWidth * 1.1) {
    return "DIAMOND";
  }

  // Default: oval (o mais equilibrado)
  return "OVAL";
}

/**
 * Classifica tipo de traço individual
 */
export function classifyForehead(proportions: FaceProportions): string {
  if (proportions.foreheadHeight > proportions.faceLength * 0.38) return "alta";
  if (proportions.foreheadHeight < proportions.faceLength * 0.28) return "baixa";
  return "média";
}

export function classifyJaw(proportions: FaceProportions): string {
  if (proportions.jawAngle > 45) return "angular";
  if (proportions.jawAngle < 25) return "suave";
  return "média";
}

export function classifyCheeks(proportions: FaceProportions): string {
  const ratio = proportions.cheekboneWidth / proportions.jawWidth;
  if (ratio > 1.25) return "proeminente";
  if (ratio < 1.05) return "discreta";
  return "média";
}
