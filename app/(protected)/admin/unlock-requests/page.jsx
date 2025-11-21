'use client';

import { Check, Loader2, Lock, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UnlockRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState({ show: false, id: null });
  const [rejectReason, setRejectReason] = useState('');
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/admin/unlock-requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!confirm('Are you sure you want to unlock this date?')) return;
    setProcessing(id);
    try {
      const res = await fetch(`/api/admin/unlock-requests/${id}/approve`, {
        method: 'POST',
      });
      if (res.ok) {
        fetchRequests(); // Refresh list to update status
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
      const res = await fetch(
        `/api/admin/unlock-requests/${rejectModal.id}/reject`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: rejectReason }),
        }
      );

      if (res.ok) {
        setRejectModal({ show: false, id: null });
        setRejectReason('');
        fetchRequests();
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
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Unlock Requests</h1>
        <p className="text-gray-600">Manage requests to edit locked metrics</p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Office ID</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-500">
                    <Lock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No unlock requests found</p>
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id}>
                    <td className="font-medium">{req.officeId}</td>
                    <td>{new Date(req.date).toLocaleDateString()}</td>
                    <td className="max-w-xs truncate" title={req.reason}>
                      {req.reason}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          req.status === 'Approved'
                            ? 'badge-success'
                            : req.status === 'Rejected'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === 'Pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(req._id)}
                            disabled={processing === req._id}
                            className="btn btn-sm btn-success text-white">
                            {processing === req._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              setRejectModal({ show: true, id: req._id })
                            }
                            disabled={processing === req._id}
                            className="btn btn-sm btn-error text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
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
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Reject Request
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Please provide a reason for rejection.
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
                    'Reject'
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
