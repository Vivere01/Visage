import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getSession();
  
  // Buscar métricas reais
  const stats = {
    totalConsultations: await prisma.consultation.count({
      where: { barberId: session?.id }
    }),
    recentClients: await prisma.consultation.findMany({
      where: { barberId: session?.id },
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: { client: true }
    })
  };

  return (
    <main className="max-w-7xl mx-auto pb-24 px-4">
      {/* Header / Welcome Section */}
      <section className="mt-8 mb-10">
        <div className="flex flex-col gap-1">
          <span className="text-[#9B7D4E] text-[10px] font-bold tracking-[3px] uppercase">
            Bem-vindo ao seu Estúdio
          </span>
          <h1 className="text-[36px] font-medium tracking-tight leading-none text-[#1A1A1A]">
            Olá, {session?.name.split(' ')[0]}
          </h1>
          <p className="text-zinc-500 text-sm mt-2">
            Pronto para transformar a imagem dos seus clientes hoje?
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-5 rounded-3xl border border-zinc-100 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Consultas</span>
          <span className="text-3xl font-medium text-zinc-900">{stats.totalConsultations}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-zinc-100 shadow-sm flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Dossiês</span>
          <span className="text-3xl font-medium text-zinc-900">{stats.totalConsultations}</span>
        </div>
      </div>

      {/* Main Action Call */}
      <section className="mb-12">
        <Link
          href="/consultation/new"
          className="relative overflow-hidden w-full bg-[#1A1A1A] text-white p-8 rounded-[32px] flex flex-col items-center justify-center gap-4 shadow-xl active:scale-[0.98] transition-all group border border-white/10"
        >
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl text-[#9B7D4E]" style={{ fontVariationSettings: "'FILL' 1" }}>
              add_circle
            </span>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-medium mb-1">Nova Consulta Visagista</h3>
            <p className="text-white/50 text-sm">Análise facial e recomendações com IA</p>
          </div>
        </Link>
      </section>

      {/* Recent Activity List */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-zinc-400">history</span>
            Atividade Recente
          </h3>
          <Link href="/consultations" className="text-xs text-[#9B7D4E] font-bold tracking-wider uppercase">Ver tudo</Link>
        </div>

        {stats.recentClients.length > 0 ? (
          <div className="flex flex-col gap-3">
            {stats.recentClients.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-zinc-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 font-bold uppercase">
                  {item.client.name.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.client.name}</h4>
                  <p className="text-xs text-zinc-400">Consultoria realizada</p>
                </div>
                <span className="material-symbols-outlined text-zinc-300">chevron_right</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 p-12 rounded-[32px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-300">
              <span className="material-symbols-outlined text-3xl">face_5</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-900">Ainda não há atendimentos</h4>
              <p className="text-xs text-zinc-400 max-w-[200px] mx-auto mt-1">
                Seus atendimentos visagistas aparecerão aqui.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Feature Highlight Card */}
      <section className="pb-12">
        <div className="bg-[#F8F5F2] p-8 rounded-[32px] border border-[#E8E1D8] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[#9B7D4E] text-[10px] font-bold tracking-[2px] uppercase">Personalização</span>
            <h3 className="text-xl font-medium leading-tight">Configure a Identidade do seu Dossiê</h3>
            <p className="text-zinc-600 text-sm">
              Adicione sua logo e cores para que o PDF final seja a cara do seu estúdio.
            </p>
          </div>
          <Link 
            href="/settings"
            className="bg-white text-zinc-900 w-fit px-6 py-3 rounded-full text-sm font-bold shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-all"
          >
            Configurar agora
          </Link>
        </div>
      </section>
    </main>
  );
}
