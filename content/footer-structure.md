# Lonestar Agro — Footer Structure (Premium Enterprise)

**Purpose:** Navigation, contact, trust, legal, newsletter. Same on every page.

**Canonical markup:** `components/footer.html` (copy into each page or use SSI; adjust logo and link paths for your folder structure).

---

## Included elements

| Element | Content |
|--------|--------|
| **Quick links** | Home, About Us, Projects, Sustainability, Safety & Compliance, Careers, Contact |
| **Services** | Agricultural Production, Land Management, Commercial Landscape, Irrigation & Water Systems, Soil & Crop Optimization, Municipal & Institutional |
| **Industries** | Municipal & Government, Energy & Utilities, Agriculture & Ranching, Commercial & Corporate, Institutional |
| **Contact** | Website, phone, email |
| **WhatsApp CTA** | Green “Chat on WhatsApp” button (predefined message) |
| **Social links** | LinkedIn, Twitter/X, Facebook (icon buttons) |
| **Locations** | “Serving Texas · Locations” |
| **Legal links** | Privacy Policy, Terms of Use |
| **Newsletter signup** | Heading, short description, email input, Subscribe button |

---

## Layout (5-column top grid; then social/locations; then legal bar)

### Row 1 — Footer top (grid)

**Column 1 — Brand & tagline**
- **Lonestar Agro** (logo link to /)
- Tagline: *Texas-rooted. Enterprise-grade agricultural and land management for commercial and municipal partners.*

**Column 2 — Quick links**
- Home, About Us, Projects, Sustainability, Safety & Compliance, Careers, Contact

**Column 3 — Services**
- Agricultural Production, Land Management, Commercial Landscape, Irrigation & Water Systems, Soil & Crop Optimization, Municipal & Institutional

**Column 4 — Industries**
- Municipal & Government, Energy & Utilities, Agriculture & Ranching, Commercial & Corporate, Institutional (all → /industries-served or anchor)

**Column 5 — Contact + WhatsApp CTA + Newsletter**
- Phone: +1 (402) 363-9991 (tel: link)
- Email: contact@lonestar-agro.com
- **Chat on WhatsApp** (green button, wa.me/14023639991 with predefined message)
- **Newsletter:** heading, short line, email input + Subscribe button (form action TBD)

---

### Row 2 — Social & locations

- **Social links:** LinkedIn, Twitter/X, Facebook (icon buttons, open in new tab)
- **Locations:** “Serving Texas · Locations” (links to /locations)

---

### Row 3 — Bottom bar (legal)

- **Legal:** Privacy Policy (/privacy), Terms of Use (/terms)
- **Copyright:** © 2025 Lonestar Agro. All rights reserved.

---

## Responsive

- **Desktop:** 5 columns (1.5fr 1fr 1.2fr 1fr 1.3fr).
- **&lt; 1100px:** 3 columns.
- **&lt; 700px:** 2 columns; padding reduced.
- **&lt; 480px:** 1 column.

Social/locations and bottom bar stack or wrap as needed.

---

## Implemented in

- index.html
- about.html
- sustainability.html
- safety-compliance.html

Newsletter form: `action="#"` — replace with your endpoint or CRM when ready.

---

*Document version: 2.0 — Lonestar Agro*
