import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { EnvelopeSimple, Phone, MapPin, ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "@/components/contact/ContactForm";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Digitales team across Pakistan, the UK, and the USA. We respond within one business day.",
};

const OFFICES = [
  {
    flag: "🇵🇰",
    name: "Pakistan HQ",
    address: "82-B Garden Block, Garden Town, Lahore, Pakistan, 54000",
    phone: "+92 (42) 111 222 333",
    email: "pk@digitales.pk",
    searchLabel: "Garden Town, LHR",
    mapPaths: (
      <>
        {/* River/Canal */}
        <path d="M -20,170 Q 120,150 240,110 T 440,70" fill="none" stroke="#6b2d8b" strokeWidth="16" opacity="0.15" />
        <path d="M -20,170 Q 120,150 240,110 T 440,70" fill="none" stroke="#3d1450" strokeWidth="8" opacity="0.3" />
        {/* Main Grid Roads */}
        <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(201,168,232,0.2)" strokeWidth="6" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <line x1="60" y1="0" x2="60" y2="250" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <line x1="200" y1="0" x2="200" y2="250" stroke="rgba(201,168,232,0.25)" strokeWidth="8" />
        <line x1="320" y1="0" x2="320" y2="250" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        {/* Diagonal connection */}
        <line x1="0" y1="20" x2="350" y2="230" stroke="rgba(201,168,232,0.1)" strokeWidth="3" />
      </>
    )
  },
  {
    flag: "🇬🇧",
    name: "UK Chapter",
    address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom",
    phone: "+44 (20) 7946 0192",
    email: "uk@digitalesuk.com",
    searchLabel: "Covent Garden, LDN",
    mapPaths: (
      <>
        {/* River Thames */}
        <path d="M -20,210 C 130,230 250,190 420,220" fill="none" stroke="#6b2d8b" strokeWidth="24" opacity="0.15" />
        <path d="M -20,210 C 130,230 250,190 420,220" fill="none" stroke="#3d1450" strokeWidth="12" opacity="0.3" />
        {/* London organic street curves */}
        <path d="M 60,0 Q 90,90 100,250" fill="none" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <path d="M 200,0 Q 170,110 190,250" fill="none" stroke="rgba(201,168,232,0.25)" strokeWidth="7" />
        <path d="M 310,0 Q 340,120 320,250" fill="none" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <line x1="0" y1="70" x2="400" y2="100" stroke="rgba(201,168,232,0.2)" strokeWidth="6" />
        <line x1="0" y1="140" x2="400" y2="130" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <path d="M 0,30 C 140,80 260,70 400,150" fill="none" stroke="rgba(201,168,232,0.2)" strokeWidth="5" />
      </>
    )
  },
  {
    flag: "🇺🇸",
    name: "USA Chapter",
    address: "135 Madison Ave, New York, NY 10016, United States",
    phone: "+1 (212) 555 0148",
    email: "usa@digitalesusa.org",
    searchLabel: "Madison Ave, NYC",
    mapPaths: (
      <>
        {/* Water outline */}
        <rect x="350" y="0" width="50" height="250" fill="#3d1450" opacity="0.25" />
        <line x1="350" y1="0" x2="350" y2="250" stroke="#6b2d8b" strokeWidth="2" opacity="0.3" />
        {/* Manhattan Avenues Grid */}
        <line x1="80" y1="0" x2="80" y2="250" stroke="rgba(201,168,232,0.2)" strokeWidth="6" />
        <line x1="200" y1="0" x2="200" y2="250" stroke="rgba(201,168,232,0.25)" strokeWidth="8" />
        <line x1="300" y1="0" x2="300" y2="250" stroke="rgba(201,168,232,0.2)" strokeWidth="6" />
        {/* Streets */}
        <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <line x1="0" y1="125" x2="400" y2="125" stroke="rgba(201,168,232,0.2)" strokeWidth="5" />
        <line x1="0" y1="165" x2="400" y2="165" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        <line x1="0" y1="210" x2="400" y2="210" stroke="rgba(201,168,232,0.15)" strokeWidth="4" />
        {/* Broadway (diagonal) */}
        <line x1="0" y1="220" x2="330" y2="0" stroke="rgba(201,168,232,0.3)" strokeWidth="6" />
      </>
    )
  }
];

function getDisplayHost(searchParams?: { domain?: string | string[] }) {
  const host = headers().get("host")?.split(":")[0].toLowerCase() || "";
  const domainParam = Array.isArray(searchParams?.domain) ? searchParams?.domain[0] : searchParams?.domain;

  if (domainParam && ["localhost", "127.0.0.1"].includes(host)) {
    return domainParam.toLowerCase();
  }

  return host;
}

function getOfficesForHost(host: string) {
  if (host.includes("digitales.uk")) {
    return OFFICES.filter((office) => office.name === "UK Chapter");
  }

  if (host.includes("digitales.us")) {
    return OFFICES.filter((office) => office.name === "USA Chapter");
  }

  return OFFICES;
}

