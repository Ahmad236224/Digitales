import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PORTFOLIO_PREVIEW } from "@/lib/site";

export default function PortfolioPreview() {
  const [big, ...rest] = PORTFOLIO_PREVIEW;
  return (
    <section className="bg-night">
      <div className="container-d section">
        <div className="flex items-end justify-between">
          <h2 className="h2">Featured Work</h2>
          <Link href="/portfolio" className="hidden font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:inline-flex sm:items-center sm:gap-1.5">
            View All Case Studies <ArrowRight size={13} weight="bold" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Large feature */}
          <Link href={`/portfolio/${big.slug}`} className="group lg:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-white/[0.07]">
              <Image
                src={big.image}
                alt={`${big.client} case study`}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-night/20" />
              <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 font-body text-xs font-semibold text-purple-deep">
                {big.category}
              </span>
            </div>
            <p className="mt-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
              {big.client}
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-white group-hover:text-gold">
              {big.metric} - {big.note}
            </p>
          </Link>

          {/* Two stacked */}
          <div className="flex flex-col gap-6">
            {rest.map((c) => (
              <Link key={c.slug} href={`/portfolio/${c.slug}`} className="group flex-1">
                <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-white/[0.07]">
                  <Image
                    src={c.image}
                    alt={`${c.client} case study`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-night/15" />
                </div>
                <p className="mt-3 font-body text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  {c.category}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 font-display text-lg font-semibold text-white group-hover:text-gold">
                  {c.client} <ArrowUpRight size={15} weight="bold" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
