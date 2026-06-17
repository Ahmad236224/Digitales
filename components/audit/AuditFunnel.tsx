"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, ShoppingCart, GraduationCap, FirstAid, HeartHalf,
  Briefcase, House, ForkKnife, DotsThreeOutline, CheckCircle, Check,
} from "@phosphor-icons/react";
import type { AuditResult } from "@/lib/pagespeed";

const STORAGE_KEY = "digitales_audit_v1";

const INDUSTRIES = [
  { id: "ecommerce", label: "E-Commerce", Icon: ShoppingCart },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "healthcare", label: "Healthcare", Icon: FirstAid },
  { id: "ngo", label: "NGO & Charity", Icon: HeartHalf },
  { id: "professional", label: "Professional Services", Icon: Briefcase },
  { id: "realestate", label: "Real Estate", Icon: House },
  { id: "hospitality", label: "Hospitality", Icon: ForkKnife },
  { id: "other", label: "Other", Icon: DotsThreeOutline },
];

const GOALS = [
  "More Organic Traffic", "More Leads", "Better Google Rankings",
  "Stronger Social", "Launch or Improve Software", "Brand Awareness",
];

const CHALLENGES = [
  "Low organic traffic", "High ad spend, low results", "No consistent content",
  "Poor website performance", "No ROI from current agency", "Starting from scratch",
];

const BUDGETS = [
  "Under $500 / mo", "$500 – $2,000", "$2,000 – $5,000",
  "$5,000 – $15,000", "$15,000+", "Not yet defined",
];

type State = {
  url: string;
  industry: string;
  goals: string[];
  challenges: string[];
  budget: string;
  name: string;
  email: string;
  company: string;
  phone: string;
};

const EMPTY: State = {
  url: "", industry: "", goals: [], challenges: [], budget: "",
  name: "", email: "", company: "", phone: "",
};

const TOTAL = 6; // input steps

