// Single source of truth for shared site content.
// Pulled verbatim from Digitales_Website_Copy_v2 so pages never drift.

export const SERVICES = [
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    group: "marketing",
    icon: "ShareNetwork",
    short:
      "Build high-engagement communities and convert social audiences into loyal brand advocates — across every platform that matters.",
  },
  {
    slug: "digital-media-buying",
    name: "Digital Media Buying",
    group: "marketing",
    icon: "Target",
    short:
      "Precision-targeted paid campaigns across search, social, display, and programmatic — optimised continuously for the highest return.",
  },
  {
    slug: "digital-pr-influencer",
    name: "Digital PR & Influencer",
    group: "marketing",
    icon: "Megaphone",
    short:
      "Earn the coverage, credibility, and third-party validation that turns browsers into believers.",
  },
  {
    slug: "seo",
    name: "Search Engine Optimisation",
    group: "marketing",
    icon: "MagnifyingGlass",
    short:
      "Sustainable, compounding organic visibility built on technical rigour, audience-first content, and authoritative links.",
  },
  {
    slug: "web-app-development",
    name: "Web & App Development",
    group: "technology",
    icon: "Code",
    short:
      "Fast, intuitive websites and applications engineered to convert — from the first visit.",
  },
  {
    slug: "enterprise-software",
    name: "Enterprise Software Solutions",
    group: "technology",
    icon: "Stack",
    short:
      "Bespoke enterprise systems — CMS, DMS, ERP, CRM — built around your processes, not the other way around.",
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Free Audit", href: "/free-audit" },
  { label: "Relief OS", href: "/relief-os" },
  { label: "DartX", href: "/dartx" },
  { label: "Contact", href: "/contact" },
] as const;

export const IMPACT_STATS = [
  { value: "100+", label: "Projects Delivered" },
  { value: "50+", label: "Global Clients" },
  { value: "1B+", label: "Total Audience Reach" },
  { value: "10x", label: "Average Return on Ad Spend" },
] as const;

export const TRUST_LOGOS = [
  "Humanity Auxilium",
  "Alkhidmat Foundation",
  "Ghazali Education Foundation",
  "Consultant Arena",
  "Neo Jeans",
  "University of Lahore",
  "Lahore Leads University",
  "Lahore Garrison University",
  "TPS",
  "AlHasnat Foundation",
  "Islamic Centre of Britain",
  "African Relief Fund",
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Narrative That Converts",
    body: "Strategic storytelling combined with performance data — so every piece of content reaches the right audience at the right moment, and moves them to act.",
  },
  {
    title: "Creative That Commands Attention",
    body: "No recycled templates. No generic briefs. Campaigns and identities that are distinctive, memorable, and engineered to stop the scroll.",
  },
  {
    title: "AI-Augmented Campaign Intelligence",
    body: "Machine learning across targeting, creative optimisation, and conversion analysis — compressing the timeline from test to performance.",
  },
  {
    title: "Technology Built for Business Outcomes",
    body: "Every product we build treats revenue, retention, and scalability as primary requirements — not afterthoughts.",
  },
  {
    title: "UX as a Revenue Driver",
    body: "User experience is a commercial consideration, not a design preference. Every interface is optimised for conversion and retention.",
  },
  {
    title: "Integrated Digital Ecosystems",
    body: "Marketing, technology, and customer journeys aligned — producing compounding growth rather than isolated campaign wins.",
  },
] as const;

export const TEAM_SNAPSHOT = [
  { name: "Shaheer Ul Azeem", title: "CEO, CTO & Founder", lead: true },
  { name: "Aziz Khawaja", title: "Director — Operations", lead: true },
  { name: "Ammarah", title: "Creative Lead", lead: false },
  { name: "Waqas Nayyar", title: "SEO Specialist", lead: false },
  { name: "Khuzema Khan", title: "Full Stack Developer", lead: false },
  { name: "Ayesha", title: "Account Lead", lead: false },
] as const;

