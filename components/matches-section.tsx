'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Clock, MapPin, Phone, Swords, UserPlus, X } from 'lucide-react'
import { CITIES, MATCHES, type MatchType } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { ActionDialog } from '@/components/action-dialog'

const FIXTURE_TIMES = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM']
const FIXTURE_DURATIONS = ['60 minutes', '90 minutes', '120 minutes']

const ARENA_CONTACTS: Record<string, { phone: string; desk: string }> = {
  'Gaddafi Turf Arena': { phone: '+92 300 111 2040', desk: 'Arena booking desk' },
  'Dome Futsal Court': { phone: '+92 321 555 0188', desk: 'Front desk' },
  'Chenab Sports Arena': { phone: '+92 333 700 4260', desk: 'Reservations team' },
  'Turf Republic Lahore': { phone: '+92 311 888 7421', desk: 'Arena booking desk' },
}

function FixtureRequestDialog({ match }: { match: (typeof MATCHES)[number] }) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState(match.city)
  const [duration, setDuration] = useState('90 minutes')
  const [payment, setPayment] = useState('advance')
  const [submitted, setSubmitted] = useState(false)

  const close = () => {
    setOpen(false)
    setSubmitted(false)
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="border border-foreground px-4 py-2.5 label-mono font-bold text-foreground transition-colors hover:border-primary hover:text-primary">
        Request fixture
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`fixture-title-${match.id}`}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-mono text-primary">PlayPal fixture request</p>
                <h2 id={`fixture-title-${match.id}`} className="heading-condensed mt-2 text-4xl">Request {match.home} vs {match.away || 'your team'}</h2>
              </div>
              <button type="button" onClick={close} aria-label="Close fixture request" className="flex size-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
            </div>
            {submitted ? (
              <div className="mt-6 space-y-4">
                <div className="border border-primary/40 bg-primary/10 p-4 label-mono">Fixture request submitted for {date} at {time} in {location}, {duration}, with {payment === 'full' ? 'full payment' : 'advance payment'}.</div>
                <button type="button" onClick={close} className="w-full border border-foreground py-3 label-mono font-bold hover:border-primary hover:text-primary">Close</button>
              </div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); if (date && time && location && duration && payment) setSubmitted(true) }} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`fixture-date-${match.id}`} className="label-mono text-muted-foreground">Select date</label>
                  <input id={`fixture-date-${match.id}`} type="date" required value={date} onChange={(event) => setDate(event.target.value)} min={new Date().toISOString().slice(0, 10)} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label htmlFor={`fixture-city-${match.id}`} className="label-mono text-muted-foreground">Location / city</label>
                  <select id={`fixture-city-${match.id}`} value={location} onChange={(event) => setLocation(event.target.value as (typeof CITIES)[number])} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none">{CITIES.map((cityName) => <option key={cityName} value={cityName}>{cityName}</option>)}</select>
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className="label-mono text-muted-foreground">Select kick-off time</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{FIXTURE_TIMES.map((slot) => <label key={slot} className={`cursor-pointer border px-3 py-3 text-center label-mono transition-colors ${time === slot ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}><input type="radio" name={`fixture-time-${match.id}`} value={slot} checked={time === slot} onChange={() => setTime(slot)} className="sr-only" />{slot}</label>)}</div>
                </fieldset>
                <div>
                  <label htmlFor={`fixture-duration-${match.id}`} className="label-mono text-muted-foreground">Booking duration</label>
                  <select id={`fixture-duration-${match.id}`} value={duration} onChange={(event) => setDuration(event.target.value)} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none">{FIXTURE_DURATIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select>
                </div>
                <fieldset>
                  <legend className="label-mono text-muted-foreground">Payment option</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">{[['advance', 'Advance'], ['full', 'Full payment']].map(([value, label]) => <label key={value} className={`cursor-pointer border px-3 py-3 text-center label-mono transition-colors ${payment === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}><input type="radio" name={`fixture-payment-${match.id}`} value={value} checked={payment === value} onChange={() => setPayment(value)} className="sr-only" />{label}</label>)}</div>
                </fieldset>
                <button type="submit" disabled={!date || !time} className="sm:col-span-2 bg-primary py-3 label-mono font-bold text-primary-foreground transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Submit fixture request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

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
                {isOpen ? (
                  <ActionDialog
                    label="Join match"
                    title="Join this match"
                    description="Choose your player slot and confirm your details to join this open fixture."
                    className="bg-pos-goalkeeper px-4 py-2.5 label-mono font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <div className="mt-5 grid gap-3 border-y border-border py-4">
                      <p className="label-mono text-muted-foreground">Match details</p>
                      <div className="flex items-center gap-3">
                        <CalendarDays className="size-4 text-primary" aria-hidden="true" />
                        <span className="label-mono text-foreground">{m.date} · {m.time} PKT</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="size-4 text-primary" aria-hidden="true" />
                        <span className="label-mono text-foreground">{m.venue}, {m.city}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4 border border-primary/30 bg-primary/5 p-4">
                      <div>
                        <p className="label-mono text-muted-foreground">Arena contact</p>
                        <p className="mt-1 label-mono font-bold text-foreground">{ARENA_CONTACTS[m.venue]?.desk ?? 'Arena booking desk'}</p>
                        <p className="mt-1 label-mono text-muted-foreground">{ARENA_CONTACTS[m.venue]?.phone ?? 'Contact available after booking'}</p>
                      </div>
                      {ARENA_CONTACTS[m.venue] && (
                        <a
                          href={`tel:${ARENA_CONTACTS[m.venue].phone.replace(/\s/g, '')}`}
                          aria-label={`Call ${m.venue}`}
                          className="flex size-10 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <Phone className="size-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </ActionDialog>
                ) : (
                  <FixtureRequestDialog match={m} />
                )}
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
