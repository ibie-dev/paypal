const COLUMNS = [
  {
    title: 'Play',
    links: [
      { label: 'Head to head', href: '#matches' },
      { label: 'Open requests', href: '#challenge' },
      { label: 'Tournaments', href: '#tournaments' },
      { label: 'Club rankings', href: '#players' },
    ],
  },
  {
    title: 'Book',
    links: [
      { label: 'Arenas', href: '#arenas' },
      { label: 'Futsal courts', href: '#arenas' },
      { label: 'List your ground', href: '#arenas' },
      { label: 'Pricing', href: '#live' },
    ],
  },
  {
    title: 'Shop & watch',
    links: [
      { label: 'Store', href: '#store' },
      { label: 'Custom jerseys', href: '#store' },
      { label: 'Live streams', href: '#live' },
      { label: 'Stream passes', href: '#live' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About PlayPal', href: '#top' },
      { label: 'For clubs', href: '#challenge' },
      { label: 'Support', href: '#top' },
      { label: 'Terms & privacy', href: '#top' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-16%20at%204.03.27%20PM-MBMNx0lgmknKc60LrytdlR7wiECRLD.jpeg"
              alt="PlayPal football logo"
              className="size-28 rounded-xl object-cover"
            />
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              Pakistan&apos;s first football ecosystem. Fixtures, grounds,
              tournaments, kit and streams — one platform, one game.
            </p>
            <p className="label-mono mt-6 text-muted-foreground">
              Karachi · Lahore · Islamabad · +25 more cities
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="label-mono text-primary">{col.title}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 label-mono text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PlayPal. All rights reserved.</p>
          <p>Built for the clubs who can never find a ground.</p>
        </div>
      </div>
    </footer>
  )
}
