'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Matches', href: '#matches' },
  { label: 'Arenas', href: '#arenas' },
  { label: 'Tournaments', href: '#tournaments' },
  { label: 'Players', href: '#players' },
  { label: 'Store', href: '#store' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 md:px-8">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/images/playpal-logo.jpeg"
            alt="PlayPal football logo"
            className="size-10 rounded-md object-cover"
          />
          <span className="heading-condensed text-2xl">
            Play<span className="text-primary">Pal</span>
          </span>
        </a>

        <nav
          aria-label="Main"
          className="ml-auto hidden items-center gap-7 lg:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-mono text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href="#matches"
            className="flex h-10 items-center bg-primary px-4 label-mono font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Create match
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="grid grid-cols-2 border-t border-border lg:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-r border-border px-4 py-4 label-mono text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
