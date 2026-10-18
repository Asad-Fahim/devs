import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/metadata";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DEVS — Shopify Development, Themes & Support",
    template: "%s — DEVS",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    images: [{ url: "/images/og-default.svg", alt: "DEVS — Shopify development, themes, and support" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEVS — Shopify Development, Themes & Support",
    description: site.description,
    images: ["/images/og-default.svg"],
  },
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/icons/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-graphite antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
