# PitchLeague Architecture & System Design Rules

This rule documents the architectural boundaries, folder structure, React 19 / Next.js 16 conventions, TypeScript guidelines, and data modeling patterns for the PitchLeague codebase.

---

## 1. Directory Structure & Layering

```text
e:\Projects\paypal\paypal\
├── app/
│   ├── globals.css        # Tailwind v4 theme, fonts, custom utilities
│   ├── layout.tsx         # Root layout, Google Fonts injection, metadata
│   └── page.tsx           # Home landing page composing all sections
├── components/
│   ├── ui/                # Base primitives (e.g. button.tsx using @base-ui/react)
│   ├── section-heading.tsx# Standardized section title/eyebrow component
│   ├── site-header.tsx    # Sticky navigation bar
│   ├── site-footer.tsx    # Site footer and links
│   └── *-section.tsx      # Domain feature sections (matches, arenas, etc.)
├── lib/
│   ├── data.ts            # Central data models, mock datasets, types
│   └── utils.ts           # Styling helper cn() (clsx + tailwind-merge)
├── public/
│   └── images/            # Local high-res assets (arenas, players, products)
└── .agents/
    ├── rules/             # Project guidelines and constraints
    └── skills/            # Procedural runbooks and workflows
```

---

## 2. Server vs Client Component Boundaries

Next.js App Router renders Server Components by default. Keep boundaries clean:

### 2.1 Server Components (Default)
Write sections as Server Components whenever they render static data or do not require browser event listeners.
- Examples in codebase: `Hero`, `HowItWorks`, `TournamentsSection`, `StreamSection`, `OpenChallengeCta`, `SiteFooter`.
- Benefits: Zero client bundle overhead, instantaneous initial HTML rendering.

### 2.2 Client Components (`'use client'`)
Only add the `'use client'` directive at the top of files that:
- Manage local state via `useState`, `useReducer`, or `useRef`.
- Filter or sort items reactively via `useMemo`.
- Listen to browser events (e.g., input typing, search filters, card flip toggles).
- Examples in codebase: `MatchesSection`, `ArenasSection`, `PlayersSection`, `StoreSection`, `SiteHeader`.

---

## 3. TypeScript & Data Management Rules

All data types and static datasets belong in [`@/lib/data.ts`](file:///e:/Projects/paypal/paypal/lib/data.ts).

### 3.1 Immutable Constants & Type Invariants
- Use `as const` for fixed collections (e.g., `CITIES = ['Karachi', 'Lahore', ...] as const`).
- Derive types from the const arrays: `export type City = (typeof CITIES)[number]`.
- Define explicit interfaces for domain entities:
  - `Match`: id, type (`'h2h' | 'open'`), home, away, city, venue, date, time, format, fee, slotsNeeded.
  - `Arena`: id, name, city, area, image, sports, price, rating, reviews, status (`'open' | 'limited' | 'full'`), nextSlot, surface.
  - `Tournament`: id, name, city, format, prize, entryFee, teamsRegistered, teamsTotal, starts, status, image.
  - `Player`: id, name, club, city, position (`'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'`), age, number, foot, matches, goals, cleanSheets, image.
  - `Product`: id, name, category, price, oldPrice, image, tag, spec.
  - `Stream`: id, title, subtitle, image, status (`'live' | 'upcoming' | 'free'`), viewers, kickoff, locked.

### 3.2 Filtering & State Performance
When filtering datasets in client components:
```tsx
const filteredData = useMemo(() => {
  const q = query.trim().toLowerCase()
  return ITEMS.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      (q === '' || item.name.toLowerCase().includes(q))
  )
}, [query, category])
```

---

## 4. UI Primitive Integration

- Reusable base components live in `components/ui/`.
- Built on top of `@base-ui/react` primitives combined with `class-variance-authority` (cva) for variants and `cn()` from `@/lib/utils`.
- Zero-radius styling must be respected across all component variants.

---

## 5. Incremental Expansion Guidelines

When adding a new feature or section to PitchLeague:
1. **Model First**: Add any new TypeScript interfaces and mock records to `lib/data.ts`.
2. **Component Creation**: Create `components/<feature-name>-section.tsx`.
3. **Heading**: Import and use `SectionHeading` with an incremented step indicator (e.g., `08 / <Feature>`).
4. **Integration**: Register the component in `app/page.tsx` and add anchor links in `components/site-header.tsx` and `components/site-footer.tsx`.
5. **Type Check**: Validate with `npx tsc --noEmit`.
