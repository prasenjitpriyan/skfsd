'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/app/components/ui/sheet';
import { Building2, Loader2, MapPin, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfficesPage() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: 'Standard',
    location: '',
    pin: '',
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

  const handleEditClick = (office) => {
    setSelectedOffice(office);
    setFormData({
      id: office.id,
      name: office.name,
      type: office.type,
      location: office.location || '',
      pin: office.pin || '',
      deliveryCenterId: office.deliveryCenterId || '',
    });
    setShowEditSheet(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Use the custom ID in the URL as per the API implementation
      const res = await fetch(`/api/admin/offices/${formData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowEditSheet(false);
        fetchOffices();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update office');
      }
    } catch (error) {
      console.error('Update office error:', error);
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
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Office Management
          </h1>
          <p className="text-muted-foreground">
            Manage post offices and delivery centers
          </p>
        </div>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((office) => (
                <tr key={office._id}>
                  <td>
                    <span className="font-mono text-sm flex justify-center">
                      {office.id}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
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
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {office.location || '-'}
                      {office.pin && (
                        <span className="text-xs text-muted-foreground">
                          ({office.pin})
                        </span>
                      )}
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
                  <td>
                    <button
                      onClick={() => handleEditClick(office)}
                      className="p-2 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-primary"
                      title="Edit Office">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Office Sheet */}
      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Office</SheetTitle>
            <SheetDescription>
              Update office details and PIN code.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Office ID
              </label>
              <input
                type="text"
                value={formData.id}
                className="input w-full bg-muted"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Office Name
              </label>
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Type
              </label>
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                PIN Code
              </label>
              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g., 700001"
              />
            </div>
            {formData.type === 'Standard' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Parent Delivery Center ID
                </label>
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

            <SheetFooter className="pt-4">
              <button
                type="button"
                onClick={() => setShowEditSheet(false)}
                className="btn btn-ghost mr-2">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary">
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Update Office'
                )}
              </button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
