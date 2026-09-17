---
name: pitchleague-data
description: >-
  Use this skill when defining, extending, or updating domain data models, mock datasets, or types in lib/data.ts for matches, arenas, tournaments, player squads, merchandise, or live streams.
---

# PitchLeague Data Modeling Guide

This skill guides the expansion and maintenance of domain models, mock datasets, and TypeScript types inside [`@/lib/data.ts`](file:///e:/Projects/paypal/paypal/lib/data.ts).

---

## 1. Domain Conventions & Standards

When adding or editing mock data, adhere to the authentic Pakistani football context:

### 1.1 Cities
Always reference the typed `CITIES` array:
```ts
export const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Faisalabad',
  'Peshawar',
  'Quetta',
] as const
export type City = (typeof CITIES)[number]
```

### 1.2 Pricing & Currency Format
- Always format currency in Pakistani Rupees: `'Rs X,XXX'` (e.g. `'Rs 4,500 / hr'`, `'Rs 900 / player'`, `'Rs 1,500,000'`).

### 1.3 Match Formats
- Formats: `'11-a-side'`, `'7-a-side'`, `'Futsal 5v5'`.
- Match Types: `'h2h'` (Head-to-head between two clubs) or `'open'` (Short squad open request with `slotsNeeded` defined).

### 1.4 Player Positions & Color Mapping
```ts
export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'
```
Position badges and color accents MUST map to `POSITION_STYLES`:
- **Forward**: `text-pos-forward`, `bg-pos-forward`, `border-pos-forward`, short code `'FWD'`
- **Midfielder**: `text-pos-midfielder`, `bg-pos-midfielder`, `border-pos-midfielder`, short code `'MID'`
- **Defender**: `text-pos-defender`, `bg-pos-defender`, `border-pos-defender`, short code `'DEF'`
- **Goalkeeper**: `text-pos-goalkeeper`, `bg-pos-goalkeeper`, `border-pos-goalkeeper`, short code `'GK'`

---

## 2. Step-by-Step Entity Creation Workflow

When adding a new entity (e.g., `Leaderboard`, `Referee`, `Sponsorship`, `ClubProfile`):

### Step 1: Define TypeScript Types
Declare the entity interface at the top of the entity block in `lib/data.ts`:
```ts
export type ClubTier = 'Premier' | 'Division 1' | 'Grassroots'

export type Club = {
  id: string
  name: string
  city: City
  founded: number
  tier: ClubTier
  badge?: string
  matchesWon: number
  matchesLost: number
  matchesDrawn: number
}
```

### Step 2: Create Mock Dataset
Provide realistic, authentic Pakistani grassroots club data:
```ts
export const CLUBS: Club[] = [
  {
    id: 'c1',
    name: 'Karachi United FC',
    city: 'Karachi',
    founded: 1996,
    tier: 'Premier',
    matchesWon: 48,
    matchesLost: 12,
    matchesDrawn: 8,
  },
  // ...
]
```

### Step 3: Export Query Helpers (Optional)
If common lookups are needed, export helper functions:
```ts
export function getClubsByCity(city: City | 'all'): Club[] {
  if (city === 'all') return CLUBS
  return CLUBS.filter((c) => c.city === city)
}
```

---

## 3. Validation

After updating `lib/data.ts`, run the TypeScript compiler check:
```powershell
npx tsc --noEmit
```
Ensure all dependent components importing these types compile cleanly.
