"use client";

import { ArrowDown } from "lucide-react";
import { RevealText, RevealWords } from "@/components/ui/RevealText";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-28 sm:px-10 lg:px-16">
      <RevealText className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-500">
        <span className="font-mono">AURA — LONDON</span>
        <span className="hidden font-mono sm:inline">HARLEY STREET · BY CONSULTATION ONLY</span>
      </RevealText>

      <div className="flex flex-1 flex-col items-start justify-center">
        <GlassPanel className="max-w-2xl px-7 py-9 sm:px-10 sm:py-12">
          <RevealText className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Regenerative medicine, measured precisely
          </RevealText>

          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
            <RevealWords text="The Architecture" />
            <br />
            <RevealWords text="of Longevity." className="text-gold" />
          </h1>

          <RevealText delay={0.3} className="mt-7 max-w-md text-base text-stone-500 sm:text-lg">
            Diagnostics, regenerative protocols and recovery medicine —
            built on biomarkers, not guesswork, and delivered with the
            discretion of a private clinic.
          </RevealText>
        </GlassPanel>
      </div>

      <RevealText delay={0.4} className="flex flex-wrap items-end justify-between gap-6 border-t border-stone-900/10 pt-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-stone-500">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-gold" aria-hidden="true" />
          Scroll
        </div>
        <a
          href="#consultation"
          className="group relative overflow-hidden rounded-full border border-gold/50 px-6 py-3 text-sm uppercase tracking-wider text-stone-900 transition-colors hover:border-gold"
        >
          <span className="relative z-10">Book Consultation</span>
          <span className="absolute inset-0 -z-0 bg-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
      </RevealText>
    </section>
  );
}
