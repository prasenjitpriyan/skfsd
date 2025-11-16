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
import { FeatureCard, StatsCard } from './components/Card';
import CTA from './components/CTA';
import Footer from './components/Footer';

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

  const features = [
    {
      icon: BarChart3,
      title: 'Daily Metrics',
      description:
        'Track POSB accounts, bookings, IPPB, PLI/RPLI, Aadhaar, and philately daily.',
      iconColor: 'text-indigo-600 group-hover:text-white',
      iconBgColor: 'bg-indigo-100',
      iconHoverBg: 'group-hover:bg-indigo-600',
    },
    {
      icon: FileText,
      title: 'DRM Management',
      description:
        'Submit, review, and approve Delivery Revenue Management entries with workflow.',
      iconColor: 'text-green-600 group-hover:text-white',
      iconBgColor: 'bg-green-100',
      iconHoverBg: 'group-hover:bg-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description:
        'Real-time analytics with comparative charts and performance insights.',
      iconColor: 'text-blue-600 group-hover:text-white',
      iconBgColor: 'bg-blue-100',
      iconHoverBg: 'group-hover:bg-blue-600',
    },
    {
      icon: Building2,
      title: 'Multi-Office Support',
      description:
        'Manage 40 standard offices and 4 delivery centers from one platform.',
      iconColor: 'text-purple-600 group-hover:text-white',
      iconBgColor: 'bg-purple-100',
      iconHoverBg: 'group-hover:bg-purple-600',
    },
    {
      icon: Shield,
      title: 'Secure & Auditable',
      description:
        'Role-based access with comprehensive audit logs for all actions.',
      iconColor: 'text-red-600 group-hover:text-white',
      iconBgColor: 'bg-red-100',
      iconHoverBg: 'group-hover:bg-red-600',
    },
    {
      icon: CheckCircle2,
      title: 'IST Time Locking',
      description:
        'Auto-lock daily metrics at 23:59 IST with timezone-accurate tracking.',
      iconColor: 'text-yellow-600 group-hover:text-white',
      iconBgColor: 'bg-yellow-100',
      iconHoverBg: 'group-hover:bg-yellow-600',
    },
  ];

  const stats = [
    { value: '40', label: 'Total Offices', valueColor: 'text-indigo-600' },
    { value: '100%', label: 'Uptime', valueColor: 'text-green-600' },
    { value: '4', label: 'Delivery Centers', valueColor: 'text-blue-600' },
    { value: '24/7', label: 'Monitoring', valueColor: 'text-purple-600' },
  ];

  return (
    <main ref={containerRef} className="bg-gray-50 min-h-screen">
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-white to-blue-50">
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
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, #4338ca 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

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
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
