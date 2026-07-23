import { PenNib, Sparkle, Brain, Gauge, CursorClick, Graph } from "@phosphor-icons/react/dist/ssr";
import { DIFFERENTIATORS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

const ICONS = [PenNib, Sparkle, Brain, Gauge, CursorClick, Graph];

export default function WhyDigitales() {
  return (
    <section className="bg-night">
      <div className="container-d section">
        <p className="eyebrow">Why Us</p>
        <h2 className="mt-3 max-w-2xl h2">A Different Kind of Digital Partner.</h2>
        <p className="mt-5 max-w-2xl lede">
          We do not separate marketing from technology - because your customers
          do not either. The result is compounding growth, not isolated wins.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={d.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-card border border-white/[0.07] bg-night-surface p-7">
                  <Icon size={26} weight="fill" className="text-gold" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{d.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">{d.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
