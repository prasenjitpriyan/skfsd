'use client';

import { gsap } from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

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
          <p className="mt-2 text-2xl font-light text-gray-700">404 error</p>
        </div>
        <Link
          href="/"
          className="error-button border border-minion-yellow text-lg font-light px-6 py-3 rounded-xl capitalize shadow-[0_7px_0_-2px_#faca2e] hover:shadow-none hover:bg-minion-yellow hover:text-red-po transition-all duration-300">
          back to home
        </Link>
      </div>
    </main>
  );
}

function Eye() {
  return (
    <div className="eye w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
      <div className="w-8 h-8 bg-black rounded-full animate-[movePupil_2s_ease-in-out_infinite]" />
      <style jsx>{`
        @keyframes movePupil {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-10px, -10px);
          }
          50% {
            transform: translate(10px, 10px);
          }
          75% {
            transform: translate(-10px, 10px);
          }
        }
      `}</style>
    </div>
  );
}
