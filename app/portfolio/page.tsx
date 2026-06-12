import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
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
      <PageHero
        eyebrow="Our Case Studies"
        title={
          <>
            Real Work. <span className="text-gold">Measurable Results.</span> No Vanity Metrics.
          </>
        }
        subtitle="We don't just build websites or run ads. We architect digital growth engines that deliver verified commercial impact for global brands and visionary non-profits."
      />
      <PortfolioGrid />
      <FinalCta />
    </>
  );
}
