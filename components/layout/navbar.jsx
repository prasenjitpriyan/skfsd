'use client';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/login', label: 'Login' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-white dark:bg-gray-950 border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link
          href="/"
          className="font-bold tracking-wide text-xl text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <span className="text-2xl">&#127972;</span>
          SKFSD
        </Link>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={`px-3 py-2 text-sm rounded-md font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
              }`}>
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <div className="flex items-center justify-between p-4 border-b">
                <Link
                  href="/"
                  className="font-bold text-blue-700 dark:text-blue-300 text-xl"
                  onClick={() => setOpen(false)}>
                  SKFSD
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}>
                  <X />
                </Button>
              </div>
              <nav className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className={`px-3 py-2 text-base rounded-md ${
                      pathname === link.href
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
                    }`}
                    onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
