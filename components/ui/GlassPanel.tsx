import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Frosted glass panel used behind EVERY text block so the now-subtle
 * particle texture underneath never threatens legibility. Heavier blur
 * (`backdrop-blur-xl`) and a near-opaque fill (`bg-neutral-950/60`) than a
 * typical UI card — this is the one place in the system where "guarantee
 * readability" beats "look delicate."
 *
 * Note: this component owns its own `border` styling. If you nest it
 * inside a parent that already clips with `overflow-hidden` + its own
 * rounded corners (e.g. an image card), skip GlassPanel and apply
 * `bg-neutral-950/60 backdrop-blur-xl` directly instead — stacking two
 * conflicting `rounded-*`/`border-*` utilities is how Tailwind classes
 * silently cancel each other out.
 */
export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-800/50 bg-neutral-950/60 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
