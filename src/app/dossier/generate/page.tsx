"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { generateDossierAction } from "@/lib/actions/ai";
import { getSessionsAction, getSessionDetailsAction } from "@/lib/actions/session";
import { AbstractFace } from "@/components/AbstractFace";

export default function GenerateDossierPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessionDetails, setSessionDetails] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiData, setAiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSessions() {
      const result = await getSessionsAction();
      if (result.sessions) {
        setSessions(result.sessions);
      }
      setLoading(false);
    }
    loadSessions();
  }, []);

  const handleSelectSession = async (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setLoading(true);
    const result = await getSessionDetailsAction(sessionId);
    if (result.session) {
      setSessionDetails(result.session);
    }
    setLoading(false);
  };

  const handleGenerateDossier = async () => {
    if (!sessionDetails) return;
    setIsGenerating(true);
    try {
      const result = await generateDossierAction(sessionDetails);
      setAiData(result);
    } catch (error) {
      console.error("Erro ao gerar dossiê:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading && !selectedSessionId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!selectedSessionId) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8">
          <h1 className="font-headline-md text-headline-md text-primary">Gerador de Dossiê</h1>
          <p className="text-on-surface-variant">Selecione uma consulta para gerar o relatório premium.</p>
        </div>

        <div className="grid gap-4">
          {sessions.length === 0 ? (
            <div className="text-center py-12 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-zinc-300 mb-2">find_in_page</span>
              <p className="text-on-surface-variant">Nenhuma consulta encontrada.</p>
              <Link href="/consultation/new" className="text-primary font-bold hover:underline mt-2 block">
                Iniciar Nova Consultoria
              </Link>
            </div>
          ) : (
            sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectSession(s.id)}
                className="flex items-center gap-4 p-5 bg-white border border-outline-variant rounded-2xl hover:border-primary hover:shadow-md transition-all text-left"
              >
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center">
                   <AbstractFace className="w-8 h-8 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-on-surface">{s.client.name}</h3>
                  <p className="text-xs text-on-surface-variant">
                    {new Date(s.createdAt).toLocaleDateString('pt-BR')} • {s.status}
                  </p>
                </div>
                <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
          <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-4xl animate-pulse">
            magic_button
          </span>
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">IA Gerando Dossiê...</h2>
          <p className="text-on-surface-variant max-w-[280px] mx-auto italic">
            "Analisando traços faciais e cruzando com as observações do visagista..."
          </p>
        </div>
      </div>
    );
  }

  if (aiData) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32 print:pb-0 print:pt-0">
        {/* Branding Header - Escondido na impressão se houver papel timbrado, ou estilizado */}
        <div className="flex flex-col items-center mb-10 pt-4 print:mb-6">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-[20px] flex items-center justify-center mb-4 shadow-xl">
             <AbstractFace className="w-10 h-10 text-[#9B7D4E]" />
          </div>
          <h1 className="font-serif italic text-3xl text-[#1A1A1A] text-center mb-1">Dossiê Visagista</h1>
          <div className="h-[1px] w-20 bg-[#9B7D4E] mb-2"></div>
          <p className="text-[10px] uppercase tracking-[4px] text-zinc-400 font-bold">{sessionDetails?.barber?.shopName}</p>
        </div>

        {/* Before & After Comparison */}
        <section className="mb-12 print:mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
               <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden border border-zinc-100 shadow-2xl flex items-center justify-center bg-zinc-50">
                  {sessionDetails?.photoBefore ? (
                    <img src={sessionDetails.photoBefore} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <AbstractFace className="w-12 h-12 text-zinc-200 mx-auto mb-2" />
                      <p className="text-[8px] text-zinc-400 uppercase tracking-tighter">Estado Atual</p>
                    </div>
                  )}
               </div>
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[3px] text-center">Diagnóstico Inicial</p>
            </div>
            
            <div className="space-y-3">
               <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden border-2 border-[#9B7D4E] shadow-[0_20px_50px_rgba(155,125,78,0.15)] flex items-center justify-center bg-zinc-50">
                  {sessionDetails?.photoAfter ? (
                    <img src={sessionDetails.photoAfter} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <AbstractFace className="w-12 h-12 text-[#9B7D4E]/20 mx-auto mb-2" />
                      <p className="text-[8px] text-[#9B7D4E]/40 uppercase tracking-tighter">Projeção Estratégica</p>
                    </div>
                  )}
               </div>
               <p className="text-[10px] font-bold text-[#9B7D4E] uppercase tracking-[3px] text-center">Imagem Sugerida</p>
            </div>
          </div>
        </section>

        {/* Analysis Content */}
        <div className="space-y-8 print:space-y-6">
          <section className="bg-[#FDFCFB] p-8 rounded-[40px] border border-[#F5F0EB]">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold text-[#9B7D4E] bg-[#9B7D4E]/10 px-3 py-1 rounded-full uppercase tracking-widest">01</span>
              <h3 className="text-xl font-medium">Análise de Morfotipo</h3>
            </div>
            <p className="text-zinc-600 leading-relaxed text-sm">
              {aiData?.analiseMorfotipo}
            </p>
          </section>

          <section className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold text-[#9B7D4E] bg-[#9B7D4E]/10 px-3 py-1 rounded-full uppercase tracking-widest">02</span>
              <h3 className="text-xl font-medium">Projeto de Imagem</h3>
            </div>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#9B7D4E] text-xl">content_cut</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase mb-1">Cabelo & Estrutura</h4>
                  <p className="text-sm text-zinc-700 leading-snug">{aiData?.recomendacaoCabelo}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#9B7D4E] text-xl">face</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase mb-1">Barba & Visagismo Facial</h4>
                  <p className="text-sm text-zinc-700 leading-snug">{aiData?.recomendacaoBarba}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#1A1A1A] p-8 rounded-[40px] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9B7D4E]/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9B7D4E]">verified</span>
                Conclusão Estratégica
              </h3>
              <p className="text-white/70 italic leading-relaxed">
                "{aiData?.conclusao}"
              </p>
            </div>
          </section>
        </div>

        {/* Actions - Escondidos na Impressão */}
        <div className="mt-12 space-y-4 print:hidden">
          <button 
            onClick={() => window.print()}
            className="w-full bg-[#9B7D4E] text-white py-5 rounded-[24px] font-bold uppercase tracking-[2px] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">file_download</span>
            Baixar Dossiê PDF
          </button>
          <button 
            onClick={() => {
              setAiData(null);
              setSelectedSessionId(null);
              setSessionDetails(null);
            }}
            className="w-full text-zinc-400 py-4 font-bold uppercase tracking-[1px] text-xs hover:text-zinc-600 transition-colors"
          >
            Nova Consulta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">Revisão de Consulta</h1>
          <p className="text-on-surface-variant">Confirme os dados antes de gerar o dossiê final.</p>
        </div>
        <button onClick={() => setSelectedSessionId(null)} className="text-zinc-400 hover:text-primary">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-outline-variant overflow-hidden shadow-sm mb-8">
        <div className="p-6 bg-zinc-50 border-b border-outline-variant flex items-center gap-4">
          <div className="w-14 h-14 bg-zinc-200 rounded-2xl flex items-center justify-center overflow-hidden">
             {sessionDetails?.client?.photoUrl ? (
               <img src={sessionDetails.client.photoUrl} className="w-full h-full object-cover" />
             ) : (
               <AbstractFace className="w-10 h-10 text-zinc-400" />
             )}
          </div>
          <div>
            <h2 className="font-bold text-lg text-on-surface">{sessionDetails?.client?.name}</h2>
            <p className="text-xs text-on-surface-variant">{sessionDetails?.client?.email || "Sem e-mail"}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-label-md text-zinc-400 uppercase mb-2">Objetivo da Imagem</h3>
            <p className="text-on-surface">{sessionDetails?.subjectiveProfile?.desiredImage || "Não informado"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
               <h3 className="font-label-md text-zinc-400 uppercase mb-2">Essência</h3>
               <p className="text-on-surface">{sessionDetails?.subjectiveProfile?.essencePrimary || "-"}</p>
             </div>
             <div>
               <h3 className="font-label-md text-zinc-400 uppercase mb-2">Temperamento</h3>
               <p className="text-on-surface">{sessionDetails?.subjectiveProfile?.temperament || "-"}</p>
             </div>
          </div>

          <div>
            <h3 className="font-label-md text-zinc-400 uppercase mb-2">Observações do Visagista</h3>
            <p className="text-on-surface bg-zinc-50 p-4 rounded-xl border border-outline-variant italic">
              {sessionDetails?.visagistNotes || "Sem observações registradas."}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerateDossier}
        className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-label-caps text-label-caps uppercase tracking-widest shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
      >
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">magic_button</span>
        Gerar Dossiê Premium
      </button>
    </div>
  );
}


