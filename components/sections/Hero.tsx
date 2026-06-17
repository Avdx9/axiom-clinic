"use client";

import { RevealText, RevealWords } from "@/components/ui/RevealText";

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-10 pt-10 sm:px-10 sm:pt-12 lg:px-16">
      <RevealText className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <span className="font-mono">AXIOM — LONDON</span>
        <span className="hidden font-mono sm:inline">
          MAYFAIR · BY CONSULTATION ONLY
        </span>
      </RevealText>

      <div className="flex flex-1 flex-col items-start justify-center">
        <RevealText className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-emerald">
          Clinical aesthetics, engineered for results
        </RevealText>

        <h1 className="font-display text-[16vw] font-light leading-[0.9] tracking-tight text-fg sm:text-[10vw] lg:text-[7.5vw]">
          <RevealWords text="Performance" />
          <br />
          <RevealWords text="Aesthetics" className="text-emerald" />
        </h1>

        <RevealText delay={0.3} className="mt-8 max-w-md text-base text-muted sm:text-lg">
          Evidence-led injectables, energy-based devices and recovery
          protocols — delivered with the precision of a clinical trial and
          the discretion of a private members&apos; club.
        </RevealText>
      </div>

      <RevealText
        delay={0.4}
        className="flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6"
      >
        <div className="flex gap-8 font-mono text-xs uppercase tracking-wider text-muted sm:gap-10">
          <span>Mayfair, London</span>
          <span className="hidden sm:inline">CQC Registered</span>
        </div>
        <a
          href="#consultation"
          className="group relative overflow-hidden rounded-full border border-emerald/40 px-6 py-3 text-sm uppercase tracking-wider text-fg transition-colors hover:border-emerald"
        >
          <span className="relative z-10">Book Consultation</span>
          <span className="absolute inset-0 -z-0 bg-emerald/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
      </RevealText>
    </section>
  );
}
