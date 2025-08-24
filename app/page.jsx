import FullscreenParticles from '@/components/FullscreenParticles';
import Logo from '@/components/Logo';
import ModeToggleMotion from '@/components/ModeToggleMotion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-200 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <FullscreenParticles />

      {/* Client-side animated toggle */}
      <ModeToggleMotion />

      <div className="flex flex-col items-center gap-4 relative z-10">
        <Logo />
        <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white transition-colors duration-300">
          SKFSD Financial Management Portal
        </h1>
        <p className="max-w-2xl text-center text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">
          Unified solution for managing all postal office and delivery center
          operations, targets, and daily performance. Secure, fast, and made for
          you.
        </p>
        <div className="flex gap-4 mt-4">
          <Button size="lg" asChild>
            <Link href="/login">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
