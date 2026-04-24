"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DossierSettings() {
  const [logo, setLogo] = useState<string | null>(null);
  const [barberName, setBarberName] = useState("");

  const onLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        localStorage.setItem("barber_logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <header className="fixed top-16 left-0 w-full bg-white dark:bg-black px-6 py-4 flex items-center gap-4 z-40 border-b border-outline-variant">
        <Link href="/">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-headline-sm text-headline-sm">Configurações do Dossiê</h1>
      </header>

      <main className="pt-32 px-6 max-w-lg mx-auto space-y-8">
        <section className="space-y-4">
          <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Identidade Visual</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 p-6 bg-surface-container-low rounded-2xl border border-outline-variant">
              <div className="w-32 h-32 bg-surface-container-highest rounded-xl border-2 border-dashed border-outline-variant flex items-center justify-center relative overflow-hidden">
                {logo ? (
                  <img src={logo} className="w-full h-full object-contain" alt="Logo" />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-outline">add_business</span>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={onLogoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="text-center">
                <p className="font-body-md font-medium">Logo da Barbearia</p>
                <p className="text-xs text-on-surface-variant">Esta logo aparecerá no cabeçalho do PDF.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-on-surface-variant uppercase tracking-tighter">Nome do Barbeiro / Unidade</label>
              <input 
                type="text" 
                value={barberName}
                onChange={(e) => setBarberName(e.target.value)}
                className="w-full bg-surface-container-highest border border-outline-variant rounded-xl p-4 focus:outline-none focus:border-primary transition-colors"
                placeholder="Ex: John Doe - Studio Premium"
              />
            </div>
          </div>
        </section>

        <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
          <h3 className="font-label-caps text-xs text-primary uppercase mb-2">Dica de Visagista</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Personalizar seu dossiê com sua logo aumenta a percepção de valor da sua consultoria em até 40%. Seus clientes verão o trabalho como um produto premium exclusivo.
          </p>
        </section>

        <button 
          onClick={() => alert("Configurações salvas!")}
          className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition-all"
        >
          Salvar Alterações
        </button>
      </main>
    </div>
  );
}
