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
 * Generic fade-up-on-scroll block. Use for paragraphs, labels, rows of
 * cards — anything that should arrive once, gently, and stay.
 */
export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
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
 * Word-by-word stagger reveal for hero-scale headlines. Each word is
 * clipped by an overflow-hidden wrapper and slides up from underneath it —
 * the "type carries personality" treatment for the page's biggest type.
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
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_OUT }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
