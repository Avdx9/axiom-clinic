"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fade-up reveal, triggered on mount rather than on scroll-into-view.
 *
 * This used to be `whileInView`-gated (IntersectionObserver-based), which
 * works fine for a genuine "scroll down and watch it appear" reveal but
 * has a sharp edge: an element that's already inside the viewport at the
 * moment it mounts — above-the-fold content on initial load, or any
 * section a nav/anchor link jumps straight to — never gets an "entering
 * the viewport" transition for the observer to detect, so it can get
 * stuck at its hidden initial state indefinitely. That's what caused the
 * Hero headline and the consultation CTA to render blank. `animate`
 * sidesteps the whole problem: it always plays once mounted, regardless
 * of scroll position or how the user arrived at the section.
 *
 * Trade-off: sections no longer progressively reveal as you scroll to
 * each one — everything animates in together shortly after page load.
 * Reliability over that flourish, given it was the source of two
 * separate visible bugs.
 */
export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealWordsProps {
  text: string;
  className?: string;
}

/**
 * Word-by-word stagger reveal — same mount-triggered approach as above,
 * for the same reason.
 */
export function RevealWords({ text, className = "" }: RevealWordsProps) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.25em] inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_OUT }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
