# Lonestar Agro — Master Project Brief

**Brand:** Lonestar Agro  
**Domain:** www.lonestar-agro.com  
**Focus:** Texas (scalable multi-state)  
**Positioning:** Premium, enterprise-level B2B agricultural & land management

---

## Goal

Create a **premium, enterprise-level** agricultural & land management website that:

- **Looks institutional** — Professional, document-ready, compliance-aware
- **Feels premium** — High-end visual storytelling and clear service segmentation
- **Is scalable multi-state** — Texas-first today; locations/regions ready for expansion
- **Attracts B2B contracts** — Commercial, municipal, and institutional decision-makers
- **Supports future expansion** — Municipal and commercial growth without redesign

---

## Competitor & Inspiration Blend

The site combines the best elements of:

| Reference | What we take |
|-----------|----------------|
| **Southern Botanical** | Premium branding, visual authority |
| **Green Care Company** | Commercial service clarity, conversion focus |
| **Gothic Landscape** | Multi-location scalability, institutional tone |
| **BrightView** | Enterprise credibility, operational excellence |
| **Lance Landscape** | Balanced premium + approachable tone |
| **Splendid Gardens** | High-end visual storytelling |

---

## Must-Have Features

- **WhatsApp** floating contact button
- **Lead capture forms** (Request Quote, Contact, inline)
- **Service segmentation** (6 core services with dedicated pages)
- **SEO-optimized structure** (keyword map, meta, H1/H2 plan)
- **Portfolio / Case Study** section
- **Safety & Compliance** section
- **Sustainability** messaging
- **Texas identity** branding (hero, trust bar, locations)
- **Strong hero** messaging
- **Conversion-focused CTA** blocks (above fold, mid-page, footer)

---

## Tone

**Confident, institutional, modern, Texas-proud, operationally strong.**

→ Full guidelines: [branding-tone-guidelines.md](./branding-tone-guidelines.md)

---

## Deliverables Index (10 Items)

### 1. Full site architecture

**File:** [site-architecture.md](./site-architecture.md)  
**Full sitemap (enterprise, all pages + required elements):** [SITEMAP-FULL.md](./SITEMAP-FULL.md)  
**Also:** [sitemap-enterprise.md](./sitemap-enterprise.md)

- Site map (URL hierarchy, all pages)
- Core user journeys (commercial, municipal, landowners, institutional)
- Technical recommendations (CMS, hosting, forms, analytics, WhatsApp)
- Multi-state scalability (Phase 1–3)
- Conversion architecture (CTAs, lead capture points, trust gates)
- Key template types and navigation structure

---

### 2. Page-by-page content structure

**File:** [page-content-structure.md](./page-content-structure.md)  
**Detailed per-page:** [sitemap-enterprise.md](./sitemap-enterprise.md) (§ Page Definitions)

- Required elements on every page: Hero | Trust block | Service detail* | CTA | Lead form
- Section-by-section breakdown for Home, Services hub, each service page, About, Projects, Sustainability, Safety & Compliance, Contact, etc.

---

### 3. Homepage copy

**File:** [../content/homepage-copy.md](../content/homepage-copy.md)

- Hero (headline, subhead, CTAs)
- Trust bar
- Services overview (6 service cards + CTAs)
- Why Lonestar / value pillars
- Portfolio teaser
- Sustainability block
- Safety & compliance block
- CTA sections and lead capture

---

### 4. Service page templates

**File:** [../content/service-page-template.md](../content/service-page-template.md)  
**Guide:** [../content/service-page-template-guide.md](../content/service-page-template-guide.md)

- Hero (H1, value prop, CTAs)
- Overview / What we deliver
- Benefits
- Process / How we work
- Applications / sectors
- Related services
- CTA block + lead form

**Six services:** Agricultural Production • Land Management • Commercial Landscape Services • Irrigation & Water Systems • Soil & Crop Optimization • Municipal & Institutional Contracts

---

### 5. About page structure

**File:** [../content/about-page-structure.md](../content/about-page-structure.md)

- Hero
- Story (origin, mission, growth, Texas identity)
- Values (Safety, Integrity, Excellence, Stewardship, Community)
- Leadership (optional)
- By the numbers
- CTA (Partner with us)

---

### 6. WhatsApp integration code

**File:** [../components/whatsapp-float.html](../components/whatsapp-float.html)  
**React:** [../components/whatsapp-float.jsx](../components/whatsapp-float.jsx)

- Floating button (fixed bottom-right)
- Pre-filled message: *"Hello, I would like to discuss a project with Lonestar Agro."*
- **Setup:** Replace `PHONE_NUMBER` in script with full number (e.g. `14322547373`, no + or spaces)
- Current number in footer/docs: +1 (432) 254-7373 → `14322547373` for wa.me link

---

### 7. SEO keyword map

**File:** [seo-keyword-map.md](./seo-keyword-map.md)

- Primary keywords (Texas agricultural services, commercial land management Texas, etc.)
- Secondary and long-tail
- Page-level targeting (title, meta description, H1, H2s) for Home, Services hub, each service page, About, Sustainability, Safety, Contact

---

### 8. Branding tone guidelines

**File:** [branding-tone-guidelines.md](./branding-tone-guidelines.md)  
**Identity:** [brand-identity.md](./brand-identity.md)

- Tone attributes (confident, institutional, modern, Texas-proud, operationally strong)
- Voice principles, Do / Don’t
- Brand vocabulary (preferred vs avoid)

---

### 9. Footer structure

**File:** [../content/footer-structure.md](../content/footer-structure.md)

- Row 1: Brand & tagline | Quick links | Services | Industries | Contact + WhatsApp + Newsletter
- Row 2: Social + Locations (Serving Texas · Locations)
- Row 3: Legal (Privacy, Terms) + Copyright
- Responsive breakpoints

---

### 10. Trust / credibility blocks

**File:** [../content/trust-credibility-blocks.md](../content/trust-credibility-blocks.md)

- Trust bar (below hero)
- Certifications & compliance
- By the numbers
- Safety commitment (short)
- Sustainability (short)
- Process credibility (How we work)
- Reusable across Home, About, Safety, service pages, footer

---

## Quick start (implementation)

1. **Architecture & content:** Read [site-architecture.md](./site-architecture.md) and [sitemap-enterprise.md](./sitemap-enterprise.md).
2. **Copy:** Use [content/homepage-copy.md](../content/homepage-copy.md), [content/service-page-template.md](../content/service-page-template.md), [content/about-page-structure.md](../content/about-page-structure.md).
3. **WhatsApp:** Include [components/whatsapp-float.html](../components/whatsapp-float.html); set phone number and optional message.
4. **SEO:** Apply [seo-keyword-map.md](./seo-keyword-map.md) to titles, meta, headings.
5. **Tone:** Follow [branding-tone-guidelines.md](./branding-tone-guidelines.md).
6. **Trust:** Drop in blocks from [content/trust-credibility-blocks.md](../content/trust-credibility-blocks.md).
7. **Footer:** Build from [content/footer-structure.md](../content/footer-structure.md).

---

*Lonestar Agro — Master brief v1.0*
