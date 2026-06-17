"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
 * Requirement 4: massive, bold typography that fades in (and back out) as
 * the user scrolls through it, driven entirely by useScroll/useTransform
 * rather than IntersectionObserver-style once-only reveals — this section
 * tracks scroll position continuously for the duration it's on screen.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.96]);
  const blurPx = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [6, 0, 0, 6]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[90vh] items-center justify-center px-6"
    >
      <motion.p
        style={{ opacity, scale, filter }}
        className="max-w-4xl text-center font-display text-4xl font-light leading-[1.15] text-fg sm:text-6xl md:text-7xl"
      >
        {WORDS.map((w, i) => (
          <span key={i} className={w.emphasis ? "text-emerald" : undefined}>
            {w.text}{" "}
          </span>
        ))}
      </motion.p>
    </section>
  );
}
