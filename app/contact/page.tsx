import type { Metadata } from "next";
import { EnvelopeSimple, Phone, MapPin, Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Accordion from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Digitales team across Pakistan, the UK, and the USA. We respond within one business day.",
};

const HUBS = [
  { region: "Asia Pacific", city: "Lahore, PK", body: "Our HQ and core engineering team — where strategy, creative, and Relief OS are built.", address: "Lahore, Pakistan", hours: "09:00 – 18:00 PKT" },
  { region: "Europe", city: "London, UK", body: "Our UK chapter — business development and European market expansion.", address: "London, United Kingdom", hours: "08:30 – 17:30 GMT" },
  { region: "Americas", city: "New York, USA", body: "Our USA chapter — North American client relationships and campaigns.", address: "New York, USA", hours: "09:00 – 18:00 ET" },
];

const FAQ = [
  { q: "What types of organisations do you work with?", a: "We work across a broad range: national universities, international NGOs, consumer brands, and enterprise technology buyers. Our teams across Pakistan, the UK, and the USA mean we are well-positioned for organisations with both regional and international requirements." },
  { q: "What is your typical project timeline?", a: "It depends on scope. A focused SEO engagement or paid media campaign can be live within two to three weeks. A custom website or enterprise software project typically requires eight to sixteen weeks. We give you a clear timeline in our initial proposal." },
  { q: "Do you work with clients outside Pakistan?", a: "Yes — we operate actively across the UK and USA through our respective chapters. Geography has not been a barrier for any of our current clients." },
  { q: "How do you price your services?", a: "Pricing depends on scope, channel mix, and engagement duration. We offer both project-based and retained models. A detailed proposal follows our initial discovery call." },
  { q: "What makes Digitales different from other agencies?", a: "Primarily the integration of marketing strategy and technology delivery under one roof — backed by 30 years of advertising heritage. Most agencies specialise in one; we do both, in coordination, which is where compounding results come from." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect With Us"
        title="Let's Build Something That"
        highlight="Performs."
        subtitle="From Lahore to London and New York, our global team is ready to scale your operations. Tell us where your current digital effort is underperforming — we respond within one business day."
      />

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
                  <p className="font-body text-sm text-muted">hello@digitales.pk</p>
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

      {/* Regional hubs */}
      <section className="bg-night">
        <div className="container-d section">
          <h2 className="text-center h2">Our Regional Hubs</h2>
          <p className="mx-auto mt-3 max-w-lg text-center lede">
            Strategically located to support global brands around the clock.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HUBS.map((h) => (
              <div key={h.city} className="rounded-card border border-white/[0.07] bg-night-surface p-7">
                <div className="flex items-start justify-between">
                  <MapPin size={26} weight="fill" className="text-purple-link" />
                  <span className="font-body text-[0.7rem] font-semibold uppercase tracking-wider text-gold">{h.region}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{h.city}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">{h.body}</p>
                <div className="mt-6 space-y-2 font-body text-sm text-muted">
                  <p className="flex items-center gap-2"><MapPin size={15} className="text-gold" /> {h.address}</p>
                  <p className="flex items-center gap-2"><Clock size={15} className="text-gold" /> {h.hours}</p>
                </div>
                <button className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gold">
                  Get Directions <ArrowRight size={15} weight="bold" />
                </button>
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
