# Plan — Global SaaS Accounting Landing Page

## Goal
Build a high-converting, responsive landing page for an international SaaS accounting platform ("LedgerFlow") focused on cross-border SMEs, agencies, and freelancers. Key highlights include multi-currency reconciliation (130+ currencies), automated global tax compliance (EU VAT, US Sales Tax, GST), and one-click Stripe/PayPal transaction sync.

## Scope
- In:
  - Responsive single-page layout (Header, Hero with interactive mockup card, Integrations bar, 4 Core Feature blocks, Interactive Pricing with Monthly/Annual switch, Testimonials, FAQ accordion, Footer).
  - Pure HTML5 + Tailwind CSS + Vanilla JS (zero build tooling required, instant preview and deployable anywhere).
  - Interactive UI controls: dynamic price calculation on annual toggle (-20%), expandable FAQ accordions, responsive mobile menu drawer.
  - Fintech-focused copywriting and visual design (slate/indigo/emerald palette, clean SVGs, compliance badges).
- Out:
  - Backend database or live payment/tax API integration (client-side interactive demo only).
  - Internal accounting dashboard software (only hero preview card).

## Success criteria
- Scalar: null (gate-based evaluation)
- Gates:
  - [ ] G1: `index.html` exists with valid semantic HTML5 and clean asset references. — eval: file inspection & structure check
  - [ ] G2: All sections present (Hero, Multi-currency FX, Stripe/PayPal sync, Tax compliance, Pricing table, FAQ, Footer). — eval: content & section presence check
  - [ ] G3: Interactive scripts (`app.js`) operate cleanly without JS console errors (pricing switch, accordion, mobile nav). — eval: script evaluation
  - [ ] G4: Full responsive layout without horizontal overflow on mobile (375px), tablet (768px), and desktop (1280px). — eval: viewport responsiveness check

## Constraints
- Files not to touch: none (new project).
- Banned: Heavy framework build pipelines; keep it pure, performant static web files for zero friction.

## Approach (Coder hint)
Author `index.html` and `app.js` using modern Tailwind CSS utility classes and clean inline SVG icons. Implement the pricing monthly/annual discount toggle and accordion logic with lightweight Vanilla JS. Emphasize trust indicators (SOC2, GDPR, 256-bit encryption).

## Reviewer rubric (extra)
- Verify that toggling to annual billing properly recalculates and updates the displayed tier prices.
- Confirm all CTA buttons have interactive hover states.
- Verify mobile drawer opens/closes properly and that no horizontal overflow exists at 375px.