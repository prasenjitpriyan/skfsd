'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function LoginPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.login-heading', {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.login-card', {
        scale: 0.95,
        opacity: 0,
        delay: 0.3,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex items-center justify-center min-h-screen font-[Fira_Sans] bg-gray-50">
      <div className="login-card bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border-t-4 border-yellow-po">
        <Link href={'/'} className="flex justify-center mb-6">
          <Image src="/IP.svg" alt="India Post Logo" width={150} height={60} />
        </Link>

        <h1 className="login-heading text-2xl font-semibold text-red-po mb-8">
          Welcome Back
        </h1>

        <form className="space-y-5">
          <div className="text-left">
            <label className="block text-sm font-medium text-dark-charcoal mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-po focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium text-dark-charcoal mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-po focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* 🔗 Forgot password link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-red-po font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-red-po text-white font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#FFD700] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-dark-charcoal">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="text-red-po font-medium hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </main>
  );
}
