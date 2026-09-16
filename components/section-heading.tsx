import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="label-mono text-primary">{eyebrow}</p>
        <h2 className="heading-condensed mt-4 text-[clamp(2.5rem,6vw,4.5rem)] text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
