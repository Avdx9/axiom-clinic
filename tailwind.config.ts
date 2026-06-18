import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Single accent token — everything else is plain Tailwind stone-*,
        // used directly (bg-stone-50, text-stone-900, text-stone-500) so
        // the classes in this codebase match the brief's literal names.
        gold: "#b49a5b",
      },
      fontFamily: {
        // Override Tailwind's built-in `font-serif` utility to point at
        // Cormorant Garamond, so headlines just use the standard class
        // name rather than a bespoke one.
        serif: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
