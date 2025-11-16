'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-50 text-indigo-900 border-indigo-200 [&>svg]:text-indigo-600',
        destructive:
          'bg-red-50 text-red-900 border-red-200 [&>svg]:text-red-600',
        success:
          'bg-green-50 text-green-800 border-green-200 [&>svg]:text-green-600',
        warning:
          'bg-yellow-50 text-yellow-800 border-yellow-200 [&>svg]:text-yellow-700',
        info: 'bg-blue-50 text-blue-900 border-blue-200 [&>svg]:text-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed opacity-90', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
