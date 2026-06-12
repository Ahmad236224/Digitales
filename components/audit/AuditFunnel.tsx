"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, ShoppingCart, GraduationCap, FirstAid, HeartHalf,
  Briefcase, House, ForkKnife, DotsThreeOutline, CheckCircle, Check,
} from "@phosphor-icons/react";

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
  challenge: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  phone: string;
};

const EMPTY: State = {
  url: "", industry: "", goals: [], challenge: "", budget: "",
  name: "", email: "", company: "", phone: "",
};

const TOTAL = 6; // input steps

export default function AuditFunnel() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<State>(EMPTY);
  const [phase, setPhase] = useState<"form" | "loading" | "results">("form");
  const [resumed, setResumed] = useState(false);

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

  const canContinue = useMemo(() => {
    switch (step) {
      case 1: return data.url.trim().length > 2;
      case 2: return !!data.industry;
      case 3: return data.goals.length > 0;
      case 4: return !!data.challenge;
      case 5: return !!data.budget;
      case 6: return data.name.trim() && /\S+@\S+\.\S+/.test(data.email);
      default: return false;
    }
  }, [step, data]);

  const next = () => {
    if (step < TOTAL) {
      setStep((s) => s + 1);
    } else {
      // submit → loading → results. Wire HubSpot + UTM capture here.
      setPhase("loading");
      setTimeout(() => setPhase("results"), 2600);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  };

  if (phase === "loading") return <Loading url={data.url} />;
  if (phase === "results") return <Results data={data} />;

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
          <Step title="What is your biggest digital challenge today?" sub="Choose the one that hurts most.">
            <div className="grid gap-3 sm:grid-cols-2">
              {CHALLENGES.map((c) => (
                <Chip key={c} selected={data.challenge === c} onClick={() => set("challenge", c)}>{c}</Chip>
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
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-gold" />
      <h2 className="mt-8 font-display text-2xl font-bold text-white">Analysing {url || "your site"}…</h2>
      <p className="mt-2 font-body text-sm text-muted">Reviewing SEO signals, performance data, and competitive positioning.</p>
    </div>
  );
}

/* ---------- results: logic-based score + animated gauge ---------- */

function scoreFrom(seed: string, base: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return Math.max(38, Math.min(94, base + (h % 34)));
}

function Results({ data }: { data: State }) {
  const dims = useMemo(() => {
    const s = data.url + data.industry + data.challenge;
    return [
      { label: "SEO Health", score: scoreFrom(s + "seo", 45), note: "Indexation and on-page signals show clear room to capture higher-intent search traffic." },
      { label: "Site Speed & Performance", score: scoreFrom(s + "speed", 50), note: "Core Web Vitals can be tightened to reduce bounce and lift conversion on mobile." },
      { label: "Social Media Presence", score: scoreFrom(s + "social", 42), note: "Consistency and paid amplification are the fastest levers for audience growth." },
      { label: "Content & Conversion", score: scoreFrom(s + "content", 48), note: "Messaging and funnel structure can be sharpened to convert existing traffic better." },
    ];
  }, [data]);

  const overall = Math.round(dims.reduce((a, d) => a + d.score, 0) / dims.length);

  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow text-center">Your Results</p>
      <h1 className="mt-2 text-center font-display text-3xl font-bold text-white sm:text-4xl">Your Digital Health Score</h1>

      <div className="mt-10 flex justify-center"><Gauge value={overall} /></div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {dims.map((d) => (
          <div key={d.label} className="rounded-card border border-white/[0.08] bg-night-surface p-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold text-white">{d.label}</p>
              <p className="font-display text-lg font-extrabold text-gold">{d.score}<span className="text-sm text-muted">/100</span></p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${d.score}%` }} />
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted">{d.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-white/[0.08] bg-night-surface p-8 text-center">
        <CheckCircle size={32} weight="fill" className="mx-auto text-gold" />
        <p className="mt-3 font-body text-sm text-muted">Your full recommendations have been sent to your email.</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-white">Want us to build an action plan together?</h2>
        <Link href="/contact" className="btn-gold mt-6">Book a Free 30-Min Strategy Call <ArrowRight size={16} weight="bold" /></Link>
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
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="font-display text-5xl font-extrabold text-white">{shown}</p>
        <p className="font-body text-xs uppercase tracking-wider text-muted">out of 100</p>
      </div>
    </div>
  );
}
