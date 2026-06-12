# Digitales — Platform

Full Digitales web platform in **Next.js 14 (App Router) + TypeScript + Tailwind**, built from the Master Website Plan v2, the Website Copy v2, and the dark-theme design mockups.

Every page is built in one cohesive **dark theme** (deep purple-to-black, gold accents, glowing heroes, dark surface cards, pill CTAs) with **real Digitales content** wired throughout — real services, real team, real case studies, real Relief OS / DartX copy.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (needs internet — next/font fetches Google Fonts)
```
Node 18.17+ required.

---

## Pages (all built, all prerendered)

| Route | What it is |
| --- | --- |
| `/` | Homepage — glowing hero + audit search, services, impact stats, featured work, why-us, products, CTA |
| `/about` | Two-column hero, legacy timeline (1994→2026), leadership + full 19-person team by department |
| `/services` | Service grid + "How We Work" 4-step process |
| `/services/[slug]` | 6 service pages — AEO answer paragraph, services list, tools, related, dual CTA, Service schema |
| `/portfolio` | Hero + working category filters + real case-study grid |
| `/portfolio/[slug]` | Case-study template — full Alkhidmat write-up (challenge/approach/results), Article schema |
| `/free-audit` | **8-step interactive funnel** — progress bar, localStorage resume, logic-based score, animated gauge |
| `/relief-os` | Teal-accented SaaS page — problem, features, pricing tiers, demo CTA, FAQ, SoftwareApplication schema |
| `/dartx` | Gold-accented venture page — opportunity stats, how-it-works, comparison table, partner application form |
| `/contact` | Message form, regional hubs (PK/UK/USA), FAQ with FAQPage schema |
| `/privacy-policy`, `/terms` | Stubs awaiting legal copy |

---

## Design system (locked, dark-first)

| Token | Hex | Use |
| --- | --- | --- |
| Brand Purple | `#6B2D8B` | CTAs, links, accents |
| Deep Purple | `#3D1450` | Glows, gradients |
| Purple Glow | `#8B3DB0` | Hero glow, hover |
| Brand Gold | `#F0B428` | Eyebrows, icons, stats, badges |
| Night (base) | `#0A0610` | Page background |
| Surface | `#15101E` | Cards |
| Muted | `#A89FB5` | Body copy |
| Relief teal | `#0FB5B5` | Relief OS page only |

Type: Plus Jakarta Sans (display 600–800) · Inter (body 400/500) · JetBrains Mono (metrics) via `next/font`.
Signature: `components/ui/CircuitBackground.tsx` — animated circuit traces echoing the logo, on dark heroes.
Tokens in `tailwind.config.ts` + `app/globals.css`. Reusable classes: `.btn-primary/-gold/-ghost-*`, `.card`, `.eyebrow`, `.h2/.h3`, `.lede`, `.link-gold`, `.section`, `.container-d`, `.glow-purple`, `.border-gradient`.

---

## Important content note

The design mockups carried template placeholder copy ("Lumina", "Marcus Thorne", "Web3 Integration", "Aether", invented metrics like +284% / $4.2M). **None of that was used.** Real Digitales content replaces it everywhere. The only documented numeric client result in the source docs (Alkhidmat Ramadan: 63% lower CPA, $4.40 vs $12) is shown as a hard number; other case studies show qualitative descriptors until the team supplies verified metrics — no client performance figures were invented.

---

## Wire-up checklist (integration phase)

- **Free Audit** (`components/audit/AuditFunnel.tsx`): replace the logic-based score with Google PageSpeed + SEMrush APIs; POST lead to HubSpot on step 6; capture UTM params; trigger branded PDF email.
- **Contact / DartX forms**: connect to HubSpot CRM; honeypot spam guard is already in place.
- **Multi-domain** (PK/UK/USA): resolve region from request host (middleware) to swap Contact content + LocalBusiness schema. `hreflang` already wired in `app/layout.tsx`.
- **Images**: hero/case-study visuals are brand-gradient placeholders — swap in real WebP photography.
- **SEO/AEO remaining**: per-domain XML sitemaps, robots.txt, BreadcrumbList already on detail pages; add HowTo schema to the audit page.

© 2026 Digitales · A Future Vision Advertising Company.
