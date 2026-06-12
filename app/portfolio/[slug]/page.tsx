import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CaretRight, Check } from "@phosphor-icons/react/dist/ssr";
import CircuitBackground from "@/components/ui/CircuitBackground";
import FinalCta from "@/components/home/FinalCta";
import { CASE_STUDIES } from "@/lib/site";

// Full write-up for the case the copy doc documents in detail.
const ALKHIDMAT = {
  overview: ["Client: Alkhidmat Foundation", "Campaign: Ramadan Online Donation Drive", "Duration: Ramadan 2021 — 30 days", "Markets: Pakistan · Gulf · UK · Europe"],
  challenge: "Alkhidmat Foundation required a high-performance online donation campaign across Pakistan, the Gulf, and Europe during Ramadan 2021 — one of the most competitive periods in the charitable sector. The target CPA was US$12, a 30% reduction on the previous year's already-strong benchmark.",
  approach: [
    "Applied first-party audience data from the prior year to warm targeting from day one.",
    "Deployed IMO app placements to reach NRPs in the Gulf — a non-standard but high-performing channel.",
    "Built a full media mix across social, display, search, and programmatic to maximise conversion across three markets.",
    "Implemented market-specific creative variants and bidding strategies for Pakistan, UK, and Gulf segments.",
  ],
  results: [
    { metric: "63%", label: "Lower CPA than target — $4.40 vs $12.00" },
    { metric: "2x", label: "Higher conversion rate vs the prior year" },
    { metric: "4.75%", label: "Overall conversion rate across markets" },
  ],
};

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = CASE_STUDIES.find((c) => c.slug === params.slug);
  return { title: study ? `${study.client} — Case Study` : "Case Study" };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = CASE_STUDIES.find((c) => c.slug === params.slug);
  if (!study) notFound();
  const isAlkhidmat = study.slug === "alkhidmat-ramadan";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.client} — ${study.title}`,
    author: { "@type": "Organization", name: "Digitales" },
  };

  const related = CASE_STUDIES.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-night">
        <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-full" />
        <CircuitBackground className="opacity-[0.12]" />
        <div className="container-d relative pt-36 pb-16">
          <nav className="flex items-center gap-2 font-body text-xs text-muted">
            <Link href="/" className="hover:text-gold">Home</Link><CaretRight size={11} />
            <Link href="/portfolio" className="hover:text-gold">Portfolio</Link><CaretRight size={11} />
            <span className="text-white">{study.client}</span>
          </nav>
          <span className="mt-6 inline-block rounded-full bg-gold px-3 py-1 font-body text-xs font-semibold text-purple-deep">{study.category}</span>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-6xl">
            {study.client}: {study.title}
          </h1>
          <p className="mt-6 font-display text-5xl font-extrabold text-gold">{study.result}</p>
          <p className="mt-1 font-body text-muted">{study.resultLabel}</p>
        </div>
      </section>

      {isAlkhidmat ? (
        <section className="bg-night">
          <div className="container-d section">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ALKHIDMAT.overview.map((o) => (
                <div key={o} className="rounded-card border border-white/[0.07] bg-night-surface px-5 py-4 font-body text-sm text-muted">{o}</div>
              ))}
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="h2">The Challenge</h2>
                <p className="mt-4 lede">{ALKHIDMAT.challenge}</p>
              </div>
              <div>
                <h2 className="h2">Our Approach</h2>
                <ul className="mt-4 space-y-3">
                  {ALKHIDMAT.approach.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-sm leading-relaxed text-muted">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-xs font-bold text-gold">{i + 1}</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="h2">Results</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {ALKHIDMAT.results.map((r) => (
                  <div key={r.label} className="rounded-card border border-white/[0.08] bg-night-surface p-8 text-center">
                    <p className="font-display text-5xl font-extrabold text-gold">{r.metric}</p>
                    <p className="mt-3 font-body text-sm text-muted">{r.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-night">
          <div className="container-d section">
            <div className="rounded-card border border-white/[0.08] bg-night-surface p-10">
              <h2 className="h2">{study.title}</h2>
              <p className="mt-4 max-w-2xl lede">
                The full structured write-up for this engagement — challenge,
                strategy, and verified results — is being prepared as an
                SEO-indexed case-study page.
              </p>
              <div className="mt-6 flex items-center gap-2 font-body text-sm text-muted">
                <Check size={16} weight="bold" className="text-gold" /> Category: {study.category}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="h2">Related Case Studies</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/portfolio/${r.slug}`} className="group rounded-card border border-white/[0.07] bg-night-surface p-6 transition hover:-translate-y-1 hover:border-purple/60">
                <span className="font-body text-[0.7rem] font-semibold uppercase tracking-wider text-gold">{r.category}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">{r.client}</h3>
                <p className="mt-1 font-body text-sm text-muted">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
