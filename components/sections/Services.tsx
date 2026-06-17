"use client";

import { Syringe, Zap, Sparkles, Snowflake } from "lucide-react";
import { RevealText } from "@/components/ui/RevealText";
import { SERVICE_IMAGES } from "@/lib/placeholderImages";

const TREATMENTS = [
  {
    code: "RX-01",
    category: "Injectables",
    name: "Tox & Volume Restoration",
    description:
      "Anti-wrinkle treatment and dermal filler, mapped to facial musculature for movement that still looks like yours.",
    duration: "30–45 min",
    from: "£280",
    icon: Syringe,
    image: SERVICE_IMAGES.injectables,
  },
  {
    code: "RX-02",
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
    code: "RX-03",
    category: "Skin Health",
    name: "Medical-Grade Peels & Microneedling",
    description:
      "Controlled exfoliation and collagen induction therapy, calibrated to your skin's barrier function.",
    duration: "45 min",
    from: "£220",
    icon: Sparkles,
    image: SERVICE_IMAGES.skinHealth,
  },
  {
    code: "RX-04",
    category: "Recovery",
    name: "Cryotherapy & Red Light Recovery",
    description:
      "Performance-recovery protocols borrowed from elite sport, applied to skin and soft-tissue repair.",
    duration: "30 min",
    from: "£95",
    icon: Snowflake,
    image: SERVICE_IMAGES.recovery,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 px-6 py-28 sm:px-10 lg:px-16">
      <RevealText className="mb-16 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-sans text-4xl font-bold tracking-tighter text-neutral-50 sm:text-5xl">
          The Treatment Menu
        </h2>
        <p className="max-w-sm font-mono text-xs uppercase tracking-wider text-neutral-400">
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
              className="group relative overflow-hidden rounded-2xl border border-neutral-800/50"
            >
              <div className="relative h-48 w-full overflow-hidden sm:h-56">
                {/* Desaturated at rest, full color on hover — same treatment
                    as the About image, kept consistent across the page */}
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0"
                />
                {/* Heavy gradient ensures the icon stays legible regardless
                    of the photo underneath */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-neutral-950/10" />
                <Icon className="absolute right-5 top-5 h-5 w-5 text-champagne" aria-hidden="true" />
              </div>

              {/* Glass text block. Intentionally NOT using the shared
                  <GlassPanel> here — this card's parent already owns
                  rounded-2xl + overflow-hidden, so stacking GlassPanel's
                  own rounded/border utilities on top would cancel out. */}
              <div className="border-t border-neutral-800/50 bg-neutral-950/60 p-8 backdrop-blur-xl sm:p-10">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-champagne">
                  <span>{t.code}</span>
                  <span className="text-neutral-400">{t.category}</span>
                </div>
                <h3 className="mt-4 font-sans text-2xl font-bold tracking-tighter text-neutral-50 sm:text-3xl">
                  {t.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{t.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-neutral-800/50 pt-4 font-mono text-xs uppercase tracking-wider text-neutral-400">
                  <span>{t.duration}</span>
                  <span className="text-neutral-50">From {t.from}</span>
                </div>
              </div>
            </RevealText>
          );
        })}
      </div>
    </section>
  );
}
