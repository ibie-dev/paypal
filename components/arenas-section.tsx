'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Search, Star } from 'lucide-react'
import { ARENAS, CITIES } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

const STATUS = {
  open: { label: 'Slots open', className: 'bg-primary text-primary-foreground' },
  limited: {
    label: 'Filling fast',
    className: 'bg-pos-goalkeeper text-primary-foreground',
  },
  full: { label: 'Fully booked', className: 'bg-muted text-muted-foreground' },
} as const

export function ArenasSection() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('all')

  const arenas = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ARENAS.filter(
      (a) =>
        (city === 'all' || a.city === city) &&
        (q === '' ||
          a.name.toLowerCase().includes(q) ||
          a.area.toLowerCase().includes(q) ||
          a.sports.some((s) => s.toLowerCase().includes(q))),
    )
  }, [query, city])

  return (
    <section
      id="arenas"
      className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28"
    >
      <SectionHeading
        eyebrow="03 / Arena booking"
        title={
          <>
            Book the <span className="text-primary">ground</span>
          </>
        }
        description="Turf, futsal courts and full-size grass pitches across Pakistan — hourly rates, live availability, no phone calls."
      />

      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 items-center gap-3 border border-border bg-card px-4">
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search arena, area or sport"
            aria-label="Search arenas"
            className="h-12 w-full bg-transparent label-mono text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="Filter arenas by city"
          className="h-12 border border-border bg-card px-3 label-mono text-foreground focus:border-primary focus:outline-none"
        >
          <option value="all">All cities</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-8 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
        {arenas.map((a) => (
          <li key={a.id} className="group flex flex-col bg-card">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={a.image || '/placeholder.svg'}
                alt={`${a.name} in ${a.area}, ${a.city}`}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute left-0 top-0 px-3 py-1.5 label-mono font-bold ${STATUS[a.status].className}`}
              >
                {STATUS[a.status].label}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="heading-condensed text-3xl">{a.name}</h3>
                  <p className="label-mono mt-2 text-muted-foreground">
                    {a.area} · {a.city}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 label-mono text-foreground">
                  <Star
                    className="size-3.5 fill-primary text-primary"
                    aria-hidden="true"
                  />
                  {a.rating}
                  <span className="text-muted-foreground">({a.reviews})</span>
                </span>
              </div>

              <p className="label-mono text-muted-foreground">{a.surface}</p>

              <ul className="flex flex-wrap gap-2">
                {a.sports.map((s) => (
                  <li
                    key={s}
                    className="border border-border px-2.5 py-1 label-mono text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="heading-condensed text-2xl text-primary">
                    {a.price}
                  </p>
                  <p className="label-mono mt-1.5 text-muted-foreground">
                    Next: {a.nextSlot}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={a.status === 'full'}
                  className="px-4 py-2.5 label-mono font-bold text-primary-foreground transition-opacity enabled:bg-primary enabled:hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground"
                >
                  {a.status === 'full' ? 'Waitlist' : 'Book slot'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {arenas.length === 0 && (
        <p className="border border-border bg-card p-10 text-center label-mono text-muted-foreground">
          No arenas found. Try another city or clear the search.
        </p>
      )}
    </section>
  )
}
