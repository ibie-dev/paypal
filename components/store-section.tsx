'use client'

import Image from 'next/image'
import { LockKeyhole } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PRODUCTS, type ProductCategory } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { ActionDialog } from '@/components/action-dialog'

const TABS: { value: ProductCategory | 'All'; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'Equipment', label: 'Equipment' },
  { value: 'Jerseys', label: 'Jerseys' },
]

export function StoreSection() {
  const [tab, setTab] = useState<ProductCategory | 'All'>('All')
  const [name, setName] = useState('RAZA')
  const [number, setNumber] = useState('9')

  const products = useMemo(
    () => PRODUCTS.filter((p) => tab === 'All' || p.category === tab),
    [tab],
  )

  return (
    <section
      id="store"
      className="relative mx-auto max-w-[1400px] overflow-hidden px-4 py-20 md:px-8 md:py-28"
    >
      <div
        className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 p-6 backdrop-blur-[3px]"
        aria-label="Store coming soon"
        role="status"
      >
        <div className="flex flex-col items-center gap-4 border border-primary bg-card px-8 py-7 text-center shadow-2xl">
          <LockKeyhole className="size-8 text-primary" aria-hidden="true" />
          <div>
            <p className="label-mono text-primary">Store locked</p>
            <p className="heading-condensed mt-2 text-4xl text-foreground">Coming soon</p>
          </div>
          <p className="max-w-sm label-mono text-muted-foreground">
            The PlayPal store is being prepared. Kit, equipment, and custom jerseys will be available soon.
          </p>
        </div>
      </div>
      <SectionHeading
        eyebrow="06 / Store"
        title={
          <>
            Kit that <span className="text-primary">shows up</span>
          </>
        }
        description="Match balls, keeper gloves, shin guards and full club kit packs — plus custom jerseys printed with your own name and number."
      />

      {/* jersey builder */}
      <div className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col justify-center gap-6 bg-card p-8 md:p-10">
          <p className="label-mono text-primary">Custom jersey builder</p>
          <h3 className="heading-condensed text-4xl md:text-5xl text-balance">
            Put your name on the back
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Type it in and watch the print update live. Dri-mesh fabric, club
            colours, delivered anywhere in Pakistan in 5 working days.
          </p>

          <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
            <label className="flex flex-col gap-2">
              <span className="label-mono text-muted-foreground">
                Name on shirt
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 12))}
                maxLength={12}
                placeholder="YOUR NAME"
                className="h-12 border border-border bg-background px-3 font-mono text-base uppercase tracking-widest text-foreground focus:border-primary focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="label-mono text-muted-foreground">Number</span>
              <input
                value={number}
                inputMode="numeric"
                onChange={(e) =>
                  setNumber(e.target.value.replace(/\D/g, '').slice(0, 2))
                }
                placeholder="10"
                className="h-12 border border-border bg-background px-3 font-mono text-base text-foreground focus:border-primary focus:outline-none"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <span className="heading-condensed text-3xl text-primary">
              Rs 3,600
            </span>
            <ActionDialog label="Order jersey" title="Order your custom jersey" description={`We will prepare ${name || 'YOUR NAME'}'s jersey with number ${number || '10'} for checkout.`} className="flex h-12 items-center gap-2 bg-primary px-6 label-mono font-bold text-primary-foreground transition-opacity hover:opacity-90" />
          </div>
        </div>

        <div className="relative min-h-[24rem] bg-secondary">
          <Image
            src="/images/product-jersey.png"
            alt="Custom PlayPal jersey preview"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-contain p-8"
          />
          <div className="pointer-events-none absolute inset-x-0 top-[26%] flex flex-col items-center">
            <span className="heading-condensed max-w-[80%] truncate text-center text-3xl text-primary-foreground md:text-4xl">
              {name || 'YOUR NAME'}
            </span>
            <span className="heading-condensed mt-1 text-7xl text-primary-foreground md:text-8xl">
              {number || '10'}
            </span>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div
        role="group"
        aria-label="Filter products"
        className="mt-14 flex flex-wrap border border-border"
      >
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            aria-pressed={tab === t.value}
            className={`px-6 py-3 label-mono transition-colors ${
              tab === t.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.id} className="group flex flex-col bg-card">
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <Image
                src={p.image || '/placeholder.svg'}
                alt={p.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {p.tag && (
                <span className="absolute left-0 top-0 bg-primary px-3 py-1.5 label-mono font-bold text-primary-foreground">
                  {p.tag}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="heading-condensed text-2xl">{p.name}</h3>
              <p className="label-mono text-muted-foreground">{p.spec}</p>
              <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="heading-condensed text-2xl text-primary">
                    {p.price}
                  </span>
                  {p.oldPrice && (
                    <span className="label-mono text-muted-foreground line-through">
                      {p.oldPrice}
                    </span>
                  )}
                </div>
                <ActionDialog label="Add to cart" title={`Add ${p.name}`} description={`${p.name} has been added to your PlayPal cart. Review your order before checkout.`} className="border border-foreground px-4 py-2.5 label-mono font-bold text-foreground transition-colors hover:border-primary hover:text-primary" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
