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
              <Link href="/sessions/new" className="text-primary font-bold hover:underline mt-2 block">
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
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32">
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-10 pt-4">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mb-2">
             <AbstractFace className="w-8 h-8 text-white opacity-80" />
          </div>
          <h1 className="font-inter tracking-[0.3em] font-black text-[10px] uppercase text-zinc-400 text-center">
            Dossiê Visagista Premium<br/>
            <span className="text-primary tracking-normal">{sessionDetails?.barber?.shopName}</span>
          </h1>
        </div>

        {/* Before & After Comparison */}
        <section className="mb-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-center">
               <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-outline-variant shadow-lg flex items-center justify-center bg-zinc-50">
                  {sessionDetails?.photoBefore ? (
                    <img src={sessionDetails.photoBefore} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <AbstractFace className="w-12 h-12 text-zinc-200 mx-auto mb-2" />
                      <p className="text-[8px] text-zinc-400 uppercase tracking-tighter">Aguardando Foto Real</p>
                    </div>
                  )}
               </div>
               <p className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest mt-1">Antes</p>
            </div>
            
            <div className="space-y-2 text-center">
               <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-secondary shadow-[0_0_25px_rgba(212,175,55,0.1)] flex items-center justify-center bg-zinc-50">
                  {sessionDetails?.photoAfter ? (
                    <img src={sessionDetails.photoAfter} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4">
                      <AbstractFace className="w-12 h-12 text-secondary/20 mx-auto mb-2" />
                      <p className="text-[8px] text-secondary/40 uppercase tracking-tighter">Projeção Visagista</p>
                    </div>
                  )}
               </div>
               <p className="text-[10px] font-label-caps text-secondary uppercase tracking-widest font-bold mt-1">Depois</p>
            </div>
          </div>
        </section>

        {/* Analysis Content */}
        <div className="space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">description</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm">Notas do Visagista</h3>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant text-on-surface-variant leading-relaxed">
              {sessionDetails?.visagistNotes || "Nenhuma observação manual descrita."}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm">Análise Personalizada (IA)</h3>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-white border border-outline-variant rounded-2xl shadow-sm">
                <h4 className="font-label-md text-primary uppercase mb-1">Diagnóstico</h4>
                <p className="text-body-md text-on-surface-variant leading-snug">
                  {aiData?.analiseMorfotipo} • {aiData?.temperamento}
                </p>
              </div>
              <div className="p-5 bg-white border border-outline-variant rounded-2xl shadow-sm">
                <h4 className="font-label-md text-primary uppercase mb-1">Recomendação do Visagista</h4>
                <div className="space-y-3 mt-2">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">content_cut</span>
                    <p className="text-sm"><strong>Cabelo:</strong> {aiData?.recomendacaoCabelo || sessionDetails?.visagistRecommendations}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">face</span>
                    <p className="text-sm"><strong>Barba/Rosto:</strong> {aiData?.recomendacaoBarba}</p>
                  </div>
                </div>
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
          <button 
            onClick={() => {
              setAiData(null);
              setSelectedSessionId(null);
              setSessionDetails(null);
            }}
            className="w-full border border-outline-variant py-4 rounded-2xl font-label-caps text-label-caps uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
          >
            Novo Dossiê
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


