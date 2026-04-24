"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "CLIENT_INFO" | "UPLOAD_BEFORE" | "FACE_MARKUP" | "NOTES" | "UPLOAD_AFTER" | "GENERATING";

export default function NewConsultation() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("CLIENT_INFO");
  const [clientInfo, setClientInfo] = useState({ name: "", objective: "" });
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  
  // Canvas State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [photoConfig, setPhotoConfig] = useState({ x: 0, y: 0, scale: 1 });
  const [mockupType, setMockupType] = useState("male_standard");

  const handleNext = () => {
    if (step === "CLIENT_INFO") setStep("UPLOAD_BEFORE");
    else if (step === "UPLOAD_BEFORE") setStep("FACE_MARKUP");
    else if (step === "FACE_MARKUP") setStep("NOTES");
    else if (step === "NOTES") setStep("UPLOAD_AFTER");
    else if (step === "UPLOAD_AFTER") setStep("GENERATING");
  };

  const handleBack = () => {
    if (step === "UPLOAD_BEFORE") setStep("CLIENT_INFO");
    else if (step === "FACE_MARKUP") setStep("UPLOAD_BEFORE");
    else if (step === "NOTES") setStep("FACE_MARKUP");
    else if (step === "UPLOAD_AFTER") setStep("NOTES");
  };

  const onPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "before" | "after") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "before") setBeforePhoto(reader.result as string);
        else setAfterPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas Drawing Logic
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY) - rect.top;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#D4AF37"; // Gold color for drawing

    ctx.lineTo(x * (canvas.width / rect.width), y * (canvas.height / rect.height));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x * (canvas.width / rect.width), y * (canvas.height / rect.height));
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !beforePhoto) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderBaseImage();
  };

  const renderBaseImage = () => {
    if (!canvasRef.current || !beforePhoto) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = beforePhoto;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const drawWidth = canvas.width * photoConfig.scale;
      const drawHeight = (img.height / img.width) * drawWidth;
      ctx.drawImage(img, photoConfig.x, photoConfig.y, drawWidth, drawHeight);
      
      // Draw Mockup Guide
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height * 0.45, 90, 130, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    };
  };

  useEffect(() => {
    if (step === "FACE_MARKUP") {
      renderBaseImage();
    }
  }, [step, beforePhoto, photoConfig]);

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Stepper Header */}
      <div className="fixed top-16 left-0 w-full bg-surface-container-low px-6 py-4 flex items-center justify-between z-40 border-b border-outline-variant">
        <button onClick={handleBack} className={step === "CLIENT_INFO" ? "invisible" : ""}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
          {step.replace("_", " ")}
        </span>
        <div className="w-6"></div>
      </div>

      <main className="pt-32 pb-32 max-w-lg mx-auto px-6">
        {step === "CLIENT_INFO" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-headline-md text-headline-md text-primary">Dados do Cliente</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant uppercase tracking-tighter">Nome Completo</label>
                <input 
                  type="text" 
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl p-4 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Ex: Carlos Silva"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant uppercase tracking-tighter">Objetivo da Imagem</label>
                <textarea 
                  value={clientInfo.objective}
                  onChange={(e) => setClientInfo({...clientInfo, objective: e.target.value})}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl p-4 focus:outline-none focus:border-primary transition-colors h-32"
                  placeholder="O que o cliente deseja transmitir? (Autoridade, Acessibilidade, etc)"
                />
              </div>
            </div>
            <button 
              onClick={handleNext}
              disabled={!clientInfo.name}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        )}

        {step === "UPLOAD_BEFORE" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <h2 className="font-headline-md text-headline-md text-primary">Foto Antes</h2>
            <p className="text-on-surface-variant">Capture ou suba uma foto frontal do cliente.</p>
            
            <div className="aspect-[3/4] bg-surface-container-highest rounded-2xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              {beforePhoto ? (
                <img src={beforePhoto} className="w-full h-full object-cover" alt="Antes" />
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <span className="material-symbols-outlined text-4xl">photo_camera</span>
                  </div>
                  <p className="text-sm text-outline">Nenhuma imagem selecionada</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => onPhotoUpload(e, "before")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setBeforePhoto(null)}
                className="py-4 border border-outline-variant rounded-xl font-label-caps text-label-caps uppercase"
              >
                Limpar
              </button>
              <button 
                onClick={handleNext}
                disabled={!beforePhoto}
                className="bg-primary text-on-primary py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                Mapear Rosto
              </button>
            </div>
          </div>
        )}

        {step === "FACE_MARKUP" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="font-headline-md text-headline-md text-primary text-center">Mapeamento</h2>
            
            <div className="relative aspect-[3/4] bg-black rounded-2xl overflow-hidden touch-none border border-outline-variant shadow-2xl">
              <canvas 
                ref={canvasRef}
                width={400}
                height={533}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair"
              />
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-center gap-2">
                <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 flex gap-4 border border-white/10">
                   <button onClick={() => setPhotoConfig(c => ({...c, scale: c.scale + 0.1}))} className="text-white">
                     <span className="material-symbols-outlined text-xl">zoom_in</span>
                   </button>
                   <button onClick={() => setPhotoConfig(c => ({...c, scale: Math.max(0.5, c.scale - 0.1)}))} className="text-white">
                     <span className="material-symbols-outlined text-xl">zoom_out</span>
                   </button>
                </div>
                <button 
                  onClick={clearCanvas}
                  className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-label-caps text-xs uppercase tracking-widest border border-white/20"
                >
                  Limpar Traço
                </button>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant text-center px-4 italic leading-tight">
              Ajuste o zoom e use o dedo/caneta para desenhar linhas de marcação (ex: linha da mandíbula, altura do topete).
            </p>

            <button 
              onClick={handleNext}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition-all"
            >
              Confirmar Mapeamento
            </button>
          </div>
        )}


        {step === "NOTES" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="font-headline-md text-headline-md text-primary">Observações da Consulta</h2>
            <div className="space-y-2">
              <label className="font-label-md text-on-surface-variant uppercase tracking-tighter">Insights e Recomendações</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-surface-container-highest border border-outline-variant rounded-xl p-4 focus:outline-none focus:border-primary transition-colors h-64"
                placeholder="Descreva o que foi analisado e quais as sugestões de mudança para o cliente..."
              />
            </div>
            <button 
              onClick={handleNext}
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition-all"
            >
              Ir para Fotos Finais
            </button>
          </div>
        )}

        {step === "UPLOAD_AFTER" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
            <h2 className="font-headline-md text-headline-md text-primary">Foto Depois</h2>
            <p className="text-on-surface-variant">Resultado final após a consultoria/serviço.</p>
            
            <div className="aspect-[3/4] bg-surface-container-highest rounded-2xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center relative overflow-hidden">
              {afterPhoto ? (
                <img src={afterPhoto} className="w-full h-full object-cover" alt="Depois" />
              ) : (
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-6xl text-outline">add_a_photo</span>
                  <p className="text-sm text-outline">Subir foto do resultado</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => onPhotoUpload(e, "after")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <button 
              onClick={handleNext}
              disabled={!afterPhoto}
              className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              Gerar Dossiê IA
            </button>
          </div>
        )}

        {step === "GENERATING" && (
          <div className="space-y-8 animate-in fade-in duration-1000 text-center py-12">
            <div className="relative inline-block">
               <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
               <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-4xl animate-pulse">
                psychology
               </span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Processando Análise...</h2>
              <p className="text-on-surface-variant animate-pulse">Nosso motor de IA está gerando o seu dossiê visagista personalizado.</p>
            </div>
            
            <div className="space-y-4 text-left bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
               <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>Consolidando histórico de fotos</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span>Analisando objetivos do cliente: {clientInfo.name}</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-on-surface">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Gerando recomendações estéticas via IA</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-outline">
                  <span className="material-symbols-outlined">pending</span>
                  <span>Formatando PDF final com sua identidade</span>
               </div>
            </div>

            <button 
              onClick={() => router.push('/dossier/generate')} // Redirecting to result page
              className="w-full bg-zinc-900 text-white py-4 rounded-xl font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition-all opacity-0 animate-in fade-in fill-mode-forwards delay-1000"
            >
              Visualizar Dossiê
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
