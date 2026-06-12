import { TRUST_LOGOS } from "@/lib/site";

export default function TrustBar() {
  const row = [...TRUST_LOGOS, ...TRUST_LOGOS];
  return (
    <section className="border-y border-white/[0.06] bg-night py-10">
      <p className="container-d text-center font-body text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted/60">
        Trusted by organisations across three continents
      </p>
      <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-bold text-muted/40 transition-colors hover:text-gold"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
