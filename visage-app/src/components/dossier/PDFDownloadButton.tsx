"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { DossierPDF } from "@/components/dossier/DossierPDF";

export function PDFDownloadButton({ data }: { data: any }) {
  // Verificamos se estamos no browser para renderizar o PDFLink (evita problemas de SSR)
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary">
        <Download size={20} />
      </button>
    );
  }

  return (
    <PDFDownloadLink document={<DossierPDF data={data} />} fileName={`Dossie-${data.client.name.replace(/ /g, "_")}.pdf`}>
      {/* 
        Não usamos (props) => {...} diretamente no className pq o TS do next às vezes reclama 
        Então extraímos o conteúdo.
      */}
      {({ blob, url, loading, error }) => (
        <button 
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
          title={loading ? "Gerando PDF..." : "Baixar PDF"}
          disabled={loading}
        >
          <Download size={20} className={loading ? "opacity-50" : "opacity-100"} />
        </button>
      )}
    </PDFDownloadLink>
  );
}
