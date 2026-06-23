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
    default: "Digitales — Digital Marketing Agency & Performance Marketing Agency",
    template: "%s · Digitales",
  },
  description:
    "Full-service digital marketing agency and performance marketing agency delivering data-driven digital marketing services, SEO, media buying, and custom software solutions across PK, UK, and USA.",
  openGraph: {
    type: "website",
    siteName: "Digitales",
    title: "Digitales — Digital Marketing Agency & Performance Marketing Agency",
    description:
      "Full-service digital marketing agency and performance marketing agency delivering data-driven digital marketing services, SEO, media buying, and custom software solutions across PK, UK, and USA.",
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
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
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
        <main className="min-w-0 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
