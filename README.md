# Lonestar Agro — Website Project

**Brand:** Lonestar Agro  
**Domain:** www.lonestar-agro.com  
**Focus:** Premium B2B agricultural & land management across Texas (scalable multi-state).

**→ Start here:** [docs/MASTER-BRIEF.md](docs/MASTER-BRIEF.md) — Goals, competitor blend, and **all 10 deliverables** (site architecture, page structure, homepage copy, service templates, About structure, WhatsApp code, SEO map, branding tone, footer, trust blocks).

---

## What’s in this repo

Planning and content for a premium, enterprise-level agricultural & land management website: architecture, copy, SEO, tone, and reusable components.

### Docs (`/docs`)

| File | Purpose |
|------|--------|
| **site-architecture.md** | Full site map, user journeys, nav, scalability, conversion architecture |
| **sitemap-enterprise.md** | **Enterprise sitemap:** dropdown nav, all pages (Home, Services×6, Industries, Projects, Sustainability, Safety, About, Careers, Locations, Contact), required elements per page (Hero, Trust block, Service detail, CTA, Lead form) |
| **page-content-structure.md** | Page-by-page section breakdown (legacy structure; see sitemap-enterprise for current) |
| **seo-keyword-map.md** | Primary/secondary keywords, target pages, page-level SEO checklist |
| **branding-tone-guidelines.md** | Tone, voice, do/don’t, vocabulary, visual guidance |

### Content (`/content`)

| File | Purpose |
|------|--------|
| **homepage-copy.md** | Hero, trust bar, services overview, Why Lonestar, portfolio teaser, sustainability, safety, CTAs |
| **service-page-template.md** | Reusable template + example for all service pages |
| **about-page-structure.md** | Story, values, leadership, by-the-numbers, CTA |
| **footer-structure.md** | Four-column footer: brand, links, contact, trust |
| **trust-credibility-blocks.md** | Reusable trust bars, certifications, stats, safety/sustainability snippets, CTAs |

### Components (`/components`)

| File | Purpose |
|------|--------|
| **whatsapp-float.html** | Standalone WhatsApp floating button (HTML + CSS + JS). Replace `PHONE_NUMBER` with your number. |
| **whatsapp-float.jsx** | React version of the same button. Use `<WhatsAppFloat phone="15551234567" />`. |

---

## Quick start

1. **Architecture & content:** Read `docs/site-architecture.md` and `docs/page-content-structure.md` for structure and sections.
2. **Copy:** Use `content/homepage-copy.md`, `content/service-page-template.md`, and `content/about-page-structure.md` in your CMS or templates.
3. **WhatsApp:** Include `components/whatsapp-float.html` in your layout, or use `components/whatsapp-float.jsx` in a React app. Set your phone number (e.g. `15551234567`) and optional pre-filled message.
4. **SEO:** Apply `docs/seo-keyword-map.md` to titles, meta descriptions, and headings.
5. **Tone:** Follow `docs/branding-tone-guidelines.md` for all new copy.
6. **Trust:** Drop in blocks from `content/trust-credibility-blocks.md` on Home, About, Safety, and service pages.
7. **Footer:** Build the footer from `content/footer-structure.md`.

---

## Tone in one line

Confident, institutional, modern, Texas-proud, operationally strong.

---

## Next steps (suggested)

- Replace placeholders: [YEAR], [X] stats, phone number, email, address.
- Add real certification logos and copy to Safety & Compliance.
- Source imagery (fields, crews, equipment, Texas landscapes).
- Implement forms (Request Quote, Contact) and connect to CRM/email.
- When expanding states: add location selector or `/locations` and update SEO map.

---

*Lonestar Agro — Document set v1.0*
