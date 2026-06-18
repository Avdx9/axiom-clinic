"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

const WORDS: { text: string; emphasis?: boolean }[] = [
  { text: "Ageing" },
  { text: "is" },
  { text: "a" },
  { text: "biomarker," },
  { text: "not", emphasis: true },
  { text: "a" },
  { text: "sentence." },
];

/**
 * Massive, elegant typography that fades/scales/de-blurs continuously as
 * the user scrolls through it — driven by live scroll progress
 * (useScroll + useTransform), not a one-shot reveal.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.94, 1, 1, 0.97]);
  const blurPx = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [6, 0, 0, 6]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <section ref={ref} className="relative z-10 flex min-h-[80vh] items-center justify-center px-6">
      <motion.div style={{ opacity, scale, filter }}>
        <GlassPanel className="px-8 py-10 sm:px-14 sm:py-14">
          <p className="max-w-3xl text-center font-serif text-4xl font-medium leading-[1.2] tracking-tight text-stone-900 sm:text-6xl">
            {WORDS.map((w, i) => (
              <span key={i} className={w.emphasis ? "text-gold" : undefined}>
                {w.text}{" "}
              </span>
            ))}
          </p>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
