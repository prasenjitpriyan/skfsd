'use client';

import { gsap } from 'gsap';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Key,
  Lock,
  Shield,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function ResetPasswordPage() {
  const containerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // ✅ FIX: Calculate password strength using useMemo instead of useEffect
  const passwordStrength = useMemo(() => {
    const password = formData.password;
    let strength = 0;

    if (!password) return 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return Math.min(strength, 4);
  }, [formData.password]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.brand-panel', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.reset-logo', {
        scale: 0.8,
        opacity: 0,
        delay: 0.2,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });

      gsap.from('.info-card', {
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

    if (!formData.password || !formData.confirmPassword) {
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

    // TODO: Add actual password reset logic
    setTimeout(() => {
      console.log('Password reset successful');
      setSuccess(true);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ FIX: Use helper functions instead of inline logic
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <main ref={containerRef} className="flex min-h-screen overflow-hidden">
      {/* LEFT PANEL - BRANDING */}
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
          <div className="reset-logo shrink-0">
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
              Create New Password
            </h1>
            <p className="text-indigo-200 text-base lg:text-lg">
              Set a strong password to secure your OPDMS account
            </p>
            <p className="text-indigo-300 text-sm mt-2">
              South Kolkata First Sub Division
            </p>
          </div>

          <div className="grow flex items-center py-8">
            <div className="space-y-4 w-full">
              <div className="info-card glass rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Password Requirements
                    </h3>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-indigo-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>At least 8 characters long</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Mix of uppercase & lowercase letters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Include at least one number</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Use special characters (@, #, $, etc.)</span>
                  </li>
                </ul>
              </div>

              <div className="info-card glass rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">
                      Security Tip
                    </h4>
                    <p className="text-indigo-200 text-xs">
                      Never share your password or use the same password across
                      multiple sites
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="glass rounded-lg p-4 border border-white/10">
              <p className="text-white text-sm font-medium mb-2">Need help?</p>
              <Link
                href="/help"
                className="text-indigo-200 hover:text-white transition-colors text-sm flex items-center gap-2">
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - FORM */}
      <div className="form-panel w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center bg-gray-50 p-6 lg:p-12 h-full overflow-y-auto">
        <div className="lg:hidden absolute top-6 left-6 z-20">
          <Link href="/">
            <Image src="/skfsd-logo.svg" alt="SKFSD" width={60} height={60} />
          </Link>
        </div>

        <div className="w-full max-w-md my-auto">
          <div className="lg:hidden text-center mb-8 mt-20">
            <h1 className="text-2xl font-bold text-indigo-900 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm">
              Create a new secure password
            </p>
          </div>

          {!success ? (
            <>
              <div className="form-element mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Reset Password
                </h2>
                <p className="text-gray-600">
                  Choose a strong password for your account
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
                    New Password
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
                      placeholder="Enter new password"
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

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              i < passwordStrength
                                ? getStrengthColor()
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Password strength:{' '}
                        <span className="font-semibold">
                          {getStrengthText()}
                        </span>
                      </p>
                    </div>
                  )}
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
                      placeholder="Re-enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-element pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-full btn-lg group">
                    Reset Password
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              <div className="form-element mt-6">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>
            </>
          ) : (
            <div className="form-element text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Password Reset Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Your password has been updated successfully. You can now sign in
                with your new password.
              </p>
              <Link href="/login" className="btn btn-primary w-full btn-lg">
                Continue to Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          )}

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
