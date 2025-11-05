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
      className="flex items-center justify-center min-h-screen bg-linear-to-b from-red-50 to-yellow-50 font-[Fira_Sans]">
      <div className="login-card bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border-t-4 border-[#FFD700]">
        <Link href={'/'} className="flex justify-center mb-6">
          <Image src="/IP.svg" alt="India Post Logo" width={150} height={60} />
        </Link>

        <h1 className="login-heading text-2xl font-semibold text-[#DA291C] mb-8">
          Welcome Back
        </h1>

        <form className="space-y-5">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#DA291C] text-white font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#FFD700] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link
            href="/signup"
            className="text-[#DA291C] font-medium hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </main>
  );
}
