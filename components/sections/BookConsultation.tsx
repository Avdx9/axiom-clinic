"use client";

import { RevealText, RevealWords } from "@/components/ui/RevealText";

export default function BookConsultation() {
  return (
    <section
      id="consultation"
      className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center gap-10 px-6 py-28 text-center"
    >
      <RevealText className="font-mono text-xs uppercase tracking-[0.3em] text-emerald">
        Limited consultation slots, weekly
      </RevealText>

      <h2 className="max-w-3xl font-display text-5xl leading-[1.05] text-fg sm:text-7xl">
        <RevealWords text="Begin with a" />
        <br />
        <RevealWords text="clinical consultation." className="text-emerald" />
      </h2>

      <RevealText delay={0.2} className="max-w-md text-sm text-muted sm:text-base">
        Every protocol starts with a 45-minute assessment — skin analysis,
        medical history and a treatment plan built around your goals, not
        ours.
      </RevealText>

      <RevealText delay={0.35}>
        <a
          href="mailto:consult@axiomclinic.london"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-emerald px-8 py-4 text-sm font-medium uppercase tracking-wider text-bg shadow-[0_0_40px_-10px_rgba(46,230,168,0.8)] transition-transform duration-300 hover:scale-[1.03]"
        >
          Book Consultation
        </a>
      </RevealText>

      <RevealText
        delay={0.5}
        className="flex flex-wrap items-center justify-center gap-4 pt-10 font-mono text-xs uppercase tracking-wider text-muted sm:gap-6"
      >
        <span>020 7946 0000</span>
        <span>·</span>
        <span>Mayfair, London W1</span>
        <span>·</span>
        <span>CQC Registered</span>
      </RevealText>

      <footer className="mt-20 w-full border-t border-white/10 pt-6 text-[10px] uppercase tracking-wider text-muted/70">
        © {new Date().getFullYear()} Axiom Clinic. All treatments carry risk —
        full consent process completed prior to booking.
      </footer>
    </section>
  );
}
