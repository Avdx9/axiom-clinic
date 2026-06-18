"use client";

import { Sparkles, FlaskConical, Zap, Snowflake } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { SERVICE_IMAGES } from "@/lib/placeholderImages";

const TREATMENTS = [
  {
    code: "LX-01",
    category: "Regenerative",
    name: "Exosome & PRP Therapy",
    description:
      "Platelet-derived growth factors and exosome concentrates, used to stimulate the body's own regenerative pathways.",
    duration: "45 min",
    from: "£420",
    icon: Sparkles,
    image: SERVICE_IMAGES.regenerative,
  },
  {
    code: "LX-02",
    category: "Diagnostics",
    name: "Biomarker & Longevity Panel",
    description:
      "A full blood panel plus epigenetic age testing — the baseline every protocol here is actually built from.",
    duration: "30 min",
    from: "£350",
    icon: FlaskConical,
    image: SERVICE_IMAGES.diagnostics,
  },
  {
    code: "LX-03",
    category: "Energy Devices",
    name: "HIFU & Radiofrequency",
    description:
      "Non-surgical skin tightening using focused ultrasound and RF to stimulate deep collagen remodelling.",
    duration: "60 min",
    from: "£450",
    icon: Zap,
    image: SERVICE_IMAGES.energyDevices,
  },
  {
    code: "LX-04",
    category: "Recovery",
    name: "Cryotherapy & IV Infusion",
    description:
      "Cold-exposure and targeted IV micronutrient therapy, calibrated to the deficits your panel actually shows.",
    duration: "30 min",
    from: "£180",
    icon: Snowflake,
    image: SERVICE_IMAGES.recovery,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-6 py-28 sm:px-10 lg:px-16">
      <RevealText className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-serif text-4xl font-medium tracking-tight text-stone-900 sm:text-5xl">
          The Treatment Menu
        </h2>
        <p className="max-w-sm font-mono text-xs uppercase tracking-wider text-stone-500">
          Four protocols. One standard of evidence.
        </p>
      </RevealText>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {TREATMENTS.map((t, i) => {
          const Icon = t.icon;
          return (
            <RevealText
              key={t.code}
              delay={i * 0.08}
              className="group relative overflow-hidden rounded-2xl shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden sm:h-56">
                {/* Full color, soft shadow — no desaturation this round */}
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
                <Icon className="absolute right-5 top-5 h-5 w-5 text-gold drop-shadow" aria-hidden="true" />
              </div>

              {/* Glass text block. Intentionally NOT using the shared
                  <GlassPanel> here — this card's parent already owns
                  rounded-2xl + overflow-hidden, so stacking GlassPanel's
                  own rounded/border utilities on top would cancel out. */}
              <div className="border-t border-white/40 bg-white/60 p-8 backdrop-blur-2xl sm:p-10">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-gold">
                  <span>{t.code}</span>
                  <span className="text-stone-500">{t.category}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-medium tracking-tight text-stone-900 sm:text-3xl">
                  {t.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">{t.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-stone-900/10 pt-4 font-mono text-xs uppercase tracking-wider text-stone-500">
                  <span>{t.duration}</span>
                  <span className="text-stone-900">From {t.from}</span>
                </div>
              </div>
            </RevealText>
          );
        })}
      </div>
    </section>
  );
}
