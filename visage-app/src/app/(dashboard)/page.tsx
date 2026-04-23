import React from "react";
import Link from "next/link";
import { Plus, Users, LayoutDashboard, Clock } from "lucide-react";

export default function DashboardHomePage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      {/* Header Mobile */}
      <header className="px-6 pt-12 pb-6 border-b border-white/5 bg-bg-secondary">
        <div className="flex justify-between items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-lg">
            V
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
            <LayoutDashboard size={20} />
          </button>
        </div>
        <h1 className="text-3xl font-bold font-display">Visagê</h1>
        <p className="text-text-secondary text-sm">Bem-vindo, Barbeiro.</p>
      </header>

      <main className="flex-1 p-6 space-y-8">
        
        {/* Nova Sessão CTA */}
        <section>
          <Link href="/session/1" className="btn btn-primary shadow-glow flex gap-2">
            <Plus size={20} />
            <span>Nova Consultoria</span>
          </Link>
        </section>

        {/* Status Rápido */}
        <section className="grid grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 text-text-secondary mb-2">
              <Users size={16} />
              <span className="text-sm font-medium">Clientes</span>
            </div>
            <div className="text-3xl font-bold">1</div>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 text-text-secondary mb-2">
              <Clock size={16} />
              <span className="text-sm font-medium">Aguardando</span>
            </div>
            <div className="text-3xl font-bold text-warning">0</div>
          </div>
        </section>

        {/* Consultas Recentes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Sessões Recentes</h2>
            <button className="text-sm text-primary hover:text-primary-light">Ver todos</button>
          </div>
          
          <div className="space-y-3">
            <Link href="/session/1" className="block glass-card p-4 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-bg-elevated border border-white/10 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" alt="João Silva" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">João Silva</h3>
                    <p className="text-xs text-text-secondary">Hoje, 14:30</p>
                  </div>
                </div>
                <div className="text-xs font-medium px-2 py-1 bg-warning/10 text-warning rounded-full border border-warning/20">
                  Mockup
                </div>
              </div>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
