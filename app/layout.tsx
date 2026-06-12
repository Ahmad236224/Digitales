import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Self-hosted via next/font — preloaded, font-display: swap, zero layout shift.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitales.pk"),
  title: {
    default: "Digitales — The Agency That Builds Brands and Ships Products",
    template: "%s · Digitales",
  },
  description:
    "Full-service digital agency and software product company across Pakistan, the UK, and the USA. Performance marketing, SEO, media buying, and enterprise software — measurable growth across three continents.",
  openGraph: {
    type: "website",
    siteName: "Digitales",
    title: "Digitales — Builds Brands and Ships Products",
    description:
      "Measurable digital growth across three continents. Marketing and technology, in coordination.",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: "/",
    languages: {
      "en-PK": "https://digitales.pk",
      "en-GB": "https://digitalesuk.com",
      "en-US": "https://digitalesusa.org",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
