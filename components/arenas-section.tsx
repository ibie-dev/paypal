'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Search, Star, X } from 'lucide-react'
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

const BOOKING_TIMES = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM']

function ArenaBookingDialog({ arena }: { arena: (typeof ARENAS)[number] }) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [sport, setSport] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  function close() {
    setOpen(false)
    setConfirmed(false)
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="bg-primary px-4 py-2.5 label-mono font-bold text-primary-foreground transition-opacity hover:opacity-90">
        {arena.status === 'full' ? 'Waitlist' : 'Book slot'}
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`booking-title-${arena.id}`}>
          <div className="w-full max-w-lg border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-mono text-primary">PlayPal arena booking</p>
                <h2 id={`booking-title-${arena.id}`} className="heading-condensed mt-2 text-4xl">{arena.status === 'full' ? 'Join the waitlist' : `Book ${arena.name}`}</h2>
              </div>
              <button type="button" onClick={close} className="flex size-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground" aria-label="Close booking dialog"><X className="size-4" /></button>
            </div>
            {confirmed ? (
              <div className="mt-6 border border-primary/40 bg-primary/10 p-4 label-mono text-foreground">Request saved for {sport} on {date} at {time}. PlayPal will confirm availability next.</div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); if (date && time && sport) setConfirmed(true) }} className="mt-6 space-y-5">
                <div>
                  <label htmlFor={`date-${arena.id}`} className="label-mono text-muted-foreground">Select date</label>
                  <input id={`date-${arena.id}`} type="date" required value={date} onChange={(event) => setDate(event.target.value)} min={new Date().toISOString().slice(0, 10)} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none" />
                </div>
                <fieldset>
                  <legend className="label-mono text-muted-foreground">Select sport</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {arena.sports.map((option) => (
                      <label key={option} className={`cursor-pointer border px-3 py-3 text-center label-mono transition-colors ${sport === option ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}>
                        <input type="radio" name={`sport-${arena.id}`} value={option} checked={sport === option} onChange={() => setSport(option)} className="sr-only" />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="label-mono text-muted-foreground">Select time</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {BOOKING_TIMES.map((slot) => (
                      <label key={slot} className={`cursor-pointer border px-3 py-3 text-center label-mono transition-colors ${time === slot ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}>
                        <input type="radio" name={`time-${arena.id}`} value={slot} checked={time === slot} onChange={() => setTime(slot)} className="sr-only" />
                        {slot}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <button type="submit" disabled={!date || !time || !sport} className="w-full bg-primary py-3 label-mono font-bold text-primary-foreground transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">{arena.status === 'full' ? 'Join waitlist' : 'Confirm booking request'}</button>
              </form>
            )}
            {confirmed && <button type="button" onClick={close} className="mt-6 w-full border border-foreground py-3 label-mono font-bold text-foreground hover:border-primary hover:text-primary">Close</button>}
          </div>
        </div>
      )}
    </>
  )
}

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
                <ArenaBookingDialog arena={a} />
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
