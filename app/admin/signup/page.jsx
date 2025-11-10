'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminSignup() {
  const [secretKey, setSecretKey] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (authorized) {
      gsap.to('.admin-card', {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
    }
  }, [authorized]);

  const handleSecretSubmit = (e) => {
    e.preventDefault();
    if (secretKey === 'INDIAPOST_ADMIN_2025') {
      setAuthorized(true);
    } else {
      alert('Invalid secret key');
    }
  };

  const handleAdminSignup = (e) => {
    e.preventDefault();
    alert('Admin account created successfully!');
    router.push('/admin/dashboard');
  };

  return (
    <main className="flex items-center justify-center min-h-screen font-[Fira_Sans]">
      {!authorized ? (
        <form
          onSubmit={handleSecretSubmit}
          className="bg-white p-10 rounded-2xl shadow-2xl text-center border-t-4 border-[#DA291C]">
          <Image
            src="/IP.svg"
            alt="India Post Logo"
            width={120}
            height={50}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-semibold text-[#DA291C] mb-4">
            Admin Access
          </h1>
          <input
            type="password"
            placeholder="Enter admin secret key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring-2 focus:ring-[#FFD700]"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-po text-white font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#FFD700] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
            Verify Key
          </button>
        </form>
      ) : (
        <div className="admin-card bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border-t-4 border-yellow-po">
          <Link href={'/'} className="flex justify-center mb-6">
            <Image
              src="/IP.svg"
              alt="India Post Logo"
              width={150}
              height={60}
            />
          </Link>
          <h1 className="text-2xl font-semibold text-red-po mb-8">
            Create Admin Account
          </h1>

          <form onSubmit={handleAdminSignup} className="space-y-5">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-po"
                placeholder="Admin Name"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-po"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-po"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-po text-black font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#DA291C] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
              Register Admin
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already an admin?{' '}
            <Link
              href="/login"
              className="text-red-po font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}
