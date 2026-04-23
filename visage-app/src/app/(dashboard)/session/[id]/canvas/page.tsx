"use client";

import React from "react";
import Link from "next/link";

export default function CanvasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <main className="max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="mb-xl-custom flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-label-caps text-label-caps text-secondary mb-xs-custom block uppercase tracking-widest">
            NEW SESSION
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">New Consultation</h2>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs md:text-right">
          Precision mapping of facial architecture for professional visagism analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg-custom">
        {/* Left: Upload & Analysis Area */}
        <div className="lg:col-span-7 flex flex-col gap-md-custom">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-surface-container border border-outline-variant group">
            {/* Grid Overlay */}
            <div className="absolute inset-0 visagism-grid pointer-events-none z-10 opacity-40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-xl-custom text-center z-20">
              <div className="w-24 h-24 rounded-full border border-dashed border-outline flex items-center justify-center mb-md-custom bg-white/50 backdrop-blur-sm group-hover:bg-white transition-all">
                <span className="material-symbols-outlined text-primary text-4xl">add_a_photo</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-xs-custom">Upload Portrait</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md-custom max-w-xs">
                High-resolution, front-facing photo with neutral lighting for accurate analysis.
              </p>
              <button className="bg-primary text-on-primary px-lg-custom py-sm-custom font-label-caps text-label-caps rounded-full active:scale-95 transition-transform uppercase tracking-widest">
                SELECT IMAGE
              </button>
            </div>

            {/* Sample/Mockup Background Image */}
            <img
              className="w-full h-full object-cover opacity-20 grayscale"
              alt="Front-facing portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs-BxGRcJCh0_CjfLRoKiXB6fUua8j3X1dLg_yRZqEOJUrkBpwRaDK1hYIM2OPatQflqGB3E0fmY4wvmmTQmtv2qhtuuQTbHssYN1OC_dShbcsp06DhJXhEXLyQhdhDDymn3_rrYr-9655WZ9Cj3m1hwCJoJsEJJ0KB3r_E6C9J14vmpgSNcX9etIUunCToW_9npVn-dza33zf9cKd51oXlGV6HXDG_TB253EcAz06RERDXCWv74jvMNOx0NOsoalxw8mefKAcH3l4"
            />

            {/* Facial Analysis Lines (SVG Overlay) */}
            <svg className="absolute inset-0 w-full h-full z-30 pointer-events-none opacity-60" viewBox="0 0 400 500">
              {/* Golden Ratio Lines Mockup */}
              <line stroke="#775a19" strokeDasharray="4" strokeWidth="0.5" x1="200" x2="200" y1="0" y2="500"></line>
              <ellipse cx="200" cy="220" fill="none" rx="100" ry="140" stroke="#775a19" strokeWidth="1"></ellipse>
              <line stroke="#775a19" strokeWidth="0.5" x1="100" x2="300" y1="180" y2="180"></line>
              <line stroke="#775a19" strokeWidth="0.5" x1="100" x2="300" y1="240" y2="240"></line>
              <line stroke="#775a19" strokeWidth="0.5" x1="100" x2="300" y1="320" y2="320"></line>
              {/* Vertex points */}
              <circle cx="200" cy="80" fill="#775a19" r="2"></circle>
              <circle cx="200" cy="360" fill="#775a19" r="2"></circle>
              <circle cx="100" cy="220" fill="#775a19" r="2"></circle>
              <circle cx="300" cy="220" fill="#775a19" r="2"></circle>
            </svg>
          </div>

          <div className="flex items-center justify-between p-md-custom bg-white border border-outline-variant rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-xs-custom">
              <span className="material-symbols-outlined text-secondary">info</span>
              <span className="font-body-md text-on-surface-variant">Analysis Engine V2.4 Active</span>
            </div>
            <div className="flex gap-xs-custom">
              <button className="p-xs-custom hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">zoom_in</span>
              </button>
              <button className="p-xs-custom hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Parameters & Controls */}
        <div className="lg:col-span-5 flex flex-col gap-lg-custom">
          {/* Face Shapes Selection */}
          <section>
            <div className="flex items-center justify-between mb-md-custom">
              <h3 className="font-headline-sm text-headline-sm text-primary">Face Morphotypes</h3>
              <span className="font-label-caps text-[10px] text-secondary">AUTO-DETECTED</span>
            </div>
            <div className="grid grid-cols-2 gap-sm-custom">
              {/* Oval */}
              <button className="flex flex-col items-center p-md-custom border-2 border-primary bg-white rounded-xl shadow-sm">
                <div className="w-12 h-16 border-2 border-primary rounded-[50%] mb-xs-custom"></div>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">OVAL</span>
              </button>
              {/* Square */}
              <button className="flex flex-col items-center p-md-custom border border-outline-variant hover:border-primary transition-colors bg-white rounded-xl group">
                <div className="w-14 h-14 border border-outline-variant group-hover:border-primary rounded-lg mb-xs-custom"></div>
                <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-primary uppercase tracking-widest">
                  SQUARE
                </span>
              </button>
              {/* Round */}
              <button className="flex flex-col items-center p-md-custom border border-outline-variant hover:border-primary transition-colors bg-white rounded-xl group">
                <div className="w-14 h-14 border border-outline-variant group-hover:border-primary rounded-full mb-xs-custom"></div>
                <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-primary uppercase tracking-widest">
                  ROUND
                </span>
              </button>
              {/* Diamond */}
              <button className="flex flex-col items-center p-md-custom border border-outline-variant hover:border-primary transition-colors bg-white rounded-xl group">
                <div className="w-14 h-14 border border-outline-variant group-hover:border-primary rotate-45 mb-xs-custom"></div>
                <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-primary uppercase tracking-widest">
                  DIAMOND
                </span>
              </button>
            </div>
          </section>

          {/* Professional Parameters */}
          <section className="flex flex-col gap-md-custom">
            <h3 className="font-headline-sm text-headline-sm text-primary border-b border-zinc-100 pb-xs-custom">
              Key Measurements
            </h3>
            <div className="space-y-sm-custom">
              <div className="flex justify-between items-center p-sm-custom bg-surface-container-low rounded-lg">
                <span className="font-body-md text-on-surface">Vertical Proportion</span>
                <span className="font-label-caps text-secondary">1 : 1.618</span>
              </div>
              <div className="flex justify-between items-center p-sm-custom bg-surface-container-low rounded-lg">
                <span className="font-body-md text-on-surface">Jawline Angle</span>
                <span className="font-label-caps text-secondary">128.4°</span>
              </div>
              <div className="flex justify-between items-center p-sm-custom bg-surface-container-low rounded-lg">
                <span className="font-body-md text-on-surface">Forehead Width</span>
                <span className="font-label-caps text-secondary">MEDIUM</span>
              </div>
            </div>
          </section>

          {/* Action Section */}
          <section className="mt-auto">
            <div className="p-lg-custom bg-secondary-container rounded-xl border border-secondary/20">
              <div className="flex items-start gap-sm-custom mb-md-custom">
                <span className="material-symbols-outlined text-secondary pt-1">auto_awesome</span>
                <p className="font-body-md text-on-secondary-container">
                  Based on initial analysis, a <strong className="font-bold">Short Boxed Beard</strong> with textured top
                  hair is recommended to balance the vertical profile.
                </p>
              </div>
              <button className="w-full bg-primary text-on-primary py-md-custom rounded-lg font-label-caps text-label-caps tracking-widest hover:opacity-90 active:scale-[0.98] transition-all uppercase">
                GENERATE RECOMMENDATIONS
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
