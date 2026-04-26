import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Visagê — Consultoria de Imagem para Barbeiros",
  description:
    "Transforme cortes de cabelo em consultoria de imagem profissional. Análise facial, recomendações personalizadas e dossiê visagista.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Visagê",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#6C5CE7",
};

import { getSession } from "@/lib/auth";
import Link from "next/link";
import { AbstractFace } from "@/components/AbstractFace";
import { LogoutButton } from "@/components/LogoutButton";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased">
        {session && (
          <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 flex justify-between items-center px-6 h-16 max-w-lg mx-auto left-0 right-0">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface cursor-pointer hover:opacity-70">
                menu
              </span>
            </div>
            <div className="text-center flex flex-col">
              <span className="text-[8px] tracking-[0.3em] font-bold text-on-surface-variant uppercase">VISAGÊ STUDIO</span>
              <span className="text-[10px] font-black text-primary tracking-normal uppercase">{session.shopName}</span>
            </div>
            <div className="flex items-center gap-3">
              <LogoutButton />
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant overflow-hidden">
                <AbstractFace className="w-6 h-6 text-on-surface-variant" />
              </div>
            </div>
          </nav>
        )}

        <main className={`${session ? "pt-24" : ""} pb-32 px-margin-mobile max-w-lg mx-auto min-h-screen`}>
          {children}
        </main>

        {session && (
          <nav className="fixed bottom-0 w-full z-50 pb-safe bg-white/90 backdrop-blur-lg border-t border-neutral-100 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] flex justify-around items-center h-20 px-8 max-w-lg mx-auto left-0 right-0">
            <Link href="/" className="flex flex-col items-center justify-center text-neutral-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined">home_max</span>
            </Link>
            <Link href="/consultation/new" className="flex flex-col items-center justify-center text-neutral-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined">face_6</span>
            </Link>
            <Link href="/dossier/generate" className="flex flex-col items-center justify-center text-[#D4AF37] relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-[#D4AF37] after:rounded-full transition-all">
              <span className="material-symbols-outlined">analytics</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center justify-center text-neutral-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </nav>
        )}
      </body>
    </html>
  );
}



