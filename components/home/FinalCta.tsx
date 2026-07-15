import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-night">
      <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 bottom-0 h-[60%]" />
      <div className="container-d relative section text-center">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-[1.12] text-white sm:text-[2.7rem]">
          <span className="block">Ready to Build Something</span>
          <span className="mt-2 block">That Performs?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-body text-lg text-muted">
          Whether you need to grow faster, convert better, or build something
          entirely new — we should have a conversation. Our team across Pakistan,
          the UK, and the USA is ready to start.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Book a Strategy Call <ArrowRight size={18} weight="bold" />
          </Link>
          <Link href="/free-audit" className="btn-ghost-white">
            Run a Free Audit
          </Link>
        </div>
      </div>
    </section>
  );
}