export const PORTFOLIO_PREVIEW = [
  {
    slug: "alkhidmat-ramadan",
    category: "Media Buying",
    client: "Alkhidmat Foundation",
    metric: "63% lower CPA",
    note: "$4.40 achieved vs $12.00 target across PK, Gulf & Europe.",
  },
  {
    slug: "uol-spring-admission",
    category: "Education",
    client: "University of Lahore",
    metric: "Spring intake campaign",
    note: "Full-funnel admission drive across paid social and search.",
  },
  {
    slug: "medical-aesthetics-seo",
    category: "SEO",
    client: "Medical Aesthetics Clinic",
    metric: "Organic visibility",
    note: "Technical + content SEO programme delivering compounding traffic.",
  },
] as const;

export const FOOTER_WORK = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Free Digital Audit", href: "/free-audit" },
  { label: "Relief OS", href: "/relief-os" },
  { label: "DartX", href: "/dartx" },
  { label: "About", href: "/about" },
] as const;

export const SITE = {
  name: "Digitales",
  tagline: "Smart Technology. High-Impact Marketing. Built to Perform.",
  domain: "https://digitales.pk",
};

// ---- Full case studies (real clients). Numeric results only where the
//      brief documents them; others use qualitative descriptors. ----
export const CASE_STUDIES = [
  {
    slug: "alkhidmat-ramadan",
    category: "Media Buying",
    tags: ["Media Buying", "NGO & Charity"],
    client: "Alkhidmat Foundation",
    title: "Ramadan Giving Digital Engine",
    result: "63% lower CPA",
    resultLabel: "$4.40 achieved vs $12.00 target",
    hardNumber: true,
  },
  {
    slug: "uol-spring-admission",
    category: "Education",
    tags: ["Education", "Media Buying"],
    client: "University of Lahore",
    title: "Spring Admission Campaign",
    result: "Full-funnel intake",
    resultLabel: "Paid social + search admission drive",
    hardNumber: false,
  },
  {
    slug: "ucmd-mbbs-bds",
    category: "Education",
    tags: ["Education", "Social Media"],
    client: "UCMD",
    title: "MBBS & BDS Admission Webinar",
    result: "Lead-gen webinar",
    resultLabel: "Registration & conversion campaign",
    hardNumber: false,
  },
  {
    slug: "medical-aesthetics-seo",
    category: "SEO",
    tags: ["SEO"],
    client: "Medical Aesthetics Clinic",
    title: "Clinic SEO Programme",
    result: "Organic growth",
    resultLabel: "Technical + content SEO",
    hardNumber: false,
  },
  {
    slug: "yoga-brand-seo-dubai",
    category: "SEO",
    tags: ["SEO"],
    client: "Organic Yoga Brand",
    title: "SEO — Dubai Market",
    result: "Search visibility",
    resultLabel: "Regional organic strategy",
    hardNumber: false,
  },
  {
    slug: "ngo-seo-visibility",
    category: "NGO & Charity",
    tags: ["NGO & Charity", "SEO"],
    client: "NGO Brand",
    title: "NGO Brand Visibility (SEO)",
    result: "Authority growth",
    resultLabel: "Content + technical SEO",
    hardNumber: false,
  },
  {
    slug: "neo-jeans",
    category: "E-Commerce",
    tags: ["E-Commerce", "Development"],
    client: "Neo Jeans",
    title: "E-Commerce Growth",
    result: "DTC build & growth",
    resultLabel: "Storefront + performance",
    hardNumber: false,
  },
] as const;

export const PORTFOLIO_FILTERS = [
  "All", "Media Buying", "SEO", "Social Media", "Development",
  "NGO & Charity", "Education", "E-Commerce",
] as const;

// ---- Process (Services page) ----
export const PROCESS_STEPS = [
  { n: "01", title: "Discovery", body: "We understand your business model, competitive context, audience behaviour, and the outcomes you need." },
  { n: "02", title: "Strategy", body: "A structured plan: channels, messaging, KPIs, timelines, and the commercial logic connecting activity to results." },
  { n: "03", title: "Execution", body: "Our in-house team delivers across creative, media, technology, and content — with full transparency at every stage." },
  { n: "04", title: "Optimisation", body: "We measure, learn, and improve continuously. Every campaign generates data that makes the next one more effective." },
] as const;

