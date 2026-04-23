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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* TopAppBar */}
        <header className="bg-white/90 backdrop-blur-md dark:bg-zinc-950/90 text-zinc-900 dark:text-zinc-50 fixed top-0 w-full z-50 border-b border-zinc-100 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center h-16 px-6 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined hover:opacity-70 transition-opacity active:scale-95 duration-200 cursor-pointer">
                menu
              </span>
              <h1 className="text-lg font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
                Visage Studio
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-8 items-center font-sans antialiased text-sm tracking-wide uppercase">
                <Link
                  className="text-zinc-900 dark:text-zinc-50 font-bold hover:opacity-70 transition-opacity active:scale-95 duration-200"
                  href="/"
                >
                  Home
                </Link>
                <a
                  className="text-zinc-400 dark:text-zinc-500 hover:opacity-70 transition-opacity active:scale-95 duration-200"
                  href="#"
                >
                  Consults
                </a>
                <a
                  className="text-zinc-400 dark:text-zinc-500 hover:opacity-70 transition-opacity active:scale-95 duration-200"
                  href="#"
                >
                  Clients
                </a>
                <a
                  className="text-zinc-400 dark:text-zinc-500 hover:opacity-70 transition-opacity active:scale-95 duration-200"
                  href="#"
                >
                  Settings
                </a>
              </nav>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-100">
                <img
                  alt="Barber profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7lWL_J_9-ouFvFoIsdwopvgRrk7pugN8MWmQ1wnqHp5G2lAfjjQs4igMkqFrrvPA42Auvz9MGQuEPDXnaPIKkGhlUahKLZ_fWddQNtRCjG9yvFPQhN2bAJzbUMVjU9mUyqMIEYcArLtSZ--eRfEHRHX6sZorB1V_P3R6SHndzUnxE8R0MI80xKEmMll0PFNotZirpmJTWQz_GKlKdjcPnpNGz4aXIQ6yGze4vQJEIeSpyrcOdljToKMUcEc67W70OuvTwS0HIy5Wr"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="pt-24 pb-32 px-6">{children}</main>

        {/* BottomNavBar (Mobile Only) */}
        <nav className="md:hidden bg-white/95 backdrop-blur-lg dark:bg-zinc-950/95 text-zinc-900 dark:text-zinc-50 fixed bottom-0 w-full z-50 pb-safe border-t border-zinc-100 dark:border-zinc-800 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-around items-center h-20 px-4 w-full">
            <Link
              className="flex flex-col items-center justify-center text-zinc-900 dark:text-zinc-50 border-t-2 border-zinc-900 dark:border-zinc-50 pt-2 active:opacity-80 transition-all"
              href="/"
            >
              <span className="material-symbols-outlined">home_max</span>
              <span className="text-[10px] font-medium tracking-tight uppercase">Home</span>
            </Link>
            <a
              className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 pt-2 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-80 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined">content_cut</span>
              <span className="text-[10px] font-medium tracking-tight uppercase">Consults</span>
            </a>
            <a
              className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 pt-2 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-80 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="text-[10px] font-medium tracking-tight uppercase">Clients</span>
            </a>
            <a
              className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 pt-2 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-80 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="text-[10px] font-medium tracking-tight uppercase">Settings</span>
            </a>
          </div>
        </nav>
      </body>
    </html>
  );
}

import Link from "next/link";