export default function AuditFunnel() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<State>(EMPTY);
  const [phase, setPhase] = useState<"form" | "loading" | "results" | "error">("form");
  const [resumed, setResumed] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Hydrate from URL query + localStorage
  useEffect(() => {
    const fromQuery = params.get("url") ?? "";
    let saved: Partial<State> = {};
    let savedStep = 1;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        saved = parsed.data ?? {};
        savedStep = parsed.step ?? 1;
        if (savedStep > 1) setResumed(true);
      }
    } catch {}
    setData({ ...EMPTY, ...saved, url: fromQuery || saved.url || "" });
    if (savedStep > 1 && !fromQuery) setStep(savedStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist
  useEffect(() => {
    if (phase !== "form") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch {}
  }, [step, data, phase]);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleGoal = (g: string) =>
    setData((d) => ({
      ...d,
      goals: d.goals.includes(g) ? d.goals.filter((x) => x !== g) : [...d.goals, g],
    }));

  const toggleChallenge = (c: string) =>
    setData((d) => ({
      ...d,
      challenges: d.challenges.includes(c) ? d.challenges.filter((x) => x !== c) : [...d.challenges, c],
    }));

  const canContinue = useMemo(() => {
    switch (step) {
      case 1: return data.url.trim().length > 2;
      case 2: return !!data.industry;
      case 3: return data.goals.length > 0;
      case 4: return data.challenges.length > 0;
      case 5: return !!data.budget;
      case 6: return data.name.trim() && /\S+@\S+\.\S+/.test(data.email);
      default: return false;
    }
  }, [step, data]);

  const startAudit = async (urlToAudit: string) => {
    setPhase("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToAudit, strategy: "mobile" }),
      });

      const resultData = await response.json();
      if (!response.ok || !resultData.ok) {
        throw new Error(resultData.error || `HTTP ${response.status}`);
      }

      setAuditResult(resultData);
      setPhase("results");
      
      // Clear local storage on success
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    } catch (err: any) {
      console.error("Audit error:", err);
      setErrorMessage(err.message || "An unexpected network error occurred.");
      setPhase("error");
    }
  };

  const next = () => {
    if (step < TOTAL) {
      setStep((s) => s + 1);
    } else {
      startAudit(data.url);
    }
  };

  const resetToForm = () => {
    setPhase("form");
    setStep(6); // return to the final step so they can try again or edit
  };

  if (phase === "loading") return <Loading url={data.url} />;
  if (phase === "error") return <ErrorBoundary error={errorMessage} onRetry={resetToForm} />;
  if (phase === "results" && auditResult) return <Results data={data} result={auditResult} />;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <p className="eyebrow text-center">Free Audit Funnel</p>
      <div className="mt-2 flex items-end justify-between">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Digital Performance Audit</h1>
        <span className="font-body text-sm text-muted">Step {step} of {TOTAL}</span>
      </div>
      {/* Progress */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${(step / TOTAL) * 100}%` }} />
      </div>

      {resumed && step > 1 && (
        <p className="mt-4 rounded-lg border border-gold/30 bg-gold/5 px-4 py-2.5 text-center font-body text-sm text-gold">
          Welcome back — we picked up where you left off.
        </p>
      )}

      {/* Card */}
      <div className="mt-6 rounded-card border border-white/[0.08] bg-night-surface p-7 sm:p-9">
        {step === 1 && (
          <Step title="Start with your website." sub="Enter your website URL below to begin your free digital analysis.">
            <input
              autoFocus
              value={data.url}
              onChange={(e) => set("url", e.target.value)}
              placeholder="yourwebsite.com"
              className="w-full rounded-lg border border-white/12 bg-night px-5 py-4 font-body text-base text-white placeholder:text-muted/60 focus:border-gold/60 focus:outline-none"
            />
          </Step>
        )}

        {step === 2 && (
          <Step title="What industry are you in?" sub="We'll tailor the audit metrics to your specific market sector.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {INDUSTRIES.map(({ id, label, Icon }) => (
                <Tile key={id} selected={data.industry === id} onClick={() => set("industry", id)}>
                  <Icon size={26} weight="light" className="text-white" />
                  <span className="mt-3 text-center font-body text-xs font-semibold uppercase tracking-wide">{label}</span>
                </Tile>
              ))}
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step title="What are your top digital priorities?" sub="Select all that apply.">
            <div className="grid gap-3 sm:grid-cols-2">
              {GOALS.map((g) => (
                <Chip key={g} selected={data.goals.includes(g)} onClick={() => toggleGoal(g)} multi>{g}</Chip>
              ))}
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title="What is your biggest digital challenge today?" sub="Select all that apply.">
            <div className="grid gap-3 sm:grid-cols-2">
              {CHALLENGES.map((c) => (
                <Chip key={c} selected={data.challenges.includes(c)} onClick={() => toggleChallenge(c)} multi>{c}</Chip>
              ))}
            </div>
          </Step>
        )}

        {step === 5 && (
          <Step title="Your approximate monthly budget?" sub="This helps us recommend the right level of engagement.">
            <div className="grid gap-3 sm:grid-cols-2">
              {BUDGETS.map((b) => (
                <Chip key={b} selected={data.budget === b} onClick={() => set("budget", b)}>{b}</Chip>
              ))}
            </div>
          </Step>
        )}

        {step === 6 && (
          <Step title="Your report is ready." sub="Enter your details to access your full Digital Health Score and personalised recommendations.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input value={data.name} onChange={(v) => set("name", v)} placeholder="Full Name" />
              <Input value={data.email} onChange={(v) => set("email", v)} placeholder="Work Email" type="email" />
              <Input value={data.company} onChange={(v) => set("company", v)} placeholder="Company" />
              <Input value={data.phone} onChange={(v) => set("phone", v)} placeholder="Phone (optional)" />
            </div>
          </Step>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-muted hover:text-white">
              <ArrowLeft size={15} weight="bold" /> Back
            </button>
          ) : <span />}
          <button
            onClick={next}
            disabled={!canContinue}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold transition ${
              canContinue ? "bg-gold text-purple-deep hover:brightness-110" : "cursor-not-allowed bg-white/10 text-muted"
            }`}
          >
            {step === TOTAL ? "Get My Free Report" : "Continue"} <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- sub-components ---------- */

