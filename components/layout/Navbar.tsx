"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#services" },
  { label: "Consultation", href: "#consultation" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-neutral-800/50 bg-neutral-950/60 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <a href="#" className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-neutral-50">
          <Sparkles className="h-4 w-4 text-champagne" aria-hidden="true" />
          AXIOM
        </a>

        <div className="hidden items-center gap-10 font-mono text-xs uppercase tracking-wider text-neutral-400 sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-neutral-50">
              {l.label}
            </a>
          ))}
          <a
            href="#consultation"
            className="rounded-full border border-champagne/40 px-4 py-2 text-neutral-50 transition-colors hover:border-champagne"
          >
            Book
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-neutral-50 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-neutral-800/50 bg-neutral-950/80 px-6 py-6 backdrop-blur-xl sm:hidden">
          <div className="flex flex-col gap-5 font-mono text-sm uppercase tracking-wider text-neutral-400">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-neutral-50">
                {l.label}
              </a>
            ))}
            <a
              href="#consultation"
              onClick={() => setOpen(false)}
              className="w-fit rounded-full border border-champagne/40 px-4 py-2 text-neutral-50"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
