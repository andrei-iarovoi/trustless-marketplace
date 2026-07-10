import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
        secondary: 'border-border bg-card text-muted',
        success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
        warning: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
        destructive: 'border-red-400/30 bg-red-400/10 text-red-200',
        outline: 'border-border text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge }
