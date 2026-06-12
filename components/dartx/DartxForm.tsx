"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

export default function DartxForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if ((form.elements.namedItem("website") as HTMLInputElement)?.value) return; // honeypot
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-card border border-gold/30 bg-night-surface p-10 text-center">
        <CheckCircle size={44} weight="fill" className="text-gold" />
        <h3 className="mt-4 font-display text-xl font-semibold text-white">Application received.</h3>
        <p className="mt-2 max-w-sm font-body text-sm text-muted">
          Thanks for applying to partner with DartX. We review every application
          personally and will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-white/[0.08] bg-night-surface p-7 sm:p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" placeholder="Your name" required />
        <Field label="Email Address" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="mt-5">
        <Field label="Current Role or Business" name="role" placeholder="e.g. Consultant, founder, business owner" />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="font-body text-xs font-medium uppercase tracking-wider text-muted">Services of Interest</label>
          <select name="services" defaultValue="" className="mt-2 w-full rounded-lg border border-white/12 bg-night px-4 py-3 font-body text-sm text-white focus:border-gold/60 focus:outline-none">
            <option value="" disabled>Select…</option>
            {["Full service stack", "Marketing only", "Development only", "SEO & content", "Not sure yet"].map((s) => (
              <option key={s} className="bg-night-surface">{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-body text-xs font-medium uppercase tracking-wider text-muted">Monthly Client Budget</label>
          <select name="budget" defaultValue="" className="mt-2 w-full rounded-lg border border-white/12 bg-night px-4 py-3 font-body text-sm text-white focus:border-gold/60 focus:outline-none">
            <option value="" disabled>Select…</option>
            {["Under $2,000", "$2,000–$5,000", "$5,000–$15,000", "$15,000+", "Not yet defined"].map((s) => (
              <option key={s} className="bg-night-surface">{s}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn-gold mt-7 w-full">
        Apply to Partner with DartX <ArrowRight size={16} weight="bold" />
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
