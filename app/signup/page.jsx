'use client';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { allOffices } from '../data/offices';

export default function SignupPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.signup-heading', {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.signup-card', {
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
      <div className="signup-card bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border-t-4 border-red-po">
        <Link href={'/'} className="flex justify-center mb-6">
          <Image src="IP.svg" alt="India Post Logo" width={150} height={60} />
        </Link>
        <h1 className="signup-heading text-2xl font-semibold text-red-po mb-8">
          Create an Account
        </h1>
        <form className="space-y-5">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-po focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Office Name
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-yellow-po focus:outline-none"
              required
              defaultValue="">
              <option value="" disabled>
                Select your office
              </option>
              {allOffices.map((office) => (
                <option key={office.id} value={office.name}>
                  {office.name}
                </option>
              ))}
            </select>
          </div>
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
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-po focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-yellow-po text-black font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#DA291C] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-red-po font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
