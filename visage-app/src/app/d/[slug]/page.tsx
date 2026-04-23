import React from "react";
import Image from "next/image";
import { CheckCircle2, Scissors, User, Droplets, Calendar } from "lucide-react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PDFDownloadButton } from "@/components/dossier/PDFDownloadButton";

// Mock para preview enquanto o DB não está totalmente populado no MVP
const MOCK_DOSSIER = {
  barber: {
    shopName: "Visagê Barber Premium",
    brandColor: "#6C5CE7",
    logoUrl: "https://ui-avatars.com/api/?name=Visag%C3%AA&background=0D0D12&color=fff",
  },
  client: {
    name: "João Silva",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  analysis: {
    faceShape: "OVAL",
    temperament: "Colérico",
    essence: "Dramática",
    gap: "Atualmente projeta uma imagem muito casual. O objetivo é transmitir mais autoridade e liderança no ambiente corporativo, mantendo a praticidade.",
  },
  recommendations: {
    haircut: {
      name: "Textured Crop com Fade Médio",
      whyFits: "O volume no topo alonga sutilmente o rosto e a textura traz um ar moderno, enquanto as laterais limpas projetam a autoridade do seu temperamento Colérico.",
      care: ["Lavar 3x por semana", "Usar pomada matte no topo", "Secar com toalha atritando levemente"]
    },
    beard: {
      name: "Barba Desenhada Angular",
      whyFits: "Linhas retas e marcadas na mandíbula reforçam a essência Dramática e impõem respeito.",
      care: ["Aparar a cada 15 dias", "Usar óleo de barba diariamente para hidratar"]
    }
  },
  mockups: [
    "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=800&auto=format&fit=crop"
  ]
};

export default async function PublicDossierPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  // const dossier = await prisma.dossier.findUnique({ where: { publicSlug: resolvedParams.slug }, include: { session: { include: { barber: true, client: true } } } });
  // if (!dossier) notFound();
  
  // Usando mock para o fluxo de MVP
  const data = MOCK_DOSSIER;
  
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-primary/30">
      {/* Header com branding do Barbeiro */}
      <header 
        className="w-full h-20 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md"
        style={{ borderBottom: `1px solid ${data.barber.brandColor}40` }}
      >
        <div className="flex items-center gap-3">
          {data.barber.logoUrl ? (
            <img src={data.barber.logoUrl} alt="Logo" className="w-10 h-10 rounded-full border border-white/10" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Scissors size={20} className="text-primary" />
            </div>
          )}
          <span className="font-semibold">{data.barber.shopName}</span>
        </div>
        <PDFDownloadButton data={data} />
      </header>

      <main className="max-w-md mx-auto px-6 py-12 space-y-16">
        
        {/* Intro */}
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="text-3xl font-display font-bold">Dossiê Visagista</h1>
          <p className="text-text-secondary">
            Preparado exclusivamente para <span className="text-white font-medium">{data.client.name}</span>
          </p>
          <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4" style={{ borderColor: data.barber.brandColor }}>
            <img src={data.client.photoUrl} alt={data.client.name} className="object-cover w-full h-full" />
          </div>
        </section>

        {/* Diagnóstico */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-primary" size={24} />
            <h2 className="text-2xl font-bold">Seu Diagnóstico</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-xs text-text-secondary mb-1 uppercase tracking-wider">Formato</div>
              <div className="font-semibold text-lg">{data.analysis.faceShape}</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-xs text-text-secondary mb-1 uppercase tracking-wider">Temperamento</div>
              <div className="font-semibold text-lg">{data.analysis.temperament}</div>
            </div>
            <div className="glass-card p-4 text-center col-span-2">
              <div className="text-xs text-text-secondary mb-1 uppercase tracking-wider">Essência Visual</div>
              <div className="font-semibold text-lg text-primary-light">{data.analysis.essence}</div>
            </div>
          </div>

          <div className="glass-card p-5 border-l-4" style={{ borderLeftColor: data.barber.brandColor }}>
            <h3 className="font-medium text-sm text-text-secondary mb-2 uppercase">GAP de Imagem</h3>
            <p className="text-sm leading-relaxed">{data.analysis.gap}</p>
          </div>
        </section>

        {/* Mockups */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Sua Nova Imagem</h2>
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            {/* Imagem do Mockup final */}
            <img src={data.mockups[0]} alt="Simulação Visagista" className="object-cover w-full h-full" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium border border-white/10">
              Proposta Final
            </div>
          </div>
        </section>

        {/* Recomendações: Cabelo */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Scissors className="text-primary" size={24} />
            <h2 className="text-2xl font-bold">Cabelo</h2>
          </div>
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold">{data.recommendations.haircut.name}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{data.recommendations.haircut.whyFits}</p>
            
            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="text-xs text-primary-light font-semibold uppercase tracking-wider mb-2">Ações para Manutenção</div>
              {data.recommendations.haircut.care.map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recomendações: Barba */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="text-primary" size={24} />
            <h2 className="text-2xl font-bold">Barba</h2>
          </div>
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold">{data.recommendations.beard.name}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{data.recommendations.beard.whyFits}</p>
            
            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="text-xs text-primary-light font-semibold uppercase tracking-wider mb-2">Cuidados</div>
              {data.recommendations.beard.care.map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA do Barbeiro */}
        <section className="pt-8 pb-12">
          <div className="glass-card p-8 text-center space-y-6 bg-primary/5 border-primary/20">
            <Calendar size={40} className="text-primary mx-auto" />
            <div>
              <h2 className="text-xl font-bold mb-2">Pronto para a transformação?</h2>
              <p className="text-text-secondary text-sm">Mantenha sua imagem alinhada com seus objetivos.</p>
            </div>
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-primary btn-lg w-full"
            >
              Agendar Retorno
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
