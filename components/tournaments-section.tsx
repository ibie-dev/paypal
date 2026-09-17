'use client'

import Image from 'next/image'
import { CalendarDays, Trophy, Users } from 'lucide-react'
import { TOURNAMENTS } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { ActionDialog } from '@/components/action-dialog'

const STATUS = {
  registering: {
    label: 'Registering',
    className: 'bg-primary text-primary-foreground',
    cta: 'Register club',
  },
  ongoing: {
    label: 'Ongoing',
    className: 'bg-pos-forward text-primary-foreground',
    cta: 'View bracket',
  },
  full: {
    label: 'Full',
    className: 'bg-muted text-muted-foreground',
    cta: 'Fully booked',
  },
} as const

export function TournamentsSection() {
  return (
    <section
      id="tournaments"
      className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28"
    >
      <SectionHeading
        eyebrow="04 / Tournaments"
        title={
          <>
            Cups worth <span className="text-primary">winning</span>
          </>
        }
        description="Knockouts, group stages and city leagues with real prize money. Enter your club, or host your own tournament on PlayPal."
        action={
          <ActionDialog label="Host a tournament" title="Host a tournament" description="Set up your tournament format, venue, entry fee and prize pool with PlayPal." className="h-14 shrink-0 border border-foreground px-7 label-mono text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary" />
        }
      />

      <ul className="mt-8 grid gap-px bg-border lg:grid-cols-2">
        {TOURNAMENTS.map((t) => {
          const pct = Math.round((t.teamsRegistered / t.teamsTotal) * 100)
          const status = STATUS[t.status]
          return (
            <li key={t.id} className="flex flex-col bg-card sm:flex-row">
              <div className="relative aspect-[4/3] shrink-0 sm:aspect-auto sm:w-44">
                <Image
                  src={t.image || '/placeholder.svg'}
                  alt={t.name}
                  fill
                  sizes="(min-width: 640px) 176px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col gap-5 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="heading-condensed text-3xl text-balance">
                    {t.name}
                  </h3>
                  <span
                    className={`shrink-0 px-2.5 py-1.5 label-mono font-bold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="label-mono flex items-center gap-1.5 text-muted-foreground">
                      <Trophy className="size-3.5" aria-hidden="true" />
                      Prize pool
                    </dt>
                    <dd className="heading-condensed mt-2 text-2xl text-primary">
                      {t.prize}
                    </dd>
                  </div>
                  <div>
                    <dt className="label-mono flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      Kicks off
                    </dt>
                    <dd className="heading-condensed mt-2 text-2xl">
                      {t.starts}
                    </dd>
                  </div>
                </dl>

                <p className="label-mono text-muted-foreground">
                  {t.format} · {t.city} · Entry {t.entryFee}
                </p>

                <div>
                  <div className="flex items-center justify-between label-mono">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="size-3.5" aria-hidden="true" />
                      {t.teamsRegistered} / {t.teamsTotal} teams
                    </span>
                    <span className="text-foreground">{pct}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${t.name} registration`}
                    className="mt-2 h-2 w-full bg-muted"
                  >
                    <div
                      className={`h-full ${t.status === 'ongoing' ? 'bg-pos-forward' : 'bg-primary'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={t.status === 'full'}
                  className="mt-auto w-full py-3.5 label-mono font-bold transition-opacity enabled:bg-primary enabled:text-primary-foreground enabled:hover:opacity-90 disabled:bg-muted disabled:text-muted-foreground"
                >
                  {status.cta}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
