'use client';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function ForgotPasswordPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.forgot-heading', {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.forgot-card', {
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
      className="flex items-center justify-center min-h-screen font-[Fira_Sans]">
      <div className="forgot-card bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border-t-4 border-red-po">
        <Link href="/" className="flex justify-center mb-6">
          <Image src="/IP.svg" alt="India Post Logo" width={150} height={60} />
        </Link>
        <h1 className="forgot-heading text-2xl font-semibold text-red-po mb-4">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Enter your registered email address, and we’ll send you a password
          reset link.
        </p>
        <form className="space-y-5">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-po focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-yellow-po text-black font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#DA291C] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
            Send Reset Link
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Remember your password?{' '}
          <Link
            href="/login"
            className="text-red-po font-medium hover:underline">
            Go to Login
          </Link>
        </p>
      </div>
    </main>
  );
}
