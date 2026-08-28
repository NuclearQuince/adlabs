# AD Labs — Consumer Intelligence for Offline Retail

## Overview

This is the complete marketing website + analytics dashboard for **AD Labs** (Ad Labs Tech Pvt Ltd, founded 2026, Bengaluru). The project combines a premium editorial marketing site (cream/lime/ink palette) with a full-featured analytics dashboard (Apple-neutrals light/dark, gold accent).

**Live URLs (when deployed):**
- Website: `https://adlabs.in`
- Dashboard: `https://adlabs.in/dashboard`

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router DOM v7** (client-side routing)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **oxlint** (linting)

## Project Structure

```
adlabs/
├── public/
│   ├── images/                    # 11 optimized JPGs (from ShopSignal)
│   ├── ad-labs-logo.svg           # Nav logo (inline React component)
│   └── favicon.svg                # Favicon
├── src/
│   ├── components/                # Shared UI primitives
│   │   ├── Logo.tsx               # AD Labs mark (inline, font-safe)
│   │   ├── Reveal.tsx             # Framer Motion scroll-in
│   │   ├── CountUp.tsx            # Animated number counter
│   │   └── SectionHeader.tsx      # Index/kicker/H2 pattern
│   ├── data/
│   │   ├── site.ts                # All website copy (verbatim from ShopSignal audit)
│   │   └── dashboard.ts           # Dashboard mock data (coherent universe)
│   ├── site/                      # Marketing website (12 sections)
│   │   ├── SitePage.tsx           # Composition root
│   │   ├── Nav.tsx                # Sticky, blur, mobile drawer
│   │   ├── Hero.tsx               # Full-bleed, telemetry badges, marquee
│   │   ├── BlindSpot.tsx          # 3-card problem framing
│   │   ├── Journey.tsx            # Funnel bars + 5 step cards
│   │   ├── Atelier.tsx            # Tabbed in-store view with overlays
│   │   ├── Proof.tsx              # A/B before/after with uplift
│   │   ├── System.tsx             # Trio + mini dashboard preview
│   │   ├── Metrics.tsx            # 12-signal grid
│   │   ├── Sectors.tsx            # 4 sector cards
│   │   ├── Privacy.tsx            # Dark section, principles + pipeline
│   │   ├── How.tsx                # 3 steps + wishlist form + feedback
│   │   ├── Team.tsx               # 3 founder cards with LinkedIn
│   │   ├── Footer.tsx             # Links, socials (Users icon), legal
│   │   └── PilotModal.tsx         # Full pilot request form
│   ├── app/                       # Analytics dashboard
│   │   ├── DashboardPage.tsx      # Shell: sidebar, topbar, theme, present mode
│   │   ├── PresentMode.tsx        # Keyboard-nav slides, autoplay, demo chip
│   │   ├── ui.tsx                 # Panel, Chip, DeltaPill, GradePill, Segmented
│   │   ├── charts.tsx             # AreaChart, Sparkline, FunnelBars, HeatGrid, HBars
│   │   └── screens/
│   │       ├── Overview.tsx       # 5 KPIs, area chart, funnel, 3 actions
│   │       ├── Stores.tsx         # Table + StoreDetail
│   │       ├── Campaigns.tsx      # Timeline + before/after + verdict
│   │       ├── Zones.tsx          # HeatGrid + attention share + flags
│   │       ├── Brief.tsx          # Monday Brief with 3 actions + feedback
│   │       └── Manager.tsx        # Today curve + staffing + checklist
│   ├── main.tsx                   # Router: / (SitePage) + /dashboard (DashboardPage)
│   └── index.css                  # Tailwind v4 + design tokens + keyframes
├── index.html                     # Fonts, meta, favicon
├── vite.config.ts                 # React + Tailwind v4 plugins
└── package.json
```

## Design System

### Website (Cream/Lime/Ink)
- Background: `#FAF8F5` (cream)
- Alt background: `#F3EFE6` (beige)
- Text: `#121212` (ink)
- Accent: `#D4F53C` (lime)
- Hairline: `rgba(18,18,18,0.12)`
- Fonts: Plus Jakarta Sans / Instrument Serif / Space Mono

### Dashboard (Light/Dark + Gold)
| Token | Light | Dark |
|-------|-------|------|
| `--app-bg` | `#F5F5F7` | `#000000` |
| `--app-card` | `#FFFFFF` | `#1C1C1E` |
| `--app-raise` | `#FFFFFF` | `#2C2C2E` |
| `--app-text` | `#1D1D1F` | `#F5F5F7` |
| `--app-sub` | `#6E6E73` | `#98989D` |
| `--app-faint` | `#86868B` | `#86868B` |
| `--app-line` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.12)` |
| `--app-gold` | `#A9792B` | `#C99B4A` |
| `--app-pos` | `#1D8A4E` | `#30D158` |
| `--app-neg` | `#C9372C` | `#FF453A` |

- Font: **Inter** (tabular numerals for metrics)
- Radii: 16–20px
- Shadows: clay (light) / deep (dark)
- Motion: 180ms ease-out UI, 240ms page transitions, `prefers-reduced-motion` safe

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |

## Data Contracts (Swap Points)

All copy and numbers are centralized for instant swapping:

| File | Purpose |
|------|---------|
| `src/data/site.ts` | Website copy, nav, form fields, founder bios, social config |
| `src/data/dashboard.ts` | Dashboard KPIs, funnel, traffic hours, stores, zones, campaigns, briefs, manager data |

**To swap real data:** Edit the arrays/objects in these files. No component changes needed.

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Custom domain: `adlabs.in` (add in Vercel dashboard after first deploy)

## Present Mode (Dashboard)

- Press **P** or click "Present" in sidebar
- **Arrow keys** navigate slides
- **Esc** exits
- **Auto-advance** every 8s (toggle with button)
- Shows "SIMULATED SHOWCASE DATA" chip

## Demo Data Coherence

All numbers share a single universe:

- **Tenant:** Maison Étoile · Madison Avenue Flagship
- **Today footfall:** 2,481 | Stop rate: 7.5% | Walk-ins: 39
- **Week footfall:** 16,340 | Stop rate: 11.4% | Walk-ins: 391 (+14.6%)
- **A/B test (Wk 4):** Capture 6.4% → 7.3% (+14.6% uplift, 14-day A/B)
- **Zones:** 10 zones, Leather Island 68% traffic, Vitrine West flagged

All numbers are **simulated** — no real client data.

## Accessibility

- Contrast AA+ in both themes
- Focus-visible rings (gold)
- `prefers-reduced-motion` respected
- ARIA labels on charts, tabs, dialogs
- Keyboard navigation throughout

## Future Swap Checklist

- [ ] Replace `sales@adlabs.in` with real email
- [ ] Fill `SOCIALS.linkedin` / `SOCIALS.instagram` URLs
- [ ] Replace demo tenant name + imagery
- [ ] Swap mock KPIs/funnel with real API endpoints
- [ ] Attach `adlabs.in` domain in Vercel
- [ ] Add analytics (Plausible/GA) if desired