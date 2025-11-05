'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b-4 border-yellow-400 pb-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-red-700">
          India Post – South Kolkata First Sub Division
        </h1>
        <p className="text-gray-600 text-sm">Daily Performance Report</p>
      </div>
      <Image
        width={100}
        height={100}
        src="https://upload.wikimedia.org/wikipedia/en/2/2a/India_Post_Logo.svg"
        alt="India Post Logo"
        className="h-14 w-auto"
      />
    </header>
  );
}
