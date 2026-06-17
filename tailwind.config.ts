import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Single accent token — everything else in the palette is plain
        // Tailwind neutral-*, used directly (bg-neutral-950, text-neutral-50,
        // text-neutral-400) rather than aliased, so the classes in this
        // codebase match the literal utility names in the brief.
        champagne: "#d4af37",
      },
      fontFamily: {
        // Clean sans everywhere — no display serif. Headers lean on
        // font-bold + tracking-tighter for weight instead of a second
        // typeface, per the "ultra-premium clinical" directive.
        sans: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
