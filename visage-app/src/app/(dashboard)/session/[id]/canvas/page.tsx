"use client";

import React, { useState, useRef, useCallback } from "react";
import { Stage, Layer, Image as KonvaImage, Line, Rect } from "react-konva";
import useImage from "use-image";
import { Camera, Paintbrush, Eraser, Download, Check, Plus, ImagePlus, Undo, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Componente para URL externa/imagem
const URLImage = ({ src, x, y, width, height, draggable, onDragEnd }: any) => {
  const [img] = useImage(src);
  return (
    <KonvaImage
      image={img}
      x={x}
      y={y}
      width={width}
      height={height}
      draggable={draggable}
      onDragEnd={onDragEnd}
    />
  );
};

export default function CanvasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [clientPhoto, setClientPhoto] = useState<string | null>(null);
  const [clientImgObj] = useImage(clientPhoto || "");
  const [overlays, setOverlays] = useState<any[]>([]);
  
  // Desenho livre (mapeamento facial)
  const [lines, setLines] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser" | "move">("move");
  const [strokeColor, setStrokeColor] = useState("#FD79A8");

  const stageRef = useRef<any>(null);

  // Manipulação de upload de foto principal
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setClientPhoto(url);
    }
  };

  // Adicionar mockup/overlay (ex: cabelo PNG)
  const handleAddMockup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOverlays([...overlays, { id: Date.now(), src: url, x: 50, y: 50, width: 200, height: 200 }]);
    }
  };

  // Desenho livre
  const handleMouseDown = (e: any) => {
    if (tool === "move") return;
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, color: strokeColor, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || tool === "move") return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    
    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setLines(lines.slice(0, -1));
  };

  const handleClearAll = () => {
    setLines([]);
    setOverlays([]);
  };

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    // No mundo real, faríamos upload pro Supabase aqui
    const link = document.createElement("a");
    link.download = `mockup-${params.id}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Mobile */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-bg-secondary sticky top-0 z-10">
        <h1 className="font-semibold text-lg">Mockup & Análise</h1>
        <button onClick={handleExport} className="btn btn-primary px-4 py-2 min-h-0 min-w-0 h-10 rounded-full text-sm">
          <Download size={16} /> Salvar
        </button>
      </header>

      {/* Workspace */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-bg-primary">
        {!clientPhoto ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-bg-elevated rounded-full flex items-center justify-center mb-4 border border-white/10">
              <Camera size={32} className="text-text-secondary" />
            </div>
            <h2 className="text-xl font-medium mb-2">Foto do Cliente</h2>
            <p className="text-text-secondary text-sm mb-6 max-w-xs">
              Faça upload ou tire uma foto frontal do rosto do cliente para mapear traços e aplicar cortes.
            </p>
            <label className="btn btn-primary cursor-pointer">
              <Plus size={20} /> Escolher Foto
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        ) : (
          <div className="flex-1 relative touch-none bg-black/20" id="canvas-container">
            <Stage
              width={window.innerWidth}
              height={window.innerHeight - 140} // espaço pro bottom bar
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              ref={stageRef}
            >
              <Layer>
                {/* Imagem de Fundo (Cliente) */}
                {clientImgObj && (
                  <KonvaImage
                    image={clientImgObj}
                    x={0}
                    y={0}
                    width={window.innerWidth}
                    // Mantém proporção
                    height={(window.innerWidth / clientImgObj.width) * clientImgObj.height} 
                  />
                )}
                
                {/* Linhas de Desenho */}
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.tool === "eraser" ? "transparent" : line.color}
                    strokeWidth={line.tool === "eraser" ? 20 : 3}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}

                {/* Overlays (Cabelos/Barbas) */}
                {overlays.map((overlay, i) => (
                  <URLImage
                    key={overlay.id}
                    src={overlay.src}
                    x={overlay.x}
                    y={overlay.y}
                    width={overlay.width}
                    height={overlay.height}
                    draggable={tool === "move"}
                    onDragEnd={(e: any) => {
                      const newOverlays = [...overlays];
                      newOverlays[i] = {
                        ...newOverlays[i],
                        x: e.target.x(),
                        y: e.target.y(),
                      };
                      setOverlays(newOverlays);
                    }}
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        )}
      </main>

      {/* Bottom Bar (Ferramentas) */}
      {clientPhoto && (
        <footer className="bg-bg-elevated border-t border-white/10 p-4 safe-bottom">
          <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
            {/* Tools */}
            <div className="flex items-center gap-1 bg-bg-card p-1 rounded-full border border-white/5">
              <button 
                onClick={() => setTool("move")}
                className={cn("p-3 rounded-full transition-colors", tool === "move" ? "bg-primary text-white" : "text-text-secondary")}
              >
                <div className="w-5 h-5 flex items-center justify-center">M</div> {/* Ícone provisório para mover */}
              </button>
              <button 
                onClick={() => setTool("pen")}
                className={cn("p-3 rounded-full transition-colors", tool === "pen" ? "bg-primary text-white" : "text-text-secondary")}
              >
                <Paintbrush size={20} />
              </button>
              <button 
                onClick={() => setTool("eraser")}
                className={cn("p-3 rounded-full transition-colors", tool === "eraser" ? "bg-primary text-white" : "text-text-secondary")}
              >
                <Eraser size={20} />
              </button>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2">
              <button onClick={handleUndo} className="p-3 text-text-secondary hover:text-white rounded-full bg-bg-card border border-white/5">
                <Undo size={20} />
              </button>
              
              <label className="p-3 text-primary hover:text-primary-light rounded-full bg-primary/10 border border-primary/20 cursor-pointer">
                <ImagePlus size={20} />
                <input type="file" accept="image/png" className="hidden" onChange={handleAddMockup} />
              </label>

              <button onClick={handleClearAll} className="p-3 text-error hover:text-error/80 rounded-full bg-error/10 border border-error/20">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Color Picker Simplificado para a Caneta */}
          {tool === "pen" && (
            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-white/5">
              {["#FD79A8", "#6C5CE7", "#00B894", "#FDCB6E", "#FFFFFF"].map(color => (
                <button
                  key={color}
                  onClick={() => setStrokeColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-transform",
                    strokeColor === color ? "border-white scale-110" : "border-transparent"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </footer>
      )}
    </div>
  );
}
