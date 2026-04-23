import React from "react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="mb-xl-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md-custom">
          <div>
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-xs-custom block">
              Studio Overview
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Dashboard</h2>
          </div>
          <div className="text-right">
            <p className="font-body-md text-on-surface-variant">Monday, Oct 24</p>
            <p className="font-body-lg text-body-lg font-medium">8 Consultations Remaining</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Daily Schedule (Main Column) */}
        <div className="md:col-span-8 space-y-md-custom">
          <h3 className="font-headline-sm text-headline-sm mb-md-custom flex items-center gap-xs-custom">
            <span className="material-symbols-outlined">calendar_today</span>
            Today's Schedule
          </h3>

          {/* Appointment Card 1 (Active/Next) */}
          <div className="bg-surface-container-lowest border border-outline-variant p-md-custom rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all hover:border-secondary group">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex gap-md-custom">
                <div className="w-16 h-16 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all shrink-0">
                  <img
                    alt="Julian Thorne"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC57k-pTqVi_eINZ7ICLBkAqSPwGf1dTf9KtjWRu4Puwhyx2EqGlQHetqbXRCQT3PMvdez8GTzM-92yLBHWpti657ynp7SzAglK6zjmaXajWWrXPRRFePt7iEo-INsfU2eG2jssDj56a4JfGqZQHxI0QigFEpQxxYDNCGVgDSMhLVHZ9q2ZgmYvNc-JBXBYozQ1_0ZydLBMVFAKG6y_oGA3WSeqkfkHGNVLmvKAAFBg1nxc97fWl1vl5aQZppFvYa9Vj0V1v6DM08Bf"
                  />
                </div>
                <div>
                  <span className="font-label-caps text-[10px] text-secondary-fixed-dim bg-primary px-xs-custom py-[2px] rounded uppercase mb-xs-custom inline-block">
                    Next Appointment
                  </span>
                  <h4 className="font-headline-sm text-headline-sm">Julian Thorne</h4>
                  <p className="font-body-md text-on-surface-variant">Full Visagism Profile • 10:30 AM</p>
                </div>
              </div>
              <Link
                href="/session/1"
                className="bg-primary text-on-primary font-label-caps text-label-caps px-md-custom py-sm-custom rounded-full hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-xs-custom w-full sm:w-auto justify-center"
              >
                Start Analysis
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Appointment Card 2 */}
          <div className="bg-white border border-zinc-100 p-md-custom rounded-lg flex items-center justify-between transition-all hover:bg-surface-container-low">
            <div className="flex items-center gap-md-custom">
              <div className="text-on-surface-variant font-label-caps w-16 text-center shrink-0">11:45</div>
              <div>
                <h4 className="font-body-lg text-body-lg font-medium">Marcus Sterling</h4>
                <p className="font-body-md text-on-surface-variant">Beard Sculpting & Mapping</p>
              </div>
            </div>
            <button className="border border-outline-variant text-on-background font-label-caps text-label-caps px-md-custom py-sm-custom rounded-full hover:bg-surface-container transition-all uppercase tracking-widest hidden sm:block">
              Details
            </button>
          </div>

          {/* Appointment Card 3 */}
          <div className="bg-white border border-zinc-100 p-md-custom rounded-lg flex items-center justify-between transition-all hover:bg-surface-container-low">
            <div className="flex items-center gap-md-custom">
              <div className="text-on-surface-variant font-label-caps w-16 text-center shrink-0">14:00</div>
              <div>
                <h4 className="font-body-lg text-body-lg font-medium">Adrian Chen</h4>
                <p className="font-body-md text-on-surface-variant">First-time Consultation</p>
              </div>
            </div>
            <button className="border border-outline-variant text-on-background font-label-caps text-label-caps px-md-custom py-sm-custom rounded-full hover:bg-surface-container transition-all uppercase tracking-widest hidden sm:block">
              Details
            </button>
          </div>
        </div>

        {/* Stats & Quick Actions (Side Column) */}
        <div className="md:col-span-4 space-y-md-custom">
          {/* Visagism Tool Preview */}
          <div className="bg-primary text-on-primary p-md-custom rounded-lg relative overflow-hidden aspect-square flex flex-col justify-end">
            <img
              alt="Visagism overlay"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYe3U6zzICdXSYC8e1Eoba7Xz97cBxaAREml58dIP63L5I0z0qIhHH2MMvqb-w7pPD4br_HiPVH2hxVt8CRsCVTK0GYactN616_iLNjvSwrFXLC9r3fB83LqOFrcaMFdtbwpfBVlz0t2jzCN2x2CFRqyKU9yzH5hwrWKX_7NXJiNXrmblm5ac3i2O6OEkwrSCawfzLAgYq1_UVLT4fGPZ4BSvUToEYqR4vM6k82yTlekZsS2lNXArKnkh6h8lAELVKvrxZdA7bRcop"
            />
            <div className="relative z-10">
              <span className="font-label-caps text-secondary-fixed text-[10px] uppercase tracking-widest mb-xs-custom block">
                AI Assistant
              </span>
              <h3 className="font-headline-sm text-headline-sm text-white mb-sm-custom">Face Mapping Tool</h3>
              <p className="font-body-md text-zinc-400 mb-md-custom">
                Scan facial proportions to determine ideal geometric hair patterns.
              </p>
              <button className="w-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps py-sm-custom rounded uppercase tracking-widest hover:opacity-90 transition-opacity">
                Launch Camera
              </button>
            </div>
          </div>

          {/* Client Insights */}
          <div className="bg-surface-container p-md-custom rounded-lg border border-zinc-100">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-md-custom">
              Daily Insights
            </h3>
            <div className="space-y-sm-custom">
              <div className="flex items-center justify-between">
                <span className="font-body-md text-on-surface-variant">New Clients</span>
                <span className="font-headline-sm text-headline-sm">3</span>
              </div>
              <div className="w-full h-[1px] bg-outline-variant/30"></div>
              <div className="flex items-center justify-between">
                <span className="font-body-md text-on-surface-variant">Average Score</span>
                <span className="font-headline-sm text-headline-sm">94%</span>
              </div>
              <div className="w-full h-[1px] bg-outline-variant/30"></div>
              <div className="flex items-center justify-between">
                <span className="font-body-md text-on-surface-variant">Premium Services</span>
                <span className="font-headline-sm text-headline-sm">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual FAB */}
      <button className="fixed right-6 bottom-24 md:bottom-12 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          add
        </span>
      </button>
    </main>
  );
}
