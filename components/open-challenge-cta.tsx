'use client'

import { useState } from 'react'
import { Megaphone, X } from 'lucide-react'

const TIMES = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM']
const CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Doha', 'Riyadh']
const DURATIONS = ['60 minutes', '90 minutes', '120 minutes']

function OpenRequestDialog({ mode }: { mode: 'create' | 'browse' }) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [city, setCity] = useState('Dubai')
  const [duration, setDuration] = useState('90 minutes')
  const [payment, setPayment] = useState('advance')
  const [players, setPlayers] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('10')
  const [submitted, setSubmitted] = useState(false)
  const [joined, setJoined] = useState(0)

  const close = () => {
    setOpen(false)
    setSubmitted(false)
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={mode === 'create' ? 'h-14 bg-primary-foreground px-8 label-mono text-sm font-bold text-primary transition-opacity hover:opacity-90' : 'h-14 border border-primary-foreground px-8 label-mono text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary'}>
        {mode === 'create' ? 'Post open request' : 'Browse open slots'}
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="open-request-title">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div><p className="label-mono text-primary">PlayPal open request</p><h2 id="open-request-title" className="heading-condensed mt-2 text-4xl">{mode === 'create' ? 'Create your open fixture' : 'Open slots near you'}</h2></div>
              <button type="button" onClick={close} aria-label="Close open request" className="flex size-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
            </div>
            {mode === 'browse' ? (
              <div className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="label-mono text-muted-foreground">Select date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 h-11 w-full border border-border bg-background px-3 text-foreground" /></label>
                  <label className="label-mono text-muted-foreground">Location / city<select value={city} onChange={(event) => setCity(event.target.value)} className="mt-2 h-11 w-full border border-border bg-background px-3 text-foreground">{CITIES.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label className="label-mono text-muted-foreground">Time<select value={time || '06:00 PM'} onChange={(event) => setTime(event.target.value)} className="mt-2 h-11 w-full border border-border bg-background px-3 text-foreground">{TIMES.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label className="label-mono text-muted-foreground">Time duration<select value={duration} onChange={(event) => setDuration(event.target.value)} className="mt-2 h-11 w-full border border-border bg-background px-3 text-foreground">{DURATIONS.map((item) => <option key={item}>{item}</option>)}</select></label>
                </div>
                <fieldset><legend className="label-mono text-muted-foreground">Payment option</legend><div className="mt-2 grid grid-cols-2 gap-2">{[['advance', 'Advance payment'], ['full', 'Full payment']].map(([value, label]) => <label key={value} className={`cursor-pointer border px-3 py-3 text-center label-mono ${payment === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}><input type="radio" name="join-payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="sr-only" />{label}</label>)}</div></fieldset>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="border border-primary/40 bg-primary/10 p-4"><p className="label-mono text-muted-foreground">Location</p><p className="mt-2 label-mono font-bold">{city} · Downtown Arena</p></div>
                  <div className="border border-border p-4"><p className="label-mono text-muted-foreground">Arena contact</p><a href="tel:+971501234567" className="mt-2 block label-mono font-bold text-primary hover:underline">+971 50 123 4567</a></div>
                  <div className="border border-border p-4"><p className="label-mono text-muted-foreground">Date & time</p><p className="mt-2 label-mono font-bold">{date || 'Today'} · {time || '06:00 PM'}</p></div>
                  <div className="border border-border p-4"><p className="label-mono text-muted-foreground">Booking duration</p><p className="mt-2 label-mono font-bold">90 minutes</p></div>
                  <div className="border border-border p-4"><p className="label-mono text-muted-foreground">Payment</p><p className="mt-2 label-mono font-bold">{payment === 'full' ? 'Full payment' : 'Advance payment'}</p></div>
                  <div className="border border-border p-4"><p className="label-mono text-muted-foreground">Player capacity</p><p className="mt-2 label-mono font-bold">{8 + joined} of 10 joined</p></div>
                </div>
                <p className="label-mono text-muted-foreground">Two player slots remain. The request closes and becomes booked automatically when 10 players join.</p>
                <button type="button" onClick={() => { setJoined((value) => value + 1); setSubmitted(true) }} disabled={joined >= 2} className="w-full bg-primary py-3 label-mono font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{joined >= 2 ? 'Fully booked' : 'Join open slot'}</button>
                {submitted && <p className="border border-primary/40 bg-primary/10 p-4 label-mono">Your player slot is reserved. Contact the arena at +971 50 123 4567 for arrival details. This request closes automatically at 10 players.</p>}
              </div>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); if (date && time && players && maxPlayers) setSubmitted(true) }} className="mt-6 grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="open-date" className="label-mono text-muted-foreground">Select date</label><input id="open-date" type="date" required value={date} onChange={(event) => setDate(event.target.value)} min={new Date().toISOString().slice(0, 10)} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none" /></div>
                <div><label htmlFor="open-city" className="label-mono text-muted-foreground">Location / city</label><select id="open-city" value={city} onChange={(event) => setCity(event.target.value)} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none">{CITIES.map((item) => <option key={item}>{item}</option>)}</select></div>
                <fieldset className="sm:col-span-2"><legend className="label-mono text-muted-foreground">Select kick-off time</legend><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{TIMES.map((item) => <label key={item} className={`cursor-pointer border px-3 py-3 text-center label-mono ${time === item ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}><input type="radio" name="open-time" value={item} checked={time === item} onChange={() => setTime(item)} className="sr-only" />{item}</label>)}</div></fieldset>
                <div><label htmlFor="open-duration" className="label-mono text-muted-foreground">Booking duration</label><select id="open-duration" value={duration} onChange={(event) => setDuration(event.target.value)} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none">{DURATIONS.map((item) => <option key={item}>{item}</option>)}</select></div>
                <div><label htmlFor="open-players" className="label-mono text-muted-foreground">Players joining now</label><input id="open-players" type="number" min="0" max={maxPlayers} required value={players} onChange={(event) => setPlayers(event.target.value)} placeholder="e.g. 4" className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none" /></div>
                <div><label htmlFor="open-max-players" className="label-mono text-muted-foreground">Maximum players</label><input id="open-max-players" type="number" min="2" max="30" required value={maxPlayers} onChange={(event) => setMaxPlayers(event.target.value)} className="mt-2 h-12 w-full border border-border bg-background px-3 label-mono text-foreground focus:border-primary focus:outline-none" /><p className="mt-1 text-xs text-muted-foreground">Closes automatically when reached.</p></div>
                <fieldset><legend className="label-mono text-muted-foreground">Payment option</legend><div className="mt-2 grid grid-cols-2 gap-2">{[['advance', 'Advance'], ['full', 'Full payment']].map(([value, label]) => <label key={value} className={`cursor-pointer border px-3 py-3 text-center label-mono ${payment === value ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}><input type="radio" name="open-payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="sr-only" />{label}</label>)}</div></fieldset>
                <button type="submit" disabled={!date || !time || !players || Number(players) > Number(maxPlayers)} className="sm:col-span-2 bg-primary py-3 label-mono font-bold text-primary-foreground enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Post open request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export function OpenChallengeCta() {
  return (
    <section id="challenge" className="border-y border-border bg-primary">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-16 md:px-8 md:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl text-primary-foreground">
          <p className="label-mono flex items-center gap-2 opacity-80"><Megaphone className="size-3.5" aria-hidden="true" />Short on players?</p>
          <h2 className="heading-condensed mt-5 text-[clamp(2.5rem,7vw,5rem)] text-balance">Post an open request. Let the city show up.</h2>
          <p className="mt-5 text-lg leading-relaxed opacity-80">Name the ground, the format and how many players you need. Anyone nearby can claim a slot, pay their share, and your fixture goes ahead instead of dying in a group chat.</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3"><OpenRequestDialog mode="create" /><OpenRequestDialog mode="browse" /></div>
      </div>
    </section>
  )
}
