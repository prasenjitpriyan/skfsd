// app/choose-office/page.jsx
'use client';

import { allOffices } from '@/data/offices';
import { useState } from 'react';

export default function ChooseOfficePage() {
  const [office, setOffice] = useState('');

  const saveOffice = async () => {
    await fetch('/api/user/assign-office', {
      method: 'POST',
      body: JSON.stringify({ office }),
    });

    window.location.href = '/dashboard';
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Select Your Office</h1>

      <select
        className="border p-2 w-full"
        value={office}
        onChange={(e) => setOffice(e.target.value)}>
        <option value="">Select Office</option>
        {allOffices.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>

      <button
        className="btn btn-primary mt-4 w-full"
        disabled={!office}
        onClick={saveOffice}>
        Continue
      </button>
    </div>
  );
}
