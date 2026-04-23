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

import Link from "next/link";

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased">
        {/* TopAppBar */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md dark:bg-black/80 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center px-6 h-16 w-full">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-neutral-900 dark:text-neutral-100 cursor-pointer hover:opacity-70 transition-opacity scale-95 active:duration-150">
              menu
            </span>
          </div>
          <h1 className="font-inter tracking-[0.2em] font-black text-neutral-900 dark:text-neutral-50 uppercase text-sm">
            VISAGE STUDIO
          </h1>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden border border-neutral-200">
              <img
                alt="Consultant"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdbR5M-ug7G6me1z5x8bQ8IboFrgV9oyDPyDoOUirnrWOs4MqxrUtfnUjN75XoxxWN6dNM71gyD-cX-SpARHlUEJwQ52pZaX4ecUhwKuYaEqhUN_joFbhnEM1iusNRmQnO60jTC2u6i26yDQ7lXLgBRht8i8Ix8OgoE5_BAxdNrUdRcV5bAWxaVugPvC4k_tH2b394ilRwx2HZVX4RZ8TVypOS9uaNLcX9WOOMzDu5NfDKdn4pNhvPd6oOVkrvat8wYlBhEfDb8RFq"
              />
            </div>
          </div>
        </nav>

        <main className="pt-24 pb-32 px-margin-mobile max-w-lg mx-auto min-h-screen">
          {children}
        </main>

        {/* BottomNavBar */}
        <nav className="fixed bottom-0 w-full z-50 pb-safe bg-white/90 backdrop-blur-lg dark:bg-neutral-950/90 border-t border-neutral-100 dark:border-neutral-900 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] flex justify-around items-center h-20 px-8">
          <Link href="/" className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out cursor-pointer">
            <span className="material-symbols-outlined">home_max</span>
          </Link>
          <div className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out cursor-pointer">
            <span className="material-symbols-outlined">face_6</span>
          </div>
          <Link href="/dossier/generate" className="flex flex-col items-center justify-center text-[#D4AF37] relative after:content-[''] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-[#D4AF37] after:rounded-full transition-all duration-300 ease-out cursor-pointer">
            <span className="material-symbols-outlined">analytics</span>
          </Link>
          <div className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out cursor-pointer">
            <span className="material-symbols-outlined">person</span>
          </div>
        </nav>
      </body>
    </html>
  );
}


