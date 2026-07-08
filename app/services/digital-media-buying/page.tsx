import { ServiceTemplate, createServiceMetadata } from "@/components/services/ServiceTemplate";

export const metadata = createServiceMetadata("digital-media-buying");

export default function DigitalMediaBuyingPage() {
  return <ServiceTemplate slug="digital-media-buying" />;
}
