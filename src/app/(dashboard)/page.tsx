import React from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export default function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto pb-24">
      {/* Header Section */}
      <section className="mb-lg flex items-center justify-between px-2">
        <div>
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-xs block">
            Visão Geral do Estúdio
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Painel Principal</h2>
        </div>
        <LogoutButton />
      </section>

      {/* Main Action Section */}
      <div className="mb-lg">
        <Link
          href="/consultation/new"
          className="w-full bg-primary text-on-primary p-6 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all group border border-primary/20"
        >
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_circle
            </span>
          </div>
          <div className="text-center">
            <h3 className="font-headline-sm text-headline-sm text-white">Nova Consulta</h3>
            <p className="text-white/70 text-body-md">Inicie um novo dossiê visagista para um cliente</p>
          </div>
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-gutter">
        {/* Recent Activity / Empty State */}
        <div className="space-y-md">
          <h3 className="font-headline-sm text-headline-sm mb-md flex items-center justify-start gap-xs px-2">
            <span className="material-symbols-outlined">history</span>
            Atividade Recente
          </h3>

          <div className="bg-surface-container-lowest border border-outline-variant p-10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 opacity-80">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-outline">
              <span className="material-symbols-outlined text-4xl">content_paste_off</span>
            </div>
            <div>
              <h4 className="font-body-lg text-body-lg font-medium text-on-surface">Nenhuma consulta hoje</h4>
              <p className="font-body-md text-on-surface-variant max-w-xs mx-auto">
                Suas consultas e dossiês gerados aparecerão aqui para fácil acesso.
              </p>
            </div>
            <Link
              href="/consultation/new"
              className="text-primary font-label-caps text-label-caps hover:underline"
            >
              Começar agora
            </Link>
          </div>
        </div>

        {/* Stats / Tool Preview */}
        <div className="space-y-md mt-4">
          <div className="bg-zinc-900 text-white p-md rounded-2xl relative overflow-hidden aspect-[16/9] flex flex-col justify-end border border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
            <img
              alt="Visagism mapping"
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="relative z-10 p-2">
              <span className="font-label-caps text-secondary text-[10px] uppercase tracking-widest mb-xs block">
                Configuração
              </span>
              <h3 className="font-headline-sm text-headline-sm text-white mb-xs">Identidade Visual</h3>
              <p className="font-body-sm text-zinc-400 mb-md">
                Configure sua logo e informações que aparecerão no dossiê final.
              </p>
              <Link 
                href="/settings/dossier"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10"
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                Personalizar Dossiê
              </Link>
            </div>
          </div>
        </div>
        {/* Form Builder Quick Access */}
        <div className="space-y-md mt-6 pb-12">
          <h3 className="font-headline-sm text-headline-sm mb-md flex items-center justify-start gap-xs px-2">
            <span className="material-symbols-outlined">quiz</span>
            Questionários & Lead Gen
          </h3>
          
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl flex items-center gap-4 group hover:bg-surface-container-highest transition-colors cursor-pointer">
            <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-3xl">assignment</span>
            </div>
            <div className="flex-1">
              <h4 className="font-body-lg font-medium">Novo Formulário</h4>
              <p className="text-xs text-on-surface-variant">Crie um quiz e receba leads direto no app.</p>
            </div>
            <Link 
              href="/forms/builder"
              className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-md active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Contextual FAB */}
      <Link 
        href="/consultation/new"
        className="fixed right-6 bottom-24 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all z-40"
      >
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          add
        </span>
      </Link>
    </main>
  );
}

