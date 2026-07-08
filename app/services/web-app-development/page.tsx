import { ServiceTemplate, createServiceMetadata } from "@/components/services/ServiceTemplate";

export const metadata = createServiceMetadata("web-app-development");

export default function WebAppDevelopmentPage() {
  return <ServiceTemplate slug="web-app-development" />;
}
