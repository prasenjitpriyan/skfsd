'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Loader2,
  MapPin,
  Save,
  Truck,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const officeSchema = z.object({
  id: z
    .string()
    .regex(/^(std|del|adm)-\d+$/, 'Invalid ID format (e.g., std-1, del-1)'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  type: z.enum(['Standard', 'Delivery', 'Admin']),
  location: z.string().optional(),
  deliveryCenterId: z.string().optional(),
  active: z.boolean(),
});

export default function OfficeForm({
  initialData = null,
  onSubmit,
  deliveryCenters = [],
  isEdit = false,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm({
    resolver: zodResolver(officeSchema),
    defaultValues: initialData || {
      id: '',
      name: '',
      type: 'Standard',
      location: '',
      deliveryCenterId: '',
      active: true,
    },
  });

  const officeType = watch('type');

  const handleFormSubmit = async (data) => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      await onSubmit(data);
      setSuccess(`Office ${isEdit ? 'updated' : 'created'} successfully!`);

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save office');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Alerts */}
      {error && (
        <div className="alert alert-error flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {isEdit ? 'Edit Office' : 'New Office'}
            </h3>
          </div>
        </div>
        <div className="card-body space-y-4">
          {/* Office ID */}
          <div>
            <label className="label label-required">Office ID</label>
            <input
              type="text"
              {...register('id')}
              className="input"
              placeholder="e.g., std-41, del-5"
              disabled={isEdit}
            />
            {errors.id && (
              <p className="text-xs text-red-600 mt-1">{errors.id.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Format: std-X (Standard), del-X (Delivery), adm-X (Admin)
            </p>
          </div>

          {/* Office Name */}
          <div>
            <label className="label label-required">Office Name</label>
            <input
              type="text"
              {...register('name')}
              className="input"
              placeholder="e.g., Ballygunge"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Office Type */}
          <div>
            <label className="label label-required">Office Type</label>
            <select {...register('type')} className="select">
              <option value="Standard">Standard Office</option>
              <option value="Delivery">Delivery Center</option>
              <option value="Admin">Admin Office</option>
            </select>
            {errors.type && (
              <p className="text-xs text-red-600 mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                {...register('location')}
                className="input pl-10"
                placeholder="e.g., South Kolkata, West Bengal"
              />
            </div>
            {errors.location && (
              <p className="text-xs text-red-600 mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Delivery Center Assignment (for Standard offices only) */}
          {officeType === 'Standard' && deliveryCenters.length > 0 && (
            <div>
              <label className="label">Delivery Center</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Truck className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register('deliveryCenterId')}
                  className="select pl-10">
                  <option value="">None (Direct Management)</option>
                  {deliveryCenters.map((dc) => (
                    <option key={dc.id} value={dc.id}>
                      {dc.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Assign this office to a delivery center for supervision
              </p>
            </div>
          )}

          {/* Active Status */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('active')}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Office is Active
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Inactive offices will not appear in dropdowns or reports
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn btn-secondary">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving || (!isDirty && isEdit)}
          className="btn btn-primary">
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              {isEdit ? 'Update Office' : 'Create Office'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
