'use client';

import { Building2, Calendar, Check, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DRMApprovalPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState({ show: false, id: null });
  const [rejectReason, setRejectReason] = useState('');
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchPendingEntries();
  }, []);

  const fetchPendingEntries = async () => {
    try {
      // Fetch only submitted entries
      const res = await fetch('/api/drm?status=Submitted');
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
      }
    } catch (error) {
      console.error('Failed to fetch pending DRM:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!confirm('Are you sure you want to approve this bill?')) return;
    setProcessing(id);
    try {
      const res = await fetch(`/api/drm/${id}/approve`, { method: 'POST' });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e._id !== id));
      } else {
        alert('Failed to approve');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async () => {
    if (!rejectReason) return;
    setProcessing(rejectModal.id);
    try {
      const res = await fetch(`/api/drm/${rejectModal.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectReason }),
      });

      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e._id !== rejectModal.id));
        setRejectModal({ show: false, id: null });
        setRejectReason('');
      } else {
        alert('Failed to reject');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">DRM Approval</h1>
        <p className="text-muted-foreground">
          Review and approve pending bills
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Office</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-muted-foreground">
                    <Check className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No pending approvals</p>
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{entry.officeName}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {entry.serialNumber}
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
                      <span className="text-sm text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/drm/${entry._id}`}
                          className="btn btn-sm btn-ghost">
                          View
                        </Link>
                        <button
                          onClick={() => handleApprove(entry._id)}
                          disabled={processing === entry._id}
                          className="btn btn-sm btn-success text-white">
                          {processing === entry._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            setRejectModal({ show: true, id: entry._id })
                          }
                          disabled={processing === entry._id}
                          className="btn btn-sm btn-error text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-foreground">Reject Bill</h2>
              <button
                onClick={() => {
                  setRejectModal({ show: false, id: null });
                  setRejectReason('');
                }}
                className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Please provide a reason for rejecting this bill.
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="textarea w-full"
                placeholder="Enter rejection reason..."
                rows={4}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setRejectModal({ show: false, id: null });
                    setRejectReason('');
                  }}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason || processing === rejectModal.id}
                  className="btn btn-error text-white">
                  {processing === rejectModal.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Reject Bill'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
