'use client';

import { Edit2, Loader2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TargetsPage() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [editModal, setEditModal] = useState({ show: false, officeId: null });
  const [formData, setFormData] = useState({
    booking: 0,
    posbOpening: 0,
    posbNet: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTargets();
  }, [year]);

  const fetchTargets = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/targets?year=${year}`);
      if (res.ok) {
        const data = await res.json();
        setTargets(data.targets);
      }
    } catch (error) {
      console.error('Failed to fetch targets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (target) => {
    setEditModal({ show: true, officeId: target.officeId });
    setFormData({
      booking: target.targets?.booking || 0,
      posbOpening: target.targets?.posbOpening || 0,
      posbNet: target.targets?.posbNet || 0,
    });
  };

  const handleNew = (officeId) => {
    setEditModal({ show: true, officeId });
    setFormData({ booking: 0, posbOpening: 0, posbNet: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/targets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officeId: editModal.officeId,
          year,
          targets: formData,
        }),
      });

      if (res.ok) {
        setEditModal({ show: false, officeId: null });
        fetchTargets();
      } else {
        alert('Failed to save target');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // We need a list of all offices to show even if they don't have targets yet.
  // For now, we'll just list existing targets.
  // Ideally, we'd fetch all offices and merge with targets, but let's keep it simple:
  // Just allow adding/editing for any office ID (manual entry for now if not in list).
  // Wait, better UX: Fetch offices and show table.
  const [offices, setOffices] = useState([]);
  useEffect(() => {
    const fetchOffices = async () => {
      const res = await fetch('/api/admin/offices');
      if (res.ok) {
        const data = await res.json();
        setOffices(data.offices);
      }
    };
    fetchOffices();
  }, []);

  // Merge offices with targets
  const officeTargets = offices.map((office) => {
    const target = targets.find((t) => t.officeId === office.id);
    return {
      ...office,
      target: target || null,
    };
  });

  if (loading && offices.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Target Management
          </h1>
          <p className="text-muted-foreground">Set financial year targets</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">FY:</span>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="select select-bordered select-sm">
            <option value={2023}>2023-2024</option>
            <option value={2024}>2024-2025</option>
            <option value={2025}>2025-2026</option>
          </select>
        </div>
      </div>

      <div className="card shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Office</th>
                <th className="text-center">Booking Target</th>
                <th className="text-center">POSB Opening Target</th>
                <th className="text-center">Net POSB Target</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {officeTargets.map((item) => (
                <tr key={item._id} className="hover:bg-base-200/50 transition">
                  {/* Office */}
                  <td className="flex flex-col items-start pl-4 pb-4">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.id}
                    </div>
                  </td>

                  {/* Booking Target */}
                  <td className="text-center font-mono">
                    ₹
                    {item.target?.targets?.booking?.toLocaleString('en-IN') ||
                      '-'}
                  </td>

                  {/* POSB Opening */}
                  <td className="text-center font-mono">
                    {item.target?.targets?.posbOpening?.toLocaleString(
                      'en-IN'
                    ) || '-'}
                  </td>

                  {/* POSB Net */}
                  <td className="text-center font-mono">
                    {item.target?.targets?.posbNet?.toLocaleString('en-IN') ||
                      '-'}
                  </td>

                  {/* Action */}
                  <td className="text-center">
                    <button
                      onClick={() =>
                        item.target
                          ? handleEdit(item.target)
                          : handleNew(item.id)
                      }
                      className="btn btn-sm btn-ghost text-primary">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-foreground">Edit Target</h2>
              <p className="text-sm text-muted-foreground">
                Financial Year {year}-{year + 1}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Booking Target (₹)</label>
                <input
                  type="number"
                  value={formData.booking}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      booking: parseInt(e.target.value),
                    })
                  }
                  className="input w-full"
                  min="0"
                />
              </div>
              <div>
                <label className="label">POSB Opening Target</label>
                <input
                  type="number"
                  value={formData.posbOpening}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      posbOpening: parseInt(e.target.value) || 0,
                    })
                  }
                  className="input w-full"
                  min="0"
                />
              </div>
              <div>
                <label className="label">Net POSB Target</label>
                <input
                  type="number"
                  value={formData.posbNet}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      posbNet: parseInt(e.target.value) || 0,
                    })
                  }
                  className="input w-full"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditModal({ show: false, officeId: null })}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary">
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Targets
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
