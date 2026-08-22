# KAPP — KOOMPI Game Learning Portal

A **Next.js 16** interactive game-learning portal built by KOOMPI.
Learners discover, filter, and launch educational games — all free, no account needed.

---

## Features

| Area | What's inside |
|---|---|
| **Hero Section** | Animated canvas gradient orbs, floating game preview cards, auto-rotating device slideshow, trust stat pills |
| **Game Library** | Full-text search, category chip filters, difficulty and rating filters, multi-key sort (rating / plays / difficulty) |
| **Featured Carousel** | Physics-based infinite scroll with mouse drag, touch swipe, trackpad wheel, dot navigation, hover-pause |
| **Coming Soon** | Teaser cards for upcoming games |
| **FAQ Section** | Accordion-style frequently asked questions |
| **Navbar** | Responsive navigation with dark-mode toggle and auth modal |
| **Footer** | Links, socials, and branding |
| **Dark Mode** | Full light/dark theme via `next-themes` + CSS custom properties |
| **Animations** | Scroll-reveal (`AnimatedSection`), page-load stagger, skeleton loaders, micro-interactions |

---

## Project Structure

```
kapp/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page — search, filter, game grid
│   │   ├── globals.css           # Design tokens, dark mode, keyframes
│   │   ├── layout.tsx            # Root layout (fonts, theme provider)
│   │   ├── [game]/               # Dynamic game detail page
│   │   ├── play/                 # In-browser game player
│   │   ├── leaderboard/          # Leaderboard page
│   │   ├── about/                # About page
│   │   └── api/                  # API routes
│   ├── utils/
│   │   ├── HeroSection.tsx       # Animated hero with canvas orbs and preview cards
│   │   ├── FeaturedCarousel.tsx  # Physics infinite-scroll carousel
│   │   ├── GameCard.tsx          # Individual game card with hover effects
│   │   ├── GameCardSkeleton.tsx  # Loading skeleton for game cards
│   │   ├── Navbar.tsx            # Responsive navbar
│   │   ├── Footer.tsx            # Footer component
│   │   ├── AnimatedSection.tsx   # Scroll-reveal wrapper component
│   │   ├── ComingSoonSection.tsx # Coming soon teaser section
│   │   ├── FAQSection.tsx        # FAQ accordion section
│   │   ├── FeaturedCard.tsx      # Card used inside the carousel
│   │   ├── AuthModel.tsx         # Authentication modal
│   │   ├── RippleButton.tsx      # Button with ripple effect
│   │   ├── SlideShow.tsx         # Slideshow component
│   │   ├── TransitionLink.tsx    # Animated page transition link
│   │   └── DownloadButton.tsx    # App download CTA button
│   ├── constants.ts              # PRODUCT_DATA — all game definitions
│   ├── components/               # Shared shadcn/ui components
│   ├── context/                  # React context providers
│   ├── hooks/                    # Custom React hooks
│   └── types/                    # TypeScript type definitions
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm / yarn / pnpm / bun

### Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.6 | Framework (App Router) |
| [React](https://react.dev) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) | ^4.9.0 | Component primitives |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6 | Dark mode |
| [Motion](https://motion.dev) | ^12.40.0 | Animation library |
| [Lucide React](https://lucide.dev) | ^1.17.0 | Icons |
| [Radix UI](https://www.radix-ui.com) | ^1.4.3 | Accessible primitives |

---

## Design System

All design tokens live in `src/app/globals.css`:

- **Primary color**: Indigo `#6366F1` — learning and focus
- **Secondary color**: Pink `#EC4899` — playful energy
- **Accent color**: Teal `#14B8A6` — success and achievement
- **Typography**: Inter font, 8-step scale (12px to 48px)
- **Shadows**: 3-level depth system (sm / md / lg)
- **Animations**: `heroFloat`, `scrollBounce`, `sectionEnter`, `rippleExpand`, shimmer, slice transitions

---

## Routes

| Route | Description |
|---|---|
| `/` | Home — hero, game library, coming soon, FAQ |
| `/[game]` | Game detail and info page |
| `/play` | In-browser game player |
| `/leaderboard` | Global leaderboard |
| `/about` | About KOOMPI |

---

## License

Private — Copyright KOOMPI. All rights reserved.
