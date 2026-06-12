import Link from "next/link";
import {
  ShareNetwork, Target, Megaphone, MagnifyingGlass, Code, Stack, ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { SERVICES } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

const ICONS = { ShareNetwork, Target, Megaphone, MagnifyingGlass, Code, Stack } as const;

function Card({ service, index }: { service: (typeof SERVICES)[number]; index: number }) {
  const Icon = ICONS[service.icon as keyof typeof ICONS];
  return (
    <Reveal delay={index * 60}>
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col rounded-card border border-white/[0.07] bg-night-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-purple/60 hover:bg-night-raised hover:shadow-card-hover"
      >
        <Icon size={28} weight="fill" className="text-gold" />
        <h3 className="mt-5 font-display text-xl font-semibold text-white">{service.name}</h3>
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted">{service.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gold">
          Explore <ArrowRight size={15} weight="bold" className="transition group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

export default function ServicesGrid() {
  return (
    <section className="bg-night">
      <div className="container-d section">
        <Reveal>
          <p className="eyebrow">Core Capability</p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl h2">End-to-End Digital Capability Under One Roof.</h2>
            <p className="max-w-sm border-l-2 border-gold pl-5 font-body text-sm leading-relaxed text-muted">
              Most agencies do one thing. We do everything — in coordination —
              because that is where compounding growth happens.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Card key={s.slug} service={s} index={i} />
          ))}
        </div>

        <div className="mt-10">
          <Link href="/services" className="link-gold">
            View All Services <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
