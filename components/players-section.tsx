'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { RotateCcw, Search } from 'lucide-react'
import {
  CITIES,
  PLAYERS,
  POSITIONS,
  POSITION_STYLES,
  type Player,
  type Position,
} from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function PlayersSection() {
  const [position, setPosition] = useState<Position | 'all'>('all')
  const [city, setCity] = useState('all')
  const [query, setQuery] = useState('')
  const [flipped, setFlipped] = useState<string | null>(null)

  const players = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PLAYERS.filter(
      (p) =>
        (position === 'all' || p.position === position) &&
        (city === 'all' || p.city === city) &&
        (q === '' ||
          p.name.toLowerCase().includes(q) ||
          p.club.toLowerCase().includes(q)),
    )
  }, [position, city, query])

  return (
    <section
      id="players"
      className="border-y border-border bg-secondary"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="05 / Player cards"
          title={
            <>
              Every player, <span className="text-primary">carded</span>
            </>
          }
          description="Browse the squads of every registered club. Tap a card to flip it and see the full breakdown — position, age, city, preferred foot and season numbers."
        />

        <div className="mt-8 flex flex-col gap-4">
          <div
            role="group"
            aria-label="Filter by position"
            className="flex flex-wrap gap-px bg-border"
          >
            <button
              type="button"
              onClick={() => setPosition('all')}
              aria-pressed={position === 'all'}
              className={`px-5 py-3 label-mono transition-colors ${
                position === 'all'
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              All positions
            </button>
            {POSITIONS.map((p) => {
              const s = POSITION_STYLES[p]
              const active = position === p
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPosition(p)}
                  aria-pressed={active}
                  className={`px-5 py-3 label-mono transition-colors ${
                    active
                      ? `${s.bg} text-primary-foreground`
                      : `bg-secondary ${s.text} hover:opacity-80`
                  }`}
                >
                  {p}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 items-center gap-3 border border-border bg-card px-4">
              <Search
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search player or club"
                aria-label="Search players"
                className="h-12 w-full bg-transparent label-mono text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="Filter players by city"
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
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {players.map((p) => (
            <PlayerCard
              key={p.id}
              player={p}
              flipped={flipped === p.id}
              onToggle={() =>
                setFlipped((cur) => (cur === p.id ? null : p.id))
              }
            />
          ))}
        </ul>

        {players.length === 0 && (
          <p className="mt-10 border border-border bg-card p-10 text-center label-mono text-muted-foreground">
            No players match these filters.
          </p>
        )}
      </div>
    </section>
  )
}

function PlayerCard({
  player: p,
  flipped,
  onToggle,
}: {
  player: Player
  flipped: boolean
  onToggle: () => void
}) {
  const s = POSITION_STYLES[p.position]

  return (
    <li className="[perspective:1400px]">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={flipped}
        aria-label={`${p.name}, ${p.position}. Flip card for full stats`}
        className="relative block h-[26rem] w-full text-left transition-transform duration-500 [transform-style:preserve-3d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        style={{ transform: flipped ? 'rotateY(180deg)' : undefined }}
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col border border-border bg-card [backface-visibility:hidden]">
          <span
            aria-hidden="true"
            className={`h-1.5 w-full shrink-0 ${s.bg}`}
          />
          <div className="relative flex-1 overflow-hidden">
            <Image
              src={p.image || '/placeholder.svg'}
              alt={p.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"
            />
            <span
              aria-hidden="true"
              className="heading-condensed absolute right-2 top-2 text-8xl text-foreground/10"
            >
              {p.number}
            </span>
            <span
              className={`absolute left-3 top-3 px-2 py-1 label-mono font-bold ${s.bg} text-primary-foreground`}
            >
              {s.short}
            </span>
          </div>
          <div className="p-5">
            <h3 className="heading-condensed text-3xl">{p.name}</h3>
            <p className="label-mono mt-2 text-muted-foreground">{p.club}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 label-mono">
              <span className="text-muted-foreground">
                {p.city} · Age {p.age}
              </span>
              <span className={s.text}>Flip</span>
            </div>
          </div>
        </div>

        {/* back */}
        <div
          className={`absolute inset-0 flex flex-col border-2 bg-card p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] ${s.border}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="heading-condensed text-3xl">{p.name}</h3>
              <p className="label-mono mt-2 text-muted-foreground">{p.club}</p>
            </div>
            <span
              className={`heading-condensed text-5xl ${s.text}`}
              aria-hidden="true"
            >
              {p.number}
            </span>
          </div>

          <dl className="mt-6 flex-1 divide-y divide-border border-y border-border">
            <Row label="Position" value={p.position} accent={s.text} />
            <Row label="Age" value={`${p.age} years`} />
            <Row label="City" value={p.city} />
            <Row label="Preferred foot" value={p.foot} />
            <Row label="Matches played" value={String(p.matches)} />
            <Row
              label={p.position === 'Goalkeeper' ? 'Clean sheets' : 'Goals'}
              value={String(
                p.position === 'Goalkeeper' ? p.cleanSheets : p.goals,
              )}
              accent={s.text}
            />
          </dl>

          <span
            className={`mt-5 flex items-center justify-center gap-2 py-3 label-mono font-bold text-primary-foreground ${s.bg}`}
          >
            View full profile
            <RotateCcw className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </button>
    </li>
  )
}

function Row({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <dt className="label-mono text-muted-foreground">{label}</dt>
      <dd className={`label-mono font-bold ${accent ?? 'text-foreground'}`}>
        {value}
      </dd>
    </div>
  )
}
