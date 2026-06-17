"use client";

import { RevealText } from "@/components/ui/RevealText";

const TREATMENTS = [
  {
    code: "RX-01",
    category: "Injectables",
    name: "Tox & Volume Restoration",
    description:
      "Anti-wrinkle treatment and dermal filler, mapped to facial musculature for movement that still looks like yours.",
    duration: "30–45 min",
    from: "£280",
  },
  {
    code: "RX-02",
    category: "Energy Devices",
    name: "HIFU & Radiofrequency",
    description:
      "Non-surgical skin tightening using focused ultrasound and RF to stimulate deep collagen remodelling.",
    duration: "60 min",
    from: "£450",
  },
  {
    code: "RX-03",
    category: "Skin Health",
    name: "Medical-Grade Peels & Microneedling",
    description:
      "Controlled exfoliation and collagen induction therapy, calibrated to your skin's barrier function.",
    duration: "45 min",
    from: "£220",
  },
  {
    code: "RX-04",
    category: "Recovery",
    name: "Cryotherapy & Red Light Recovery",
    description:
      "Performance-recovery protocols borrowed from elite sport, applied to skin and soft-tissue repair.",
    duration: "30 min",
    from: "£95",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-6 py-28 sm:px-10 lg:px-16">
      <RevealText className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-4xl text-fg sm:text-5xl">
          The Treatment Menu
        </h2>
        <p className="max-w-sm font-mono text-xs uppercase tracking-wider text-muted">
          Four protocols. One standard of evidence.
        </p>
      </RevealText>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
        {TREATMENTS.map((t, i) => (
          <RevealText
            key={t.code}
            delay={i * 0.08}
            className="group relative flex flex-col gap-4 bg-bg p-8 transition-colors duration-300 hover:bg-white/[0.03] sm:p-10"
          >
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-emerald">
              <span>{t.code}</span>
              <span className="text-muted">{t.category}</span>
            </div>
            <h3 className="font-display text-2xl text-fg sm:text-3xl">{t.name}</h3>
            <p className="text-sm leading-relaxed text-muted">{t.description}</p>
            <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-wider text-muted">
              <span>{t.duration}</span>
              <span className="text-fg">From {t.from}</span>
            </div>
          </RevealText>
        ))}
      </div>
    </section>
  );
}
