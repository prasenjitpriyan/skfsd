import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import React from 'react';

import { cn } from '@/lib/utils';

const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = 'ScrollArea';

const ScrollBar = React.forwardRef(
  ({ className, orientation = 'vertical', ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent p-px',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent p-px',
        className
      )}
      {...props}>
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-indigo-300/40 hover:bg-indigo-300/60 transition-colors duration-300" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
);
ScrollBar.displayName = 'ScrollBar';

export { ScrollArea, ScrollBar };
