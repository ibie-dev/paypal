# PitchLeague Project Rules & Coding Perimeter

This document outlines the core guidelines, system design, architectural constraints, and visual design patterns for the **PitchLeague** codebase (Pakistan's First Football Ecosystem). All future increments, features, refactors, and components MUST strictly adhere to these perimeter rules.

---

## 1. Domain Context

- **Platform Name**: PitchLeague
- **Domain**: Pakistan's grassroots football ecosystem.
- **Core Features**:
  1. **Matches / Fixtures**: Confirmed Head-to-Head (H2H) club fixtures and Open Requests (filling slots when squads are short).
  2. **Arena Booking**: Real-time hourly booking across turf pitches, futsal courts, and full-size grass grounds in Pakistani cities.
  3. **Tournaments**: Knockout and group stage cups with real prize pools (e.g., National Cup, Futsal Championship).
  4. **Player Cards**: Interactive player profiles and stats (matches, goals, clean sheets, age, preferred foot, position).
  5. **Merchandise Store**: Pitch-ready equipment (balls, gloves, shin guards) and custom Dri-mesh jerseys with live name/number print preview.
  6. **Live Streaming**: HD match streams, pay-per-view match passes, and season subscriptions.
- **Locale & Standards**:
  - **Currency**: Pakistani Rupee formatted as `Rs X,XXX` (e.g. `Rs 4,500 / hr`, `Rs 900 / player`, `Rs 1,500,000`).
  - **Timezone**: Pakistan Standard Time (PKT).
  - **Cities**: Karachi, Lahore, Islamabad, Faisalabad, Peshawar, Quetta (typed via `City` in `@/lib/data`).

---

## 2. Visual Design System: Athletic Brutalism

The visual identity is unapologetic, industrial, athletic brutalism. NEVER deviate toward soft, generic, rounded, or light-themed aesthetics.

### 2.1 ZERO Border-Radius (Non-Negotiable)
- **STRICT RULE**: `* { border-radius: 0 !important; }`
- **NEVER** use rounded utilities (`rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full`, etc.) unless specifically overriding for a primitive slot that is reset by CSS. All UI elements—cards, buttons, badges, inputs, dialogs, progress bars, image wrappers—must have razor-sharp square edges.

### 2.2 Color Token Architecture
- Dark mode only (`color-scheme: dark`). Do not introduce light-theme switches or pure white page backgrounds.
  - `--background`: `#0a0a0a` (Deep pitch black)
  - `--card`: `#131313` (Slightly elevated dark surface)
  - `--secondary`: `#1b1b1b` (Muted surface for alternating section bands)
  - `--border`: `#262626` (Subtle 1px boundary)
  - `--foreground`: `#f4f4f4` (Crisp off-white text)
  - `--muted-foreground`: `#8c8c8c` (Mid-tone silver gray)
  - `--primary`: `#00e64d` (Electric neon pitch green)
  - `--primary-foreground`: `#04140a` (Dark contrast green for text on primary)
  - `--destructive`: `#ff3b30` (Alert red for live broadcasts or critical tags)

### 2.3 Position Color Coding
When rendering player positions, stats, or badges, use the dedicated position tokens:
- **Forward (FWD)**: `#ff6b1a` (`text-pos-forward`, `bg-pos-forward`, `border-pos-forward`)
- **Midfielder (MID)**: `#00e64d` (`text-pos-midfielder`, `bg-pos-midfielder`, `border-pos-midfielder`)
- **Defender (DEF)**: `#2f7bff` (`text-pos-defender`, `bg-pos-defender`, `border-pos-defender`)
- **Goalkeeper (GK)**: `#ffd028` (`text-pos-goalkeeper`, `bg-pos-goalkeeper`, `border-pos-goalkeeper`)

### 2.4 Typography Dualism
1. **Display & Impact**: Use the custom `@utility heading-condensed`
   - Maps to **Barlow Condensed**, uppercase, font-weight 800, tight tracking (`-0.01em`), line-height `0.92`.
   - Used for section titles (`text-[clamp(2.5rem,6vw,4.5rem)]`), player card names, stats numbers, product titles.
2. **Metadata & Controls**: Use the custom `@utility label-mono`
   - Maps to **JetBrains Mono**, uppercase, `letter-spacing: 0.14em`, `font-size: 0.6875rem` (11px), `line-height: 1`.
   - Used for section eyebrows (`01 / FIXTURES`), badge chips, filter tabs, button text, table/card labels, price periods, timestamps.

### 2.5 The 1px Gap Border-Grid Pattern
Do not apply borders on all 4 sides of neighboring grid items to avoid double-thick border lines. Use the signature brutalist pattern:
```tsx
<ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <li key={item.id} className="bg-card p-6">
      {/* card content */}
    </li>
  ))}
</ul>
```

---

## 3. Component Architecture & System Design

### 3.1 Tech Stack
- **Framework**: Next.js 16.3.3 (App Router)
- **UI & React**: React 19, `@base-ui/react`, Tailwind CSS v4, `lucide-react`
- **Language**: TypeScript (strict mode, `@/*` path alias for root directory)

### 3.2 Server vs Client Components
- Keep sections as **Server Components** by default (e.g., `Hero`, `HowItWorks`, `TournamentsSection`, `StreamSection`, `SiteFooter`).
- ONLY add `'use client'` if the component handles:
  - Interactive state (`useState`, `useMemo`, `useCallback`)
  - Filter / search queries (e.g. `MatchesSection`, `ArenasSection`, `PlayersSection`)
  - Dynamic live user input (e.g., `StoreSection` custom jersey builder)
  - Navigation toggles (`SiteHeader` mobile menu)

### 3.3 Section Layout Blueprint
Every section must follow the standard structural layout:
```tsx
<section id="section-id" className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
  <SectionHeading
    eyebrow="0X / SECTION NAME"
    title={<>Heading <span className="text-primary">Accent</span></>}
    description="Clear description text explaining this section's function."
    action={<Button ...>Optional Action</Button>}
  />
  {/* Filter Controls or Grid */}
</section>
```
Alternate section backgrounds between `bg-background` and `border-y border-border bg-secondary` to maintain visual rhythm across long pages.

### 3.4 Data Access Pattern
- All domain data models and mock records reside in [`@/lib/data.ts`](file:///e:/Projects/paypal/paypal/lib/data.ts).
- Export strong TypeScript types alongside mock arrays (e.g., `Match`, `Arena`, `Tournament`, `Player`, `Product`, `Stream`).
- Always consume data using immutable helpers (`useMemo` for filtering).

---

## 4. Accessibility & Semantic HTML

- Use semantic HTML tags: `<section>`, `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<dl>`, `<dt>`, `<dd>`, `<ul>`, `<ol>`.
- Interactive filter groups must have `role="group"` and proper `aria-label`.
- Toggle buttons must specify `aria-pressed={isActive}`.
- Image assets must specify descriptive `alt` tags and `sizes` attributes for Next.js image optimization.
- Interactive icon buttons must include `aria-label` or `sr-only` text.
