'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hover:transform hover:-translate-y-0.5 hover:shadow-[0_0_6px_rgba(99,102,241,0.25)]',
  {
    variants: {
      variant: {
        default: 'bg-indigo-100 text-indigo-800 border-transparent',
        success: 'bg-green-100 text-green-800 border-transparent',
        warning: 'bg-yellow-100 text-yellow-800 border-transparent',
        destructive: 'bg-red-100 text-red-800 border-transparent',
        info: 'bg-blue-100 text-blue-800 border-transparent',
        outline:
          'border border-indigo-300 bg-white text-indigo-700 hover:bg-indigo-50',
        secondary: 'bg-gray-100 text-gray-700 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
