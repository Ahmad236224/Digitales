import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendUp, Buildings, Globe, Check, X } from "@phosphor-icons/react/dist/ssr";
import CircuitBackground from "@/components/ui/CircuitBackground";
import DartxForm from "@/components/dartx/DartxForm";

export const metadata: Metadata = {
  title: "DartX — White-Label Agency Partnership",
  description:
    "DartX is a white-label digital agency model. You bring the clients, we deliver the work under your brand — no overhead, no hiring, just results.",
};

const OPPORTUNITY = [
  { Icon: TrendUp, value: "$500B+", label: "Global digital marketing industry, and growing" },
  { Icon: Buildings, value: "80%", label: "Of SMBs need digital but can't afford full agencies" },
  { Icon: Globe, value: "24/7", label: "Delivery capability under your brand" },
];

const STEPS = [
  { n: "01", title: "Partner with DartX", body: "Apply, get onboarded, and receive your white-label toolkit." },
  { n: "02", title: "Bring Your Clients", body: "Sign the clients you already know, or find new ones under your agency brand." },
  { n: "03", title: "We Deliver", body: "Our team executes all work — strategy, creative, media, development — under your brand. Full NDA and confidentiality." },
  { n: "04", title: "You Invoice & Grow", body: "Bill your clients at your own rates. Revenue is shared with DartX on the agreed model." },
];

const COMPARE = [
  { benchmark: "Setup Time", alone: "Months of hiring", dartx: "Onboard in days" },
  { benchmark: "Team Hiring", alone: false, dartx: true },
  { benchmark: "Full Service Stack", alone: false, dartx: true },
  { benchmark: "White-Label Reporting", alone: "Build it yourself", dartx: "Included" },
  { benchmark: "NDA & Confidentiality", alone: "Your responsibility", dartx: "Standard" },
  { benchmark: "Dedicated Account Manager", alone: false, dartx: true },
];

export default function DartXPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night">
        <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-full" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]" style={{ background: "radial-gradient(50% 50% at 70% 10%, rgba(240,180,40,0.14), transparent 60%)" }} />
        <CircuitBackground className="opacity-[0.12]" />
        <div className="container-d relative grid items-center gap-12 pt-36 pb-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> White-Label Agency Model
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
              Launch Your Agency.<br /><span className="text-gold">We Power It.</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-muted">
              You bring the clients, we deliver the work under your brand — with
              full confidentiality, professional output, and a revenue share that
              makes building an agency actually viable. No overhead. No hiring.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#apply" className="btn-gold">Become a DartX Partner <ArrowRight size={16} weight="bold" /></Link>
              <Link href="/portfolio" className="btn-ghost-white">View Our Work</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-white/[0.08]">
            <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(70% 70% at 60% 30%, rgba(240,180,40,0.3), rgba(10,6,16,1) 72%)" }} />
            <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(55% 55% at 15% 90%, rgba(139,61,176,0.4), transparent 60%)" }} />
          </div>
        </div>
      </section>

      {/* Opportunity stats */}
      <section className="bg-night">
        <div className="container-d py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {OPPORTUNITY.map((o) => (
              <div key={o.value} className="rounded-card border border-white/[0.07] bg-night-surface p-7">
                <o.Icon size={26} weight="fill" className="text-gold" />
                <p className="mt-4 font-display text-4xl font-extrabold text-white">{o.value}</p>
                <p className="mt-2 font-body text-sm text-muted">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">How It Works.</h2>
          <div className="mx-auto mt-14 max-w-3xl space-y-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative flex gap-6">
                {i < STEPS.length - 1 && <div aria-hidden className="absolute left-[1.4rem] top-12 h-full w-px bg-white/10" />}
                <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-gold font-display text-sm font-bold text-gold">{s.n}</div>
                <div className="pb-2">
                  <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            Why DartX? The Competitive Edge.
          </h2>
          <div className="mt-10 overflow-hidden rounded-card border border-white/[0.08]">
            <div className="grid grid-cols-3 bg-night-raised">
              <div className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-wider text-muted">Benchmark</div>
              <div className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-wider text-muted">Going Alone</div>
              <div className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-wider text-gold">With DartX</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.benchmark} className={`grid grid-cols-3 items-center ${i % 2 ? "bg-night-surface" : "bg-night"}`}>
                <div className="px-5 py-4 font-body text-sm font-medium text-white">{row.benchmark}</div>
                <div className="px-5 py-4 font-body text-sm text-muted">
                  {typeof row.alone === "boolean" ? <X size={18} weight="bold" className="text-red-400/70" /> : row.alone}
                </div>
                <div className="px-5 py-4 font-body text-sm text-white">
                  {typeof row.dartx === "boolean" ? <Check size={18} weight="bold" className="text-gold" /> : row.dartx}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner application */}
      <section id="apply" className="bg-night">
        <div className="container-d section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Ready to Launch Your Agency?</h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-muted">
              Apply to become a DartX partner. We review every application
              personally and only work with partners serious about building
              something real.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl">
            <DartxForm />
          </div>
        </div>
      </section>
    </>
  );
}
