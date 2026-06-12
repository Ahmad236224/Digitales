import type { Metadata } from "next";
import Placeholder from "@/components/ui/Placeholder";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <Placeholder
      title="Privacy Policy"
      blurb="Legal copy to be supplied."
    />
  );
}
