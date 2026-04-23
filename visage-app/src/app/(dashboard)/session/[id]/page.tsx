import React from "react";
import Link from "next/link";

export default async function SessionAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="max-w-7xl mx-auto">
      {/* Hero Profile Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-lg-custom mb-xl-custom">
        <div className="md:col-span-4 lg:col-span-3">
          <div className="relative group aspect-square rounded-xl overflow-hidden border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="Julian Vance"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY2vUFOBt3fo6s6JYCfQ-SVMY_fT2WTVKt2UNAWFQuxcEs9gUI1cYXp4nRPZjtPjKKUzgtW8oGntv6U0cU1si-UV1VdcI40dWHbRXfWJkralqMwEzKhLx0Mf3tqNhIhvOFxDrB52TnbczbKtv4OZ2T0dZlukuOJvxvqC2zAF6K5g9sOADZMjWkqnspbTM7VrqqAYf2wF9P6dGlz8cm4JQIJTjK95BXZ0b1q1u-9vIs7xePQuquPNMB97MYBSra-f9OvjUmT7I3zL1h"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-md-custom">
              <button className="bg-white/20 backdrop-blur-md text-white text-xs font-label-caps py-2 px-4 rounded-full border border-white/30 uppercase tracking-widest">
                Update Photo
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md-custom mb-md-custom">
            <div>
              <h1 className="font-headline-lg text-primary mb-xs-custom">Julian Vance</h1>
              <p className="font-body-lg text-on-surface-variant max-w-lg">
                Executive Client • Diamond Tier Member since 2022. Preferred style: Minimalist Taper.
              </p>
            </div>
            <div className="flex gap-xs-custom">
              <button className="bg-primary text-on-primary px-lg-custom py-xs-custom rounded-lg font-label-caps uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                Book Now
              </button>
              <button className="border border-outline-variant text-primary px-md-custom py-xs-custom rounded-lg font-label-caps uppercase tracking-widest hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined align-middle">more_horiz</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md-custom pt-md-custom border-t border-zinc-100">
            <div>
              <span className="block font-label-caps text-on-tertiary-container uppercase mb-base-custom">Face Shape</span>
              <span className="font-headline-sm text-primary">Angular Oval</span>
            </div>
            <div>
              <span className="block font-label-caps text-on-tertiary-container uppercase mb-base-custom">Hair Texture</span>
              <span className="font-headline-sm text-primary">Fine / Straight</span>
            </div>
            <div>
              <span className="block font-label-caps text-on-tertiary-container uppercase mb-base-custom">Viscosity</span>
              <span className="font-headline-sm text-primary">Medium</span>
            </div>
            <div>
              <span className="block font-label-caps text-on-tertiary-container uppercase mb-base-custom">Last Note</span>
              <span className="font-headline-sm text-secondary">Avoid Volume</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl-custom">
        {/* Left Column: Visagism & History */}
        <div className="lg:col-span-8 space-y-xl-custom">
          {/* Visagism Analysis Card */}
          <div className="bg-white border border-zinc-100 rounded-xl p-lg-custom shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-lg-custom">
              <h2 className="font-headline-md text-primary tracking-tight">Visagism Mapping</h2>
              <span className="font-label-caps text-secondary-fixed-dim bg-secondary/10 px-xs-custom py-base-custom rounded">
                Current Formula
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg-custom items-center">
              <div className="relative aspect-square bg-surface-container rounded-lg overflow-hidden border border-zinc-50">
                <img
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                  alt="Technical visagism overlay"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6yEJJk2MjJmxhpWwkc75czaCfKJdh_kgXy34XuPydQIBOKGJPo5vnQ2PnQ9Hq2CqgrdEPpjsQf2boZfKKT4iSfS5gUq4k9yao3BwkWkaECphbWoVDwkMh2DTF8RpCX39Nn-zLW_iCTyYgMemYwEPwVcWcadhmbAFjH1OydNGFfBdH5QgHAUoj8kgmKpu5nzpP7vOGDPl778elycEk50g1A08J1UvHPXya1jBiFC32RLz8dxQ3Yui_cgq8obLT6W_2BcQPcarG0s9"
                />
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="45" fill="none" r="30" stroke="#e9c176" strokeWidth="0.2"></circle>
                  <line stroke="#e9c176" strokeWidth="0.2" x1="20" x2="80" y1="45" y2="45"></line>
                  <line stroke="#e9c176" strokeWidth="0.2" x1="50" x2="50" y1="15" y2="75"></line>
                  <path d="M35 75 Q 50 85 65 75" fill="none" stroke="#e9c176" strokeWidth="0.5"></path>
                </svg>
              </div>
              <div className="space-y-md-custom">
                <div>
                  <h3 className="font-label-caps text-on-tertiary-container mb-xs-custom uppercase tracking-widest">
                    Proportions Analysis
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    The vertical third of the forehead is dominant. Recommending a side-swept fringe to minimize height and
                    balance the jawline.
                  </p>
                </div>
                <div>
                  <h3 className="font-label-caps text-on-tertiary-container mb-xs-custom uppercase tracking-widest">
                    Temperament Mapping
                  </h3>
                  <p className="font-body-md text-on-surface-variant">
                    Melancholic/Sanguine blend. Prefers structured, clean lines that evoke precision and reliability.
                  </p>
                </div>
                <ul className="space-y-xs-custom">
                  <li className="flex items-center gap-xs-custom font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Side-part
                    emphasis
                  </li>
                  <li className="flex items-center gap-xs-custom font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Low-taper
                    transition
                  </li>
                  <li className="flex items-center gap-xs-custom font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-sm">check_circle</span> Matte finish
                    products
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Before & After Gallery */}
          <div>
            <div className="flex justify-between items-center mb-md-custom">
              <h2 className="font-headline-md text-primary tracking-tight">Session Progress</h2>
              <button className="text-secondary font-label-caps uppercase tracking-wider text-[11px] hover:underline transition-all">
                View Full Archive
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md-custom">
              {/* Card 1 */}
              <div className="group bg-white border border-zinc-100 rounded-xl overflow-hidden hover:border-zinc-300 transition-all duration-300">
                <div className="flex h-48">
                  <div className="w-1/2 relative">
                    <img
                      className="w-full h-full object-cover"
                      alt="Before"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIi2BSlnRFJN-k_QgZ9uEPGAhN7W8a9i6pUgWAgBGu8Q1pxBih9u2YBzHvXhEBAc6bGbdo7l_WDKmVcSDFBd1fmYYsTobJUY5w5XI9pHF4KEzZyjc0Ea7f6zGksRpW1YtLBsJhjFyx1IlZlmrpd4x8G4mAU1IIzE-BUa2fMzk5R3SOLoOAzchxFmxfc8RGho7i8SudsG92NIRwK3YwG04TxJwf4v-zjHZmrk3wpU7vI0CsA6COSOd8dM94tHjUR9ygcKemodV44rWJ"
                    />
                    <span className="absolute top-xs-custom left-xs-custom bg-black/50 text-white text-[8px] px-xs-custom py-0.5 rounded backdrop-blur-sm uppercase">
                      Before
                    </span>
                  </div>
                  <div className="w-1/2 relative border-l border-white">
                    <img
                      className="w-full h-full object-cover"
                      alt="After"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAE8dO3KbnvY7ESsDYXz1N6NYIk9fzIT0WRDDdsJMcjH7SA65iunRfX6GPOxkEa-Y9khXvz_tKayKhzocTcOQG287D4i9EYIjULVKBuu26WskP9QxdpVFmjvaDe0930oTfKA6uZkaIaZ58ar2S-dUiqzDfu04gy5m2uP0O9eYm7P4-6fS3C7PzjPRN7FDSSOJJpfytKveIjcPK_acLuEmYnwWdzd7FxUCJ436cMRySI6Iem8w-bxuvBLBVsOz3ywXYQFKC7zP8VDXx"
                    />
                    <span className="absolute top-xs-custom left-xs-custom bg-secondary text-white text-[8px] px-xs-custom py-0.5 rounded uppercase">
                      After
                    </span>
                  </div>
                </div>
                <div className="p-md-custom">
                  <div className="flex justify-between items-start mb-base-custom">
                    <span className="font-label-caps text-on-tertiary-container uppercase tracking-widest">
                      OCT 14, 2023
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium">Session #12</span>
                  </div>
                  <p className="font-body-md text-primary font-medium">French Crop + Low Taper</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Personal Notes */}
        <div className="lg:col-span-4 space-y-xl-custom">
          {/* Visit Timeline */}
          <div className="bg-surface-container-low rounded-xl p-lg-custom border border-outline-variant/30">
            <h2 className="font-headline-md text-primary tracking-tight mb-lg-custom">Visit Timeline</h2>
            <div className="space-y-lg-custom relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant/50">
              <div className="relative pl-lg-custom">
                <div className="absolute left-0 top-1.5 w-[22px] h-[22px] bg-primary rounded-full border-4 border-surface-container-low z-10"></div>
                <span className="block font-label-caps text-secondary-fixed-dim uppercase mb-base-custom tracking-widest">
                  Next Session
                </span>
                <div className="p-md-custom bg-white rounded-lg shadow-sm">
                  <p className="font-body-md text-primary font-bold">Nov 18, 2023</p>
                  <p className="text-[12px] text-on-surface-variant">Maintenance Trim & Lining</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Preferences */}
          <div className="bg-white border border-zinc-100 rounded-xl p-lg-custom shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <h2 className="font-headline-sm text-primary tracking-tight mb-md-custom">Routine & Products</h2>
            <div className="space-y-md-custom">
              <div className="flex items-center justify-between p-sm-custom bg-surface-container-lowest border border-zinc-50 rounded-lg">
                <div className="flex items-center gap-sm-custom">
                  <div className="w-10 h-10 bg-zinc-100 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-zinc-500">sanitizer</span>
                  </div>
                  <div>
                    <p className="font-body-md text-primary font-medium">Matte Clay</p>
                    <p className="text-[10px] uppercase text-on-tertiary-container">Visage Essential</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
