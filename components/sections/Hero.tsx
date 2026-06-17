"use client";

import { ArrowDown } from "lucide-react";
import { RevealText, RevealWords } from "@/components/ui/RevealText";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-28 sm:px-10 lg:px-16">
      {/* Local gradient over the canvas — belt-and-suspenders on top of the
          canvas's own opacity-35, so hero copy always wins contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-neutral-950/90 via-neutral-950/50 to-transparent"
      />

      <RevealText className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-400">
        <span className="font-mono">AXIOM — LONDON</span>
        <span className="hidden font-mono sm:inline">MAYFAIR · BY CONSULTATION ONLY</span>
      </RevealText>

      <div className="flex flex-1 flex-col items-start justify-center">
        <GlassPanel className="max-w-2xl px-7 py-9 sm:px-10 sm:py-12">
          <RevealText className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-champagne">
            Clinical aesthetics, engineered for results
          </RevealText>

          <h1 className="font-sans text-[14vw] font-bold leading-[0.9] tracking-tighter text-neutral-50 sm:text-[8vw] lg:text-[5.5vw]">
            <RevealWords text="Performance" />
            <br />
            <RevealWords text="Aesthetics" className="text-champagne" />
          </h1>

          <RevealText delay={0.3} className="mt-7 max-w-md text-base text-neutral-400 sm:text-lg">
            Evidence-led injectables, energy-based devices and recovery
            protocols — delivered with the precision of a clinical trial and
            the discretion of a private members&apos; club.
          </RevealText>
        </GlassPanel>
      </div>

      <RevealText delay={0.4} className="flex flex-wrap items-end justify-between gap-6 border-t border-neutral-800/50 pt-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-champagne" aria-hidden="true" />
          Scroll
        </div>
        <a
          href="#consultation"
          className="group relative overflow-hidden rounded-full border border-champagne/40 px-6 py-3 text-sm uppercase tracking-wider text-neutral-50 transition-colors hover:border-champagne"
        >
          <span className="relative z-10">Book Consultation</span>
          <span className="absolute inset-0 -z-0 bg-champagne/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
      </RevealText>
    </section>
  );
}
