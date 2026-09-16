import { Megaphone } from 'lucide-react'

export function OpenChallengeCta() {
  return (
    <section id="challenge" className="border-y border-border bg-primary">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-16 md:px-8 md:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl text-primary-foreground">
          <p className="label-mono flex items-center gap-2 opacity-80">
            <Megaphone className="size-3.5" aria-hidden="true" />
            Short on players?
          </p>
          <h2 className="heading-condensed mt-5 text-[clamp(2.5rem,7vw,5rem)] text-balance">
            Post an open request. Let the city show up.
          </h2>
          <p className="mt-5 text-lg leading-relaxed opacity-80">
            Name the ground, the format and how many players you need. Anyone
            nearby can claim a slot, pay their share, and your fixture goes
            ahead instead of dying in a group chat.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3">
          <button
            type="button"
            className="h-14 bg-primary-foreground px-8 label-mono text-sm font-bold text-primary transition-opacity hover:opacity-90"
          >
            Post open request
          </button>
          <button
            type="button"
            className="h-14 border border-primary-foreground px-8 label-mono text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            Browse open slots
          </button>
        </div>
      </div>
    </section>
  )
}
