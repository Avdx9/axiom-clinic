import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Translucent white glassmorphism panel — sits over the warm, undulating
 * silk surface and is what actually guarantees text contrast now that the
 * background is light rather than dark. Exact classes per spec:
 * bg-white/60 backdrop-blur-2xl border border-white/40 shadow-xl.
 *
 * Note: this component owns its own `rounded-2xl border` styling. If
 * nesting it inside a parent that already clips with `overflow-hidden` +
 * its own rounded corners (e.g. an image card), skip GlassPanel and apply
 * `bg-white/60 backdrop-blur-2xl` directly instead — two competing
 * `rounded-*`/`border-*` utilities is how Tailwind classes silently
 * cancel each other out.
 */
export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}
