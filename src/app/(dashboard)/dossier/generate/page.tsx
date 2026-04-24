"use client";

import React from "react";

export default function GenerateDossierPage() {
  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <header className="mb-lg text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Gerar Dossiê</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto">
          Nossa inteligência artificial está consolidando os dados para criar um guia personalizado de estilo.
        </p>
      </header>

      {/* AI Processing Card */}
      <section className="mb-xl relative">
        <div className="bg-white border border-outline-variant rounded-xl p-md overflow-hidden relative">
          <div className="shimmer absolute inset-0 opacity-30"></div>
          <div className="relative z-10 flex flex-col items-center py-md">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-md border border-outline-variant">
              <span className="material-symbols-outlined text-secondary text-3xl">cognition</span>
            </div>
            <span className="font-label-caps text-label-caps text-on-primary-container mb-base">Status</span>
            <span className="font-headline-sm text-headline-sm text-primary">IA Processando...</span>
          </div>
        </div>
      </section>

      {/* PDF Components List */}
      <section className="mb-xl">
        <h3 className="font-label-caps text-label-caps text-on-primary-container mb-md border-b border-outline-variant pb-2">
          Conteúdo do Dossiê
        </h3>
        <ul className="space-y-sm">
          <li className="flex items-center justify-between py-xs border-b border-neutral-100">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">face</span>
              <span className="font-body-md text-body-md">Análise de Morfotipo</span>
            </div>
            <span
              className="material-symbols-outlined text-on-primary-container text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </li>
          <li className="flex items-center justify-between py-xs border-b border-neutral-100">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">straighten</span>
              <span className="font-body-md text-body-md">Mapeamento de Proporções</span>
            </div>
            <span
              className="material-symbols-outlined text-on-primary-container text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </li>
          <li className="flex items-center justify-between py-xs border-b border-neutral-100">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">brush</span>
              <span className="font-body-md text-body-md">Mockup Final (Visagismo)</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-secondary/20 animate-pulse"></div>
          </li>
          <li className="flex items-center justify-between py-xs border-b border-neutral-100">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
              <span className="font-body-md text-body-md">Histórico de Sessões</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-surface-container-highest"></div>
          </li>
        </ul>
      </section>

      {/* Before & After Preview */}
      <section className="mb-xl">
        <h3 className="font-label-caps text-label-caps text-on-primary-container mb-md">Prévia de Resultado</h3>
        <div className="grid grid-cols-2 gap-base bg-surface-container-low p-base rounded-lg border border-outline-variant">
          <div className="relative aspect-[3/4] rounded overflow-hidden">
            <img
              alt="Antes"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2UfLXKN6IqUE6_2f17zhz-MfPcIu-A_26b0-PJQ6eeSfrK385AdCL_tYsHMxfeRRUSwQgTSnfRPvCyTiHdOxDo-dNO9L_R_Rbh2dlJO-0y71yRjPPKQBop6kFssSA6lyUmVHtVyuoJWh9Io1FhxbkiPSypWuaIoqihf3LL6DH-UR03xMGeICK_0k6aTgs7_pXEjpzccQwWCpuYicQEnqImHvGAzqkx_OjeFNJ0bweJr5Rcf50QQOsdloHH5DFCysUUr65vZopHVxD"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded text-[10px] text-white font-label-caps">
              Antes
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded overflow-hidden">
            <img
              alt="Depois Mockup"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC_vlWlZqSJo-WcY4Hi82Jy6n9hZNSsdEv9dQIhcghggFT0gMRBPIKC0Gn00orAUKhuMyvdfubDsVpP4r1KeVAeZcEgRHiXpDxeOEquNY3uba6kGVtzVgaDsfGAhzMga1f6KteazYisOzfFz951J3OAhSQ0jvoh2k5GvbDffCCc6-h9vo4wHSi11mR1b7Choeyn6O5tpfBLL7zYQHwpteO1r4eUTzxnEgKXEeuLSw6uxJBc0rCNZufXcFTi3ngGJzqS8snIgKlNmAM"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-secondary text-white rounded text-[10px] font-label-caps">
              Mockup
            </div>
            {/* Visagism Overlay Sim */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-2/3 h-2/3 border border-secondary rounded-[50%]"></div>
              <div className="absolute h-full w-[1px] bg-secondary left-1/2"></div>
              <div className="absolute w-full h-[1px] bg-secondary top-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Action */}
      <footer className="fixed bottom-24 left-0 w-full px-margin-mobile max-w-lg mx-auto pointer-events-none">
        <button className="w-full h-14 bg-primary text-on-primary rounded-full font-label-caps flex items-center justify-center gap-xs hover:opacity-90 active:scale-[0.98] transition-all shadow-lg pointer-events-auto">
          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          GERAR PDF COM IA
        </button>
      </footer>
    </div>
  );
}
