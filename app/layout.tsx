import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components/analytics/GoogleTagManager";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DeferredOverlays } from "@/components/modals/DeferredOverlays";
import { WhatsAppFab } from "@/components/shared/ClientActions";
import { MotionEnhancer } from "@/components/shared/MotionEnhancer";
import { CONTACT } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap", preload: false });

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(CONTACT.siteUrl),
  title: { default: "NESTRO — Interiors, Furniture & Lifestyle", template: "%s | NESTRO" },
  description: "Premium bespoke furniture, kitchens, curtains, upholstery, washroom finishes and complete interior solutions across the UAE.",
  verification: { google: "lL-_39FMA9xQWr5aLoLb6KOCVkIk1S8QRF94kKplpnk" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.png", type: "image/png" }], apple: "/icon.png" },
  openGraph: { title: "NESTRO — Interiors, Furniture & Lifestyle", description: "Furniture and interiors shaped around the rhythm of life in the UAE.", images: ["/images/nestro-hero.webp"], type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "NESTRO", url: CONTACT.siteUrl, description: "Premium furniture and interior lifestyle brand serving the UAE." };
  const bootstrap=`(()=>{const a=location.pathname==='/ar'||location.pathname.startsWith('/ar/');document.documentElement.lang=a?'ar':'en';document.documentElement.dir=a?'rtl':'ltr';})()`;
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} ${arabic.variable}`}>
      <head>
        <GoogleTagManagerHead />
      </head>
      <body>
        <GoogleTagManagerBody />
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
        <a href="#main-content" className="fixed start-3 top-3 z-[100] -translate-y-24 rounded-lg bg-charcoal px-4 py-3 text-sm text-white focus:translate-y-0">
          <span className="ltr-only">Skip to content</span>
          <span className="rtl-only">تجاوز إلى المحتوى</span>
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFab />
        <DeferredOverlays />
        <MotionEnhancer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
