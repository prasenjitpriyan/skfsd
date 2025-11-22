'use client';

import MetricsForm from '@/app/components/forms/MetricsForm';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewMetricPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [office, setOffice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    async function fetchOffice() {
      if (session?.user?.officeIds?.length > 0) {
        try {
          // Fetch office details to get the type
          // We'll use the first office for now as per current design
          const officeId = session.user.officeIds[0];

          // Since we don't have a dedicated public API for fetching single office details
          // without admin rights easily available yet, we might need to rely on
          // the session or a new endpoint.
          // However, for now, let's assume we can get it from a server action or
          // just pass the ID and let the form handle it if we had that data.
          // But MetricsForm needs officeType to render the correct schema.

          // Let's fetch from a new simple endpoint or existing one.
          // Actually, let's just use the /api/auth/session or similar if it had it.
          // But better, let's create a simple server-side data fetching component
          // or just fetch from the seed data if it was client side (but it's not).

          // Workaround: We will fetch from a new endpoint /api/me/office
          const res = await fetch(`/api/admin/offices/${officeId}`);
          // Note: The admin route might be protected.
          // Let's check if we can access it. If not, we need a user-accessible route.

          if (res.ok) {
            const data = await res.json();
            setOffice(data.office);
          } else {
            // Fallback or error
            console.error('Failed to fetch office');
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    if (status === 'authenticated') {
      fetchOffice();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          data,
          officeId: office.id,
          officeType: office.type,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to submit metrics');
      }

      router.push('/metrics');
      router.refresh();
    } catch (error) {
      throw error; // Re-throw for the form to handle
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!office) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Metrics Submitted Successfully!
        </h2>
        <p className="text-muted-foreground mt-2">
          Please contact your administrator to assign an office to your account.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Submit Daily Metrics
        </h1>
        <p className="text-muted-foreground">
          {office.name} ({office.type})
        </p>
        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input max-w-xs"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <MetricsForm
        officeType={office.type}
        onSubmit={handleSubmit}
        autoSave={true}
      />
    </div>
  );
}
