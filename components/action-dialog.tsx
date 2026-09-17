'use client'

import { useState, type ReactNode } from 'react'
import { X } from 'lucide-react'

export function ActionDialog({
  label,
  title,
  description,
  children,
  className,
}: {
  label: string
  title: string
  description: string
  children?: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className || 'px-4 py-2.5 label-mono font-bold transition-opacity hover:opacity-90'}>
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="action-dialog-title">
          <div className="w-full max-w-lg border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-mono text-primary">PlayPal</p>
                <h2 id="action-dialog-title" className="heading-condensed mt-2 text-4xl">{title}</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="flex size-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground" aria-label="Close dialog">
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
            {children}
            <button type="button" onClick={() => setOpen(false)} className="mt-6 w-full bg-primary py-3 label-mono font-bold text-primary-foreground hover:opacity-90">Got it</button>
          </div>
        </div>
      )}
    </>
  )
}

export function ActionButton({ label, title, description, className = '' }: { label: string; title: string; description: string; className?: string }) {
  return <ActionDialog label={label} title={title} description={description} />
}
