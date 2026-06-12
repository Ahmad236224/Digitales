import { IMPACT_STATS } from "@/lib/site";
import CountUp from "@/components/ui/CountUp";

export default function ImpactNumbers() {
  return (
    <section className="bg-night">
      <div className="container-d border-y border-white/[0.06] py-16">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {IMPACT_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-4 text-center lg:px-8 ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <div className="font-display text-5xl font-extrabold text-gold sm:text-6xl">
                <CountUp value={stat.value} />
              </div>
              <p className="mt-3 font-body text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
