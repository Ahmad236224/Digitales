import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkle } from "@phosphor-icons/react/dist/ssr";
import CircuitBackground from "@/components/ui/CircuitBackground";

const serviceSlugs = [
  "seo",
  "digital-media-buying",
  "social-media-marketing",
  "digital-pr-influencer",
  "web-app-development",
  "enterprise-software",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

type SectionBlock = {
  heading: string;
  paragraphs: string[];
};

type ServiceContent = {
  title: string;
  headline: string;
  answerParagraphs: string[];
  quote?: string;
  whyTitle?: string;
  whyItems?: string[];
  servicesTitle: string;
  services: string[];
  blocks?: SectionBlock[];
  toolsTitle?: string;
  tools?: string[];
  ctaHeading: string;
  ctaParagraphs?: string[];
  ctaLabel: string;
  ctaHref: string;
};

const serviceContent: Record<ServiceSlug, ServiceContent> = {
  seo: {
    title: "SEO",
    headline: "Be Found. Be Chosen. Own the Search Results.",
    answerParagraphs: [
      "Digitales provides search engine optimisation services for businesses across Pakistan, the UK, and the USA. We build SEO programmes that earn organic visibility, attract high-intent traffic, and deliver compounding returns — through technical audits, content strategy, link building, and local SEO.",
    ],
    quote:
      "Good SEO does not chase the algorithm. It builds the kind of digital authority that algorithms are designed to reward.",
    whyTitle: "Why SEO",
    whyItems: [
      "Generates high-intent leads at significantly lower cost per acquisition than paid channels",
      "Builds long-term brand authority and domain trust that cannot be replicated quickly",
      "Delivers compounding returns — rankings earned today continue driving traffic for years",
      "Positions your brand as the credible, expert answer to your customers' most important questions",
    ],
    servicesTitle: "Our SEO Services",
    services: [
      "Technical SEO Audits & Remediation",
      "On-Page Optimisation — Meta, Headers, Structured Content",
      "Content Strategy & Production",
      "Authority Link Building Campaigns",
      "Local SEO & Google Business Profile Optimisation",
      "Performance Tracking, Reporting & Strategy Reviews",
    ],
    blocks: [
      {
        heading: "How We Build Rankings That Last",
        paragraphs: [
          "Most agencies chase positions. We build the underlying authority that earns them.",
          "Our process begins with a full technical and competitive audit — understanding what is holding your site back, where your competitors are winning, and which opportunities are within reach in the next 90 days. From there, we build a programme structured around three compounding pillars:",
          "Foundation — We eliminate every technical barrier standing between your site and full crawlability: site speed, indexation errors, structured data, Core Web Vitals, and mobile performance. Search engines cannot rank what they cannot understand.",
          "Content — We map your target queries to searcher intent, then produce content designed to answer those questions with more depth, clarity, and authority than anything currently ranking. Every piece earns its place on the page.",
          "Authority — We build links that move the needle — earned placements on relevant, high-authority publications, not directory submissions or link farms. Domain authority takes time to build and cannot be faked; we treat it accordingly.",
        ],
      },
      {
        heading: "What Good SEO Actually Looks Like",
        paragraphs: [
          "Not vanity metrics. Not rank reports filed away and forgotten. The outcomes we track are the ones that affect your business:",
          "Organic sessions from people actively searching for YOU!",
          "Leads and enquiries attributed to organic search",
          "Share of voice against your named competitors",
          "Revenue influenced by non-paid traffic",
          "Every client receives a monthly strategy review — not just a dashboard. We explain what moved, why it moved, and what we are doing next. Transparency is not optional; it is how trust is built.",
        ],
      },
    ],
    toolsTitle: "Tools",
    tools: [
      "SEMrush",
      "Ahrefs",
      "Moz",
      "Screaming Frog",
      "Google Search Console",
      "Google Analytics 4",
    ],
    ctaHeading: "Want to see where you rank today — and where you should be?",
    ctaLabel: "Run a Free Audit →",
    ctaHref: "/free-audit",
  },
  "digital-media-buying": {
    title: "Digital Media Buying",
    headline: "Maximum Return. Minimum Wasted Spend.",
    answerParagraphs: [
      "Digitales plans, executes, and optimises high-performance paid media campaigns across search, social, display, and programmatic channels for growth-oriented organisations in Pakistan, the UK, and the USA. We manage Google Ads, Meta, TikTok, LinkedIn, and programmatic platforms with a rigorous, data-led approach designed to eliminate guesswork. Our philosophy is built on the reality that modern advertising requires more than just launching campaigns—it demands absolute alignment between learning algorithms and deep consumer psychology across diverse international markets.",
      "By functioning as an extension of your growth team, we deep-dive into cross-border market dynamics to craft tailored bidding strategies that treat your budget as a high-yield investment rather than an operational expense.",
    ],
    quote:
      "The right message, in front of the right person, at the right moment — that is the only standard we accept.",
    servicesTitle: "Our Media Buying Services",
    services: [
      "Paid Social — Meta, Instagram, TikTok, LinkedIn, X",
      "Search Engine Marketing — Google Ads, Bing",
      "Programmatic & Display Advertising",
      "Video Advertising — YouTube, Connected TV",
      "Retargeting & Remarketing Campaigns",
      "Audience Segmentation & Lookalike Modelling",
    ],
    blocks: [
      {
        heading: "The Math Behind the Momentum: Strategy over Spend",
        paragraphs: [
          "Turn raw visibility into predictable, sustainable growth. At Digitales, we cut through the noise of vanity metrics to focus entirely on the high-impact data that elevates your business. By combining advanced server-side precision with highly engaging creative testing, we ensure every single dollar of your ad spend is strategically engineered to maximize efficiency, unlock scalable revenue, and fuel your brand’s success.",
        ],
      },
      {
        heading: "Why paid media — done right — is your fastest channel",
        paragraphs: [
          "Generates qualified attention on demand, at a pace organic channels cannot match",
          "Reaches audiences at the exact moment they are ready to act",
          "Scales directly with budget when the strategy and execution are sound",
          "Provides measurable, attributable return — every pound, dollar and rupee accounted for",
          "Delivers immediate data that sharpens every other part of your marketing",
        ],
      },
      {
        heading: "The Digitales Edge",
        paragraphs: [
          "We work not merely as campaign managers, but as algorithmic engineers. Our strategy recognizes a fundamental truth: today's ad platforms are brilliant, but they are also hungry for spend. Without a sophisticated, data-driven hand to guide them, they optimize for their bottom line, not yours. We change that dynamic completely.",
          "Algorithmic Fluency, Not Guesswork",
          "We don’t just \"run ads.\" We understand the math behind shifting bidding algorithms. Our team builds campaigns that play with the platform rules, lowering your CPMs out of the gate.",
          "The Death of Vanity Metrics",
          "Impressions and clicks don't pay the rent. We tie our success directly to your bottom line: lowering your Customer Acquisition Cost (CAC) and aggressively scaling your Return on Ad Spend (ROAS).",
          "Creative-Led Performance",
          "Modern ad platforms are hungry for creative. Media buying is no longer just about technical targeting—it’s about dynamic hooks. We blend analytical precision with pattern-interrupting assets that force a scroll-stop.",
        ],
      },
    ],
    ctaHeading:
      "Let us audit your current ad spend and show you where returns are being left on the table.",
    ctaLabel: "Book a Media Audit →",
    ctaHref: "/contact",
  },
  "social-media-marketing": {
    title: "Social Media Marketing",
    headline: "Build Communities That Convert.",
    answerParagraphs: [
      "Digitales engineers social-first ecosystems for market-defining brands across Pakistan, the UK, and the USA. We orchestrate cross-platform strategy, culture-driven content creation, and active community cultivation with a single, unyielding metric of success: transforming passive attention into commercial momentum.",
      "We treat social channels as something far greater than mere broadcast tools. In a hyper-connected economy, your social ecosystem is your brand’s primary storefront, its conversational heartbeat, and its ultimate driver of cultural equity. A beautifully curated aesthetic is a wasted investment if it fails to impact your bottom line. We bridge the gap between brilliant narrative craft and absolute analytical accountability, shifting your channels away from superficial noise toward predictable user actions.",
    ],
    servicesTitle: "Our Services",
    services: [
      "01 / Channel Architecture & Content Mapping",
      "We do not believe in copy-and-paste social strategies. The psychological mindset of a user exploring industry insights on LinkedIn is entirely distinct from someone seeking entertainment on TikTok. We perform granular social listening, audience behavior analysis, and competitive landscape teardowns to determine precisely where your community breathes. From there, we construct custom content matrices and channel-specific playbooks completely aligned with your commercial objectives.",
      "02 / Creative Production & Narrative Development",
      "The algorithms that control modern social distribution reward one primary attribute: retention. Our creative studio designs and executes high-retention, native assets engineered specifically for modern attention spans. Whether producing high-impact, short-form vertical storytelling, sophisticated multi-frame graphics, or sharp, thought-provoking editorial copy, we create assets that command immediate authority and earn organic distribution.",
      "03 / Cultivation & Real-Time Engagement",
      "Social spaces are inherently conversational, not transactional. Leaving user interactions, direct messages, and brand mentions unaddressed destroys consumer trust. Our specialized community teams act as the frontline stewards of your brand's voice. We actively spark dialogues, handle complex inbound interactions with strategic empathy, and foster a highly responsive environment that turns casual observers into fiercely protective brand advocates.",
      "04 / Predictive Tracking & Strategy Iteration",
      "Transparency dictates everything we build. Every month, we deliver deep-dive performance analyses that strip away fluff to reveal the metrics that actually matter. We track audience velocity, inbound inquiry quality, sentiment shifts, and user journey transitions. We treat this data as a living feedback loop, constantly tuning our creative output to match real-time platform evolution and shifting consumer habits.",
    ],
    blocks: [
      {
        heading: "Turn Communication Into Capital.",
        paragraphs: [
          "Every day your brand operates without a rigorous, conversion-focused framework, you are conceding valuable market share to competitors who understand the current landscape. You do not need social platforms that simply exist to check a box—you need an active digital ecosystem that builds undeniable authority, captures hidden demand, and drives scalable growth.",
          "Let’s dissect your current positioning, isolate your true audience opportunities, and build a community that does not just scroll past, but actively commits.",
        ],
      },
    ],
    ctaHeading: "Ready to turn your social presence into a commercial asset?",
    ctaLabel: "Start a Conversation →",
    ctaHref: "/contact",
  },
  "digital-pr-influencer": {
    title: "Digital PR & Influencer",
    headline: "Shape Perception. Build Authority. Own the Narrative.",
    answerParagraphs: [
      "Digitales delivers high-impact digital PR and creator-led marketing strategies for ambitious brands seeking undeniable credibility, cultural relevance, and dominant media coverage. We secure top-tier press placements, orchestrate hyper-targeted influencer movements, protect corporate reputations, and position our clients as the definitive authorities in their fields across Pakistan, the UK, and the USA markets.",
      "Navigating this complex trust landscape requires an international, highly nuanced approach. The media mechanics of securing high-tier thought leadership in London or New York differ vastly from driving mass-market behavioral shifts across Pakistan's rapidly expanding digital mainstream. At Digitales, we possess a deep, cross-border understanding of media psychology and creator economics. We know how to translate a corporate milestone into an unignorable journalistic angle, and we know exactly how to align a brand with digital creators who share genuine alignment with your target demographic.",
    ],
    servicesTitle: "Our Services",
    services: [
      "Press Release Strategy, Writing & Distribution",
      "Media Outreach & Journalist Relationship Management",
      "Thought Leadership Content Creation",
      "Influencer Campaign Strategy & Execution",
      "Crisis Communication Planning & Management",
      "Online Reputation Monitoring & Response",
    ],
    blocks: [
      {
        heading: "What We Do",
        paragraphs: [
          "The Validation Variable: Blending Classic PR with Digital Precision.",
          "The classic PR playbook isn’t dead—it’s just being reimagined. While many completely abandon the foundational, relationship-driven practices that built the industry, and traditional entities fail to grasp the mechanics of digital acceleration, Digitales operates firmly at the intersection of both worlds.",
          "We understand that true market authority requires a dual approach. You cannot achieve dominant brand equity by choosing between traditional institutional credibility and digital velocity; you must master both.",
          "Amplified by Modern Digital Acceleration",
          "Once the foundational print and broadcast placements are secured, our digital engine takes over to maximize their value. We don't let a brilliant newspaper profile or TV appearance fade away after 24 hours. We translate that established credibility into lasting digital assets—re-architecting the coverage for top-tier digital newsrooms, high-authority online editorial features, and targeted creator networks.",
          "By pairing the undeniable prestige of traditional press with advanced digital tracking, strategic link-building, and localized creator alignment, we ensure your offline authority fuels your online growth. This unified strategy turns public relations into an ironclad, cross-platform asset that protects your reputation, dominates search results, and scales your business.",
        ],
      },
    ],
    ctaHeading: "Your Brand Deserves to Be Talked About — For the Right Reasons.",
    ctaParagraphs: [
      "In an over-saturated market, silence is the greatest threat to your business growth. If your target audience, industry peers, and the global media are not actively discussing your innovations, you are conceding your authority to competitors who are willing to command the spotlight. You have built a remarkable organization; now it is time to build the undeniable credibility that matches it.",
      "Let us audit your current digital footprint, isolate the narrative angles your competitors are missing, and position your brand as the absolute authority in your industry.",
    ],
    ctaLabel: "Start Building Authority →",
    ctaHref: "/contact",
  },
  "web-app-development": {
    title: "Web & App Development",
    headline:
      "Your Digital Presence Is Your First Commercial Impression. Make It Count.",
    answerParagraphs: [
      "Digitales builds custom websites, mobile applications, and high-performance web platforms for growth-focused businesses across Pakistan, the UK, and the USA. We leverage cutting-edge technologies like React, Next.js, Laravel, Flutter, and WordPress to deliver lightning-fast, conversion-optimised digital products that directly serve your commercial objectives.",
      "We believe your website or mobile app shouldn’t just exist as an online brochure or a passive digital placeholder. In a global marketplace where attention is short and competition is fierce, your product is your brand's definitive handshake. If your platform suffers from sluggish load times, clunky navigation, or fragmented code, it isn't just underperforming—it is actively turning revenue away.",
      "We bridge the gap between stunning visual aesthetics and rigorous software engineering to build scalable, secure platforms designed for high-impact commercial performance.",
    ],
    quote:
      "A website is not a brochure. It is a business tool.",
    blocks: [
      {
        heading: "Most businesses underestimate what their website is actually doing — or failing to do — every single day.",
        paragraphs: [
          "Your website is the destination every marketing channel points to. Every ad you run, every piece of content you publish, every referral you receive — all of it lands there.",
          "If that destination is slow, unclear, or difficult to navigate, you are not just losing visitors. You are losing the return on every other investment you have made to bring them there.",
          "A well-built digital product does the opposite. It loads fast, communicates clearly, guides visitors toward a decision, and converts at a rate that makes every other channel more profitable. It works while you sleep, handles objections before they are raised, and represents your brand with the same consistency a great salesperson would — without the variables.",
          "That is what we build. Not websites that look good in a portfolio. Websites and applications that perform in the real world.",
        ],
      },
    ],
    servicesTitle: "Our Services",
    services: [
      "Custom Website Development — Responsive, performance-engineered, bespoke",
      "We engineer responsive, performance-engineered, bespoke websites tailored to your exact operational requirements. Utilizing robust frameworks like Next.js and Laravel, or building clean, decoupled headless CMS architectures, we create custom web properties that offer complete design freedom, impenetrable security protocols, and unparalleled processing speeds.",
      "eCommerce Development — Shopify, WooCommerce, Magento",
      "We turn digital storefronts into high-yield transactional engines using Shopify, WooCommerce, and Magento. Our eCommerce architectures focus heavily on minimizing checkout friction, integrating secure localized and international payment gateways, optimizing multi-tier product databases, and building dynamic up-sell and cross-sell systems that instantly lift your average order value (AOV).",
      "Mobile App Development — Native iOS, Android, React Native",
      "We build high-performance native iOS and Android experiences alongside versatile React Native and Flutter applications. Our mobile products ensure seamless offline capabilities, fluid gesture tracking, real-time push notification frameworks, and clean data synchronization so your brand lives permanently and beautifully in your customer’s pocket.",
      "Web Application & SaaS Development",
      "We transform complex operational workflows into intuitive web applications and subscription-based software assets. From custom internal dashboards and inventory management engines to multi-tenant SaaS architectures, we build secure, cloud-hosted applications that handle heavy computing loads seamlessly while keeping your proprietary data safe.",
      "UX/UI Design & Prototyping",
      "Great software begins with deep human empathy. Our interface design team maps out frictionless user journeys through iterative wireframing, high-fidelity prototyping, and behavioral heat-map testing. We ensure your interface is not only stunning but completely accessible, driving users toward high-value interaction zones without cognitive fatigue.",
      "Maintenance, Hosting & Performance Optimisation",
      "A digital product is a living, breathing asset that requires continuous optimization. We provide reliable cloud hosting management, automated security patching, real-time uptime monitoring, and proactive code auditing. We ensure your platform scales effortlessly alongside your traffic surges, protecting your brand from unexpected downtime.",
    ],
    ctaHeading: "Your website should be your best-performing salesperson.",
    ctaLabel: "Let us build it →",
    ctaHref: "/contact",
  },
  "enterprise-software": {
    title: "Enterprise Software",
    headline: "Software That Fits Your Business — Not the Other Way Around.",
    answerParagraphs: [
      "Most enterprise software forces you to change your workflows, adjust your habits, and work around its limitations. We think that’s backwards. Your operations are unique, and your technology should be too. We design, build, and integrate custom enterprise software tailored specifically to your operational realities—allowing you to scale seamlessly, eliminate friction, and unlock your team’s true potential.",
      "We dive deep into your operational realities, mapping out your unique workflows, bottlenecks, and growth objectives. Whether you need to centralize chaotic data pipelines, liberate your team from repetitive manual tasks, or build an internal platform that connects global offices seamlessly, we engineer tailor-made digital ecosystems. The result is a robust, cloud-native infrastructure that operates as a natural extension of your business, giving you the agility to innovate, the security to protect your assets, and the scalability to thrive on your own terms.",
    ],
    blocks: [
      {
        heading: "Why Choose Custom Enterprise Engineering?",
        paragraphs: [
          "Choosing to build custom software is an investment in the long-term sovereignty and flexibility of your business. off-the-shelf software models often hook you with low initial entry costs, only to trap you later in a web of escalating per-user licensing fees, restrictive feature lockouts, and expensive add-on modules. Worse, you are entirely dependent on their product roadmap; if they decide to discontinue a feature your business relies on, you are left stranded.",
          "Custom software flips the script, shifting your technology costs from an endless operational expense to a valuable, proprietary corporate asset.",
        ],
      },
      {
        heading: "The Path to Alignment: How We Work Together",
        paragraphs: [
          "Building complex enterprise software requires deep collaboration, rigorous engineering, and total transparency. We don’t disappear into a room for six months and emerge with a finished product hoping it matches your needs. Our development process is highly iterative, keeping you in control at every phase of the journey.",
        ],
      },
    ],
    whyTitle: "Process Phases",
    whyItems: [
      "Phase 1: Discovery & Mapping",
      "We embed ourselves with your team to deeply analyze your current pain points, shadow your daily workflows, and map out the technical requirements needed to solve your operational challenges.",
      "Phase 2: Architecture & UX Design",
      "We create comprehensive structural blueprints and interactive user experience prototypes, letting you see and feel exactly how the software will function before a single line of production code is written.",
      "Phase 3:Iterative Agile Development",
      "Our engineering team builds the application in structured, transparent sprints. You receive regular, working software updates, allowing us to incorporate your fedback early and often.",
      "Phase 4: Seamless Integration & Deployment",
      "We handle the complex migration of your legacy data, conduct exhaustive security vulnerability testing, and deploy your new platform smoothly with zero disruption to your daily operations.",
    ],
    servicesTitle: "Our Services",
    services: [
      "Custom CMS Development",
      "Document Management Systems (DMS)",
      "ERP & CRM Development",
      "Workflow Automation Platforms",
      "Cloud-Native Application Development",
      "System Integration & API Development",
    ],
    ctaHeading:
      "Ready to stop fighting your tools and start empowering your people? Let’s design a digital ecosystem built exclusively for your operational realities, your team's workflows, and your long-term growth strategy.",
    ctaLabel: "Start a Technical Brief →",
    ctaHref: "/contact",
  },
};

export function createServiceMetadata(slug: ServiceSlug): Metadata {
  const content = serviceContent[slug];

  return {
    title: content.title,
    description: content.answerParagraphs[0],
  };
}

type ContentCard = {
  title: string;
  body?: string;
};

function toContentCards(items: string[]): ContentCard[] {
  const cards: ContentCard[] = [];

  for (let index = 0; index < items.length; index += 1) {
    const current = items[index];
    const next = items[index + 1];
    const shouldPair = Boolean(next && current.length < 110 && next.length > 110);

    if (shouldPair) {
      cards.push({ title: current, body: next });
      index += 1;
      continue;
    }

    cards.push({ title: current });
  }

  return cards;
}

function ServiceCard({
  card,
  index,
}: {
  card: ContentCard;
  index: number;
}) {
  return (
    <article className="rounded-card border border-white/[0.08] bg-[#120D1B] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/35 hover:bg-[#171020]">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 font-display text-sm font-bold text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold leading-snug text-white">
            {card.title}
          </h3>
          {card.body ? (
            <p className="mt-4 max-w-prose font-body text-sm leading-[1.75] text-slate-300">
              {card.body}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ServiceTemplate({ slug }: { slug: ServiceSlug }) {
  const content = serviceContent[slug];
  const serviceCards = toContentCards(content.services);
  const whyCards = content.whyItems ? toContentCards(content.whyItems) : [];

  return (
    <main className="bg-night">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(240,180,40,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(87,31,114,0.28),transparent_28%),linear-gradient(180deg,rgba(7,4,12,0.2),rgba(7,4,12,1))]"
        />
        <CircuitBackground className="opacity-[0.1]" />
        <div className="container-d relative grid gap-12 pb-20 pt-36 lg:grid-cols-[minmax(0,1fr)_340px] lg:pb-28">
          <div className="max-w-4xl">
            <p className="eyebrow">{content.title}</p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              {content.headline}
            </h1>
            <div className="mt-8 max-w-3xl space-y-6">
              {content.answerParagraphs.map((paragraph) => (
                <p key={paragraph} className="font-body text-base leading-[1.75] text-slate-300 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-gold/25 bg-[#120D1B]/90 p-6 shadow-card-hover backdrop-blur">
              <Sparkle size={22} weight="fill" className="text-gold" />
              <h2 className="mt-4 font-display text-xl font-bold leading-tight text-white">
                Ready to move from interest to action?
              </h2>
              <p className="mt-3 font-body text-sm leading-[1.7] text-slate-300">
                Start with a focused conversation about the outcome you need, the market you serve, and the fastest path to measurable progress.
              </p>
              <Link href={content.ctaHref} className="btn-gold mt-6 w-full justify-center">
                {content.ctaLabel}
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {content.quote ? (
        <section className="border-y border-white/[0.06] bg-[#100B18]">
          <div className="container-d py-14 sm:py-20">
            <blockquote className="max-w-4xl font-display text-2xl font-semibold leading-[1.35] text-white sm:text-3xl">
              {content.quote}
            </blockquote>
          </div>
        </section>
      ) : null}

      {whyCards.length ? (
        <section className="bg-night" aria-labelledby="service-why">
          <div className="container-d py-20 sm:py-28">
            <div className="max-w-3xl">
              <p className="eyebrow">{content.whyTitle}</p>
              <h2 id="service-why" className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Why this matters
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {whyCards.map((card, index) => (
                <ServiceCard key={`${card.title}-${index}`} card={card} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#0B0711]" aria-labelledby="service-offer">
        <div className="container-d py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow">{content.servicesTitle}</p>
            <h2 id="service-offer" className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Clear capability, structured for outcomes.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {serviceCards.map((card, index) => (
              <ServiceCard key={`${card.title}-${index}`} card={card} index={index} />
            ))}
          </div>
          <div className="mt-12">
            <Link href={content.ctaHref} className="btn-ghost-white">
              {content.ctaLabel}
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {content.blocks?.map((block) => (
        <section key={block.heading} className="bg-night">
          <div className="container-d py-20 sm:py-28">
            <article className="max-w-4xl">
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                {block.heading}
              </h2>
              <div className="mt-8 space-y-6">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-3xl font-body text-base leading-[1.75] text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-10">
                <Link href={content.ctaHref} className="inline-flex items-center gap-2 font-body text-sm font-semibold text-gold transition hover:text-white">
                  {content.ctaLabel}
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </article>
          </div>
        </section>
      ))}

      {content.tools?.length ? (
        <section className="bg-[#0B0711]" aria-labelledby="service-tools">
          <div className="container-d py-20 sm:py-24">
            <div className="max-w-3xl">
              <p className="eyebrow">{content.toolsTitle}</p>
              <h2 id="service-tools" className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Tooling that supports transparent execution.
              </h2>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/12 bg-[#15101E] px-4 py-2 font-body text-sm leading-none text-slate-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-night">
        <div className="container-d py-20 sm:py-28">
          <div className="rounded-card border border-gold/25 bg-[#120D1B] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <CheckCircle size={22} weight="fill" />
                </div>
                <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {content.ctaHeading}
                </h2>
                {content.ctaParagraphs?.length ? (
                  <div className="mt-6 max-w-3xl space-y-5">
                    {content.ctaParagraphs.map((paragraph) => (
                      <p key={paragraph} className="font-body text-base leading-[1.75] text-slate-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="lg:justify-self-end">
                <Link href={content.ctaHref} className="btn-gold w-full justify-center sm:w-auto">
                  {content.ctaLabel}
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
