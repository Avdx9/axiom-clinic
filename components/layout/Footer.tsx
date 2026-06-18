/**
 * Deliberately the one place on the page that's NOT light/airy/glassy —
 * a solid stone-950 block to ground the bottom of the page, per the brief.
 * No glassmorphism, no canvas showing through: this sits in normal DOM
 * flow above the fixed canvas, so it simply occludes it.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 bg-stone-950 px-6 py-12 text-stone-50 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-xl font-medium tracking-tight">AURA</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-stone-400">
            The Architecture of Longevity
          </p>
        </div>

        <p className="max-w-md font-mono text-[10px] uppercase tracking-wider text-stone-400">
          © {new Date().getFullYear()} Aura Longevity. All treatments carry
          risk — full consent process completed prior to booking.
        </p>
      </div>
    </footer>
  );
}
