import Image from 'next/image'
import { Check, Eye, Lock, Play } from 'lucide-react'
import { STREAMS, STREAM_PASSES } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function StreamSection() {
  return (
    <section id="live" className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="07 / Live stream"
          title={
            <>
              Watch it <span className="text-primary">live</span>
            </>
          }
          description="Club fixtures, tournament nights and finals streamed straight from the arena. Grab a pass and watch from anywhere."
        />

        <ul className="mt-8 grid gap-px bg-border lg:grid-cols-3">
          {STREAMS.map((s) => (
            <li key={s.id} className="group flex flex-col bg-card">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={s.image || '/placeholder.svg'}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    s.locked ? 'opacity-50' : ''
                  }`}
                />

                <span className="absolute left-0 top-0 flex items-center gap-2 px-3 py-1.5 label-mono font-bold">
                  {s.status === 'live' && (
                    <span className="flex items-center gap-2 bg-destructive px-2 py-1 text-foreground">
                      <span className="size-1.5 animate-pulse bg-foreground" />
                      Live now
                    </span>
                  )}
                  {s.status === 'upcoming' && (
                    <span className="bg-pos-goalkeeper px-2 py-1 text-primary-foreground">
                      Upcoming
                    </span>
                  )}
                  {s.status === 'free' && (
                    <span className="bg-primary px-2 py-1 text-primary-foreground">
                      Free
                    </span>
                  )}
                </span>

                <div className="absolute inset-0 flex items-center justify-center">
                  {s.locked ? (
                    <span className="flex flex-col items-center gap-3">
                      <Lock className="size-7 text-foreground" aria-hidden="true" />
                      <span className="bg-primary px-4 py-2.5 label-mono font-bold text-primary-foreground">
                        Get pass to watch
                      </span>
                    </span>
                  ) : (
                    <span className="flex size-16 items-center justify-center border-2 border-primary bg-background/70">
                      <Play
                        className="size-6 fill-primary text-primary"
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="heading-condensed text-2xl text-balance">
                  {s.title}
                </h3>
                <p className="label-mono text-muted-foreground">{s.subtitle}</p>
                <p className="mt-auto flex items-center gap-2 border-t border-border pt-4 label-mono text-foreground">
                  {s.viewers ? (
                    <>
                      <Eye className="size-3.5" aria-hidden="true" />
                      {s.viewers} watching
                    </>
                  ) : (
                    s.kickoff
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* passes */}
        <h3 className="heading-condensed mt-20 text-4xl md:text-5xl">
          Stream passes
        </h3>
        <ul className="mt-8 grid gap-px bg-border lg:grid-cols-3">
          {STREAM_PASSES.map((pass) => (
            <li
              key={pass.name}
              className={`flex flex-col gap-6 p-8 md:p-10 ${
                pass.featured
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground'
              }`}
            >
              <div>
                <p
                  className={`label-mono ${pass.featured ? 'opacity-80' : 'text-primary'}`}
                >
                  {pass.featured ? 'Most popular' : pass.name}
                </p>
                <h4 className="heading-condensed mt-4 text-3xl">{pass.name}</h4>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="heading-condensed text-5xl">
                    {pass.price}
                  </span>
                  <span
                    className={`label-mono ${pass.featured ? 'opacity-80' : 'text-muted-foreground'}`}
                  >
                    {pass.period}
                  </span>
                </p>
              </div>

              <ul className="flex flex-col gap-3 border-t border-current/20 pt-6">
                {pass.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${pass.featured ? '' : 'text-primary'}`}
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-auto py-3.5 label-mono font-bold transition-opacity hover:opacity-90 ${
                  pass.featured
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                Buy {pass.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
