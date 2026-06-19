"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import CircuitBackground from "@/components/ui/CircuitBackground";

const HEADLINE = ["The", "Digital", "Marketing", "Agency", "That", "Builds", "Brands", "and", "Ships", "Products."];

export default function Hero() {
  const [auditUrl, setAuditUrl] = useState("");
  const router = useRouter();

  const go = (value: string) => {
    const trimmed = value.trim();
    router.push(trimmed ? `/free-audit?url=${encodeURIComponent(trimmed)}` : "/free-audit");
  };

  return (
    <section className="relative overflow-hidden bg-night">
      {/* Top purple glow + faint circuit signature */}
      <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-[80vh]" />
      <CircuitBackground className="opacity-[0.18]" />

      <div className="container-d relative flex min-h-[92vh] flex-col items-center justify-center pt-32 pb-20 text-center">
        <p className="eyebrow animate-fade-up">
          Performance Marketing Agency &middot; Pakistan &middot; United Kingdom &middot; USA
        </p>

        <h1 className="mt-7 max-w-4xl font-display text-[2.7rem] font-extrabold leading-[1.06] text-white text-glow sm:text-6xl lg:text-[4.6rem]">
          {HEADLINE.map((word, i) => (
            <span
              key={i}
              className="inline-block animate-fade-up [animation-fill-mode:both]"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            go(auditUrl);
          }}
          className="mt-11 w-full max-w-4xl rounded-card border-gradient bg-night-surface/80 p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm animate-fade-up [animation-fill-mode:both] sm:p-7"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="font-display text-base font-semibold text-white sm:text-lg">
            Get a Free Performance Audit
          </p>
          <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <input
              value={auditUrl}
              onChange={(e) => setAuditUrl(e.target.value)}
              type="text"
              inputMode="url"
              aria-label="Your website URL"
              placeholder="Enter your website URL (e.g. yourbrand.com)"
              className="w-full rounded-full border border-white/12 bg-night px-5 py-3.5 font-body text-sm text-white placeholder:text-muted/70 focus:border-gold/60 focus:outline-none sm:max-w-xl"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Analyse Now
            </button>
          </div>
        </form>

        <p
          className="mt-7 font-body text-xs uppercase tracking-[0.14em] text-muted/70 animate-fade-up [animation-fill-mode:both]"
          style={{ animationDelay: "1s" }}
        >
          Trusted by organisations across three continents
        </p>

        <div
          className="mt-9 flex flex-wrap justify-center gap-4 animate-fade-up [animation-fill-mode:both]"
          style={{ animationDelay: "1.1s" }}
        >
          <Link href="/contact" className="btn-primary">
            Start Your Project <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
