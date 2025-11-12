'use client';

import { gsap } from 'gsap';
import Link from 'next/link';
import { useEffect } from 'react';
import { HiOutlineX } from 'react-icons/hi';

export default function Sidebar({ sidebarRef, sidebarOpen, setSidebarOpen }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        gsap.set(sidebarRef.current, { x: 0 });
      } else if (sidebarRef.current) {
        gsap.set(sidebarRef.current, { x: sidebarOpen ? 0 : '-100%' });
      }
    };
    window.addEventListener('resize', handleResize);
    if (sidebarRef.current && window.innerWidth < 1024) {
      gsap.to(sidebarRef.current, {
        x: sidebarOpen ? 0 : '-100%',
        duration: 0.4,
        ease: sidebarOpen ? 'power3.out' : 'power2.in',
      });
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen, sidebarRef]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed lg:static top-0 left-0 min-h-screen w-64 bg-blue-bar text-white flex flex-col p-6 space-y-8 shadow-xl z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:min-h-screen
          transition-transform duration-300 ease-in-out`}>
        <button
          className="md:hidden absolute top-5 right-5 text-white text-2xl"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close Sidebar">
          <HiOutlineX />
        </button>
        <div className="flex flex-col items-center justify-center border-b pb-4">
          <h1 className="text-4xl leading-tight">SKFSD</h1>
          <p>ADMIN</p>
        </div>
        <nav className="flex flex-col space-y-3">
          <SidebarLink label="Dashboard" href="/admin/dashboard" active />
          <SidebarLink label="Offices" href="#" />
          <SidebarLink label="Reports" href="#" />
          <SidebarLink label="Settings" href="#" />
        </nav>
        <div className="mt-auto border-t pt-4">
          <Link
            href="/login"
            className="block text-center text-sm font-medium bg-green-line text-white rounded-lg py-2 hover:bg-white transition-all">
            Logout
          </Link>
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

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
