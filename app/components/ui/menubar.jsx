'use client';

import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

function MenubarMenu(props) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup(props) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal(props) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup(props) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub(props) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'flex h-10 items-center space-x-1 rounded-md border border-gray-200 bg-white p-1 shadow-sm',
      className
    )}
    {...props}
  />
));
Menubar.displayName = 'Menubar';

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium text-gray-700 outline-none',
      'transition-colors duration-150',
      'focus:bg-indigo-100 focus:text-indigo-900',
      'data-[state=open]:bg-indigo-100 data-[state=open]:text-indigo-900',
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = 'MenubarTrigger';

const MenubarSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-700 outline-none',
        'transition-colors duration-150',
        'focus:bg-indigo-100 focus:text-indigo-900',
        'data-[state=open]:bg-indigo-100 data-[state=open]:text-indigo-900',
        inset && 'pl-8',
        className
      )}
      {...props}>
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
);
MenubarSubTrigger.displayName = 'MenubarSubTrigger';

const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-lg',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      'origin-[--radix-menubar-content-transform-origin]',
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = 'MenubarSubContent';

const MenubarContent = React.forwardRef(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-48 overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-900 shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-[--radix-menubar-content-transform-origin]',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);
MenubarContent.displayName = 'MenubarContent';

const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-700 outline-none',
      'transition-colors duration-150',
      'focus:bg-indigo-100 focus:text-indigo-900',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = 'MenubarItem';

const MenubarCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-gray-700 outline-none',
        'transition-colors duration-150',
        'focus:bg-indigo-100 focus:text-indigo-900',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
);
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

const MenubarRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-gray-700 outline-none',
        'transition-colors duration-150',
        'focus:bg-indigo-100 focus:text-indigo-900',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
);
MenubarRadioItem.displayName = 'MenubarRadioItem';

const MenubarLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold text-gray-900',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = 'MenubarLabel';

const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-gray-200', className)}
    {...props}
  />
));
MenubarSeparator.displayName = 'MenubarSeparator';

const MenubarShortcut = ({ className, ...props }) => (
  <span
    className={cn('ml-auto text-xs tracking-widest text-gray-400', className)}
    {...props}
  />
);
MenubarShortcut.displayName = 'MenubarShortcut';

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
