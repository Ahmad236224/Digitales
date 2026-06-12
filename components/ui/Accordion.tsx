"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

export type QA = { q: string; a: string };

export default function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-card border border-white/[0.08] bg-night-surface">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-base font-semibold text-white">{it.q}</span>
              <Plus
                size={18}
                weight="bold"
                className={`shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 font-body text-sm leading-relaxed text-muted">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
