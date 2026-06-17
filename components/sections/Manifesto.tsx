"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

const WORDS: { text: string; emphasis?: boolean }[] = [
  { text: "Skin" },
  { text: "is" },
  { text: "a" },
  { text: "system.", emphasis: true },
  { text: "We" },
  { text: "treat", emphasis: true },
  { text: "it" },
  { text: "like" },
  { text: "one." },
];

/**
 * Massive, bold typography that fades/scales/de-blurs continuously as the
 * user scrolls through it (useScroll + useTransform against live scroll
 * progress, not a one-shot whileInView reveal) — and per the brief's own
 * literal class names: font-sans + tracking-tighter, not the display serif
 * used for the brand headline elsewhere.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.96]);
  const blurPx = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [6, 0, 0, 6]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <section ref={ref} className="relative z-10 flex min-h-[90vh] items-center justify-center px-6">
      <motion.div style={{ opacity, scale, filter }}>
        <GlassPanel className="px-8 py-10 sm:px-14 sm:py-14">
          <p className="max-w-4xl text-center font-sans text-4xl font-bold leading-[1.1] tracking-tighter text-fg sm:text-6xl md:text-7xl">
            {WORDS.map((w, i) => (
              <span key={i} className={w.emphasis ? "text-emerald" : undefined}>
                {w.text}{" "}
              </span>
            ))}
          </p>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
