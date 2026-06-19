import type { Metadata } from "next";
import { Suspense } from "react";
import CircuitBackground from "@/components/ui/CircuitBackground";
import AuditFunnel from "@/components/audit/AuditFunnel";

export const metadata: Metadata = {
  title: "Free Digital Audit",
  description:
    "Get your free Digital Health Score in under three minutes — SEO, page speed, social, and content readiness, with personalised recommendations.",
};

export default function FreeAuditPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-night">
      <div aria-hidden className="glow-purple pointer-events-none absolute inset-x-0 top-0 h-[60vh]" />
      <CircuitBackground className="opacity-[0.12]" />
      <div className="container-d relative py-24 sm:py-32">
        <Suspense fallback={<div className="py-24 text-center font-body text-muted">Loading…</div>}>
          <AuditFunnel />
        </Suspense>
      </div>
    </section>
  );
}
