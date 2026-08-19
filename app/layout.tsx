import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Two variable families, self-hosted from `app/fonts` — not fetched from
   Google at build or at runtime. Blueprint §10 asks for a minimal font
   strategy: this is two woff2 files, latin subset, wght axis only, ~85 KB
   total, both preloaded, both `display: swap` with a metric-adjusted
   fallback so the swap costs no layout shift. */
const fraunces = localFont({
  src: "./fonts/Fraunces-Variable.woff2",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
  preload: true,
  fallback: ["ui-serif", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: "Arial",
});

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VELA — Modern rituals, engineered for everyday life",
    template: "%s — VELA",
  },
  description:
    "VELA makes a small, considered range of skin and body care for people who want their daily routine to feel like something. Formulated in short ingredient lists. Made to be used up.",
  openGraph: {
    type: "website",
    siteName: "VELA",
    locale: "en_IN",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="sr-only-focusable">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
