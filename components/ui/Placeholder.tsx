import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import CircuitBackground from "@/components/ui/CircuitBackground";

export default function Placeholder({
  title,
  blurb,
  status = "In development",
}: {
  title: string;
  blurb: string;
  status?: string;
}) {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-night">
      <CircuitBackground />
      <div className="container-d relative py-28 text-center">
        <span className="inline-block rounded-full border border-gold/50 px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {status}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold text-white sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-lg text-white/70">
          {blurb}
        </p>
        <Link href="/" className="btn-ghost-gold mt-9">
          <ArrowLeft size={16} weight="bold" /> Back to Home
        </Link>
      </div>
    </section>
  );
}
