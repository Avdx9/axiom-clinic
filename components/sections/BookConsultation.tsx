"use client";

import { Phone, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { RevealText, RevealWords } from "@/components/ui/RevealText";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function BookConsultation() {
  return (
    <section
      id="consultation"
      className="relative z-10 flex min-h-[80vh] scroll-mt-24 flex-col items-center justify-center gap-10 px-6 py-28 text-center"
    >
      <GlassPanel className="flex max-w-3xl flex-col items-center gap-8 px-8 py-12 sm:px-14 sm:py-16">
        <RevealText className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Limited consultation slots, weekly
        </RevealText>

        <h2 className="font-serif text-5xl font-medium tracking-tight text-stone-900 sm:text-7xl">
          <RevealWords text="Begin with a" />
          <br />
          <RevealWords text="clinical consultation." className="text-gold" />
        </h2>

        <RevealText delay={0.2} className="max-w-md text-sm text-stone-500 sm:text-base">
          Every protocol starts with a full biomarker panel and a
          45-minute consultation — a plan built around your own data, not
          a generic timeline.
        </RevealText>

        <RevealText delay={0.35}>
          <a
            href="mailto:consult@aura-longevity.london"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-wider text-stone-50 shadow-[0_8px_30px_-10px_rgba(180,154,91,0.6)] transition-transform duration-300 hover:scale-[1.03]"
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
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-6 font-mono text-xs uppercase tracking-wider text-stone-500"
        >
          <span className="inline-flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            020 7946 0000
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Harley Street, London W1
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            CQC Registered
          </span>
        </RevealText>
      </GlassPanel>
    </section>
  );
}
