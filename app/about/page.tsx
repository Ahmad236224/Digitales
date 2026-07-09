import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UsersThree, Sparkle, ChartLineUp, Globe } from "@phosphor-icons/react/dist/ssr";
import CircuitBackground from "@/components/ui/CircuitBackground";
import FinalCta from "@/components/home/FinalCta";
import { TIMELINE, LEADERSHIP, TEAM } from "@/lib/site";
import TeamMemberCard from "@/components/about/TeamMemberCard";

type LeadershipMember = {
  name: string;
  title: string;
  region: string;
  image?: string;
  bio?: string;
};

export const metadata: Metadata = {
  title: "About",
  description:
    "Three decades of advertising heritage through Future Vision Advertising, brought into the digital era. Meet the Digitales leadership and team across PK, UK, and USA.",
};

const TIMELINE_ICONS = [Sparkle, ChartLineUp, Globe, Sparkle, Globe, ChartLineUp];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((p) => p[0]).join("");
}

export default function AboutPage() {
  const leadershipMembers = LEADERSHIP as readonly LeadershipMember[];
  const leadershipColumns = [
    { featured: leadershipMembers[0], supporting: leadershipMembers[2] },
    { featured: leadershipMembers[1], supporting: leadershipMembers[3] },
  ];

  return (
    <>
      {/* Hero — two column */}
      <section className="relative overflow-hidden bg-night">
        <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-full" />
        <CircuitBackground className="opacity-[0.12]" />
        <div className="container-d relative grid items-center gap-12 pt-36 pb-20 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-purple/20 px-3 py-1 font-body text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-purple-link">
              Our Vision
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-6xl">
              Three Decades of Expertise.{" "}
              <span className="text-gold">One Digital-First Vision.</span>
            </h1>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-muted">
              Digitales is more than a marketing agency. We are a technical
              collective built on 30 years of advertising heritage through Future
              Vision Advertising — brought into the digital era with precision,
              agility, and accountability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/services" className="btn-gold">Our Services <ArrowRight size={16} weight="bold" /></Link>
              <Link href="/portfolio" className="btn-ghost-white">Case Studies</Link>
            </div>
          </div>

          {/* Visual + stat pills */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-white/[0.08]">
              <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(75% 75% at 30% 25%, rgba(139,61,176,0.6), rgba(10,6,16,1) 75%)" }} />
              <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(55% 55% at 90% 95%, rgba(240,180,40,0.22), transparent 60%)" }} />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-card border border-white/10 bg-night-surface/95 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <UsersThree size={22} weight="fill" className="text-gold" />
                <p className="font-display text-sm font-semibold text-white">A 19-strong specialist team</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[["30 Yrs", "Legacy"], ["3", "Continents"], ["100+", "Projects"]].map(([n, l]) => (
                  <div key={l} className="rounded-lg border border-gold/30 py-2">
                    <p className="font-display text-base font-extrabold text-gold">{n}</p>
                    <p className="font-body text-[0.65rem] uppercase tracking-wider text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy timeline */}
      <section className="bg-night">
        <div className="container-d section">
          <p className="text-center eyebrow">Our Legacy</p>
          <h2 className="mx-auto mt-3 max-w-xl text-center font-display text-3xl font-bold text-white sm:text-4xl">
            From a Pakistani advertising powerhouse to a three-continent digital force.
          </h2>

          <div className="relative mt-16">
            <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => {
                const Icon = TIMELINE_ICONS[i];
                const left = i % 2 === 0;
                return (
                  <div key={item.year} className={`relative md:grid md:grid-cols-2 md:gap-12 ${left ? "" : "md:[&>*:first-child]:col-start-2"}`}>
                    <div className={`ml-12 rounded-card border border-white/[0.07] bg-night-surface p-6 md:ml-0 ${left ? "md:mr-6 md:text-right" : "md:ml-6"}`}>
                      <p className="font-display text-lg font-extrabold text-gold">{item.year}</p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                    <span aria-hidden className="absolute left-4 top-6 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-gold text-purple-deep md:left-1/2">
                      <Icon size={15} weight="fill" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership + full team */}
      <section className="bg-night">
        <div className="container-d section">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="h2">The People Behind the Work.</h2>
              <p className="mt-4 max-w-xl lede">
                A convergence of strategic minds, engineers, and creatives 
                working from the same brief, toward the same commercial objective.
              </p>
            </div>
            <Link href="/contact" className="btn-gold self-start">Join the Team <ArrowRight size={16} weight="bold" /></Link>
          </div>

          {/* Leadership avatars */}
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {leadershipColumns.map(({ featured, supporting }) => (
              <div key={featured.name} className="flex min-w-0 flex-col gap-4">
                <div className="group relative overflow-hidden rounded-card border border-white/[0.06] bg-[#15101E] p-6 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-transparent hover:backdrop-blur-sm hover:border-white/20 hover:shadow-card-hover">
                  {featured.image ? (
                    <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-purple/15 ring-4 ring-gold ring-offset-4 ring-offset-night transition-transform duration-300 ease-in-out group-hover:scale-105">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured.image}
                        alt={featured.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-purple/15 font-display text-2xl font-bold text-purple-link ring-4 ring-gold ring-offset-4 ring-offset-night transition-transform duration-300 ease-in-out group-hover:scale-105">
                      {initials(featured.name)}
                    </div>
                  )}
                  <p className="mt-5 font-display text-lg font-semibold text-white break-words">{featured.name}</p>
                  <p className="mt-0.5 font-body text-sm text-muted break-words">{featured.title}</p>
                  <p className="mt-1 font-body text-[0.65rem] uppercase tracking-wider text-gold">{featured.region}</p>
                  {featured.bio && (
                    <p className="mt-5 text-center font-body text-[0.82rem] font-bold italic leading-[1.75] tracking-[0.01em] text-slate-200">{featured.bio}</p>
                  )}
                </div>

                {supporting && (
                  <div className="group relative overflow-hidden rounded-card border border-gold/20 bg-[#15101E]/80 p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-transparent hover:backdrop-blur-sm hover:border-gold/50 hover:shadow-card-hover">
                    <div className="flex items-center gap-4">
                      {supporting.image ? (
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gold bg-purple/15 transition-transform duration-300 ease-in-out group-hover:scale-105">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={supporting.image}
                            alt={supporting.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-purple/15 font-display text-base font-bold text-purple-link transition-transform duration-300 ease-in-out group-hover:scale-105">
                          {initials(supporting.name)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-display text-base font-semibold text-white break-words">{supporting.name}</p>
                        <p className="mt-1 font-body text-xs leading-relaxed text-muted break-words">{supporting.title}</p>
                        <p className="mt-2 font-body text-[0.65rem] uppercase tracking-wider text-gold">{supporting.region}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Full team by department */}
          <div className="mt-20 space-y-10">
            {TEAM.map((group) => (
              <div key={group.dept}>
                <div className="flex items-center gap-4">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold">{group.dept}</h3>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="relative z-10 mt-5 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {group.people.map((p) => (
                    <TeamMemberCard key={p.name} person={p} />
                  ))}
                </div>


              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
