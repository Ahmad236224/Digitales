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
  { year: "2015", title: "Digital Pivot", body: "Digital services division launched." },
  { year: "2020", title: "Digitales Born", body: "Digitales established as a dedicated digital agency." },
  { year: "2022", title: "Global Reach", body: "UK and USA chapters launched." },
  { year: "2026", title: "Product Ventures", body: "Relief OS (SaaS) and DartX (white-label) ventures launched." },
] as const;

// ---- Leadership (prominent avatars on About) ----
export const LEADERSHIP = [
  {
    name: "Shaheer Ul Azeem",
    title: "CEO, CTO & Founder",
    region: "Global",
    image: "/about/Shaheer.jpg",
    bio: "Shaheer Ul Azeem is the Founder and CEO of Digitales, and Director at Future Vision Advertising, a 30-year legacy family business in the advertising industry. A Computer Science graduate with over 10 years of experience, he leads the technology and product vision at Digitales while overseeing client and vendor relations across the group's global operations.",
  },
  {
    name: "Aziz Khawaja",
    title: "Director — Operations",
    region: "Global",
    image: "/about/Aziz Khawaja.jpeg",
    bio: "Aziz Khawaja is a Full-Stack Digital Marketing and PR professional with over 10 years of experience helping brands build meaningful digital presence through strategic communication and performance-driven campaigns. His expertise spans digital media buying and planning, PR, social media strategy, SEO, and web and conversion optimization.",
  },
  {
    name: "Haseeb Ul Azeem",
    title: "Director Business Development and Operations",
    region: "USA Chapter",
    image: "/about/Haseeb Ul Azeem.jpeg",
  },
  {
    name: "Abdullah Durrani",
    title: "Director Business Development and Operations",
    region: "UK Chapter",
    image: "/about/Abdullah Durrani.jpeg",
  },
] as const;

// ---- Full team by department ----
export const TEAM = [
  {
    dept: "Account Management",
    people: [
      {
        name: "Ayesha Gull",
        title: "Brand Storyteller / Content Manager",
        image: "/about/ayesha-gull.jpg",
        bio: "As a brand storyteller, I look past the screens, algorithms, and the data to find the human heart of every message. Thus, connecting digital spaces with global audiences through messaging that makes people truly stop, feel, and listen.",
      },
      { name: "Fatima Khawaja", title: "Content Manager",
        image: "/about/Fatima.jpeg",
        bio: "Fatima Khawaja is a Marketing and Brand Communications professional with over 8 years of experience helping brands build meaningful connections through strategic communication and storytelling. Her expertise spans brand communication strategy, public relations, social media marketing, content development and influencer marketing across the FMCG, nonprofit, education, and international service sectors.As a brand storyteller, I look past the screens, algorithms, and the data to find the human heart of every message. Thus, connecting digital spaces with global audiences through messaging that makes people truly stop, feel, and listen.",
      },
      {
        name: "Maryam Zahid",
        title: "Content Manager",
        image: "/about/Maryam Zahid.jpeg",
        bio: "At Digitales, I help brands communicate with confidence. As Content Manager, I oversee content planning, client communication, and campaign execution to ensure every project aligns with the client's vision and business goals. I'm passionate about creating content that is not only creative but also meaningful and results-driven.",
      },
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
      {
        name: "Fahad Ahmad",
        title: "Graphic Designer",
        image: "/Images/About/Creative/Fahad.jpg",
        bio: "Graphic Designer focused on creating clean, creative, and visually engaging designs for digital and print media.",
      },
      {
        name: "Muhammad Uzair Rehman",
        title: "Junior Graphic Designer",
        image: "/about/uzair.jpg",
        bio: "Bringing fresh creativity and a year of focused experience, Uzair drives visual execution across digital campaigns, ensuring every asset aligns with high-end brand standards.",

      },
      {
        name: "Kaleem Ullah",
        title: "Video Content Specialist",
        image: "/about/Kaleem ullah.jpeg",
        bio: "Enthusiastic Video Editor and Motion Designer with a keen eye for emotional details, perspective, and AI implementation.",
      },
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
      {
        name: "Wania Maryam",
        title: "SEO Writer",
        image: "/Images/About/Performance & Growth/Wania.png",
        bio: "Content Writer dedicated to creating clear, engaging, and meaningful content that helps brands connect with their audience and strengthen their online presence.",
      },
    ],
  },
  {
    dept: "Technology & Data",
    people: [
      { name: "Khuzema Khan", title: "Full Stack Developer" },
      {
        name: "Muhammad Talha Qureshi",
        title: "WordPress Developer & Graphic Designer",
        image: "/Images/About/Technology & Data/Talha.jpg",
        bio: "Muhammad Talha Qureshi is a WordPress Developer and Graphic Designer at Digitales, specializing in responsive website development, branding, and user-focused digital experiences.",
      },
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
      {
        name: "Mohammad Noman",
        title: "Page Manager",
        image: "/about/Mohammad Noman.jpeg",
        bio: "Social media management, media buying, and creating impactful digital campaigns for brand growth.",
      },
    ],
  },

] as const;

