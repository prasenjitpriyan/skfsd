'use client';

import { gsap } from 'gsap';
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
      gsap.from('.error-text', {
        y: 30,
        opacity: 0,
        delay: 0.5,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex items-center justify-center min-h-screen font-[Fira_Sans] transition-colors duration-300 relative z-0 text-center overflow-hidden">
      <div className="flex flex-col items-center text-center gap-8">
        <div className="flex justify-center gap-6">
          <Eye />
          <Eye />
        </div>
        <div className="error-text">
          <h1 className="text-4xl font-semibold text-red-po capitalize">
            Looks like you&apos;re lost
          </h1>
          <p className="mt-2 text-2xl font-light text-dark-charcoal">
            404 error
          </p>
        </div>
        <Link
          href="/"
          className="error-button border border-yellow-po text-lg font-light px-6 py-3 rounded-xl capitalize shadow-[0_7px_0_-2px_#faca2e] hover:shadow-none hover:bg-yellow-po hover:text-red-po transition-all duration-300">
          back to home
        </Link>
      </div>
    </main>
  );
}
