'use client';

import { gsap } from 'gsap';
import { ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Eye from './components/Eye';

export default function NotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.eye', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2,
      });

      // 404 text animation
      gsap.from('.error-code', {
        y: -50,
        opacity: 0,
        delay: 0.3,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Error message animation
      gsap.from('.error-text', {
        y: 30,
        opacity: 0,
        delay: 0.5,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Buttons animation
      gsap.from('.error-buttons', {
        y: 20,
        opacity: 0,
        delay: 0.7,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Background elements
      gsap.from('.bg-circle', {
        scale: 0,
        opacity: 0,
        delay: 0.2,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-circle absolute top-10 left-10 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
        <div className="bg-circle absolute bottom-10 right-10 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
        <div className="bg-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-10 blur-3xl" />
      </div>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle, #4338ca 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-2 max-w-2xl mx-auto">
        <div className="flex justify-center gap-6 mb-4">
          <div className="eye">
            <Eye />
          </div>
          <div className="eye">
            <Eye />
          </div>
        </div>
        <div className="error-code">
          <h1 className="text-6xl md:text-8xl font-black text-gradient leading-none mb-2">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-1 w-12 bg-indigo-600 rounded-full" />
            <div className="h-1 w-8 bg-indigo-400 rounded-full" />
            <div className="h-1 w-4 bg-indigo-300 rounded-full" />
          </div>
        </div>

        <div className="error-text space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
            Oops! Looks like you&apos;ve wandered into uncharted territory. The
            page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <div className="error-buttons flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="btn btn-primary btn-lg group w-full sm:w-auto">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
            <ArrowLeft className="w-5 h-5 ml-2 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard"
            className="btn btn-outline btn-lg w-full sm:w-auto">
            <Search className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
        </div>
        <div className="mt-6 p-2 bg-white/60 backdrop-blur-sm rounded-lg border border-indigo-100 max-w-md">
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <Link
              href="/help"
              className="text-indigo-600 font-semibold hover:underline">
              support
            </Link>{' '}
            or return to the{' '}
            <Link
              href="/"
              className="text-indigo-600 font-semibold hover:underline">
              homepage
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-sm text-gray-500">
          OPDMS - South Kolkata First Sub Division
        </p>
      </div>
    </main>
  );
}