// ---- About timeline ----
export const TIMELINE = [
  { year: "1994", title: "The Foundation", body: "Future Vision Advertising founded in Pakistan." },
  { year: "2005", title: "Broadcast Era", body: "Television channel established — broadcast and production capability." },
  { year: "2015", title: "Digital Pivot", body: "Digital services division launched." },
  { year: "2020", title: "Digitales Born", body: "Digitales established as a dedicated digital agency." },
  { year: "2022", title: "Global Reach", body: "UK and USA chapters launched." },
  { year: "2026", title: "Product Ventures", body: "Relief OS (SaaS) and DartX (white-label) ventures launched." },
] as const;

// ---- Leadership (prominent avatars on About) ----
export const LEADERSHIP = [
  { name: "Shaheer Ul Azeem", title: "CEO, CTO & Founder", region: "Global" },
  { name: "Aziz Khawaja", title: "Director — Operations", region: "Global" },
  { name: "Haseeb Ul Azeem", title: "Digital Media Manager", region: "USA Chapter" },
  { name: "Abdullah Durrani", title: "Director, Business Dev.", region: "UK Chapter" },
] as const;

// ---- Full team by department ----
export const TEAM = [
  {
    dept: "Account Management",
    people: [
      { name: "Ayesha", title: "Content Manager & Account Lead" },
      { name: "Fatima Khawaja", title: "Content Manager" },
      { name: "Maram", title: "Content Manager" },
    ],
  },
  {
    dept: "Creative",
    people: [
      {
        name: "Ammarah Zahid",
        title: "Creative Lead",
        image: "/about/ammarah-zahid.jpg",
        bio: "As a Senior Graphic Designer with 6+ experience, I elevate brand narratives & deliver polished, high-resolution design solutions that resonate deeply with target audiences.",
      },
      { name: "Fahad", title: "Senior Graphic Designer" },
      { name: "Uzair Rehman", title: "Junior Designer" },
      { name: "Kaleem Ullah", title: "Video Content Specialist" },
    ],
  },
  {
    dept: "Performance & Growth",
    people: [
      {
        name: "Waqas Nayyar",
        title: "SEO Specialist",
        image: "/about/waqas-nayyar.jpg",
        bio: "As an SEO Manager at Digitales, I bring 5+ years of experience in SEO, helping businesses improve their search visibility, organic traffic, and online performance through data-driven strategies.",
      },
      { name: "Wania Maryam", title: "SEO Writer" },
    ],
  },
  {
    dept: "Technology & Data",
    people: [
      { name: "Khuzema Khan", title: "Full Stack Developer" },
      { name: "Muhammad Talha", title: "WordPress Developer" },
      { name: "Hamza Irshad", title: "Junior Full Stack Developer" },
    ],
  },
  {
    dept: "Operations Support",
    people: [
      {
        name: "Usama Ajmal",
        title: "Page Manager",
        image: "/about/usama-ajmal.png",
        bio: "Digital marketing professional with experience in social media management, media buying, content strategy, and lead generation. Skilled in creating high-performing campaigns that help brands grow their online presence and achieve measurable results.",
      },
      { name: "Mohammad Noman", title: "Page Manager" },
    ],
  },

] as const;

