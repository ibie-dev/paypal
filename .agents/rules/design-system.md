# PitchLeague Design System Rules

This rule defines the comprehensive visual specifications, layout mechanics, CSS utilities, color tokens, and micro-interaction patterns for the PitchLeague web application.

---

## 1. Core Visual Tokens

PitchLeague utilizes Tailwind CSS v4 configured inline in `app/globals.css`.

### 1.1 Color Tokens
| Token | CSS Variable | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| `background` | `--background` | `#0a0a0a` | Global dark background canvas |
| `card` | `--card` | `#131313` | Card container background |
| `secondary` | `--secondary` | `#1b1b1b` | Alternating section band, secondary tabs |
| `border` | `--border` | `#262626` | 1px industrial separator borders |
| `foreground` | `--foreground` | `#f4f4f4` | High-contrast body and title text |
| `muted-foreground`| `--muted-foreground` | `#8c8c8c` | Metadata, subtitles, inactive tabs |
| `primary` | `--primary` | `#00e64d` | Electric neon pitch-green accent |
| `primary-foreground`| `--primary-foreground` | `#04140a` | Deep pitch black for text/icons on primary |
| `destructive` | `--destructive` | `#ff3b30` | Red badge for "LIVE NOW", urgent notices |

### 1.2 Position Color Tokens
Used for player cards, lineup visualizations, position filters, and tactical badges:
- **Forward**: `#ff6b1a` (`--pos-forward`)
  - Classes: `text-pos-forward`, `bg-pos-forward`, `border-pos-forward`
  - Short label: `FWD`
- **Midfielder**: `#00e64d` (`--pos-midfielder`)
  - Classes: `text-pos-midfielder`, `bg-pos-midfielder`, `border-pos-midfielder`
  - Short label: `MID`
- **Defender**: `#2f7bff` (`--pos-defender`)
  - Classes: `text-pos-defender`, `bg-pos-defender`, `border-pos-defender`
  - Short label: `DEF`
- **Goalkeeper**: `#ffd028` (`--pos-goalkeeper`)
  - Classes: `text-pos-goalkeeper`, `bg-pos-goalkeeper`, `border-pos-goalkeeper`
  - Short label: `GK`

---

## 2. Typography Rules

Two distinct font families are imported via Next.js Google Fonts and applied via dedicated utility classes.

### 2.1 Display Font: `heading-condensed`
- **Font**: `Barlow Condensed`, sans-serif
- **Weight**: `800` (Extra Bold)
- **Transform**: `uppercase`
- **Tracking**: `-0.01em`
- **Leading**: `0.92`
- **Usage**:
  - Section titles: `text-[clamp(2.5rem,6vw,4.5rem)] text-balance`
  - Card hero titles: `text-3xl` or `text-4xl`
  - Huge metric numbers: `text-6xl md:text-8xl`
  - Brand mark: `Pitch<span className="text-primary">League</span>`

### 2.2 Functional Font: `label-mono`
- **Font**: `JetBrains Mono`, monospace
- **Transform**: `uppercase`
- **Letter Spacing**: `0.14em`
- **Font Size**: `0.6875rem` (11px)
- **Leading**: `1` (tight)
- **Usage**:
  - Eyebrows: `p className="label-mono text-primary">01 / FIXTURES</p>`
  - Filter button tags: `className="px-5 py-3 label-mono transition-colors"`
  - Specs & timestamps: `label-mono text-muted-foreground`
  - Key-value description list terms: `dt className="label-mono text-muted-foreground"`

---

## 3. Layout Patterns

### 3.1 1px Gap Border-Grid Pattern
Never add borders to each individual card in a grid (which creates 2px adjoining borders). Instead, set the grid background to `bg-border` with a `gap-px`, and make the children `bg-card`:
```tsx
<ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <li key={item.id} className="bg-card p-6 transition-colors hover:bg-secondary">
      {/* card items */}
    </li>
  ))}
</ul>
```

### 3.2 Section Alternation Pattern
To give rhythmic depth to the long landing page, alternate backgrounds:
- **Default Section**:
  ```tsx
  <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
  ```
- **Banded Section**:
  ```tsx
  <section className="border-y border-border bg-secondary">
    <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      {/* Content */}
    </div>
  </section>
  ```

### 3.3 Section Heading Pattern
Always use the standardized component:
```tsx
import { SectionHeading } from '@/components/section-heading'

<SectionHeading
  eyebrow="0X / CATEGORY"
  title={<>Headline <span className="text-primary">Keyword</span></>}
  description="Supporting subtitle in muted silver tone."
  action={<button type="button" className="...">CTA Action</button>}
/>
```

---

## 4. Interaction Patterns

### 4.1 Button Styling
- **Primary CTA**:
  `h-10 px-4 bg-primary text-primary-foreground font-bold label-mono hover:opacity-90`
- **Outline CTA**:
  `h-10 px-4 border border-foreground text-foreground label-mono hover:border-primary hover:text-primary`
- **Hero / High-Impact CTA**:
  `h-14 px-7 bg-primary text-primary-foreground font-bold label-mono text-sm`

### 4.2 Interactive Filter Groups
Group filters with shared border container:
```tsx
<div role="group" aria-label="Filter description" className="flex flex-wrap border border-border">
  {FILTERS.map((f) => (
    <button
      key={f.value}
      type="button"
      onClick={() => setFilter(f.value)}
      aria-pressed={active === f.value}
      className={`px-5 py-3 label-mono transition-colors ${
        active === f.value
          ? 'bg-primary text-primary-foreground font-bold'
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {f.label}
    </button>
  ))}
</div>
```

### 4.3 3D Card Flipping
For stats-rich items (e.g. Player cards), use CSS 3D transforms:
- Parent item: `[perspective:1400px]`
- Button / container: `[transform-style:preserve-3d] transition-transform duration-500` with `transform: flipped ? 'rotateY(180deg)' : undefined`
- Front face: `[backface-visibility:hidden]`
- Back face: `[backface-visibility:hidden] [transform:rotateY(180deg)]`
