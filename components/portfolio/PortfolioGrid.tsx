"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { CASE_STUDIES, PORTFOLIO_FILTERS } from "@/lib/site";

export default function PortfolioGrid() {
  const [active, setActive] = useState<string>("All");

  const visible = CASE_STUDIES.filter(
    (c) => active === "All" || c.tags.includes(active as never)
  );

  return (
    <section className="bg-night">
      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 border-y border-white/[0.06] bg-night/90 backdrop-blur">
        <div className="container-d flex gap-6 overflow-x-auto py-4">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative whitespace-nowrap pb-1 font-body text-sm font-medium transition ${
                active === f ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {f}
              {active === f && <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gold" />}
            </button>
          ))}
        </div>
      </div>

      <div className="container-d section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <Link
              key={c.slug}
              href={`/portfolio/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-white/[0.07] bg-night-surface transition-all duration-300 hover:-translate-y-1 hover:border-purple/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(75% 75% at 30% 25%, rgba(139,61,176,0.6), rgba(10,6,16,1) 76%)" }} />
                <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(55% 55% at 90% 90%, rgba(240,180,40,0.2), transparent 60%)" }} />
                <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 font-body text-[0.7rem] font-semibold uppercase tracking-wide text-purple-deep">
                  {c.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-body text-xs uppercase tracking-wider text-muted">{c.client}</p>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-white">{c.title}</h3>
                <p className="mt-4 font-display text-3xl font-extrabold text-purple-link">{c.result}</p>
                <p className="mt-1 flex-1 font-body text-sm text-muted">{c.resultLabel}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-purple-link">
                  Read Case Study <ArrowRight size={15} weight="bold" className="transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
