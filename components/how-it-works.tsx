import { CalendarCheck, Swords, Trophy } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    title: 'Challenge',
    icon: Swords,
    body: 'Pick a club in your city and send a fixture request, or post an open request when your squad is short and let players fill the gaps.',
  },
  {
    n: '02',
    title: 'Book',
    icon: CalendarCheck,
    body: 'Lock the ground in the same flow. Live availability across 180+ arenas means the slot is yours the moment both clubs accept.',
  },
  {
    n: '03',
    title: 'Play & rank',
    icon: Trophy,
    body: 'Results feed straight into club rankings and player stats, so every friendly builds a record worth defending.',
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <p className="label-mono text-primary">02 / How it works</p>
        <h2 className="heading-condensed mt-4 max-w-[24ch] text-[clamp(2.5rem,6vw,4.5rem)] text-balance">
          Three steps from group chat to kick-off
        </h2>

        <ol className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="bg-secondary p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="heading-condensed text-6xl text-primary">
                  {step.n}
                </span>
                <step.icon
                  className="size-8 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <h3 className="heading-condensed mt-8 text-3xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
