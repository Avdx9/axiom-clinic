import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Frosted glass panel used behind text content so the particle field
 * underneath never competes with copy for attention. Deliberately heavier
 * blur/opacity than a typical UI card — legibility over the canvas is
 * non-negotiable here, not a nice-to-have.
 *
 * Note: this component owns its own `rounded-2xl border` styling. If you
 * nest it inside a parent that already clips with `overflow-hidden` +
 * its own rounded corners (e.g. an image card), skip GlassPanel and apply
 * `bg-black/40 backdrop-blur-md` directly instead — stacking two
 * conflicting `rounded-*`/`border-*` utilities is how Tailwind classes
 * silently cancel each other out.
 */
export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}
