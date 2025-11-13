'use client';

import { gsap } from 'gsap';
import {
  AlertTriangle,
  ArrowLeft,
  Bug,
  Home,
  RefreshCw,
  Server,
  Shield,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Error({ error, reset }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', error);
    }
    // TODO: Log error to monitoring service (Sentry, DataDog, etc.)
    // logErrorToService(error);
    const ctx = gsap.context(() => {
      gsap.from('.brand-panel', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.error-logo', {
        scale: 0.8,
        opacity: 0,
        delay: 0.2,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });

      gsap.from('.error-icon', {
        scale: 0,
        opacity: 0,
        delay: 0.4,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });

      gsap.from('.info-card', {
        y: 20,
        opacity: 0,
        delay: 0.5,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });

      gsap.from('.content-panel', {
        x: 50,
        opacity: 0,
        delay: 0.3,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.error-element', {
        y: 20,
        opacity: 0,
        delay: 0.6,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.from('.bg-circle', {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [error]);

  const getErrorType = () => {
    const message = error?.message?.toLowerCase() || '';

    if (message.includes('network') || message.includes('fetch')) {
      return 'network';
    }
    if (message.includes('auth') || message.includes('unauthorized')) {
      return 'auth';
    }
    if (message.includes('not found') || message.includes('404')) {
      return 'notfound';
    }
    return 'general';
  };

  const errorType = getErrorType();

  const errorConfig = {
    network: {
      icon: Wifi,
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-100',
      title: 'Connection Problem',
      description:
        'Unable to connect to the server. Please check your internet connection and try again.',
    },
    auth: {
      icon: Shield,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-100',
      title: 'Authentication Error',
      description:
        'Your session may have expired. Please sign in again to continue.',
    },
    notfound: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-100',
      title: 'Resource Not Found',
      description:
        'The requested resource could not be found. It may have been moved or deleted.',
    },
    general: {
      icon: Bug,
      iconColor: 'text-indigo-500',
      iconBg: 'bg-indigo-100',
      title: 'Something Went Wrong',
      description:
        'We encountered an unexpected error. Our team has been notified and is working on a fix.',
    },
  };

  const config = errorConfig[errorType];
  const ErrorIcon = config.icon;

  return (
    <main ref={containerRef} className="flex min-h-screen overflow-hidden">
      <div className="brand-panel hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-linear-to-br from-red-900 via-red-800 to-orange-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bg-circle absolute top-20 -left-20 w-96 h-96 bg-red-500 rounded-full opacity-20 blur-3xl" />
          <div className="bg-circle absolute bottom-20 -right-20 w-[500px] h-[500px] bg-orange-500 rounded-full opacity-20 blur-3xl" />
          <div className="bg-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500 rounded-full opacity-10 blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-8 lg:p-10 xl:p-12 w-full h-full">
          <div className="error-logo shrink-0">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/skfsd-shield.svg"
                alt="SKFSD Logo"
                width={100}
                height={100}
                className="drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Oops! Error Occurred
            </h1>
            <p className="text-red-200 text-base lg:text-lg">
              Don&apos;t worry, we&apos;re here to help you get back on track
            </p>
            <p className="text-red-300 text-sm mt-2">
              OPDMS - South Kolkata First Sub Division
            </p>
          </div>
          <div className="grow flex items-center py-8">
            <div className="space-y-4 w-full">
              <div className="info-card glass rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4 text-lg">
                  What You Can Try:
                </h3>
                <ul className="space-y-3 text-sm text-red-100">
                  <li className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <span>Refresh the page or try the operation again</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wifi className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <span>Check your internet connection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <span>Return to the homepage and navigate again</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-white shrink-0 mt-0.5" />
                    <span>Contact support if the problem persists</span>
                  </li>
                </ul>
              </div>
              <div className="info-card glass rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">
                      Error Logged
                    </h4>
                    <p className="text-red-200 text-xs">
                      This error has been automatically reported to our team.
                      We&apos;ll investigate and fix it as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <div className="glass rounded-lg p-4 border border-white/10">
              <p className="text-white text-sm font-medium mb-2">
                Need immediate assistance?
              </p>
              <Link
                href="/help"
                className="text-red-200 hover:text-white transition-colors text-sm flex items-center gap-2">
                Contact Support
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="content-panel w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center bg-gray-50 p-6 lg:p-12 h-full overflow-y-auto">
        <div className="lg:hidden absolute top-6 left-6 z-20">
          <Link href="/">
            <Image src="/skfsd-logo.svg" alt="SKFSD" width={60} height={60} />
          </Link>
        </div>
        <div className="w-full max-w-md my-auto">
          <div className="lg:hidden text-center mb-8 mt-20">
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Application Error
            </h1>
            <p className="text-gray-600 text-sm">
              Something unexpected happened
            </p>
          </div>
          <div className="error-element text-center mb-6">
            <div
              className={`error-icon w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <ErrorIcon className={`w-10 h-10 ${config.iconColor}`} />
            </div>
          </div>
          <div className="error-element mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {config.title}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {config.description}
            </p>
          </div>
          {process.env.NODE_ENV === 'development' && error && (
            <div className="error-element alert alert-error mb-6">
              <div className="flex items-start gap-2">
                <Bug className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm mb-1">
                    Development Error Details:
                  </p>
                  <p className="text-xs font-mono break-all">{error.message}</p>
                  {error.digest && (
                    <p className="text-xs text-gray-600 mt-1">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="error-element space-y-3">
            <button
              onClick={reset}
              className="btn btn-primary w-full btn-lg group">
              <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </button>
            <Link
              href="/"
              className="btn btn-outline w-full btn-lg flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/help"
              className="btn btn-secondary w-full flex items-center justify-center text-sm">
              Contact Support
            </Link>
          </div>
          <div className="error-element mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Pro Tip
                </p>
                <p className="text-xs text-blue-700">
                  If you continue experiencing issues, try clearing your browser
                  cache or using a different browser.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="error-element mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link
                href="/help"
                className="hover:text-indigo-600 transition-colors">
                Help Center
              </Link>
              <span>•</span>
              <Link
                href="/status"
                className="hover:text-indigo-600 transition-colors">
                System Status
              </Link>
              <span>•</span>
              <a
                href="mailto:support@opdms.local"
                className="hover:text-indigo-600 transition-colors">
                Email Support
              </a>
            </div>
            <p className="text-center text-gray-400 text-xs mt-3">
              OPDMS Error Handler v1.0
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
