---
name: pitchleague-component
description: >-
  Use this skill when creating, modifying, or refactoring UI components, feature sections, or interactive widgets in the PitchLeague codebase. Ensures compliance with zero border-radius, athletic brutalism, 1px gap border-grids, and typography rules.
---

# PitchLeague Component Creation Guide

This skill provides the exact step-by-step runbook for building new feature sections, interactive cards, and UI components that fit seamlessly into the PitchLeague application.

---

## Pre-Flight Checklist

Before writing any component code, verify:
- [ ] Are all border radii zero? (No `rounded-*` classes).
- [ ] Is dark mode assumed? (Card `bg-card`, page `bg-background`, borders `border-border`).
- [ ] Is the heading using `heading-condensed`?
- [ ] Are labels, tabs, and eyebrows using `label-mono`?
- [ ] Are grids using the 1px gap border pattern (`grid gap-px bg-border`)?
- [ ] Are position colors used properly (`--pos-forward`, `--pos-midfielder`, `--pos-defender`, `--pos-goalkeeper`)?

---

## Step 1: Determine Component Boundary (Server vs Client)

1. **Server Component**: Default for display sections. Do NOT add `'use client'`.
2. **Client Component**: Add `'use client'` at the very top of the file ONLY if you need:
   - React state hooks (`useState`, `useReducer`)
   - Reactive filtering (`useMemo`)
   - Interactive events (button clicks, live text input, modal state)

---

## Step 2: Component Scaffolding Template

Use this template to create a new section component: `components/<name>-section.tsx`.

```tsx
'use client' // Only if interactive

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { type ItemType, ITEMS } from '@/lib/data'

export function MyFeatureSection() {
  const [filter, setFilter] = useState('all')

  const items = useMemo(() => {
    return ITEMS.filter((item) => filter === 'all' || item.category === filter)
  }, [filter])

  return (
    <section
      id="my-feature"
      className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28"
    >
      <SectionHeading
        eyebrow="08 / Feature Name"
        title={
          <>
            Display <span className="text-primary">Title</span>
          </>
        }
        description="Concise description explaining what this feature offers."
        action={
          <button
            type="button"
            className="h-12 border border-foreground px-6 label-mono text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Action Button
          </button>
        }
      />

      {/* Filter Tabs */}
      <div
        role="group"
        aria-label="Filter items"
        className="mt-8 flex flex-wrap border border-border"
      >
        {['all', 'category-1', 'category-2'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`px-5 py-3 label-mono transition-colors ${
              filter === cat
                ? 'bg-primary text-primary-foreground font-bold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 1px Gap Border-Grid */}
      <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="group flex flex-col bg-card p-6 transition-colors hover:bg-secondary"
          >
            <h3 className="heading-condensed text-3xl">{item.title}</h3>
            <p className="label-mono mt-2 text-muted-foreground">{item.subtitle}</p>

            <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
              <span className="heading-condensed text-2xl text-primary">
                {item.price}
              </span>
              <button
                type="button"
                className="bg-primary px-4 py-2.5 label-mono font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

---

## Step 3: Register in Page & Navigation

1. Import the component in [`app/page.tsx`](file:///e:/Projects/paypal/paypal/app/page.tsx) and insert it in the `<main>` tag.
2. If this section is a primary user destination, add a navigation entry in:
   - [`components/site-header.tsx`](file:///e:/Projects/paypal/paypal/components/site-header.tsx) in the `NAV` array.
   - [`components/site-footer.tsx`](file:///e:/Projects/paypal/paypal/components/site-footer.tsx) in the `COLUMNS` list.

---

## Step 4: Verification

Run TypeScript compilation check to verify types and imports:
```powershell
npx tsc --noEmit
```
