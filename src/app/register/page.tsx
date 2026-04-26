"use client";

import React, { useState } from "react";
import { registerAction } from "@/lib/actions/auth";
import Link from "next/link";
import { AbstractFace } from "@/components/AbstractFace";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await registerAction(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 shadow-2xl -rotate-3">
            <AbstractFace className="w-12 h-12 text-white opacity-80" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary">Inicie sua Jornada</h1>
          <p className="text-on-surface-variant mt-2 font-body-md">Cadastre-se para criar dossiês incríveis</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-outline-variant space-y-5">
          {error && (
            <div className="p-4 bg-error-container text-on-error-container rounded-2xl text-sm font-medium animate-shake">
              {error}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-label-md font-medium text-on-surface ml-1">Seu Nome</label>
            <input
              name="name"
              type="text"
              required
              placeholder="ex: João Silva"
              className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-label-md font-medium text-on-surface ml-1">Nome da Barbearia/Studio</label>
            <input
              name="shopName"
              type="text"
              required
              placeholder="ex: Visage Studio"
              className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-label-md font-medium text-on-surface ml-1">E-mail Profissional</label>
            <input
              name="email"
              type="email"
              required
              placeholder="ex: contato@barbearia.com"
              className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-label-md font-medium text-on-surface ml-1">Senha</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-5 rounded-2xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Criando conta..." : "Criar Conta Grátis"}
            {!loading && <span className="material-symbols-outlined text-sm">person_add</span>}
          </button>
        </form>

        <p className="text-center text-on-surface-variant font-body-sm">
          Já possui conta?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
