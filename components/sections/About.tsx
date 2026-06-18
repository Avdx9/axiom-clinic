"use client";

import { ShieldCheck, Stethoscope, Award } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ABOUT_IMAGE } from "@/lib/placeholderImages";

const CREDENTIALS = [
  { icon: ShieldCheck, label: "CQC Registered" },
  { icon: Stethoscope, label: "Doctor-led protocols" },
  { icon: Award, label: "12 years in longevity medicine" },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24 px-6 py-28 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Full color, soft shadow, rounded corners — no desaturation this
            round; the warm palette wants real warmth in the photography. */}
        <RevealText>
          <img
            src={ABOUT_IMAGE}
            alt="Interior of the Aura longevity clinic"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl lg:aspect-auto lg:h-full"
          />
        </RevealText>

        <div className="flex flex-col justify-center gap-8">
          <GlassPanel className="p-8 sm:p-10">
            <RevealText className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
              About Aura
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-stone-900 sm:text-4xl">
                Longevity medicine, run with clinical rigour.
              </h2>
            </RevealText>
            <RevealText delay={0.2} className="mt-5 text-sm leading-relaxed text-stone-500 sm:text-base">
              Founded by NHS-trained physicians, Aura treats ageing as a
              measurable process rather than an inevitability — biomarker
              panels first, regenerative protocols second, results tracked
              over years, not weeks.
            </RevealText>
          </GlassPanel>

          <RevealText delay={0.3} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CREDENTIALS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-white/40 bg-white/60 px-4 py-3 shadow-xl backdrop-blur-2xl"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
                  {label}
                </span>
              </div>
            ))}
          </RevealText>
        </div>
      </div>
    </section>
  );
}
