import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Database, FileText, ChartBar, Users, Megaphone, CurrencyDollar,
  Receipt, ChartPieSlice, PlugsConnected, Check,
} from "@phosphor-icons/react/dist/ssr";
import CircuitBackground from "@/components/ui/CircuitBackground";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Relief OS — Donation Management for NGOs",
  description:
    "Relief OS is the enterprise-grade donation management platform built exclusively for NGOs — donor lifecycle, campaigns, multi-currency, receipting, and impact reporting.",
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Relief OS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  offers: { "@type": "Offer", priceCurrency: "USD", price: "0", description: "Contact for pricing" },
  description: "Enterprise donation management platform built exclusively for NGOs.",
};

const PROBLEMS = [
  { Icon: Database, title: "Generic CRMs", body: "Standard CRMs were not built for donor cycles, campaign appeals, or impact reporting." },
  { Icon: FileText, title: "Spreadsheet Chaos", body: "Spreadsheets cannot scale with your mission — and they were never designed to." },
  { Icon: ChartBar, title: "Slow Reporting", body: "Manual reporting takes hours that should be spent on programmes, not administration." },
];

const FEATURES = [
  { Icon: Users, title: "Donor Lifecycle Management", body: "Track every donor from first gift to major-donor status — full history, segmentation, and communication records." },
  { Icon: Megaphone, title: "Campaign & Appeal Tracking", body: "Run multiple campaigns simultaneously. Set targets, track progress, and report outcomes per appeal." },
  { Icon: CurrencyDollar, title: "Multi-Currency & Multi-Region", body: "Accept donations in GBP, USD, PKR, AED and more. Designed for NGOs operating across borders." },
  { Icon: Receipt, title: "Automated Receipting & Tax", body: "Automated receipts, Gift Aid processing for UK charities, and tax-compliant documentation." },
  { Icon: ChartPieSlice, title: "Impact Reporting Dashboards", body: "Real-time dashboards and exportable reports that tell the story of your impact in numbers." },
  { Icon: PlugsConnected, title: "Integrations", body: "Stripe, PayPal, Salesforce and more — connects to the tools your team already uses." },
];

const TIERS = [
  { name: "Starter", scope: "Up to 500 donors", popular: false, features: ["Donor lifecycle management", "Single-currency receipting", "Standard dashboards"] },
  { name: "Growth", scope: "Up to 5,000 donors", popular: true, features: ["Everything in Starter", "Multi-currency & Gift Aid", "Campaign & appeal tracking", "Migration support"] },
  { name: "Enterprise", scope: "Unlimited donors", popular: false, features: ["Everything in Growth", "Dedicated success manager", "Custom integrations & SLA", "Full data migration"] },
];

const FAQ = [
  { q: "Is Relief OS cloud-based?", a: "Yes. Relief OS is a fully cloud-based SaaS platform — accessible from any device, with no local installation required." },
  { q: "What regions is it available in?", a: "Relief OS is available globally. It currently supports GBP, USD, PKR, and AED — with additional currencies available on the Enterprise plan." },
  { q: "Does it handle Gift Aid?", a: "Yes. Relief OS includes automated Gift Aid processing for UK-registered charities, with all required documentation generated automatically." },
  { q: "Can we migrate from our current system?", a: "Yes. Our team provides full data migration support as part of onboarding for Growth and Enterprise plan customers." },
  { q: "Is there a free trial?", a: "We offer a guided demonstration and a 30-day pilot on request. Contact our team to discuss what works best for your organisation." },
];

export default function ReliefOSPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* Hero — teal-on-purple */}
      <section className="relative overflow-hidden bg-night">
        <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-full" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]" style={{ background: "radial-gradient(50% 50% at 70% 10%, rgba(15,181,181,0.22), transparent 60%)" }} />
        <CircuitBackground className="opacity-[0.12]" />
        <div className="container-d relative flex flex-col items-center pt-36 pb-16 text-center">
          <span className="inline-block rounded-full border border-relief/40 px-3 py-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-relief">
            By Digitales · Enterprise SaaS · Built for NGOs
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.07] text-white sm:text-6xl">
            Donor Management, Reimagined for{" "}
            <span className="text-relief">Impact Organisations.</span>
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted">
            The enterprise-grade donation management platform built exclusively
            for NGOs — from campaign intake and donor lifecycle to multi-currency
            processing and impact reporting. One platform, every stage.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">Request a Demo <ArrowRight size={16} weight="bold" /></Link>
            <Link href="#features" className="btn-ghost-white">See Features</Link>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-16 w-full max-w-4xl overflow-hidden rounded-card border border-white/10 bg-night-surface">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="relative aspect-[16/8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/relief-os/screen.png"
                alt="Relief OS platform dashboard screen"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="text-center h2">NGOs Deserve Better Tools.</h2>
          <p className="mx-auto mt-3 max-w-lg text-center lede">
            Relief OS solves the three biggest bottlenecks impact organisations face daily.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="rounded-card border border-white/[0.07] bg-night-surface p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-relief/15 text-relief"><p.Icon size={22} weight="fill" /></span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core features */}
      <section id="features" className="bg-night">
        <div className="container-d section">
          <p className="eyebrow">Core Features</p>
          <h2 className="mt-3 max-w-2xl h2">Every Stage of the Donor Journey, One Platform.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-card border border-white/[0.07] bg-night-surface p-7">
                <f.Icon size={26} weight="fill" className="text-relief" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="text-center h2">Precision Pricing</h2>
          <p className="mx-auto mt-3 max-w-lg text-center lede">
            Scalable and transparent for impact organisations of every size.
          </p>
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-card border p-8 ${
                  t.popular ? "border-gold bg-night-raised" : "border-white/[0.08] bg-night-surface"
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 font-body text-[0.65rem] font-bold uppercase tracking-wider text-purple-deep">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-white">{t.name}</h3>
                <p className="mt-1 font-body text-sm text-muted">{t.scope}</p>
                <p className="mt-5 font-display text-2xl font-extrabold text-gold">Contact for pricing</p>
                <ul className="mt-6 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-body text-sm text-muted">
                      <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-relief" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`mt-8 w-full ${t.popular ? "btn-gold" : "btn-ghost-white"}`}>
                  {t.name === "Enterprise" ? "Talk to Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="bg-night">
        <div className="container-d section">
          <div className="relative overflow-hidden rounded-card border border-white/[0.08] bg-night-surface p-10 text-center sm:p-16">
            <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(15,181,181,0.18), transparent 60%)" }} />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">See Relief OS in Action.</h2>
              <p className="mx-auto mt-4 max-w-xl font-body text-muted">
                Book a personalised demonstration with our product team — we'll
                walk you through the platform with your use case in mind.
              </p>
              <Link href="/contact" className="btn-gold mt-8">Book a Demo <ArrowRight size={16} weight="bold" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="text-center h2">Relief OS — FAQ</h2>
          <div className="mt-12"><Accordion items={FAQ} /></div>
        </div>
      </section>
    </>
  );
}
