import { ServiceTemplate, createServiceMetadata } from "@/components/services/ServiceTemplate";

export const metadata = createServiceMetadata("seo");

export default function SeoPage() {
  return <ServiceTemplate slug="seo" />;
}
