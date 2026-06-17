"use client";

import { Phone, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { RevealText, RevealWords } from "@/components/ui/RevealText";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function BookConsultation() {
  return (
    <section
      id="consultation"
      className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center gap-10 px-6 py-28 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950/95 via-neutral-950/60 to-transparent"
      />

      <GlassPanel className="flex max-w-3xl flex-col items-center gap-8 px-8 py-12 sm:px-14 sm:py-16">
        <RevealText className="font-mono text-xs uppercase tracking-[0.3em] text-champagne">
          Limited consultation slots, weekly
        </RevealText>

        <h2 className="font-sans text-5xl font-bold tracking-tighter text-neutral-50 sm:text-7xl">
          <RevealWords text="Begin with a" />
          <br />
          <RevealWords text="clinical consultation." className="text-champagne" />
        </h2>

        <RevealText delay={0.2} className="max-w-md text-sm text-neutral-400 sm:text-base">
          Every protocol starts with a 45-minute assessment — skin analysis,
          medical history and a treatment plan built around your goals, not
          ours.
        </RevealText>

        <RevealText delay={0.35}>
          <a
            href="mailto:consult@axiomclinic.london"
            className="group inline-flex items-center gap-3 rounded-full bg-champagne px-8 py-4 text-sm font-medium uppercase tracking-wider text-neutral-950 shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] transition-transform duration-300 hover:scale-[1.03]"
          >
            Book Consultation
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </RevealText>

        <RevealText
          delay={0.5}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6 font-mono text-xs uppercase tracking-wider text-neutral-400"
        >
          <span className="inline-flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
            020 7946 0000
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
            Mayfair, London W1
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-champagne" aria-hidden="true" />
            CQC Registered
          </span>
        </RevealText>
      </GlassPanel>

      <footer className="mt-12 w-full max-w-3xl border-t border-neutral-800/50 pt-6 text-[10px] uppercase tracking-wider text-neutral-400/70">
        © {new Date().getFullYear()} Axiom Clinic. All treatments carry risk —
        full consent process completed prior to booking.
      </footer>
    </section>
  );
}
