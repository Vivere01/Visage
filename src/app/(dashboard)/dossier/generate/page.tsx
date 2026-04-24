"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function GenerateDossierPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Load logo from localStorage
    const savedLogo = localStorage.getItem("barber_logo");
    if (savedLogo) setLogo(savedLogo);

    // Simulate AI generation delay
    const timer = setTimeout(() => setIsGenerating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isGenerating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-4xl animate-pulse">
            magic_button
          </span>
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">Refinando Dossiê</h2>
          <p className="text-on-surface-variant max-w-[280px] mx-auto">
            Nossa IA está analisando as fotos e cruzando com os objetivos do cliente para gerar o guia perfeito.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32">
      {/* Branding Header */}
      <div className="flex flex-col items-center mb-10 pt-4">
        {logo ? (
          <img src={logo} className="h-16 w-auto object-contain mb-4" alt="Barber Logo" />
        ) : (
          <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-2">
             <span className="material-symbols-outlined text-zinc-400">store</span>
          </div>
        )}
        <h1 className="font-inter tracking-[0.3em] font-black text-xs uppercase text-zinc-400">
          Dossiê Visagista Premium
        </h1>
      </div>

      {/* Before & After Comparison */}
      <section className="mb-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-outline-variant shadow-lg group">
                <img
                  alt="Antes"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white font-label-caps uppercase tracking-widest">
                  Original
                </div>
             </div>
             <p className="text-center text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Estado Inicial</p>
          </div>
          
          <div className="space-y-2">
             <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-secondary shadow-[0_0_25px_rgba(212,175,55,0.2)] group">
                <img
                  alt="Depois"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?q=80&w=1974&auto=format&fit=crop"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white rounded-full text-[10px] font-label-caps uppercase tracking-widest shadow-md">
                  Proposta
                </div>
                {/* AI Analysis Overlay */}
                <div className="absolute inset-0 bg-secondary/5 pointer-events-none"></div>
             </div>
             <p className="text-center text-[10px] font-label-caps text-secondary uppercase tracking-widest font-bold">Nova Imagem</p>
          </div>
        </div>
      </section>

      {/* Analysis Content */}
      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">target</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm">Objetivo da Imagem</h3>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant italic text-on-surface-variant leading-relaxed">
            "O cliente busca transmitir maior autoridade no ambiente corporativo, mantendo a acessibilidade. A proposta foca em linhas retas e estrutura sólida."
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">psychology</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm">Análise Visagista (IA)</h3>
          </div>
          <div className="space-y-4">
            <div className="p-5 bg-white border border-outline-variant rounded-2xl shadow-sm">
              <h4 className="font-label-md text-primary uppercase mb-2">Formato Facial</h4>
              <p className="text-body-md text-on-surface-variant leading-snug">
                Identificamos um formato retangular com mandíbula marcada. Recomendamos volume lateral controlado para equilibrar a verticalidade.
              </p>
            </div>
            <div className="p-5 bg-white border border-outline-variant rounded-2xl shadow-sm">
              <h4 className="font-label-md text-primary uppercase mb-2">Temperamento</h4>
              <p className="text-body-md text-on-surface-variant leading-snug">
                Predomínio de traços Coléricos (força e determinação). A barba em formato 'boxer' reforça a seriedade desejada.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="mt-12 space-y-4">
        <button 
          onClick={() => window.print()}
          className="w-full bg-primary text-on-primary py-5 rounded-2xl font-label-caps text-label-caps uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">picture_as_pdf</span>
          Baixar Dossiê PDF
        </button>
        <Link 
          href="/"
          className="w-full border border-outline-variant py-4 rounded-2xl font-label-caps text-label-caps uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}

