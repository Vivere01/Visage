import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export default async function FormsPage() {
  const session = await getSession();

  // Buscar respostas reais (mockado por enquanto até atualizarmos o schema)
  const responses = []; 

  return (
    <main className="max-w-7xl mx-auto pb-24 px-4">
      <section className="mt-8 mb-10">
        <div className="flex flex-col gap-1">
          <span className="text-[#9B7D4E] text-[10px] font-bold tracking-[3px] uppercase">
            Marketing & Leads
          </span>
          <h1 className="text-[36px] font-medium tracking-tight leading-none text-[#1A1A1A]">
            Quiz Visagista
          </h1>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4 mb-10">
        <Link
          href="/forms/builder"
          className="bg-[#1A1A1A] text-white p-6 rounded-[32px] flex items-center justify-between group shadow-lg active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-[#9B7D4E]">edit_note</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">Criar/Editar Quiz</h3>
              <p className="text-white/40 text-xs">Configure as perguntas do seu modelo</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-white/20">chevron_right</span>
        </Link>
      </div>

      {/* Responses Section */}
      <section className="mb-12">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-6 px-1">
          <span className="material-symbols-outlined text-zinc-400">inbox</span>
          Respostas Recebidas
        </h3>

        {responses.length > 0 ? (
          <div className="flex flex-col gap-3">
            {/* Lista de respostas aparecerá aqui */}
          </div>
        ) : (
          <div className="bg-white border border-zinc-100 p-12 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-[#F8F5F2] rounded-full flex items-center justify-center text-[#9B7D4E]">
              <span className="material-symbols-outlined text-3xl">mark_email_unread</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-900">Nenhuma resposta ainda</h4>
              <p className="text-xs text-zinc-400 max-w-[220px] mx-auto mt-1">
                Compartilhe o link do seu quiz para começar a receber leads qualificados.
              </p>
            </div>
            <Link 
              href="/forms/builder" 
              className="text-[#9B7D4E] text-[10px] font-bold uppercase tracking-widest hover:underline"
            >
              Pegar Link do Quiz
            </Link>
          </div>
        )}
      </section>

      {/* Guide Card */}
      <section className="bg-[#1A1A1A] p-8 rounded-[40px] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#9B7D4E]/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-medium mb-2">Como usar o Quiz?</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            O Quiz é sua porta de entrada. Envie o link para clientes novos. Quando eles respondem, os dados caem aqui e você já inicia a consultoria sabendo exatamente o que eles desejam.
          </p>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#9B7D4E]">01</span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-bold">Crie o modelo</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#9B7D4E]">02</span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-bold">Divulgue o link</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#9B7D4E]">03</span>
              <span className="text-[10px] uppercase text-white/40 tracking-wider font-bold">Receba Leads</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
