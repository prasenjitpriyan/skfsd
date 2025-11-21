'use client';

import { Building2, Loader2, MapPin, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfficesPage() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: 'Standard',
    location: '',
    deliveryCenterId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    try {
      const res = await fetch('/api/admin/offices');
      if (res.ok) {
        const data = await res.json();
        setOffices(data.offices);
      }
    } catch (error) {
      console.error('Failed to fetch offices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/offices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({
          id: '',
          name: '',
          type: 'Standard',
          location: '',
          deliveryCenterId: '',
        });
        fetchOffices(); // Refresh list
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create office');
      }
    } catch (error) {
      console.error('Create office error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Office Management
          </h1>
          <p className="text-gray-600">
            Manage post offices and delivery centers
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Office
        </button>
      </div>

      {/* Office List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office) => (
                <tr key={office._id}>
                  <td>
                    <span className="font-mono text-sm">{office.id}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {office.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        office.type === 'Delivery'
                          ? 'badge-warning'
                          : office.type === 'Admin'
                          ? 'badge-error'
                          : 'badge-info'
                      }`}>
                      {office.type}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {office.location || '-'}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        office.active ? 'badge-success' : 'badge-ghost'
                      }`}>
                      {office.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Office Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Office
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Office ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="e.g., std-1"
                  required
                />
              </div>
              <div>
                <label className="label">Office Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input w-full">
                  <option value="Standard">Standard Office</option>
                  <option value="Delivery">Delivery Center</option>
                  <option value="Admin">Admin Office</option>
                </select>
              </div>
              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              {formData.type === 'Standard' && (
                <div>
                  <label className="label">Parent Delivery Center ID</label>
                  <input
                    type="text"
                    name="deliveryCenterId"
                    value={formData.deliveryCenterId}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Optional"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
                    'Create Office'
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