function Step({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      <p className="mt-1.5 font-body text-sm text-muted">{sub}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Tile({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex aspect-square flex-col items-center justify-center rounded-xl border p-3 transition ${
        selected ? "border-gold bg-gold/10 text-gold" : "border-white/10 bg-night text-muted hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}

function Chip({ selected, onClick, multi, children }: { selected: boolean; onClick: () => void; multi?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left font-body text-sm transition ${
        selected ? "border-gold bg-gold/10 text-white" : "border-white/10 bg-night text-muted hover:border-white/30"
      }`}
    >
      {children}
      {selected && <Check size={16} weight="bold" className="shrink-0 text-gold" />}
      {!selected && multi && <span className="h-4 w-4 shrink-0 rounded border border-white/25" />}
    </button>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/12 bg-night px-4 py-3 font-body text-sm text-white placeholder:text-muted/60 focus:border-gold/60 focus:outline-none"
    />
  );
}

function Loading({ url }: { url: string }) {
  const messages = [
    "Initializing Lighthouse engine...",
    "Crawling page elements and semantic markup...",
    "Analyzing SEO tags and metadata consistency...",
    "Measuring Core Web Vitals (FCP, LCP, CLS)...",
    "Running page speed simulations on mobile connections...",
    "Auditing site security headers and API usage...",
    "Evaluating accessibility ratios and user experiences...",
    "Compiling final performance score and insights...",
  ];

  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-gold" />
      <h2 className="mt-8 font-display text-2xl font-bold text-white">Analyzing {url}...</h2>
      <p className="mt-4 font-body text-base text-gold animate-pulse h-8">{messages[msgIndex]}</p>
      <p className="mt-4 font-body text-xs text-muted">Please hold tight. Live performance audits fetch real Lighthouse data and can take up to 40 seconds.</p>
    </div>
  );
}

function ErrorBoundary({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="mx-auto max-w-2xl rounded-card border border-red-500/20 bg-night-surface p-8 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold text-white">Live Audit Partially Interrupted</h2>
      <p className="mt-4 font-body text-base text-muted leading-relaxed">
        We couldn&apos;t complete the live analysis right now.
      </p>
      <p className="mt-1 font-body text-xs text-red-400">
        Reason: {error}
      </p>
      <p className="mt-4 font-body text-sm text-gold/90">
        But don&apos;t worry! Our strategy team has received your details, and we will run a manual audit of your website and email the complete report to you shortly.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-purple-deep hover:bg-gold/90 transition-all font-body text-sm font-semibold px-6 py-3"
        >
          Try Again
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Book a Free Call
        </Link>
      </div>
    </div>
  );
}

/* ---------- results: logic-based score + animated gauge ---------- */

function getDynamicNote(key: string, score: number): string {
  if (key === "performance") {
    if (score >= 90) return "Outstanding loading speed and responsiveness. Your site minimizes bounce risk.";
    if (score >= 70) return "Good speed, but minor bottlenecks exist in resource delivery or script execution.";
    if (score >= 50) return "Noticeable delays. Optimizing images, caching, or code splitting will lift conversions.";
    return "Severely slow page speed. High risk of abandonment. Immediate performance tuning required.";
  }
  if (key === "seo") {
    if (score >= 90) return "Excellent search engine optimization. Crawlers can easily read and index your pages.";
    if (score >= 70) return "Solid SEO foundation, though minor adjustments to metadata or headers would improve ranking.";
    if (score >= 50) return "Missing critical SEO signals. Structured data, alt text, or link integrity needs focus.";
    return "Critical SEO issues. Search engines may struggle to crawl and index your site effectively.";
  }
  if (key === "accessibility") {
    if (score >= 90) return "Highly accessible. Code structure and contrast ratios accommodate all users.";
    if (score >= 70) return "Mostly accessible, but element hierarchy or color contrast could be improved.";
    if (score >= 50) return "Accessibility gaps present. Keyboard navigation or screen-reader tags need fixing.";
    return "Poor accessibility compliance. Risk of excluding users and violating standard guidelines.";
  }
  if (key === "best-practices") {
    if (score >= 90) return "Strong adherence to web standards, security policies, and modern APIs.";
    if (score >= 70) return "Generally secure and standard, but check console logs, HTTPS usage, or legacy libraries.";
    if (score >= 50) return "Substandard configurations detected. Security risks or depreciated APIs present.";
    return "Significant violations of modern web standards and security best practices.";
  }
  return "";
}

function getScoreBand(score: number) {
  if (score >= 90) {
    return {
      label: "Excellent",
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
    };
  }
  if (score >= 70) {
    return {
      label: "Solid",
      color: "text-gold",
      border: "border-gold/30",
      bg: "bg-gold/5",
    };
  }
  if (score >= 50) {
    return {
      label: "Underperforming",
      color: "text-amber-500",
      border: "border-amber-500/20",
      bg: "bg-amber-500/5",
    };
  }
  return {
    label: "Critical",
    color: "text-red-500",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
  };
}

function getAcronym(label: string) {
  const match = label.match(/\(([^)]+)\)/);
  return match ? match[1] : label;
}

function Results({ data, result }: { data: State; result: AuditResult }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow text-center">Your Results</p>
      <h1 className="mt-2 text-center font-display text-3xl font-bold text-white sm:text-4xl">Your Digital Health Score</h1>

      <div className="mt-10 flex flex-col items-center justify-center">
        <Gauge value={result.overall} />
        <p className="mt-4 text-center font-body text-xs text-muted/80 italic">
          Live analysis &middot; powered by Google Lighthouse
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {result.dimensions.map((d) => {
          const band = getScoreBand(d.score);
          const note = getDynamicNote(d.key, d.score);
          return (
            <div key={d.key} className={`rounded-card border ${band.border} ${band.bg} p-6 transition-all duration-300 hover:border-white/10`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-base font-semibold text-white">{d.label}</p>
                  <span className={`inline-block mt-1 font-body text-xs font-semibold px-2.5 py-0.5 rounded-full ${band.color} bg-white/5`}>
                    {band.label}
                  </span>
                </div>
                <p className={`font-display text-2xl font-extrabold ${band.color}`}>
                  {d.score}
                  <span className="text-sm text-muted font-normal">/100</span>
                </p>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${d.score}%` }} />
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted">{note}</p>

              {d.key === "performance" && result.vitals && result.vitals.length > 0 && (
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-display text-xs font-semibold text-white/90 mb-3">Core Web Vitals</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {result.vitals.map((vital) => {
                      const acronym = getAcronym(vital.label);
                      const fullName = vital.label.split(" (")[0];
                      return (
                        <div key={vital.label} className="rounded-lg bg-gold/5 border border-gold/15 p-2 text-center" title={fullName}>
                          <span className="block font-display text-[10px] font-black text-gold uppercase tracking-wider">{acronym}</span>
                          <span className="block mt-0.5 font-body text-xs font-semibold text-white">{vital.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Booking CTA card */}
      <div className="mt-10 rounded-card border border-gold/30 bg-purple-deep/10 bg-gradient-to-r from-purple-deep/20 via-night-surface to-gold/5 p-8 text-center shadow-lg relative overflow-hidden">
        <div aria-hidden className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-gold/10 blur-xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-purple-deep/25 blur-xl pointer-events-none" />
        
        <CheckCircle size={36} weight="fill" className="mx-auto text-gold" />
        <p className="mt-4 font-body text-xs text-gold font-bold uppercase tracking-wider">Automated Technical Scan Complete</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">Want a Complete Marketing Audit?</h2>
        <p className="mt-4 mx-auto max-w-xl font-body text-sm leading-relaxed text-muted">
          Our automated scanner reviews code performance and SEO tags. However, evaluating manual channels—such as paid ad campaigns, copywriting hooks, social media positioning, and content funnels—requires a dedicated human strategist.
        </p>
        <p className="mt-3 font-body text-sm text-white/95 font-semibold">
          Let&apos;s build a comprehensive, custom digital roadmap together.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold text-purple-deep hover:bg-gold/90 transition-all font-body text-sm font-semibold px-8 py-3.5 shadow-md hover:scale-[1.02]">
            Book a Free 30-Min Strategy Call <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(value); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  const r = 84;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-52 w-52">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
        <circle
          cx="100" cy="100" r={r} fill="none" stroke="#F0B428" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (shown / 100) * c}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="font-display text-5xl font-extrabold text-white">{shown}</p>
        <p className="font-body text-xs uppercase tracking-wider text-muted mt-1">out of 100</p>
      </div>
    </div>
  );
}
