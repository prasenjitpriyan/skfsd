'use client';

import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewDRMPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [office, setOffice] = useState(null);

  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    serialNumber: '',
    utilizationPeriod: {
      from: '',
      to: '',
    },
    numberOfDaysUtilized: 0,
    hoursPerDay: 8,
    rate: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    async function fetchOffice() {
      if (session?.user?.officeIds?.length > 0) {
        try {
          const officeId = session.user.officeIds[0];
          const res = await fetch(`/api/admin/offices/${officeId}`);
          if (res.ok) {
            const data = await res.json();
            setOffice(data.office);
          }
        } catch (e) {
          console.error('Failed to fetch office:', e);
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

  // Auto-calculate total amount
  useEffect(() => {
    const days = parseFloat(formData.numberOfDaysUtilized) || 0;
    const hours = parseFloat(formData.hoursPerDay) || 0;
    const rate = parseFloat(formData.rate) || 0;

    // Calculation logic: Total = Days * Hours * Rate
    // Or is it Days * Rate (if rate is per day)?
    // Usually DRM is hourly or daily. Let's assume Rate is PER HOUR based on the fields.
    // If Rate is per day, then hoursPerDay is just informational?
    // Let's assume Rate is PER HOUR for now as per standard practices,
    // OR Rate is PER DAY.
    // Let's look at the fields: "hoursPerDay".
    // Let's assume Rate is PER HOUR.
    // Total = Days * Hours * Rate

    const total = days * hours * rate;
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  }, [formData.numberOfDaysUtilized, formData.hoursPerDay, formData.rate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!office) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/drm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          officeId: office.id,
          officeName: office.name,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit');
      }

      router.push('/drm');
      router.refresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!office) {
    return (
      <div className="p-6 text-center">
        <p>No office assigned.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/drm"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to DRM List
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Create DRM Bill</h1>
        <p className="text-muted-foreground">
          {office.name} ({office.type})
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Month/Year */}
            <div>
              <label className="label">Month</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="input w-full">
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', {
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="input w-full"
              />
            </div>

            {/* Serial Number */}
            <div className="md:col-span-2">
              <label className="label">Bill Serial Number</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="e.g., DRM/2025/11/001"
                className="input w-full"
                required
              />
            </div>

            {/* Utilization Period */}
            <div>
              <label className="label">From Date</label>
              <input
                type="date"
                name="utilizationPeriod.from"
                value={formData.utilizationPeriod.from}
                onChange={handleChange}
                className="input w-full"
                required
              />
            </div>
            <div>
              <label className="label">To Date</label>
              <input
                type="date"
                name="utilizationPeriod.to"
                value={formData.utilizationPeriod.to}
                onChange={handleChange}
                className="input w-full"
                required
              />
            </div>

            {/* Calculation Fields */}
            <div>
              <label className="label">Days Utilized</label>
              <input
                type="number"
                name="numberOfDaysUtilized"
                value={formData.numberOfDaysUtilized}
                onChange={handleChange}
                className="input w-full"
                min="0"
                required
              />
            </div>
            <div>
              <label className="label">Hours Per Day</label>
              <input
                type="number"
                name="hoursPerDay"
                value={formData.hoursPerDay}
                onChange={handleChange}
                className="input w-full"
                min="0"
                required
              />
            </div>
            <div>
              <label className="label">Rate (per Hour)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  ₹
                </span>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  className="input w-full pl-8"
                  min="0"
                  required
                />
              </div>
            </div>
            <div>
              <label className="label">Total Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.totalAmount}
                  readOnly
                  className="input w-full pl-8 bg-muted font-bold text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary min-w-[120px]">
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Draft
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
