import { cn } from '@/lib/utils';
import * as React from 'react';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-20 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900',
        'transition-all duration-200',
        'placeholder:text-gray-400',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
        'hover:border-gray-400',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
        'aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500',
        'md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
