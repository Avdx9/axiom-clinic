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
        <h2 className="font-display text-4xl text-fg sm:text-5xl">The Treatment Menu</h2>
        <p className="max-w-sm font-mono text-xs uppercase tracking-wider text-muted">
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
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <div className="relative h-48 w-full overflow-hidden sm:h-56">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale [mix-blend-mode:luminosity] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Heavy gradient ensures the icon + any overlaid text on
                    the image itself stays legible regardless of the photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />
                <Icon className="absolute right-5 top-5 h-5 w-5 text-emerald" aria-hidden="true" />
              </div>

              {/* Glass panel for the text block. Intentionally NOT using the
                  shared <GlassPanel> here — this card's parent already owns
                  rounded-2xl + overflow-hidden, so adding GlassPanel's own
                  rounded/border utilities on top would just cancel out. */}
              <div className="border-t border-white/10 bg-black/40 p-8 backdrop-blur-md sm:p-10">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-emerald">
                  <span>{t.code}</span>
                  <span className="text-muted">{t.category}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-fg sm:text-3xl">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-wider text-muted">
                  <span>{t.duration}</span>
                  <span className="text-fg">From {t.from}</span>
                </div>
              </div>
            </RevealText>
          );
        })}
      </div>
    </section>
  );
}
