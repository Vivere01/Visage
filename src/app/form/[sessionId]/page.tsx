"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Dados visuais baseados na Wiki (Módulo 1)
const TEMPERAMENTS = [
  { id: "CHOLERIC", name: "Colérico", desc: "Explosivo, liderança, prático, dominador. Energia alta.", color: "border-error" },
  { id: "SANGUINE", name: "Sanguíneo", desc: "Extrovertido, comunicativo, sociável, não passa sem ser notado.", color: "border-warning" },
  { id: "PHLEGMATIC", name: "Fleumático", desc: "Calmo, prático, confiável, diplomata, conservador.", color: "border-info" },
  { id: "MELANCHOLIC", name: "Melancólico", desc: "Sensível, perfeccionista, leal, introvertido, detalhista.", color: "border-primary" },
];

const HAIR_TYPES = [
  { id: "1", name: "Liso (1a, 1b, 1c)" },
  { id: "2", name: "Ondulado (2a, 2b, 2c)" },
  { id: "3", name: "Cacheado (3a, 3b, 3c)" },
  { id: "4", name: "Crespo (4a, 4b, 4c)" },
];

const ESSENCES = [
  { id: "CLASSIC", name: "Clássica", desc: "Elegância, tradição, sobriedade" },
  { id: "ROMANTIC", name: "Romântica", desc: "Suavidade, sensualidade, acolhimento" },
  { id: "NATURAL", name: "Natural", desc: "Autenticidade, simplicidade, conforto" },
  { id: "DRAMATIC", name: "Dramática", desc: "Impacto, autoridade, presença" },
  { id: "CREATIVE", name: "Criativa", desc: "Originalidade, ousadia, vanguarda" },
  { id: "NAIVE", name: "Ingênua", desc: "Jovialidade, frescor, descontração" },
];

export default function ClientQuizPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = React.use(params);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const handleSelect = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else submitQuiz();
  };

  const submitQuiz = () => {
    // Real API call here
    alert("Questionário finalizado! O barbeiro já pode gerar o seu dossiê.");
  };

  // Animações para transição de telas (Mobile-first feel)
  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col relative">
      {/* Progress Bar */}
      <div className="h-1 bg-bg-tertiary w-full fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((step + 1) / 5) * 100}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col pt-12 pb-24 px-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Temperamento */}
          {step === 0 && (
            <motion.div key="step-0" variants={variants} initial="enter" animate="center" exit="exit" className="flex-1 flex flex-col">
              <span className="text-primary text-sm font-semibold mb-2">Passo 1 de 5</span>
              <h1 className="text-2xl font-bold mb-2">Com qual temperamento você mais se identifica?</h1>
              <p className="text-text-secondary text-sm mb-8">Isso nos ajuda a entender a energia que sua imagem deve projetar.</p>
              
              <div className="grid grid-cols-1 gap-3">
                {TEMPERAMENTS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect("temperament", t.id)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition-all",
                      formData.temperament === t.id 
                        ? `border-primary bg-primary/10` 
                        : "border-white/5 bg-bg-card hover:border-white/10"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-lg">{t.name}</span>
                      {formData.temperament === t.id && <Check size={20} className="text-primary" />}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{t.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1: Cabelo */}
          {step === 1 && (
            <motion.div key="step-1" variants={variants} initial="enter" animate="center" exit="exit" className="flex-1 flex flex-col">
              <span className="text-primary text-sm font-semibold mb-2">Passo 2 de 5</span>
              <h1 className="text-2xl font-bold mb-8">Qual o seu tipo de cabelo?</h1>
              
              <div className="grid grid-cols-1 gap-3">
                {HAIR_TYPES.map(h => (
                  <button
                    key={h.id}
                    onClick={() => handleSelect("hairType", h.id)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition-all",
                      formData.hairType === h.id ? "border-primary bg-primary/10" : "border-white/5 bg-bg-card"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{h.name}</span>
                      {formData.hairType === h.id && <Check size={20} className="text-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Essência Visual */}
          {step === 2 && (
            <motion.div key="step-2" variants={variants} initial="enter" animate="center" exit="exit" className="flex-1 flex flex-col">
              <span className="text-primary text-sm font-semibold mb-2">Passo 3 de 5</span>
              <h1 className="text-2xl font-bold mb-2">Qual essência define seu estilo visual?</h1>
              <p className="text-text-secondary text-sm mb-6">Escolha o que mais se aproxima do seu dia a dia hoje.</p>
              
              <div className="grid grid-cols-2 gap-3">
                {ESSENCES.map(e => (
                  <button
                    key={e.id}
                    onClick={() => handleSelect("essence", e.id)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition-all flex flex-col h-full",
                      formData.essence === e.id ? "border-primary bg-primary/10" : "border-white/5 bg-bg-card"
                    )}
                  >
                    <span className="font-semibold mb-1">{e.name}</span>
                    <span className="text-xs text-text-secondary leading-tight">{e.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Estilo e Objetivo */}
          {step === 3 && (
            <motion.div key="step-3" variants={variants} initial="enter" animate="center" exit="exit" className="flex-1 flex flex-col">
              <span className="text-primary text-sm font-semibold mb-2">Passo 4 de 5</span>
              <h1 className="text-2xl font-bold mb-6">Objetivos e Rotina</h1>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">O que você deseja transmitir com sua imagem?</label>
                  <textarea 
                    className="w-full bg-bg-card border-white/10 rounded-xl p-4 min-h-[100px]"
                    placeholder="Ex: Quero passar mais autoridade no trabalho, mas sem perder a modernidade..."
                    value={formData.desiredImage || ""}
                    onChange={(e) => handleSelect("desiredImage", e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Qual a sua profissão / área de atuação?</label>
                  <input 
                    type="text"
                    className="w-full bg-bg-card border-white/10 rounded-xl p-4"
                    placeholder="Ex: Advogado, Designer, Empreendedor..."
                    value={formData.profession || ""}
                    onChange={(e) => handleSelect("profession", e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Lifestyle */}
          {step === 4 && (
            <motion.div key="step-4" variants={variants} initial="enter" animate="center" exit="exit" className="flex-1 flex flex-col">
              <span className="text-primary text-sm font-semibold mb-2">Passo 5 de 5</span>
              <h1 className="text-2xl font-bold mb-2">Como é a sua rotina?</h1>
              <p className="text-text-secondary text-sm mb-6">Ajuda a recomendarmos cortes que você consiga manter.</p>
              
              <div className="grid grid-cols-1 gap-3">
                {["Tenho tempo para arrumar o cabelo todo dia", "Preciso de algo prático, wash and go", "Uso boné/capacete com frequência", "Pratico esportes diariamente"].map(life => (
                  <button
                    key={life}
                    onClick={() => handleSelect("lifestyle", life)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition-all",
                      formData.lifestyle === life ? "border-primary bg-primary/10" : "border-white/5 bg-bg-card"
                    )}
                  >
                    {life}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FAB Footer Navigation */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-bg-primary via-bg-primary to-transparent z-50">
        <div className="max-w-md mx-auto flex gap-4">
          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="btn btn-secondary flex-1"
            >
              Voltar
            </button>
          )}
          <button 
            onClick={nextStep}
            className="btn btn-primary flex-[2] shadow-glow"
          >
            {step === 4 ? "Finalizar" : "Avançar"} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
