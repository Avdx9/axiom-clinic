import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body copy — clean, highly legible sans
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Display — an elegant, high-contrast serif for massive headlines.
// Cormorant Garamond rather than the more expected Playfair Display: a
// little more delicate and jewel-like, suits a longevity/skin clinic
// better than the slightly heavier, more "generic luxury" Playfair look.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

// Utility / data face — clinical labels, treatment codes, prices. Kept
// deliberately monospaced even in this warm palette: the contrast between
// soft serif headlines and clinical mono data is the brand's signature.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA — The Architecture of Longevity, London",
  description:
    "A Harley Street-adjacent longevity clinic for regenerative medicine, diagnostics, and recovery — warm clinical luxury, evidence-led protocols.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-stone-50 font-sans text-stone-900 antialiased selection:bg-gold/30 selection:text-stone-900">
        {children}
      </body>
    </html>
  );
}
