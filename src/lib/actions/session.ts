"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function getSessionsAction() {
  const session = await getSession();
  if (!session) return { error: "Não autorizado" };

  const sessions = await prisma.session.findMany({
    where: { barberId: session.id },
    include: {
      client: true,
      subjectiveProfile: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return { sessions };
}

export async function getSessionDetailsAction(sessionId: string) {
  const session = await getSession();
  if (!session) return { error: "Não autorizado" };

  const sessionData = await prisma.session.findUnique({
    where: { 
      id: sessionId,
      barberId: session.id 
    },
    include: {
      client: true,
      subjectiveProfile: true,
      faceAnalysis: true,
      recommendation: true,
      mockups: true,
      dossier: true,
    },
  });

  return { session: sessionData };
}
