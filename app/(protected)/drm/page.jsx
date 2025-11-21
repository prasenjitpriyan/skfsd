'use client';

import { Building2, Calendar, FileText, Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DRMPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/drm');
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
      }
    } catch (error) {
      console.error('Failed to fetch DRM entries:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DRM Management</h1>
          <p className="text-gray-600">
            Manage Delivery Revenue Management bills
          </p>
        </div>
        <Link href="/drm/new" className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          New Bill
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Office</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No DRM entries found</p>
                    <Link
                      href="/drm/new"
                      className="text-indigo-600 hover:underline mt-2 inline-block">
                      Create your first bill
                    </Link>
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{entry.officeName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>
                          {new Date(entry.year, entry.month - 1).toLocaleString(
                            'default',
                            { month: 'short', year: 'numeric' }
                          )}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono font-medium">
                        ₹{entry.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          entry.status === 'Draft'
                            ? 'badge-info'
                            : entry.status === 'Submitted'
                            ? 'badge-warning'
                            : entry.status === 'Approved'
                            ? 'badge-success'
                            : 'badge-error'
                        }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/drm/${entry._id}`}
                        className="btn btn-sm btn-ghost">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
