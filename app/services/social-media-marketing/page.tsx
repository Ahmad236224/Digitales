import { ServiceTemplate, createServiceMetadata } from "@/components/services/ServiceTemplate";

export const metadata = createServiceMetadata("social-media-marketing");

export default function SocialMediaMarketingPage() {
  return <ServiceTemplate slug="social-media-marketing" />;
}
