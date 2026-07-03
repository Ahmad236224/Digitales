"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, ShoppingCart, GraduationCap, FirstAid, HeartHalf,
  Briefcase, House, ForkKnife, DotsThreeOutline, CheckCircle, Check,
} from "@phosphor-icons/react";
import type { AuditDimension, AuditResult } from "@/lib/pagespeed";

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
  const funnelRef = useRef<HTMLDivElement>(null);
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

  const scrollToFunnelTop = () => {
    requestAnimationFrame(() => {
      funnelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

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
        body: JSON.stringify({ ...data, url: urlToAudit, strategy: "mobile" }),
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
      scrollToFunnelTop();
    } else {
      scrollToFunnelTop();
      startAudit(data.url);
    }
  };

  const resetToForm = () => {
    setPhase("form");
    setStep(6); // return to the final step so they can try again or edit
    scrollToFunnelTop();
  };

  if (phase === "loading") return <Loading url={data.url} />;
  if (phase === "error") return <ErrorBoundary error={errorMessage} onRetry={resetToForm} />;
  if (phase === "results" && auditResult) return <Results data={data} result={auditResult} />;

  return (
    <div ref={funnelRef} className="mx-auto w-full max-w-3xl scroll-mt-24 sm:scroll-mt-32">
      {/* Header */}
      <p className="eyebrow text-center">Free Audit Funnel</p>
      <div className="mt-2 flex min-w-0 flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">Digital Performance Audit</h1>
        <span className="shrink-0 font-body text-sm text-muted">Step {step} of {TOTAL}</span>
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
      <div className="mt-6 rounded-card border border-white/[0.08] bg-night-surface p-5 sm:p-9">
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
                  <span className="mt-3 text-center font-body text-[0.68rem] font-semibold uppercase tracking-wide sm:text-xs">{label}</span>
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
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button
              onClick={() => {
                setStep((s) => s - 1);
                scrollToFunnelTop();
              }}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 px-5 py-3 font-body text-sm font-medium text-muted hover:text-white sm:w-auto sm:border-0 sm:px-0 sm:py-0"
            >
              <ArrowLeft size={15} weight="bold" /> Back
            </button>
          ) : <span />}
          <button
            onClick={next}
            disabled={!canContinue}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold transition sm:w-auto ${
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
      <h2 className="font-display text-xl font-semibold leading-tight text-white">{title}</h2>
      <p className="mt-1.5 font-body text-sm text-muted">{sub}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Tile({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[112px] flex-col items-center justify-center rounded-xl border p-3 transition sm:aspect-square sm:min-h-0 ${
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
    <div className="mx-auto w-full max-w-xl py-16 text-center">
      <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-gold" />
      <h2 className="mt-8 break-words font-display text-2xl font-bold leading-tight text-white">Analyzing {url}...</h2>
      <p className="mt-4 font-body text-base text-gold animate-pulse h-8">{messages[msgIndex]}</p>
      <p className="mt-4 font-body text-xs text-muted">Please hold tight. Live performance audits fetch real Lighthouse data and can take up to 40 seconds.</p>
    </div>
  );
}

function ErrorBoundary({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-card border border-red-500/20 bg-night-surface p-5 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold text-white">Live Audit Partially Interrupted</h2>
      <p className="mt-4 font-body text-base text-muted leading-relaxed">
        We couldn&apos;t complete the live analysis right now.
      </p>
      <p className="mt-1 break-words font-body text-xs text-red-400">
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

/* ---------- results: live PageSpeed dashboard ---------- */

function getScoreTone(score: number) {
  if (score >= 90) {
    return {
      text: "text-emerald-300",
      bar: "bg-emerald-400",
      glow: "shadow-[0_0_18px_rgba(52,211,153,0.35)]",
    };
  }
  if (score >= 70) {
    return {
      text: "text-[#F0B428]",
      bar: "bg-[#F0B428]",
      glow: "shadow-[0_0_18px_rgba(240,180,40,0.35)]",
    };
  }
  if (score < 50) {
    return {
      text: "text-red-400",
      bar: "bg-red-500",
      glow: "shadow-[0_0_18px_rgba(239,68,68,0.3)]",
    };
  }
  return {
    text: "text-[#c084fc]",
    bar: "bg-[#6B2D8B]",
    glow: "shadow-[0_0_18px_rgba(107,45,139,0.35)]",
  };
}

function getAcronym(label: string) {
  const match = label.match(/\(([^)]+)\)/);
  return match ? match[1] : label;
}

function getShortDimensionLabel(label: string) {
  return label.replace("Best Practices", "Best");
}

function Results({ result }: { data: State; result: AuditResult }) {
  return (
    <div className="mx-auto w-full max-w-6xl rounded-[20px] bg-[#0a0a0c] px-3 py-4 text-white shadow-2xl sm:rounded-[28px] sm:px-6 sm:py-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[24px] border border-[#F0B428]/35 bg-[#121214] p-6 shadow-[0_0_50px_rgba(240,180,40,0.08)] sm:p-8 lg:p-10">
        <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F0B428] to-transparent" />
        <div aria-hidden className="absolute -left-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#6B2D8B]/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.32em] text-[#F0B428]">Live Analysis Complete</p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-normal text-white sm:text-5xl">
              Digital Health Score
            </h1>
            <p className="mt-3 max-w-2xl break-words font-body text-sm leading-6 text-gray-400 sm:text-base">
              Real-time Google PageSpeed Insights scan completed for <span className="text-gray-200">{result.url}</span>.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Gauge value={result.overall} />
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-body text-xs font-semibold text-gray-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#F0B428] shadow-[0_0_14px_rgba(240,180,40,0.75)]" />
              Live Audit Active
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section className="rounded-[22px] border border-white/10 bg-[#121214] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Core Web Vitals</h2>
              <p className="mt-1 font-body text-sm text-gray-400">Live performance metrics from Google Lighthouse</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
              {result.strategy}
            </span>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {result.vitals.map((vital) => {
              const acronym = getAcronym(vital.label);
              const fullName = vital.label.split(" (")[0];
              return (
                <div
                  key={vital.label}
                  title={fullName}
                  className="min-h-[116px] rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#F0B428]/35 hover:bg-[#F0B428]/[0.04]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-[#F0B428]">{acronym}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6B2D8B]" />
                  </div>
                  <p className="mt-5 break-words font-display text-2xl font-bold text-white">{vital.value}</p>
                  <p className="mt-2 line-clamp-2 font-body text-xs leading-5 text-gray-500">{fullName}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[22px] border border-white/10 bg-[#121214] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-7">
          <h2 className="font-display text-xl font-bold text-white">Dimension Breakdown</h2>
          <p className="mt-1 font-body text-sm text-gray-400">Category scores mapped from PageSpeed Insights</p>

          <div className="mt-7 space-y-6">
            {result.dimensions.map((dimension) => {
              const tone = getScoreTone(dimension.score);
              return (
                <div key={dimension.key}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-body text-sm font-semibold text-gray-300">{dimension.label}</p>
                    <p className={`font-display text-lg font-extrabold ${tone.text}`}>
                      {dimension.score}
                      <span className="text-xs font-medium text-gray-500">/100</span>
                    </p>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${tone.bar} ${tone.glow}`}
                      style={{ width: `${dimension.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-[22px] border border-white/10 bg-[#121214] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Analytics Graph</h2>
            <p className="mt-1 font-body text-sm text-gray-400">Live category score distribution from PageSpeed Insights</p>
          </div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#F0B428]">
            Overall {result.overall}/100
          </p>
        </div>

        <ScoreChart dimensions={result.dimensions} />
      </section>

      {/* Booking CTA card */}
      <section className="relative mt-6 overflow-hidden rounded-[22px] border border-[#F0B428]/25 bg-[#121214] p-6 text-center shadow-[0_0_60px_rgba(107,45,139,0.16)] sm:p-8">
        <div aria-hidden className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#c084fc] to-transparent" />
        <div aria-hidden className="absolute -bottom-20 left-1/2 h-44 w-80 -translate-x-1/2 rounded-full bg-[#6B2D8B]/25 blur-3xl" />

        <div className="relative">
          <CheckCircle size={34} weight="fill" className="mx-auto text-[#F0B428]" />
          <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Want to improve these metrics?</h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-6 text-gray-400">
            Paid media, social, and content conversion require human review...
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#F0B428] px-7 py-3.5 font-body text-sm font-bold text-[#17091f] shadow-[0_0_28px_rgba(240,180,40,0.25)] transition hover:brightness-110"
            >
              Book a Free 30-Min Call {"\u2192"}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function ScoreChart({ dimensions }: { dimensions: AuditDimension[] }) {
  const points = dimensions.map((dimension, index) => {
    const x = dimensions.length <= 1 ? 50 : (index / (dimensions.length - 1)) * 100;
    const y = 100 - dimension.score;
    return { ...dimension, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = points.length > 0
    ? `${path} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`
    : "";

  return (
    <div className="mt-7">
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <div className="relative h-56">
          <div className="absolute inset-0 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((tick) => (
              <div key={tick} className="flex items-center gap-3">
                <span className="w-8 shrink-0 text-right font-body text-[10px] font-semibold text-gray-600">{tick}</span>
                <span className="h-px flex-1 bg-white/[0.06]" />
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-11 right-0">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
              <defs>
                <linearGradient id="scoreAreaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#F0B428" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#6B2D8B" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              {areaPath && <path d={areaPath} fill="url(#scoreAreaGradient)" />}
              {path && (
                <path
                  d={path}
                  fill="none"
                  stroke="#F0B428"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                  vectorEffect="non-scaling-stroke"
                />
              )}
              {points.map((point) => (
                <circle
                  key={point.key}
                  cx={point.x}
                  cy={point.y}
                  r="2.2"
                  fill="#0a0a0c"
                  stroke="#F0B428"
                  strokeWidth="1.8"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:ml-11 lg:grid-cols-4">
          {points.map((point) => {
            const tone = getScoreTone(point.score);
            return (
              <div key={point.key} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <p className="truncate font-body text-[11px] font-semibold text-gray-400">{getShortDimensionLabel(point.label)}</p>
                <p className={`mt-1 font-display text-lg font-extrabold ${tone.text}`}>{point.score}</p>
              </div>
            );
          })}
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

  const r = 78;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-40 w-40 sm:h-44 sm:w-44">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="100" cy="100" r={r} fill="none" stroke="#F0B428" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (shown / 100) * c}
          style={{ transition: "stroke-dashoffset 0.05s linear", filter: "drop-shadow(0 0 12px rgba(240,180,40,0.45))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">{shown}</p>
        <p className="mt-1 font-body text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Score</p>
      </div>
    </div>
  );
}
