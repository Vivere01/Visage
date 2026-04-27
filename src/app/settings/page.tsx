import React from "react";
import { getSession } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await getSession();

  return (
    <main className="max-w-7xl mx-auto pb-24 px-4">
      <section className="mt-8 mb-10">
        <div className="flex flex-col gap-1">
          <span className="text-[#9B7D4E] text-[10px] font-bold tracking-[3px] uppercase">
            Configurações
          </span>
          <h1 className="text-[36px] font-medium tracking-tight leading-none text-[#1A1A1A]">
            Seu Perfil
          </h1>
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {/* Perfil do Barbeiro */}
        <section className="bg-white p-6 rounded-[32px] border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Informações do Barbeiro</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#9B7D4E] uppercase">Nome Profissional</label>
              <p className="text-lg font-medium text-zinc-900">{session?.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#9B7D4E] uppercase">E-mail de Acesso</label>
              <p className="text-zinc-500">{session?.email}</p>
            </div>
          </div>
        </section>

        {/* Estúdio */}
        <section className="bg-white p-6 rounded-[32px] border border-zinc-100 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Seu Estúdio</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#9B7D4E] uppercase">Nome do Estúdio</label>
              <p className="text-lg font-medium text-zinc-900">{session?.shopName}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#9B7D4E] uppercase">Link do Sistema (Slug)</label>
              <p className="text-zinc-500">visage.app/{session?.slug}</p>
            </div>
          </div>
        </section>

        {/* Atalhos Rápidos */}
        <section className="grid grid-cols-1 gap-3">
          <Link 
            href="/settings/dossier" 
            className="bg-zinc-50 p-5 rounded-2xl flex items-center justify-between hover:bg-zinc-100 transition-all border border-zinc-100"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#9B7D4E]">palette</span>
              <span className="font-medium">Personalizar Dossiê PDF</span>
            </div>
            <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
          </Link>
          
          <div className="mt-4">
            <LogoutButton />
          </div>
        </section>
      </div>
    </main>
  );
}
