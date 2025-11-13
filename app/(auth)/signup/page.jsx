'use client';

import { gsap } from 'gsap';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { allOffices } from '../../data/offices';

export default function SignupPage() {
  const containerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    office: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.brand-panel', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.signup-logo', {
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
        stagger: 0.08,
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
    setSuccess('');
    if (
      !formData.name ||
      !formData.office ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }
    console.log('Signup attempt:', formData);
    setSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
          <div className="signup-logo shrink-0">
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
              Join OPDMS Today
            </h1>
            <p className="text-indigo-200 text-base lg:text-lg">
              Create your account and start managing office performance
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
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Instant Access
                    </h3>
                    <p className="text-indigo-200 text-sm">
                      Get immediate access to your personalized dashboard
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-card glass rounded-xl p-4 border border-white/10 hover:bg-white/5 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Track Performance
                    </h3>
                    <p className="text-indigo-200 text-sm">
                      Monitor daily metrics and generate comprehensive reports
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-card glass rounded-xl p-4 border border-white/10 hover:bg-white/5 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Secure Platform
                    </h3>
                    <p className="text-indigo-200 text-sm">
                      Your data is protected with enterprise-grade security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <div className="glass rounded-lg p-4 border border-white/10">
              <p className="text-white text-sm font-medium mb-2">
                Already have an account?
              </p>
              <Link
                href="/login"
                className="text-indigo-200 hover:text-white transition-colors text-sm flex items-center gap-2">
                Sign in here
                <ArrowRight className="w-4 h-4" />
              </Link>
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
              Create Account
            </h1>
            <p className="text-gray-600 text-sm">
              Join OPDMS - South Kolkata First Sub Division
            </p>
          </div>
          <div className="form-element mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
            <p className="text-gray-600">Create your account to get started</p>
          </div>
          {error && (
            <div className="form-element alert alert-error mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="form-element alert alert-success mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-element">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div className="form-element">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Office
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  required>
                  <option value="">Select your office</option>
                  {allOffices.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Create a password (min. 8 characters)"
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
            <div className="form-element">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Re-enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-element">
              <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <span>
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-indigo-600 hover:underline font-medium">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-indigo-600 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
            <div className="form-element pt-2">
              <button
                type="submit"
                className="btn btn-primary w-full btn-lg group"
                disabled={success}>
                {success ? 'Redirecting...' : 'Create Account'}
                {!success && (
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
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
              Sign up with Google
            </button>
          </div>
          <div className="form-element text-center mt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-indigo-600 font-semibold hover:underline">
                Sign in here
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
