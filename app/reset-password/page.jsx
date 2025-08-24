'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedPasswordResetWizard() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request-otp', email }),
      });
      const data = await res.json();
      setMsg(data.message);
      if (res.ok) setStep(2);
    } catch (err) {
      setMsg('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-otp', email, otp }),
      });
      const data = await res.json();
      setMsg(data.message);
      if (res.ok) setStep(3);
    } catch (err) {
      setMsg('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMsg('');
    if (password !== confirm) return setMsg('Passwords do not match');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset-password',
          email,
          otp,
          newPassword: password,
        }),
      });
      const data = await res.json();
      setMsg(data.message);

      if (res.ok) {
        if (data.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (data.role === 'office') {
          router.push('/office/dashboard');
        } else if (data.role === 'delivery') {
          router.push('/delivery/dashboard');
        } else {
          router.push('/login');
        }
      }
    } catch (err) {
      setMsg('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white dark:bg-gray-800">
      {/* Step Indicators */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 text-center">
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white ${
                step >= s ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
              {s}
            </div>
            <p className="text-xs mt-1">
              {s === 1 ? 'Email' : s === 2 ? 'OTP' : 'New Password'}
            </p>
          </div>
        ))}
      </div>

      {/* Alert Message */}
      {msg && (
        <div className="mb-4 p-2 rounded bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100">
          {msg}
        </div>
      )}

      {/* Animated Step Forms */}
      <AnimatePresence exitBeforeEnter>
        {step === 1 && (
          <motion.form
            key="step1"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleRequestOTP}
            className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 rounded disabled:opacity-50">
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleVerifyOTP}
            className="flex flex-col gap-3">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter OTP"
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 rounded disabled:opacity-50">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            key="step3"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleResetPassword}
            className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 rounded disabled:opacity-50">
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
