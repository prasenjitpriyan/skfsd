'use client';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMsg('Passwords do not match');

    // Call API to reset password here...
    setMsg('Password updated successfully');
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />
      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm Password"
      />
      <button type="submit">Reset Password</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
