import CircuitBackground from "@/components/ui/CircuitBackground";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  highlight?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-night">
      <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-full" />
      <CircuitBackground className="opacity-[0.15]" />
      <div className="container-d relative flex min-h-[52vh] flex-col justify-center pt-36 pb-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-6xl">
          {title}
          {highlight ? <span className="text-gold"> {highlight}</span> : null}
        </h1>
        {subtitle ? (
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
