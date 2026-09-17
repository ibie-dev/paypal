import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { STATS } from '@/lib/data'

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src="/images/hero-stadium.png"
        alt="Floodlit football stadium at night in Pakistan"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/75" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-background/80"
      />

      <div className="mx-auto max-w-[1400px] px-4 pb-0 pt-20 md:px-8 md:pt-28">
        <p className="hero-slide-in label-mono flex items-center gap-2 text-primary">
          <MapPin className="size-3.5" aria-hidden="true" />
          Pakistan&apos;s first football ecosystem
        </p>

        <h1 className="hero-slide-in hero-slide-in-delay heading-condensed mt-6 max-w-[16ch] text-[clamp(3.5rem,13vw,11rem)] text-balance">
          Challenge.
          <br />
          Book.
          <br />
          <span className="text-primary">Dominate.</span>
        </h1>

        <div className="mt-8 grid gap-8 border-t border-border pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Clubs can never find a free ground when they finally find an
            opponent. PlayPal fixes both halves of the problem — line up a
            head-to-head fixture, post an open request when you&apos;re short on
            players, and lock the pitch in the same flow.
          </p>

        <div className="flex flex-col items-center gap-3">
          <a
            href="#matches"
              className="group flex h-14 items-center gap-3 bg-primary px-7 label-mono text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Challenge a club
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
            href="#arenas"
            className="order-first flex h-14 items-center gap-3 border border-foreground px-7 label-mono text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Book an arena
            </a>
          </div>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-2 border-y border-border md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`bg-background px-4 py-7 md:px-8 ${
              i % 2 === 1 ? '' : 'border-r border-border'
            } ${i < 2 ? 'border-b border-border md:border-b-0' : ''} ${
              i === 1 ? 'md:border-r md:border-border' : ''
            } ${i === 2 ? 'md:border-r md:border-border' : ''}`}
          >
            <dd className="heading-condensed text-4xl text-primary md:text-6xl">
              {stat.value}
            </dd>
            <dt className="label-mono mt-3 text-muted-foreground">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
