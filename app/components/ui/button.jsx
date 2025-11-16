import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-600 text-white border border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 hover:shadow-[0_4px_10px_rgba(99,102,241,0.2)] active:bg-indigo-800',
        destructive:
          'bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700 hover:shadow-[0_4px_10px_rgba(220,38,38,0.2)] active:bg-red-800',
        outline:
          'border-2 border-indigo-600 bg-transparent text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100',
        secondary:
          'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 hover:border-gray-300 active:bg-gray-300',
        ghost:
          'border border-transparent hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100',
        success:
          'bg-green-600 text-white border border-green-600 hover:bg-green-700 hover:border-green-700 hover:shadow-[0_4px_10px_rgba(22,163,74,0.2)] active:bg-green-800',
      },
      size: {
        default: 'min-h-9 px-4 py-2',
        sm: 'min-h-8 rounded-md px-3 text-xs',
        lg: 'min-h-10 rounded-md px-8 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
