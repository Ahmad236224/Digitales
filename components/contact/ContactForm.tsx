"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

const SERVICES_OPTIONS = [
  "Social Media Marketing",
  "Digital Media Buying",
  "Digital PR & Influencer",
  "SEO",
  "Web & App Development",
  "Enterprise Software",
  "Relief OS",
  "DartX",
  "Not sure — advise me",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // Note: wire to HubSpot CRM via API on integration. Honeypot guards spam.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if ((form.elements.namedItem("company_url") as HTMLInputElement)?.value) return; // honeypot
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card border border-white/[0.08] bg-night-surface p-10 text-center">
        <CheckCircle size={44} weight="fill" className="text-gold" />
        <h3 className="mt-4 font-display text-xl font-semibold text-white">Message received.</h3>
        <p className="mt-2 max-w-sm font-body text-sm text-muted">
          Thanks — our team will respond within one business day. For anything
          urgent, book a discovery call directly below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-white/[0.08] bg-night-surface p-7 sm:p-8">
      {/* honeypot */}
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" placeholder="Your name" required />
        <Field label="Work Email Address" name="email" type="email" placeholder="you@company.com" required />
      </div>

      <div className="mt-5">
        <label className="font-body text-xs font-medium uppercase tracking-wider text-muted">Service of Interest</label>
        <select
          name="service"
          className="mt-2 w-full rounded-lg border border-white/12 bg-night px-4 py-3 font-body text-sm text-white focus:border-gold/60 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>Select a service…</option>
          {SERVICES_OPTIONS.map((s) => (
            <option key={s} value={s} className="bg-night-surface">{s}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="font-body text-xs font-medium uppercase tracking-wider text-muted">Tell us about your project</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your goals…"
          className="mt-2 w-full resize-none rounded-lg border border-white/12 bg-night px-4 py-3 font-body text-sm text-white placeholder:text-muted/60 focus:border-gold/60 focus:outline-none"
        />
      </div>

      <button type="submit" className="btn-gold mt-7 w-full">
        Send Message <ArrowRight size={16} weight="bold" />
      </button>
    </form>
  );
}

function Field({
  label, name, type = "text", placeholder, required,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="font-body text-xs font-medium uppercase tracking-wider text-muted">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-white/12 bg-night px-4 py-3 font-body text-sm text-white placeholder:text-muted/60 focus:border-gold/60 focus:outline-none"
      />
    </div>
  );
}
