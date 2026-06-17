import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, CaretRight } from "@phosphor-icons/react/dist/ssr";
import CircuitBackground from "@/components/ui/CircuitBackground";
import FinalCta from "@/components/home/FinalCta";
import { SERVICES, SERVICE_DETAIL } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  const detail = SERVICE_DETAIL[params.slug];
  return {
    title: service?.name ?? "Service",
    description: detail?.answer.slice(0, 155),
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  const detail = SERVICE_DETAIL[params.slug];
  if (!service || !detail) notFound();

  const related = SERVICES.filter((s) => s.slug !== params.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    provider: { "@type": "Organization", name: "Digitales" },
    areaServed: ["Pakistan", "United Kingdom", "United States"],
    description: detail.answer,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-night">
        <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-full" />
        <CircuitBackground className="opacity-[0.13]" />
        <div className="container-d relative pt-36 pb-16">
          <nav className="flex items-center gap-2 font-body text-xs text-muted">
            <Link href="/" className="hover:text-gold">Home</Link><CaretRight size={11} />
            <Link href="/services" className="hover:text-gold">Services</Link><CaretRight size={11} />
            <span className="text-white">{service.name}</span>
          </nav>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-6xl">
            {detail.headline}
          </h1>
          {/* AEO answer paragraph */}
          <p className="mt-7 max-w-3xl rounded-card border-l-2 border-gold bg-night-surface/60 px-6 py-5 font-body text-lg leading-relaxed text-muted">
            {detail.answer}
          </p>
          {detail.pullQuote && (
            <p className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug text-white">
              {detail.pullQuote}
            </p>
          )}
        </div>
      </section>

      {/* Services list */}
      <section className="bg-night">
        <div className="container-d section">
          {detail.whyItems && (
            <div className="mb-14">
              <p className="eyebrow">{detail.whyTitle}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {detail.whyItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-card border border-white/[0.07] bg-night-surface p-5">
                    <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-gold" />
                    <p className="font-body text-sm text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="eyebrow">What We Deliver</p>
          <h2 className="mt-3 h2">{detail.serviceTitle ?? `Our ${service.name} Services`}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {detail.services.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-card border border-white/[0.07] bg-night-surface p-5">
                <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-gold" />
                <p className="font-body text-sm text-white">{item}</p>
              </div>
            ))}
          </div>

          {detail.tools && (
            <div className="mt-14">
              <p className="eyebrow">Tools & Platforms</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {detail.tools.map((t) => (
                  <span key={t} className="rounded-full border border-white/12 bg-night-surface px-4 py-2 font-body text-sm text-muted">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related services */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="h2">Related Services</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="group rounded-card border border-white/[0.07] bg-night-surface p-6 transition hover:-translate-y-1 hover:border-purple/60">
                <h3 className="font-display text-lg font-semibold text-white">{r.name}</h3>
                <p className="mt-2 font-body text-sm text-muted">{r.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gold">Explore <ArrowRight size={14} weight="bold" /></span>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-card border border-white/[0.08] bg-night-surface p-10 text-center">
            <h3 className="mx-auto max-w-xl font-display text-2xl font-bold text-white">{detail.ctaText}</h3>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/free-audit" className="btn-gold">
                {detail.ctaLabel} {!detail.ctaLabel.includes("→") && <ArrowRight size={16} weight="bold" />}
              </Link>
              <Link href="/contact" className="btn-ghost-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
