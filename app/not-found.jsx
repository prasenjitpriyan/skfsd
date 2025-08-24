'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 to-indigo-200 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 px-4">
      <Card className="w-full from-blue-50 to-indigo-200 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 max-w-lg shadow-xl rounded-2xl">
        <CardContent className="text-center p-8">
          {/* SVG Illustration */}
          <div className="mb-6 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-40 h-40 text-gray-900 dark:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
          </div>

          {/* Text */}
          <h2 className="text-6xl font-extrabold text-gray-900 dark:text-white">
            404
          </h2>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you’re looking for doesn’t exist or has been moved.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
