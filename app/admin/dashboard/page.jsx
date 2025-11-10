'use client';

import { gsap } from 'gsap';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

export default function AdminDashboard() {
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // GSAP Animations on load (cards, header, table)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header', {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.from('.card', {
        opacity: 0,
        y: 20,
        delay: 0.2,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mobile Sidebar Animation (GSAP)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Reset transform on large screens
        gsap.set(sidebarRef.current, { x: 0 });
      } else if (sidebarRef.current) {
        // Apply transform on smaller screens based on sidebar state
        gsap.set(sidebarRef.current, { x: sidebarOpen ? 0 : '-100%' });
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Initial animation for mobile
    if (sidebarRef.current && window.innerWidth < 1024) {
      gsap.to(sidebarRef.current, {
        x: sidebarOpen ? 0 : '-100%',
        duration: 0.4,
        ease: sidebarOpen ? 'power3.out' : 'power2.in',
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen]);

  return (
    <div ref={containerRef} className="flex min-h-screen font-[Fira_Sans]">
      <aside
        ref={sidebarRef}
        className={`fixed lg:static top-0 left-0 min-h-screen w-64 bg-blue-bar text-white flex flex-col p-6 space-y-8 shadow-xl z-50
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:min-h-screen
    transition-transform duration-300 ease-in-out`}>
        {/* Mobile Close Button */}
        <button
          className="md:hidden absolute top-5 right-5 text-white text-2xl"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Sidebar">
          <HiOutlineX />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center border-b pb-4">
          <h1 className="text-4xl leading-tight">SKFSD</h1>
          <p>ADMIN</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-3">
          <SidebarLink label="Dashboard" href="/admin/dashboard" active />
          <SidebarLink label="Offices" href="#" />
          <SidebarLink label="Reports" href="#" />
          <SidebarLink label="Settings" href="#" />
        </nav>

        {/* Logout */}
        <div className="mt-auto border-t pt-4">
          <Link
            href="/login"
            className="block text-center text-sm font-medium bg-green-line text-white rounded-lg py-2 hover:bg-white transition-all">
            Logout
          </Link>
        </div>
      </aside>

      {/* 🔸 Overlay (for mobile when sidebar open) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🔸 Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto w-full">
        {/* Header */}
        <header className="header flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu (mobile only) */}
            <button
              className="md:hidden text-[#DA291C] text-3xl"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Sidebar">
              <HiOutlineMenuAlt3 />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-[#DA291C]">
                Dashboard Overview
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                South Kolkata First Sub Division
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow text-gray-700 font-medium border border-yellow-200 text-sm md:text-base">
            {new Date().toLocaleDateString('en-GB')}
          </div>
        </header>

        {/* Analytics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card title="Total Offices" value="40" />
          <Card title="Reports Received" value="37" />
          <Card title="Pending Reports" value="3" />
          <Card title="System Users" value="42" />
        </section>

        {/* Office Table */}
        <section className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border-t-4 border-[#FFD700]">
          <h3 className="text-lg md:text-xl font-semibold text-[#DA291C] mb-4">
            Office Submission Status
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm text-left">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Office Name</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4 hidden sm:table-cell">
                    Last Updated
                  </th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleOffices.map((office, idx) => (
                  <tr
                    key={idx}
                    className="table-row border-b border-gray-100 hover:bg-yellow-50 transition-all">
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4 font-medium">{office.name}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          office.status === 'Submitted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                        {office.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-gray-600 hidden sm:table-cell">
                      {office.updated}
                    </td>
                    <td className="py-2 px-4">
                      <button className="text-[#DA291C] hover:text-[#FFD700] font-medium text-xs md:text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

/* 📊 Card Component */
function Card({ title, value }) {
  return (
    <div className="card bg-white p-5 rounded-2xl shadow-md border-l-4 border-[#FFD700] text-center sm:text-left">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-2xl font-semibold text-[#DA291C] mt-1">{value}</p>
    </div>
  );
}

/* 🔗 Sidebar Link Component */
function SidebarLink({ label, href, active }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg font-medium transition-all ${
        active
          ? 'bg-green-line text-white'
          : 'text-white hover:bg-green-line hover:pl-4'
      }`}>
      {label}
    </Link>
  );
}

/* 🏣 Demo Data */
const sampleOffices = [
  { name: 'Ballygunge MDG', status: 'Submitted', updated: '04.11.2025' },
  { name: 'Bijoygarh', status: 'Pending', updated: '-' },
  { name: 'Golpark', status: 'Submitted', updated: '04.11.2025' },
  { name: 'Gariahat Market', status: 'Submitted', updated: '04.11.2025' },
  { name: 'Sarat Bose Road', status: 'Pending', updated: '-' },
];