// ---- Per-service detail content (from Website Copy v2) ----
export const SERVICE_DETAIL: Record<string, {
  headline: string;
  answer: string;
  pullQuote?: string;
  whyTitle?: string;
  whyItems?: string[];
  services: string[];
  serviceTitle?: string;
  tools?: string[];
  ctaText: string;
  ctaLabel: string;
}> = {
  "seo": {
    headline: "Be Found. Be Chosen. Own the Search Results.",
    answer: "Digitales provides search engine optimisation services for businesses across Pakistan, the UK, and the USA. We build SEO programmes that earn organic visibility, attract high-intent traffic, and deliver compounding returns — through technical audits, content strategy, link building, and local SEO.",
    pullQuote: "Good SEO does not chase the algorithm. It builds the kind of digital authority that algorithms are designed to reward.",
    whyTitle: "Why SEO",
    whyItems: [
      "Generates high-intent leads at significantly lower cost per acquisition than paid channels",
      "Builds long-term brand authority and domain trust that cannot be replicated quickly",
      "Delivers compounding returns — rankings earned today continue driving traffic for years",
      "Positions your brand as the credible, expert answer to your customers' most important questions",
    ],
    serviceTitle: "Our SEO Services",
    services: ["Technical SEO Audits & Remediation", "On-Page Optimisation", "Content Strategy & Production", "Authority Link Building", "Local SEO", "Performance Tracking"],
    ctaText: "Want to see where you rank today — and where you should be?",
    ctaLabel: "Run a Free Audit →",
  },
  "digital-media-buying": {
    headline: "Maximum Return. Minimum Wasted Spend.",
    answer: "Digitales plans, executes, and optimises high-performance paid media campaigns across search, social, display, and programmatic channels for growth-oriented organisations in Pakistan, the UK, and the USA. We manage Google Ads, Meta, TikTok, LinkedIn, and programmatic platforms with a rigorous, data-led approach designed to eliminate guesswork.",
    pullQuote: "The right message, in front of the right person, at the right moment — that is the only standard we accept.",
    serviceTitle: "Our Media Buying Services",
    services: ["Paid Social — Meta, Instagram, TikTok, LinkedIn, X", "Search Engine Marketing — Google Ads, Bing", "Programmatic & Display Advertising", "Video Advertising — YouTube, Connected TV", "Retargeting & Remarketing Campaigns", "Audience Segmentation & Lookalike Modelling"],
    ctaText: "Let us audit your current ad spend and show you where returns are being left on the table.",
    ctaLabel: "Book a Media Audit →",
  },
  "social-media-marketing": {
    headline: "Build Communities That Convert.",
    answer: "Digitales engineers social-first ecosystems for market-defining brands across Pakistan, the UK, and the USA. We orchestrate cross-platform strategy, culture-driven content creation, and active community cultivation with a single, unyielding metric of success: transforming passive attention into commercial momentum.",
    serviceTitle: "Service Steps Structure",
    services: [
      "01 / Channel Architecture & Content Mapping: We perform granular social listening, audience behavior analysis, and competitive landscape teardowns to determine precisely where your community breathes.",
      "02 / Creative Production & Narrative Development: Our creative studio designs and executes high-retention, native assets engineered specifically for modern attention spans.",
      "03 / Cultivation & Real-Time Engagement: Our specialized community teams act as the frontline stewards of your brand's voice.",
      "04 / Predictive Tracking & Strategy Iteration: Every month, we deliver deep-dive performance analyses that strip away fluff to reveal the metrics that actually matter.",
    ],
    ctaText: "Ready to turn your social presence into a commercial asset?",
    ctaLabel: "Start a Conversation →",
  },
  "digital-pr-influencer": {
    headline: "Shape Perception. Build Authority. Own the Narrative.",
    answer: "Digitales delivers high-impact digital PR and creator-led marketing strategies for ambitious brands seeking undeniable credibility, cultural relevance, and dominant media coverage. We secure top-tier press placements, orchestrate hyper-targeted influencer movements, protect corporate reputations, and position our clients as the definitive authorities in their fields across Pakistan, the UK, and the USA markets.",
    serviceTitle: "Our Services",
    services: ["Press Release Strategy, Writing & Distribution", "Media Outreach & Journalist Relationship Management", "Thought Leadership Content Creation", "Influencer Campaign Strategy & Execution", "Crisis Communication Planning & Management", "Online Reputation Monitoring & Response"],
    ctaText: "Your Brand Deserves to Be Talked About — For the Right Reasons. Let us audit your current digital footprint...",
    ctaLabel: "Start Building Authority →",
  },
  "web-app-development": {
    headline: "Your Digital Presence Is Your First Commercial Impression. Make It Count.",
    answer: "Digitales builds custom websites, mobile applications, and high-performance web platforms for growth-focused businesses across Pakistan, the UK, and the USA. We leverage cutting-edge technologies like React, Next.js, Laravel, Flutter, and WordPress to deliver lightning-fast, conversion-optimised digital products that directly serve your commercial objectives.",
    pullQuote: "A website is not a brochure. It is a business tool. Most businesses underestimate what their website is actually doing — or failing to do — every single day. Your website is the destination every marketing channel points to.",
    serviceTitle: "Our Services",
    services: ["Custom Website Development — Responsive, performance-engineered, bespoke", "eCommerce Development — Shopify, WooCommerce, Magento", "Mobile App Development — Native iOS, Android, React Native", "Web Application & SaaS Development", "UX/UI Design & Prototyping", "Maintenance, Hosting & Performance Optimisation"],
    ctaText: "Your website should be your best-performing salesperson.",
    ctaLabel: "Let us build it →",
  },
  "enterprise-software": {
    headline: "Software That Fits Your Business — Not the Other Way Around.",
    answer: "Most enterprise software forces you to change your workflows, adjust your habits, and work around its limitations. We think that’s backwards. Your operations are unique, and your technology should be too. We design, build, and integrate custom enterprise software tailored specifically to your operational realities—allowing you to scale seamlessly, eliminate friction, and unlock your team’s true potential.",
    whyTitle: "Process Phases",
    whyItems: [
      "Phase 1: Discovery & Mapping",
      "Phase 2: Architecture & UX Design",
      "Phase 3: Iterative Agile Development",
      "Phase 4: Seamless Integration & Deployment",
    ],
    serviceTitle: "Our Services",
    services: ["Custom CMS Development", "Document Management Systems (DMS)", "ERP & CRM Development", "Workflow Automation Platforms", "Cloud-Native Application Development", "System Integration & API Development"],
    ctaText: "Ready to stop fighting your tools and start empowering your people? Let’s design a digital ecosystem built exclusively for your operational realities...",
    ctaLabel: "Start a Technical Brief →",
  },
};
