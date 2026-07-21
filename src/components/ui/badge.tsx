import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ink-900',
  {
    variants: {
      variant: {
        default: 'border-gold/30 bg-gold/10 text-gold',
        secondary: 'border-neutral-600 bg-neutral-900 text-neutral-200',
        destructive: 'border-red-600/50 bg-red-600/10 text-red-400',
        outline: 'text-neutral-300',
        idea: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
        building: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
        beta: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
        launched: 'border-green-500/30 bg-green-500/10 text-green-300',
        ipo: 'border-gold/30 bg-gold/10 text-gold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
