import { ServiceTemplate, createServiceMetadata } from "@/components/services/ServiceTemplate";

export const metadata = createServiceMetadata("enterprise-software");

export default function EnterpriseSoftwarePage() {
  return <ServiceTemplate slug="enterprise-software" />;
}
