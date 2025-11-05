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

  // Animate the card when authorized
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

  // Handle the secret key check
  const handleSecretSubmit = (e) => {
    e.preventDefault();
    if (secretKey === 'INDIAPOST_ADMIN_2025') {
      setAuthorized(true);
    } else {
      alert('❌ Invalid secret key');
    }
  };

  // Handle admin account creation
  const handleAdminSignup = (e) => {
    e.preventDefault();

    // Normally, you’d save admin data to MongoDB here via an API call.
    // For now, just simulate success:
    alert('✅ Admin account created successfully!');
    router.push('/admin/dashboard'); // Redirect after success
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-linear-to-b from-red-50 to-yellow-50 font-[Fira_Sans]">
      {!authorized ? (
        // STEP 1: SECRET KEY VALIDATION
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
            className="w-full bg-[#DA291C] text-white font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#FFD700] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
            Verify Key
          </button>
        </form>
      ) : (
        // STEP 2: ADMIN ACCOUNT CREATION FORM
        <div className="admin-card bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border-t-4 border-[#FFD700]">
          <Link href={'/'} className="flex justify-center mb-6">
            <Image
              src="/IP.svg"
              alt="India Post Logo"
              width={150}
              height={60}
            />
          </Link>
          <h1 className="text-2xl font-semibold text-[#DA291C] mb-8">
            Create Admin Account
          </h1>

          <form onSubmit={handleAdminSignup} className="space-y-5">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#DA291C]"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FFD700]"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#DA291C]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFD700] text-black font-semibold py-2 rounded-lg shadow-[0_6px_0_0_#DA291C] hover:translate-y-0.5 hover:shadow-none transition-all duration-200">
              Register Admin
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already an admin?{' '}
            <Link
              href="/login"
              className="text-[#DA291C] font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}
