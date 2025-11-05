'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-heading', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from('.hero-subtext', {
        y: 20,
        opacity: 0,
        delay: 0.3,
        duration: 1,
      });
      gsap.from('.hero-buttons', {
        opacity: 0,
        scale: 0.9,
        delay: 0.6,
        duration: 0.8,
      });
      gsap.from('.post-svg path', {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        duration: 2,
        delay: 0.5,
        ease: 'power2.out',
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <main>
      <section
        ref={containerRef}
        className="relative z-0 flex flex-col items-center justify-center text-center min-h-screen bg-linear-to-b from-red-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 z-[-1] opacity-30">
          <svg
            className="w-full h-full object-cover post-svg"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,200 Q200,100 400,200 T800,200"
              fill="none"
              stroke="#DA291C"
              strokeWidth="4"
            />
            <path
              d="M0,220 Q200,320 400,220 T800,220"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="max-w-2xl mx-auto px-6">
          <Image
            width={500}
            height={500}
            src="/IP.svg"
            alt="India Post"
            className="mx-auto h-30 w-auto mb-6"
          />
          <h1 className="hero-heading text-4xl font-bold text-red-700 mb-4 leading-snug">
            Empowering Every Post Office with Data
          </h1>
          <p className="hero-subtext text-gray-700 text-lg mb-8">
            South Kolkata First Sub Division • Daily Performance Reporting
            System
          </p>
          <div className="hero-buttons flex justify-center gap-6">
            <Link
              href="/login"
              className="error-button border border-red-600 text-lg font-light px-6 py-3 rounded-xl capitalize shadow-[0_7px_0_-2px_#DA291C] hover:shadow-none hover:bg-red-600 hover:text-white transition-all duration-300">
              Login
            </Link>
            <Link
              href={'/signup'}
              className="error-button border border-yellow-400 text-lg font-light px-6 py-3 rounded-xl capitalize shadow-[0_7px_0_-2px_#faca2e] hover:shadow-none hover:bg-yellow-400 hover:text-white transition-all duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
