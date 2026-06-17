import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body copy — quiet, highly legible workhorse
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Display face — soft editorial serif, used sparingly for emotive headlines.
// Contrasts deliberately with the clinical mono below.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
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
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg font-sans text-fg antialiased selection:bg-emerald/30 selection:text-fg">
        {children}
      </body>
    </html>
  );
}
