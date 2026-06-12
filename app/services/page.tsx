import type { Metadata } from "next";
import Link from "next/link";
import {
  ShareNetwork, Target, Megaphone, MagnifyingGlass, Code, Stack, ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/ui/PageHero";
import FinalCta from "@/components/home/FinalCta";
import { SERVICES, PROCESS_STEPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Integrated marketing and technology: social media, media buying, digital PR, SEO, web & app development, and enterprise software across PK, UK, and USA.",
};

const ICONS = { ShareNetwork, Target, Megaphone, MagnifyingGlass, Code, Stack } as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Precision-Engineered Success"
        title="A Capability for Every Challenge."
        subtitle="We combine high-octane performance marketing with architectural digital design to scale your presence — whether you need one service or all of them, every engagement is built around outcomes you can measure."
      />

      <section className="bg-night">
        <div className="container-d section">
          <p className="text-center eyebrow">Our Expertise</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Scalable Solutions for Digital Leaders
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col rounded-card border border-white/[0.07] bg-night-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-purple/60 hover:bg-night-raised"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-purple/15 text-purple-link transition group-hover:bg-purple/25">
                    <Icon size={22} weight="fill" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.name}</h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gold">
                    Explore <ArrowRight size={15} weight="bold" className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-night">
        <div className="container-d section">
          <h2 className="h2">How We Work</h2>
          <div className="mt-3 h-1 w-16 rounded bg-gold" />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.n} className="relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div aria-hidden className="absolute left-12 top-5 hidden h-px w-full bg-white/10 lg:block" />
                )}
                <div className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-gold font-display text-sm font-bold text-gold">
                  {step.n}
                </div>
                <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
