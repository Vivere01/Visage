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
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      {/* Header com branding do Barbeiro */}
      <header 
        className="w-full h-20 px-6 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant"
      >
        <div className="flex items-center gap-3">
          {data.barber.logoUrl ? (
            <img src={data.barber.logoUrl} alt="Logo" className="w-10 h-10 rounded-full border border-outline-variant" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">content_cut</span>
            </div>
          )}
          <span className="font-headline-sm text-sm tracking-tight">{data.barber.shopName}</span>
        </div>
        <PDFDownloadButton data={data} />
      </header>

      <main className="max-w-md mx-auto px-margin-mobile py-lg space-y-xl">
        
        {/* Intro */}
        <section className="text-center space-y-md animate-fade-in">
          <h1 className="font-headline-lg text-headline-lg">Dossiê Visagista</h1>
          <p className="font-body-md text-on-surface-variant">
            Preparado exclusivamente para <span className="text-primary font-semibold">{data.client.name}</span>
          </p>
          <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img src={data.client.photoUrl} alt={data.client.name} className="object-cover w-full h-full" />
          </div>
        </section>

        {/* Diagnóstico */}
        <section className="space-y-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">person</span>
            <h2 className="font-headline-md text-headline-md">Seu Diagnóstico</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-gutter">
            <div className="bg-white border border-outline-variant p-md text-center rounded-lg">
              <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Formato</div>
              <div className="font-headline-sm text-lg">{data.analysis.faceShape}</div>
            </div>
            <div className="bg-white border border-outline-variant p-md text-center rounded-lg">
              <div className="font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Temperamento</div>
              <div className="font-headline-sm text-lg">{data.analysis.temperament}</div>
            </div>
            <div className="bg-primary text-on-primary p-md text-center col-span-2 rounded-lg shadow-md">
              <div className="font-label-caps text-[10px] opacity-70 mb-1 uppercase tracking-wider">Essência Visual</div>
              <div className="font-headline-sm text-lg">{data.analysis.essence}</div>
            </div>
          </div>

          <div className="bg-surface-container-low p-md border-l-4 border-primary rounded-r-lg">
            <h3 className="font-label-caps text-[11px] text-on-surface-variant mb-2 uppercase">GAP de Imagem</h3>
            <p className="font-body-md text-sm leading-relaxed">{data.analysis.gap}</p>
          </div>
        </section>

        {/* Mockups */}
        <section className="space-y-md">
          <h2 className="font-headline-md text-headline-md">Sua Nova Imagem</h2>
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-outline-variant shadow-xl">
            {/* Imagem do Mockup final */}
            <img src={data.mockups[0]} alt="Simulação Visagista" className="object-cover w-full h-full" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-label-caps shadow-lg">
              Proposta Final
            </div>
          </div>
        </section>

        {/* Recomendações: Cabelo */}
        <section className="space-y-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">content_cut</span>
            <h2 className="font-headline-md text-headline-md">Cabelo</h2>
          </div>
          <div className="bg-white border border-outline-variant p-md space-y-md rounded-xl">
            <h3 className="font-headline-sm text-xl">{data.recommendations.haircut.name}</h3>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">{data.recommendations.haircut.whyFits}</p>
            
            <div className="pt-md border-t border-outline-variant/30 space-y-sm">
              <div className="font-label-caps text-[10px] text-secondary font-semibold uppercase tracking-wider mb-2">Manutenção</div>
              {data.recommendations.haircut.care.map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span className="font-body-md">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recomendações: Barba */}
        <section className="space-y-md">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">brush</span>
            <h2 className="font-headline-md text-headline-md">Barba</h2>
          </div>
          <div className="bg-white border border-outline-variant p-md space-y-md rounded-xl">
            <h3 className="font-headline-sm text-xl">{data.recommendations.beard.name}</h3>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">{data.recommendations.beard.whyFits}</p>
            
            <div className="pt-md border-t border-outline-variant/30 space-y-sm">
              <div className="font-label-caps text-[10px] text-secondary font-semibold uppercase tracking-wider mb-2">Cuidados</div>
              {data.recommendations.beard.care.map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span className="font-body-md">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA do Barbeiro */}
        <section className="pt-8 pb-12">
          <div className="bg-primary text-on-primary p-md text-center space-y-md rounded-xl shadow-xl">
            <span className="material-symbols-outlined text-4xl text-secondary">calendar_today</span>
            <div>
              <h2 className="font-headline-sm text-xl mb-1">Pronto para a transformação?</h2>
              <p className="font-body-md opacity-70 text-sm">Mantenha sua imagem alinhada com seus objetivos.</p>
            </div>
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noreferrer"
              className="bg-white text-primary font-label-caps py-sm rounded-full w-full block hover:bg-surface-bright transition-colors"
            >
              Agendar Retorno
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
