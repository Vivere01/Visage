import React from "react";
import Link from "next/link";
import { Camera, ClipboardList, PenTool, FileText, Share2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function SessionAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Mock data for MVP
  const session = {
    id: resolvedParams.id,
    clientName: "João Silva",
    status: "MOCKUP", // PHOTO_PENDING, ANALYZING, MOCKUP, DOSSIER_READY
    date: "23 Abr 2026",
  };

  const steps = [
    {
      title: "1. Questionário (Quiz)",
      desc: "Perfil subjetivo, temperamento e essência",
      icon: <ClipboardList size={24} />,
      href: `/form/${session.id}`,
      external: true,
      done: true,
    },
    {
      title: "2. Mapeamento & Mockups",
      desc: "Upload de foto, análise facial e canvas",
      icon: <PenTool size={24} />,
      href: `/session/${session.id}/canvas`,
      external: false,
      done: false, // Pode continuar editando
    },
    {
      title: "3. Dossiê Final",
      desc: "Gerar PDF e link interativo",
      icon: <FileText size={24} />,
      href: `/d/${session.id}-slug`, // Mock slug
      external: true,
      done: false,
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-6 max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8 pt-4">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/5 text-text-secondary">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Sessão: {session.clientName}</h1>
          <p className="text-sm text-text-secondary">{session.date} • Status: {session.status}</p>
        </div>
      </header>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="glass-card p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Share2 size={24} />
          </div>
          <div>
            <div className="font-semibold text-sm mb-1">Enviar Quiz</div>
            <div className="text-xs text-text-secondary">Link p/ cliente</div>
          </div>
        </button>
        <Link href={`/session/${session.id}/canvas`} className="glass-card p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <Camera size={24} />
          </div>
          <div>
            <div className="font-semibold text-sm mb-1">Abrir Canvas</div>
            <div className="text-xs text-text-secondary">Fotos e mockups</div>
          </div>
        </Link>
      </div>

      {/* Fluxo */}
      <h2 className="text-lg font-bold mb-4">Etapas da Consultoria</h2>
      <div className="space-y-4 relative">
        {/* Linha vertical conectando os passos */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/5" />
        
        {steps.map((step, index) => (
          <Link 
            key={index} 
            href={step.href}
            target={step.external ? "_blank" : undefined}
            className={cn(
              "relative glass-card p-4 pl-16 block transition-all hover:translate-x-1",
              step.done ? "border-primary/30 bg-primary/5" : ""
            )}
          >
            <div className={cn(
              "absolute left-[-2px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-bg-primary flex items-center justify-center z-10",
              step.done ? "bg-primary text-white" : "bg-bg-elevated text-text-secondary"
            )}>
              {step.icon}
            </div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-sm text-text-secondary">{step.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
