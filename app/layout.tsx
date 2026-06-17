import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body + display — one clean sans face for everything, per the
// "fonts are clean, sans-serif, and track tightly" directive.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Utility / data face — clinical, monospaced, used for labels, codes, prices
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AXIOM — Performance Aesthetics, London",
  description:
    "A Mayfair aesthetics clinic for evidence-led injectables, energy-based devices and recovery protocols. Clinical precision, engineered results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-neutral-950 font-sans text-neutral-50 antialiased selection:bg-champagne/30 selection:text-neutral-50">
        {children}
      </body>
    </html>
  );
}
