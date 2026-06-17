"use client";

import { ShieldCheck, Stethoscope, Award } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ABOUT_IMAGE } from "@/lib/placeholderImages";

const CREDENTIALS = [
  { icon: ShieldCheck, label: "CQC Registered" },
  { icon: Stethoscope, label: "Doctor-led protocols" },
  { icon: Award, label: "12 years in aesthetic medicine" },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-28 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <RevealText className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-800/50 lg:aspect-auto">
          {/* Placeholder photography: desaturated by default, reveals full
              color on hover — keeps the page's resting state monochrome
              while still rewarding interaction. Swap `src` for real
              clinic photography before launch. */}
          <img
            src={ABOUT_IMAGE}
            alt="Interior of the Axiom clinic treatment room"
            loading="lazy"
            className="h-full w-full object-cover grayscale opacity-80 transition-all duration-500 hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent" />
        </RevealText>

        <div className="flex flex-col justify-center gap-8">
          <GlassPanel className="p-8 sm:p-10">
            <RevealText className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-champagne">
              About Axiom
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="font-sans text-3xl font-bold leading-tight tracking-tighter text-neutral-50 sm:text-4xl">
                Aesthetic medicine, run with clinical rigour.
              </h2>
            </RevealText>
            <RevealText delay={0.2} className="mt-5 text-sm leading-relaxed text-neutral-400 sm:text-base">
              Founded by NHS-trained clinicians, Axiom treats skin and
              recovery the way sports medicine treats the body — diagnostics
              first, protocols second, results measured rather than assumed.
            </RevealText>
          </GlassPanel>

          <RevealText delay={0.3} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CREDENTIALS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-neutral-800/50 bg-neutral-950/60 px-4 py-3 backdrop-blur-xl"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-champagne" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
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
