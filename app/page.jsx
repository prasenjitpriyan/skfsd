import { Button } from '@/components/ui/button';
import { ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-200 dark:from-gray-950 dark:to-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4">
          <Building2 className="h-10 w-10 text-blue-700 dark:text-blue-300" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white">
          SKFSD Financial Management Portal
        </h1>
        <p className="max-w-2xl text-center text-gray-500 dark:text-gray-200 text-lg">
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
