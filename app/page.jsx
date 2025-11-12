'use client';

import { gsap } from 'gsap';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Shield,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Page() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-logo', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-heading', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtext', {
        y: 20,
        opacity: 0,
        delay: 0.4,
        duration: 1,
      });

      gsap.from('.hero-buttons', {
        opacity: 0,
        scale: 0.95,
        delay: 0.6,
        duration: 0.8,
      });

      gsap.from('.feature-card', {
        y: 30,
        opacity: 0,
        delay: 0.8,
        duration: 0.6,
        stagger: 0.15,
      });

      gsap.from('.stats-item', {
        scale: 0.9,
        opacity: 0,
        delay: 1,
        duration: 0.5,
        stagger: 0.1,
      });

      // SVG path animation
      gsap.from('.post-svg path', {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        duration: 2.5,
        delay: 0.3,
        ease: 'power2.out',
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-white to-blue-50">
        {/* Animated Background SVG */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg
            className="w-full h-full object-cover post-svg"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none">
            <path
              d="M0,200 Q200,100 400,200 T800,200"
              fill="none"
              stroke="#4338ca"
              strokeWidth="3"
            />
            <path
              d="M0,220 Q200,320 400,220 T800,220"
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
            />
            <path
              d="M0,180 Q200,80 400,180 T800,180"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, #4338ca 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          {/* Logo */}
          <div className="hero-logo mb-8">
            <Image
              width={500}
              height={500}
              src="/IP.svg"
              alt="India Post"
              className="mx-auto h-32 w-auto drop-shadow-lg"
              priority
            />
          </div>

          <h1 className="hero-heading text-5xl md:text-6xl font-bold text-indigo-900 mb-4 leading-tight">
            Office Performance &<br />
            <span className="text-gradient">Delivery Management System</span>
          </h1>

          <p className="hero-subtext text-gray-700 text-xl md:text-2xl mb-4 font-light">
            South Kolkata First Sub Division
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="badge badge-primary">Operational</span>
            <span className="badge badge-success">40 Offices Connected</span>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/login" className="btn btn-primary btn-lg group">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#features" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="stats-item card card-body text-center bg-white/80 backdrop-blur">
              <div className="text-3xl font-bold text-indigo-600">40</div>
              <div className="text-sm text-gray-600">Total Offices</div>
            </div>
            <div className="stats-item card card-body text-center bg-white/80 backdrop-blur">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="stats-item card card-body text-center bg-white/80 backdrop-blur">
              <div className="text-3xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Delivery Centers</div>
            </div>
            <div className="stats-item card card-body text-center bg-white/80 backdrop-blur">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Performance Tracking
            </h2>
            <p className="text-xl text-gray-600">
              Manage daily metrics, DRM entries, and generate reports with ease
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="feature-card card group hover:shadow-indigo">
              <div className="card-body">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                  <BarChart3 className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Daily Metrics
                </h3>
                <p className="text-gray-600">
                  Track POSB accounts, bookings, IPPB, PLI/RPLI, Aadhaar, and
                  philately daily.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card card group hover:shadow-indigo">
              <div className="card-body">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <FileText className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  DRM Management
                </h3>
                <p className="text-gray-600">
                  Submit, review, and approve Delivery Revenue Management
                  entries with workflow.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card card group hover:shadow-indigo">
              <div className="card-body">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <TrendingUp className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-600">
                  Real-time analytics with comparative charts and performance
                  insights.
                </p>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="feature-card card group hover:shadow-indigo">
              <div className="card-body">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                  <Building2 className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Multi-Office Support
                </h3>
                <p className="text-gray-600">
                  Manage 40 standard offices and 4 delivery centers from one
                  platform.
                </p>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="feature-card card group hover:shadow-indigo">
              <div className="card-body">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Shield className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Secure & Auditable
                </h3>
                <p className="text-gray-600">
                  Role-based access with comprehensive audit logs for all
                  actions.
                </p>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="feature-card card group hover:shadow-indigo">
              <div className="card-body">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-600 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-yellow-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  IST Time Locking
                </h3>
                <p className="text-gray-600">
                  Auto-lock daily metrics at 23:59 IST with timezone-accurate
                  tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-indigo text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join 44 offices already using OPDMS for daily performance tracking
          </p>
          <Link
            href="/login"
            className="btn bg-white text-indigo-900 hover:bg-gray-100 btn-lg inline-flex items-center">
            Access Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">OPDMS</h3>
              <p className="text-sm">
                Office Performance & Delivery Management System for South
                Kolkata First Sub Division
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/login"
                    className="hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors">
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <p className="text-sm">
                South Kolkata First Sub Division
                <br />
                Department of Posts
                <br />
                Kolkata, West Bengal
                <br />
                Email:aspos.southkolkata1@gmail.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} India Post. All rights reserved.</p>
            <p className="mt-2 text-xs">
              Built with Next.js • Timezone: Asia/Kolkata (IST)
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