// ---- Per-service detail content (from Website Copy v2) ----
export const SERVICE_DETAIL: Record<string, {
  headline: string;
  answer: string;
  services: string[];
  tools?: string[];
  ctaText: string;
  ctaLabel: string;
}> = {
  "seo": {
    headline: "Be Found. Be Chosen. Own the Search Results.",
    answer: "Digitales provides search engine optimisation services for businesses across Pakistan, the UK, and the USA. We build SEO programmes that earn organic visibility, attract high-intent traffic, and deliver compounding returns — through technical audits, content strategy, link building, and local SEO.",
    services: ["Technical SEO Audits & Remediation", "On-Page Optimisation — Meta, Headers, Structured Content", "Content Strategy & Production", "Authority Link Building Campaigns", "Local SEO & Google Business Profile Optimisation", "Performance Tracking, Reporting & Strategy Reviews"],
    tools: ["SEMrush", "Ahrefs", "Moz", "Screaming Frog", "Google Search Console", "Google Analytics 4"],
    ctaText: "Want to see where you rank today — and where you should be?",
    ctaLabel: "Run a Free Audit",
  },
  "digital-media-buying": {
    headline: "The Google Ads & Meta Ads Agency Built to Perform.",
    answer: "Digitales is a performance-driven google ads marketing agency, google ads agency, and meta ads agency managing campaigns across Pakistan, the UK, and the USA. We plan, execute, and optimise search, social, display, and programmatic campaigns with a rigorous, data-led approach.",
    services: ["Paid Social — Meta, Instagram, TikTok, LinkedIn, X", "Search Engine Marketing — Google Ads, Bing", "Programmatic & Display Advertising", "Video Advertising — YouTube, Connected TV", "Retargeting & Remarketing Campaigns", "Audience Segmentation & Lookalike Modelling"],
    ctaText: "Let us audit your current ad spend and show you where returns are being left on the table.",
    ctaLabel: "Book a Media Audit",
  },
  "social-media-marketing": {
    headline: "The Social Media Marketing Company Building Communities That Convert.",
    answer: "Digitales is a leading social media marketing company and paid social agency for brands across Pakistan, the UK, and the USA. We handle platform strategy, content creation, community management, paid social campaigns, and influencer partnerships — with measurable growth as the constant objective.",
    services: ["Platform Strategy & Content Planning", "Original Content Creation & Production", "Community Management & Audience Engagement", "Paid Social Campaign Management", "Influencer Identification & Partnership Management", "Monthly Performance Reporting & Strategy Reviews"],
    ctaText: "Ready to turn your social presence into a commercial asset?",
    ctaLabel: "Start a Conversation",
  },
  "digital-pr-influencer": {
    headline: "Shape Perception. Build Authority. Own the Narrative.",
    answer: "Digitales delivers digital PR and influencer marketing services for brands seeking credibility and media coverage. We secure press placements, manage reputation, build influencer campaigns, and position our clients as authorities in their fields — across Pakistan, UK, and USA markets.",
    services: ["Press Release Strategy, Writing & Distribution", "Media Outreach & Journalist Relationship Management", "Thought Leadership Content Creation", "Influencer Campaign Strategy & Execution", "Crisis Communication Planning & Management", "Online Reputation Monitoring & Response"],
    ctaText: "Your brand deserves to be talked about — for the right reasons.",
    ctaLabel: "Start Building Authority",
  },
  "web-app-development": {
    headline: "Your Digital Presence Is Your First Commercial Impression. Make It Count.",
    answer: "Digitales builds custom websites, mobile applications, and web platforms for businesses across Pakistan, the UK, and the USA. We use React, Next.js, Laravel, Flutter, and WordPress to deliver fast, conversion-optimised digital products that serve commercial objectives.",
    services: ["Custom Website Development — Responsive, performance-engineered", "eCommerce Development — Shopify, WooCommerce, Magento", "Mobile App Development — Native iOS, Android, React Native", "Web Application & SaaS Development", "UX/UI Design & Prototyping", "Maintenance, Hosting & Performance Optimisation"],
    tools: ["React", "Next.js", "Laravel", "Flutter", "WordPress", "Shopify"],
    ctaText: "Your website should be your best-performing salesperson.",
    ctaLabel: "Let Us Build It",
  },
  "enterprise-software": {
    headline: "Software That Fits Your Business — Not the Other Way Around.",
    answer: "Digitales designs and delivers custom enterprise software solutions for organisations in Pakistan, the UK, and the USA. We build document management systems, ERP and CRM platforms, workflow automation tools, and cloud-native applications — engineered around your operational reality.",
    services: ["Custom CMS Development", "Document Management Systems (DMS)", "ERP & CRM Development", "Workflow Automation Platforms", "Cloud-Native Application Development", "System Integration & API Development"],
    ctaText: "Build software that works the way your business works.",
    ctaLabel: "Start a Technical Brief",
  },
};
