'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900',
        'transition-all duration-200',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700',
        'placeholder:text-gray-400',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
        'hover:border-gray-400',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
        'aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-500',
        'md:text-sm',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
