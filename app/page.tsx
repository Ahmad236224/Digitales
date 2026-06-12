import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import ImpactNumbers from "@/components/home/ImpactNumbers";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import WhyDigitales from "@/components/home/WhyDigitales";
import ProductsTeaser from "@/components/home/ProductsTeaser";
import FinalCta from "@/components/home/FinalCta";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Digitales",
  url: "https://digitales.pk",
  logo: "https://digitales.pk/logo.png",
  description: "Full-service digital agency and software product company across Pakistan, the UK, and the USA.",
  sameAs: ["https://www.linkedin.com/company/digitales", "https://www.instagram.com/digitales"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <ImpactNumbers />
      <PortfolioPreview />
      <WhyDigitales />
      <ProductsTeaser />
      <FinalCta />
    </>
  );
}
