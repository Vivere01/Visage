"use client";

import React, { useState } from "react";

export default function PublicForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h2 className="font-headline-md text-headline-md text-primary">Respostas Enviadas!</h2>
        <p className="text-on-surface-variant max-w-[280px]">
          Obrigado por preencher seu questionário de visagismo. Seu consultor entrará em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-lg mx-auto space-y-10 pt-12">
        <header className="space-y-2">
          <h1 className="font-headline-lg text-headline-lg text-primary">Questionário de Visagismo</h1>
          <p className="text-on-surface-variant">Conte-nos um pouco sobre você para prepararmos a melhor consultoria.</p>
        </header>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-label-lg font-medium">Qual seu principal objetivo com sua imagem hoje?</label>
              <textarea 
                required
                placeholder="Ex: Transmitir mais seriedade no trabalho..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 focus:border-primary outline-none transition-colors h-32"
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-label-lg font-medium">Quais estilos de barba/cabelo você mais admira?</label>
              <input 
                required
                type="text"
                placeholder="Ex: Estilo clássico, degradê..."
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-on-primary py-5 rounded-2xl font-label-caps text-label-caps uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
          >
            Enviar Respostas
          </button>
        </form>

        <footer className="text-center opacity-40 text-[10px] uppercase tracking-widest py-10">
          Powered by Visage Studio
        </footer>
      </div>
    </div>
  );
}
