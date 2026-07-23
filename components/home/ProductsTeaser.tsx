import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function ProductsTeaser() {
  return (
    <section className="bg-night">
      <div className="container-d section">
        <p className="eyebrow">Our Products</p>
        <h2 className="mt-3 h2">More Than an Agency.</h2>
        <p className="mt-5 max-w-2xl lede">
          Alongside our client services, Digitales builds and operates its own
          digital products. Two are available now.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Link href="/relief-os" className="group relative flex flex-col overflow-hidden rounded-card border border-white/[0.07] bg-night-surface p-9 transition-all duration-300 hover:-translate-y-1 hover:border-relief/50 hover:shadow-card-hover">
            <div aria-hidden className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(80% 80% at 100% 0%, rgba(15,181,181,0.22), transparent 55%)" }} />
            <div className="relative">
              <span className="rounded-full bg-gold px-3 py-1 font-body text-xs font-semibold text-purple-deep">SaaS Product</span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">Enterprise donation management, built exclusively for NGOs.</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">Track donors, run campaigns, manage appeals, and report impact - all from one purpose-built platform.</p>
              <span className="mt-7 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-relief">Explore Relief OS <ArrowRight size={15} weight="bold" /></span>
            </div>
          </Link>

          <Link href="/dartx" className="group relative flex flex-col overflow-hidden rounded-card border border-white/[0.07] bg-night-surface p-9 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-card-hover">
            <div aria-hidden className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(80% 80% at 100% 0%, rgba(240,180,40,0.16), transparent 55%)" }} />
            <div className="relative">
              <span className="w-fit rounded-full bg-purple px-3 py-1 font-body text-xs font-semibold text-white">New Venture</span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white">Launch your agency. We power it.</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">DartX is a white-label agency model - you bring the clients, we deliver the work under your brand. No overhead. No hiring.</p>
              <span className="mt-7 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gold">Learn About DartX <ArrowRight size={15} weight="bold" /></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
