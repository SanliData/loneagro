# Lonestar Agro — Full Site Architecture

**Domain:** www.lonestar-agro.com  
**Focus:** Texas (scalable multi-state)  
**Positioning:** Premium B2B agricultural & land management

**→ Full enterprise sitemap (dropdown structure, page elements, lead forms):** [sitemap-enterprise.md](./sitemap-enterprise.md)

---

## 1. Site Map (Hierarchy) — Aligned with Enterprise Sitemap

```
lonestar-agro.com/
├── /                          Home
├── /services                   Services (hub + dropdown)
│   ├── /services/agricultural-production
│   ├── /services/land-management
│   ├── /services/commercial-landscape-services
│   ├── /services/irrigation-water-systems
│   ├── /services/soil-crop-optimization
│   └── /services/municipal-institutional-contracts
├── /industries-served         Industries Served
├── /projects                  Projects / Case Studies
│   └── /projects/[slug]       Case study detail
├── /sustainability            Sustainability
├── /safety-compliance         Safety & Compliance
├── /about                     About Us
├── /careers                   Careers
├── /locations                 Locations (Texas-first, multi-state)
│   └── /locations/[state]     Optional location detail
├── /contact                   Contact
└── /privacy                   Privacy (legal)
```

---

## 2. Core User Journeys

| Audience | Entry | Goal | Key Pages |
|----------|--------|------|-----------|
| Commercial / corporate | Home, Services | RFP / quote | Services → Request Quote |
| Municipal / public sector | Home, Safety | Compliance proof, contract | Safety & Compliance, Portfolio |
| Landowners / developers | Home, Land management | Consultation | Contact, Services |
| Enterprise / institutional | About, Portfolio | Credibility, scale | About, Portfolio, Sustainability |

---

## 3. Technical Architecture (Recommendations)

- **CMS:** Headless (e.g. Sanity, Contentful) or static (Astro/Next) for scalability.
- **Hosting:** Vercel/Netlify or enterprise (AWS/GCP) for multi-region later.
- **Forms:** Serverless functions + CRM/email (e.g. HubSpot, custom API).
- **Analytics:** GA4 + optional Hotjar for conversion.
- **WhatsApp:** Floating button + optional click-to-chat link in footer/CTA.

---

## 4. Scalability (Multi-State)

- **Phase 1:** Texas-only messaging; "Texas" in hero and location blocks.
- **Phase 2:** Add state selector or /locations (e.g. Texas, Oklahoma, Louisiana).
- **Phase 3:** Location-specific service pages or filters (e.g. /services?region=texas).
- **URL strategy:** Keep /services as canonical; use query or subfolders for regions when needed.

---

## 5. Conversion Architecture

- **Primary CTA:** Request Quote (above fold, in nav, footer).
- **Secondary:** Contact form, WhatsApp, Phone.
- **Lead capture points:** Home (hero + mid-page), Services (per service), Contact, Request Quote.
- **Trust gates:** Safety & Compliance, Portfolio, Sustainability before or after form.

---

## 6. Key Template Types

| Template | Use case | Components |
|----------|----------|------------|
| Home | Landing, trust, services overview | Hero, Services grid, Portfolio teaser, Trust bar, CTA, Footer |
| Service | Per service offering | Hero, Description, Benefits, Process, CTA, Related services |
| About | Company story, leadership | Story, Values, Leadership, CTA |
| Portfolio | Case studies list + detail | Grid, filters (sector/type), Case study detail |
| Safety / Sustainability | Institutional content | Sections, stats, certifications, CTA |
| Contact / Quote | Lead capture | Form, map/address, WhatsApp, hours |

---

## 7. Navigation Structure

**Primary nav (desktop):**
- Home | About | Services (mega or dropdown) | Portfolio | Safety & Compliance | Sustainability | **Request Quote** (button)

**Footer:** Repeat key links + Contact, Request Quote, WhatsApp, legal (Privacy), social (if any).

**Mobile:** Hamburger with same items; Request Quote as prominent button.

---

## 8. Content Ownership (Future)

- **Marketing:** Home, Services copy, CTAs.
- **Operations:** Safety & Compliance, Sustainability, case study facts.
- **Sales:** Contact, Request Quote, form fields.
- **Legal:** Privacy, terms (when added).

---

*Document version: 1.0 — Lonestar Agro*
