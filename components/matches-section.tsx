'use client'

import { useMemo, useState } from 'react'
import { Clock, MapPin, Swords, UserPlus } from 'lucide-react'
import { CITIES, MATCHES, type MatchType } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

const TYPE_FILTERS: { value: MatchType | 'all'; label: string }[] = [
  { value: 'all', label: 'All fixtures' },
  { value: 'h2h', label: 'Head to head' },
  { value: 'open', label: 'Open request' },
]

export function MatchesSection() {
  const [type, setType] = useState<MatchType | 'all'>('all')
  const [city, setCity] = useState<string>('all')

  const matches = useMemo(
    () =>
      MATCHES.filter(
        (m) =>
          (type === 'all' || m.type === type) &&
          (city === 'all' || m.city === city),
      ),
    [type, city],
  )

  return (
    <section
      id="matches"
      className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28"
    >
      <SectionHeading
        eyebrow="01 / Fixtures"
        title={
          <>
            Upcoming <span className="text-primary">matches</span>
          </>
        }
        description="Confirmed head-to-head fixtures between registered clubs, plus open requests where any player can claim the empty slots."
      />

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filter by match type"
          className="flex flex-wrap border border-border"
        >
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setType(f.value)}
              aria-pressed={type === f.value}
              className={`px-5 py-3 label-mono transition-colors ${
                type === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3">
          <span className="label-mono text-muted-foreground">City</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-11 border border-border bg-card px-3 label-mono text-foreground focus:border-primary focus:outline-none"
          >
            <option value="all">All cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="mt-8 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
        {matches.map((m) => {
          const isOpen = m.type === 'open'
          return (
            <li
              key={m.id}
              className="relative flex flex-col gap-5 bg-card p-6 transition-colors hover:bg-secondary"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 ${
                  isOpen ? 'bg-pos-goalkeeper' : 'bg-primary'
                }`}
              />

              <div className="flex items-center justify-between gap-3">
                <span
                  className={`flex items-center gap-2 px-2.5 py-1.5 label-mono font-bold ${
                    isOpen
                      ? 'bg-pos-goalkeeper text-primary-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {isOpen ? (
                    <UserPlus className="size-3.5" aria-hidden="true" />
                  ) : (
                    <Swords className="size-3.5" aria-hidden="true" />
                  )}
                  {isOpen ? 'Open request' : 'Head to head'}
                </span>
                <span className="label-mono text-muted-foreground">
                  {m.format}
                </span>
              </div>

              <div>
                <p className="heading-condensed text-3xl">{m.home}</p>
                <p className="label-mono my-2 text-primary">vs</p>
                {m.away ? (
                  <p className="heading-condensed text-3xl">{m.away}</p>
                ) : (
                  <p className="heading-condensed text-3xl text-muted-foreground">
                    {m.slotsNeeded} slots open
                  </p>
                )}
              </div>

              <dl className="grid gap-2 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Venue</dt>
                  <MapPin
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dd className="label-mono text-muted-foreground">
                    {m.venue} · {m.city}
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Kick-off</dt>
                  <Clock
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dd className="label-mono text-muted-foreground">
                    {m.date} · {m.time} PKT
                  </dd>
                </div>
              </dl>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                <span className="label-mono text-foreground">{m.fee}</span>
                <button
                  type="button"
                  className={`px-4 py-2.5 label-mono font-bold transition-opacity hover:opacity-90 ${
                    isOpen
                      ? 'bg-pos-goalkeeper text-primary-foreground'
                      : 'border border-foreground text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {isOpen ? 'Join match' : 'Request fixture'}
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {matches.length === 0 && (
        <p className="border border-border bg-card p-10 text-center label-mono text-muted-foreground">
          No fixtures match these filters — post an open request instead.
        </p>
      )}
    </section>
  )
}
