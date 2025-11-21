'use client';

import { gsap } from 'gsap';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  Shield,
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function LoginPage() {
  const containerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.brand-panel', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.login-logo', {
        scale: 0.8,
        opacity: 0,
        delay: 0.2,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });

      gsap.from('.feature-card', {
        y: 20,
        opacity: 0,
        delay: 0.4,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });

      gsap.from('.form-panel', {
        x: 50,
        opacity: 0,
        delay: 0.3,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.form-element', {
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <main ref={containerRef} className="flex min-h-screen overflow-hidden">
      <div className="brand-panel hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-linear-to-br from-indigo-900 via-indigo-800 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bg-circle absolute top-20 -left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl" />
          <div className="bg-circle absolute bottom-20 -right-20 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-20 blur-3xl" />
          <div className="bg-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl" />
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
          <div className="login-logo shrink-0">
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
              Welcome to OPDMS
            </h1>
            <p className="text-indigo-200 text-base lg:text-lg">
              Office Performance & Delivery Management System
            </p>
            <p className="text-indigo-300 text-sm mt-2">
              South Kolkata First Sub Division
            </p>
          </div>
          <div className="grow flex items-center py-8">
            <div className="space-y-4 w-full">
              <div className="feature-card glass rounded-xl p-4 border border-white/10 hover:bg-white/5 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Real-time Analytics
                    </h3>
                    <p className="text-indigo-200 text-sm">
                      Track daily metrics and performance across 45 offices
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-card glass rounded-xl p-4 border border-white/10 hover:bg-white/5 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      DRM Management
                    </h3>
                    <p className="text-indigo-200 text-sm">
                      Streamlined workflow for delivery revenue tracking
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-card glass rounded-xl p-4 border border-white/10 hover:bg-white/5 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Secure & Auditable
                    </h3>
                    <p className="text-indigo-200 text-sm">
                      Enterprise-grade security with comprehensive audit logs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  45
                </div>
                <div className="text-xs text-indigo-200">Offices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  100%
                </div>
                <div className="text-xs text-indigo-200">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  24/7
                </div>
                <div className="text-xs text-indigo-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-panel w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center bg-gray-50 p-6 lg:p-12 h-full overflow-y-auto">
        <div className="lg:hidden absolute top-6 left-6 z-20">
          <Link href="/">
            <Image src="/skfsd-logo.svg" alt="SKFSD" width={60} height={60} />
          </Link>
        </div>
        <div className="w-full max-w-md my-auto">
          <div className="lg:hidden text-center mb-8 mt-20">
            <h1 className="text-2xl font-bold text-indigo-900 mb-2">
              OPDMS Login
            </h1>
            <p className="text-gray-600 text-sm">
              South Kolkata First Sub Division
            </p>
          </div>
          <div className="form-element mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">
              Enter your credentials to access your dashboard
            </p>
          </div>
          {error && (
            <div className="form-element alert alert-error mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-element">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div className="form-element">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-element flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="form-element">
              <button
                type="submit"
                className="btn btn-primary w-full btn-lg group">
                Sign In
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
          <div className="form-element flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
          <div className="form-element">
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="btn btn-outline w-full border-gray-300 text-gray-700 hover:bg-gray-50">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
          <div className="form-element text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-indigo-600 font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
          <div className="form-element mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                className="hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                href="/help"
                className="hover:text-indigo-600 transition-colors">
                Help & Support
              </Link>
            </div>
            <p className="text-center text-gray-400 text-xs mt-3">
              © {new Date().getFullYear()} South Kolkata First Sub Division
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
