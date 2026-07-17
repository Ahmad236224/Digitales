import type { Metadata } from "next";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real work, measurable results, no vanity metrics. Case studies across media buying, SEO, social, development, NGO, education, and e-commerce.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/digitales web/images/Portfolio.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#07040c]/50" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(61,20,80,0.35),rgba(7,4,12,0.78)_72%)]" />
        <div className="container-d flex min-h-[68vh] flex-col items-center justify-center px-4 pb-20 pt-36 text-center">
          <p className="rounded-full border border-gold/30 bg-gold/15 px-4 py-1.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">
            Our Case Studies
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Real Work. <span className="text-gold">Measurable Results.</span> No Vanity Metrics.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-sm font-medium leading-relaxed text-white sm:text-base">
            We don&apos;t just build websites or run ads. We architect digital growth engines that deliver verified commercial impact for global brands and visionary non-profits.
          </p>
        </div>
      </section>
      <PortfolioGrid />
      <FinalCta />
    </>
  );
}
