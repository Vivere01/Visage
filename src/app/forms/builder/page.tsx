"use client";

import React, { useState } from "react";
import Link from "next/link";

type QuestionType = "text" | "choice" | "rating";

interface Question {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[];
}

export default function FormBuilder() {
  const [title, setTitle] = useState("Meu Questionário de Visagismo");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", label: "Qual o seu principal objetivo com sua imagem hoje?", type: "text" },
  ]);
  const [isSharing, setIsSharing] = useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("standard_form");
    if (saved) {
      const { title, questions } = JSON.parse(saved);
      setTitle(title);
      setQuestions(questions);
    }
  }, []);

  const addQuestion = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setQuestions([...questions, { id: newId, label: "", type: "text" }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, label: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, label } : q));
  };

  const [isSaving, setIsSaving] = useState(false);

  const saveAsStandard = () => {
    const formData = { title, questions };
    localStorage.setItem("standard_form", JSON.stringify(formData));
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const copyLink = () => {
    const link = `https://visage-app.vercel.app/f/${Math.random().toString(36).substr(2, 6)}`;
    navigator.clipboard.writeText(link);
    setIsSharing(true);
    setTimeout(() => setIsSharing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="fixed top-16 left-0 w-full bg-white dark:bg-black px-6 py-4 flex items-center justify-between z-40 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-sm text-headline-sm">Criar Formulário</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={saveAsStandard}
            className="border border-primary text-primary px-4 py-2 rounded-full font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">{isSaving ? 'check' : 'save'}</span>
            {isSaving ? 'Salvo!' : 'Salvar Padrão'}
          </button>
          <button 
            onClick={copyLink}
            className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-sm">{isSharing ? 'check' : 'share'}</span>
            {isSharing ? 'Copiado!' : 'Compartilhar'}
          </button>
        </div>
      </header>

      <main className="pt-32 px-6 max-w-lg mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Form Settings */}
        <section className="space-y-4">
          <div className="space-y-2">
            <label className="font-label-md text-on-surface-variant uppercase tracking-tighter">Título do Questionário</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary py-2 font-headline-sm text-headline-sm outline-none transition-colors"
            />
          </div>
        </section>

        {/* Questions List */}
        <section className="space-y-6">
          <h2 className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Perguntas</h2>
          
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div 
                key={q.id} 
                className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant group relative animate-in zoom-in-95 duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold">
                       <span className="text-xs">0{index + 1}</span>
                    </div>
                    <textarea 
                      value={q.label}
                      onChange={(e) => updateQuestion(q.id, e.target.value)}
                      placeholder="Digite sua pergunta aqui..."
                      className="w-full bg-transparent border-none outline-none resize-none font-body-lg"
                      rows={2}
                    />
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-label-caps uppercase tracking-wider text-on-surface-variant">
                         Resposta Aberta
                       </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeQuestion(q.id)}
                    className="text-outline hover:text-error transition-colors p-1"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addQuestion}
            className="w-full py-6 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary transition-colors">add_circle</span>
            <span className="font-label-caps text-xs text-outline uppercase tracking-widest group-hover:text-primary transition-colors">Adicionar Campo</span>
          </button>
        </section>

        {/* Preview Footer (Floating) */}
        <div className="fixed bottom-24 left-0 w-full px-6 pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto">
            <button 
              className="w-full bg-zinc-900 text-white py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">visibility</span>
              Visualizar Prévia
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
