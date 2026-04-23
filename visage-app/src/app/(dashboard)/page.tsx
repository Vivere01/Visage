import React from "react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="mb-lg text-center">
        <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-xs block">
          Visão Geral do Estúdio
        </span>
        <h2 className="font-headline-lg text-headline-lg text-primary">Dashboard</h2>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 gap-gutter">
        {/* Daily Schedule (Main Column) */}
        <div className="space-y-md">
          <h3 className="font-headline-sm text-headline-sm mb-md flex items-center justify-center gap-xs">
            <span className="material-symbols-outlined">calendar_today</span>
            Agenda de Hoje
          </h3>

          {/* Appointment Card 1 (Active/Next) */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:border-secondary group">
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="flex flex-col items-center gap-md">
                <div className="w-20 h-20 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all shrink-0 border-2 border-outline-variant">
                  <img
                    alt="Julian Thorne"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC57k-pTqVi_eINZ7ICLBkAqSPwGf1dTf9KtjWRu4Puwhyx2EqGlQHetqbXRCQT3PMvdez8GTzM-92yLBHWpti657ynp7SzAglK6zjmaXajWWrXPRRFePt7iEo-INsfU2eG2jssDj56a4JfGqZQHxI0QigFEpQxxYDNCGVgDSMhLVHZ9q2ZgmYvNc-JBXBYozQ1_0ZydLBMVFAKG6y_oGA3WSeqkfkHGNVLmvKAAFBg1nxc97fWl1vl5aQZppFvYa9Vj0V1v6DM08Bf"
                  />
                </div>
                <div className="text-center">
                  <span className="font-label-caps text-[10px] text-on-primary bg-primary px-xs py-[2px] rounded uppercase mb-xs inline-block">
                    Próximo Agendamento
                  </span>
                  <h4 className="font-headline-sm text-headline-sm">Julian Thorne</h4>
                  <p className="font-body-md text-on-surface-variant">Perfil Visagista Completo • 10:30</p>
                </div>
              </div>
              <Link
                href="/session/1"
                className="bg-primary text-on-primary font-label-caps text-label-caps px-md py-sm rounded-full hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-xs w-full justify-center"
              >
                Iniciar Análise
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Appointment Card 2 */}
          <div className="bg-white border border-outline-variant p-md rounded-lg flex items-center justify-between transition-all hover:bg-surface-container-low">
            <div className="flex items-center gap-md">
              <div className="text-on-surface-variant font-label-caps w-16 text-center shrink-0">11:45</div>
              <div>
                <h4 className="font-body-lg text-body-lg font-medium">Marcus Sterling</h4>
                <p className="font-body-md text-on-surface-variant">Design de Barba & Mapeamento</p>
              </div>
            </div>
          </div>

          {/* Appointment Card 3 */}
          <div className="bg-white border border-outline-variant p-md rounded-lg flex items-center justify-between transition-all hover:bg-surface-container-low">
            <div className="flex items-center gap-md">
              <div className="text-on-surface-variant font-label-caps w-16 text-center shrink-0">14:00</div>
              <div>
                <h4 className="font-body-lg text-body-lg font-medium">Adrian Chen</h4>
                <p className="font-body-md text-on-surface-variant">Primeira Consultoria</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Quick Actions (Side Column) */}
        <div className="space-y-md">
          {/* Visagism Tool Preview */}
          <div className="bg-primary text-on-primary p-md rounded-lg relative overflow-hidden aspect-square flex flex-col justify-end">
            <img
              alt="Visagism overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYe3U6zzICdXSYC8e1Eoba7Xz97cBxaAREml58dIP63L5I0z0qIhHH2MMvqb-w7pPD4br_HiPVH2hxVt8CRsCVTK0GYactN616_iLNjvSwrFXLC9r3fB83LqOFrcaMFdtbwpfBVlz0t2jzCN2x2CFRqyKU9yzH5hwrWKX_7NXJiNXrmblm5ac3i2O6OEkwrSCawfzLAgYq1_UVLT4fGPZ4BSvUToEYqR4vM6k82yTlekZsS2lNXArKnkh6h8lAELVKvrxZdA7bRcop"
            />
            <div className="relative z-10">
              <span className="font-label-caps text-secondary-fixed text-[10px] uppercase tracking-widest mb-xs block">
                Assistente de IA
              </span>
              <h3 className="font-headline-sm text-headline-sm text-white mb-sm">Mapeamento Facial</h3>
              <p className="font-body-md text-zinc-400 mb-md">
                Analise proporções faciais para determinar padrões geométricos ideais.
              </p>
              <button className="w-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps py-sm rounded uppercase tracking-widest hover:opacity-90 transition-opacity">
                Abrir Câmera
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual FAB */}
      <button className="fixed right-6 bottom-24 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          add
        </span>
      </button>
    </main>
  );
}
