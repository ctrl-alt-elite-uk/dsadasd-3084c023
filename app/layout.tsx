import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  siteConfig,
  accentRgbTriple,
  accentForegroundRgbTriple,
} from "@/lib/config";
import { localBusinessJsonLd } from "@/lib/jsonld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inline style writes the per-client accent colour to the root custom
  // properties so Tailwind's `bg-accent` etc. resolve it without a rebuild.
  const themeStyle = {
    ["--accent" as string]: accentRgbTriple(),
    ["--accent-foreground" as string]: accentForegroundRgbTriple(),
  } as React.CSSProperties;

  const jsonLd = localBusinessJsonLd();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      style={themeStyle}
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