const FAQ = [
  { q: "What types of organisations do you work with?", a: "We work across a broad range: national universities, international NGOs, consumer brands, and enterprise technology buyers. Our teams across Pakistan, the UK, and the USA mean we are well-positioned for organisations with both regional and international requirements." },
  { q: "What is your typical project timeline?", a: "It depends on scope. A focused SEO engagement or paid media campaign can be live within two to three weeks. A custom website or enterprise software project typically requires eight to sixteen weeks. We give you a clear timeline in our initial proposal." },
  { q: "Do you work with clients outside Pakistan?", a: "Yes — we operate actively across the UK and USA through our respective chapters. Geography has not been a barrier for any of our current clients." },
  { q: "How do you price your services?", a: "Pricing depends on scope, channel mix, and engagement duration. We offer both project-based and retained models. A detailed proposal follows our initial discovery call." },
  { q: "What makes Digitales different from other agencies?", a: "Primarily the integration of marketing strategy and technology delivery under one roof — backed by 30 years of advertising heritage. Most agencies specialise in one; we do both, in coordination, which is where compounding results come from." },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { domain?: string | string[] };
}) {
  const displayHost = getDisplayHost(searchParams);
  const visibleOffices = getOfficesForHost(displayHost);
  const isRegionalOfficeView = displayHost.includes("digitales.uk") || displayHost.includes("digitales.us");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/Contact/contact-page-background.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#07040c]/50" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(61,20,80,0.38),rgba(7,4,12,0.78)_72%)]" />
        <div className="container-d flex min-h-[68vh] flex-col items-center justify-center px-4 pb-20 pt-36 text-center">
          <p className="rounded-full border border-gold/30 bg-gold/15 px-4 py-1.5 font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">
            CONNECT WITH US
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Let&apos;s build Something That <span className="text-gold">Performs</span>
          </h1>
          <p className="mt-6 max-w-2xl font-body text-sm font-medium leading-relaxed text-white sm:text-base">
            From Lahore to London and New York, our global team is ready to scale your operations. Tell us where your current digital effort is underperforming — we respond within one business day.
          </p>
        </div>
      </section>

      {/* Send a message */}
      <section className="bg-night">
        <div className="container-d section grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="h2">Send a message</h2>
            <p className="mt-4 max-w-md lede">
              Whether you're looking for a full digital transformation or a
              specific audit, our experts are just a form away.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-purple/15 text-gold"><EnvelopeSimple size={20} weight="fill" /></span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">Email Us</p>
                  <p className="font-body text-sm text-muted font-mono">hello@digitales.pk</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-purple/15 text-gold"><Phone size={20} weight="fill" /></span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">Global Support</p>
                  <p className="font-body text-sm text-muted">Mon–Fri across PK, UK & USA hours</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Our Global Offices with Mockup Interactive Maps */}
      <section className="bg-night relative">
        <div className="container-d section">
          <h2 className="text-center h2">{isRegionalOfficeView ? "Our Office" : "Our Global Offices"}</h2>
          <p className="mx-auto mt-3 max-w-lg text-center lede">
            {isRegionalOfficeView
              ? "Strategically located to support brands in your region."
              : "Strategically located to support global brands around the clock."}
          </p>
          <div className={`mt-12 grid grid-cols-1 gap-8 ${visibleOffices.length === 1 ? "w-full" : "lg:grid-cols-3"}`}>
            {visibleOffices.map((office) => (
              <div key={office.name} className="flex flex-col rounded-card border border-white/[0.07] bg-night-surface p-6 shadow-card transition-all duration-300 hover:border-purple/30 hover:shadow-card-hover group">
                {/* Header: Flag + Name */}
                <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
                  <span className="text-2xl select-none" role="img" aria-label={`${office.name} flag`}>{office.flag}</span>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">{office.name}</h3>
                </div>

                {/* Details */}
                <div className="mt-4 flex-grow space-y-3 font-body text-sm text-muted">
                  <p className="flex items-start gap-2.5 leading-relaxed">
                    <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-center gap-2.5 font-mono">
                    <Phone size={16} className="text-gold shrink-0" />
                    <span>{office.phone}</span>
                  </p>
                  <p className="flex items-center gap-2.5 font-mono">
                    <EnvelopeSimple size={16} className="text-gold shrink-0" />
                    <Link href={`mailto:${office.email}`} className="transition hover:text-gold hover:underline">{office.email}</Link>
                  </p>
                </div>

                {/* Map Embed UI Mockup */}
                <div className="w-full h-48 mt-6 relative overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#0c0814] shadow-inner group/map">
                  {/* Styled Dark-Theme Map Tint Canvas */}
                  <svg className="absolute inset-0 w-full h-full select-none" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
                    {/* Background styling for custom map styling */}
                    <rect width="100%" height="100%" fill="#0C0814" />
                    {/* Background paths/grids */}
                    {office.mapPaths}
                  </svg>

                  {/* Search Bar Mockup Top Left */}
                  <div className="absolute top-3 left-3 bg-night/85 backdrop-blur-sm border border-white/10 rounded px-2.5 py-1 text-[10px] text-white/70 flex items-center gap-1.5 shadow-sm select-none">
                    <MagnifyingGlass size={10} className="text-gold" />
                    <span className="font-mono">{office.searchLabel}</span>
                  </div>

                  {/* Golden Location Pin at Center */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    {/* Ripple/Pulse effect */}
                    <div className="absolute w-8 h-8 rounded-full bg-gold/25 animate-ping" />
                    {/* The Golden Location Pin Icon */}
                    <MapPin size={28} weight="fill" className="text-gold relative z-10 drop-shadow-[0_0_8px_rgba(240,180,40,0.7)] transition-transform duration-300 group-hover/map:scale-110" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-gold hover:underline"
                  >
                    Open in Google Maps <ArrowRight size={13} weight="bold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="text-center h2">Frequently Asked Questions</h2>
          <p className="mx-auto mt-3 max-w-lg text-center lede">
            Everything you need to know about starting your journey with Digitales.
          </p>
          <div className="mt-12">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
