'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  Calculator,
  Calendar,
  CheckCircle2,
  IndianRupee,
  Loader2,
  Plus,
  Save,
  Send,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const drmBillSchema = z.object({
  serialNumber: z.number().min(1, 'Serial number required'),
  officeName: z.string().min(1, 'Office name required'),
  utilizationPeriod: z
    .object({
      fromDate: z.string().min(1, 'Start date required'),
      toDate: z.string().min(1, 'End date required'),
    })
    .refine((data) => new Date(data.toDate) >= new Date(data.fromDate), {
      message: 'End date must be after start date',
      path: ['toDate'],
    }),
  numberOfDaysUtilized: z.number().min(1, 'Must be at least 1 day'),
  hoursPerDay: z.number().min(0.5).max(24, 'Must be between 0.5 and 24 hours'),
  rate: z.number().min(0, 'Rate must be positive'),
});

const drmFormSchema = z.object({
  bills: z.array(drmBillSchema).min(1, 'At least one bill entry required'),
});

export default function DRMForm({
  initialData = null,
  onSubmit,
  onSaveDraft,
  state = 'Draft',
  officesList = [],
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(drmFormSchema),
    defaultValues: initialData || {
      bills: [
        {
          serialNumber: 1,
          officeName: '',
          utilizationPeriod: { fromDate: '', toDate: '' },
          numberOfDaysUtilized: 0,
          hoursPerDay: 8,
          rate: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bills',
  });

  const bills = watch('bills');

  // Calculate total amount
  const calculateTotal = () => {
    return bills.reduce((sum, bill) => {
      const amount =
        (bill.numberOfDaysUtilized || 0) *
        (bill.hoursPerDay || 0) *
        (bill.rate || 0);
      return sum + amount;
    }, 0);
  };

  const calculateBillAmount = (index) => {
    const bill = bills[index];
    return (
      (bill.numberOfDaysUtilized || 0) *
      (bill.hoursPerDay || 0) *
      (bill.rate || 0)
    );
  };

  const handleSaveDraft = async (data) => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      await onSaveDraft(data);
      setSuccess('Draft saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await onSubmit(data);
      setSuccess('DRM entry submitted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to submit DRM entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNewBill = () => {
    append({
      serialNumber: fields.length + 1,
      officeName: '',
      utilizationPeriod: { fromDate: '', toDate: '' },
      numberOfDaysUtilized: 0,
      hoursPerDay: 8,
      rate: 0,
    });
  };

  const isReadOnly = state === 'Finalized' || state === 'Scrutinized';

  return (
    <form className="space-y-6">
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

      {isReadOnly && (
        <div className="alert alert-info flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>
            This DRM entry is {state.toLowerCase()} and cannot be edited
          </span>
        </div>
      )}

      {/* Bill Entries */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Bill Entry #{index + 1}
                </h3>
                {!isReadOnly && fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Serial Number */}
                <div>
                  <label className="label label-required">Serial Number</label>
                  <input
                    type="number"
                    {...register(`bills.${index}.serialNumber`, {
                      valueAsNumber: true,
                    })}
                    className="input"
                    disabled={isReadOnly}
                  />
                  {errors.bills?.[index]?.serialNumber && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.bills[index].serialNumber.message}
                    </p>
                  )}
                </div>

                {/* Office Name */}
                <div className="md:col-span-2">
                  <label className="label label-required">Office Name</label>
                  {officesList.length > 0 ? (
                    <select
                      {...register(`bills.${index}.officeName`)}
                      className="select"
                      disabled={isReadOnly}>
                      <option value="">Select Office</option>
                      {officesList.map((office) => (
                        <option key={office.id} value={office.name}>
                          {office.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      {...register(`bills.${index}.officeName`)}
                      className="input"
                      placeholder="Enter office name"
                      disabled={isReadOnly}
                    />
                  )}
                  {errors.bills?.[index]?.officeName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.bills[index].officeName.message}
                    </p>
                  )}
                </div>

                {/* From Date */}
                <div>
                  <label className="label label-required">From Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      {...register(`bills.${index}.utilizationPeriod.fromDate`)}
                      className="input pl-10"
                      disabled={isReadOnly}
                    />
                  </div>
                  {errors.bills?.[index]?.utilizationPeriod?.fromDate && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.bills[index].utilizationPeriod.fromDate.message}
                    </p>
                  )}
                </div>

                {/* To Date */}
                <div>
                  <label className="label label-required">To Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      {...register(`bills.${index}.utilizationPeriod.toDate`)}
                      className="input pl-10"
                      disabled={isReadOnly}
                    />
                  </div>
                  {errors.bills?.[index]?.utilizationPeriod?.toDate && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.bills[index].utilizationPeriod.toDate.message}
                    </p>
                  )}
                </div>

                {/* Days Utilized */}
                <div>
                  <label className="label label-required">Days Utilized</label>
                  <input
                    type="number"
                    {...register(`bills.${index}.numberOfDaysUtilized`, {
                      valueAsNumber: true,
                    })}
                    className="input"
                    min="1"
                    disabled={isReadOnly}
                  />
                  {errors.bills?.[index]?.numberOfDaysUtilized && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.bills[index].numberOfDaysUtilized.message}
                    </p>
                  )}
                </div>

                {/* Hours Per Day */}
                <div>
                  <label className="label label-required">Hours/Day</label>
                  <input
                    type="number"
                    step="0.5"
                    {...register(`bills.${index}.hoursPerDay`, {
                      valueAsNumber: true,
                    })}
                    className="input"
                    min="0.5"
                    max="24"
                    disabled={isReadOnly}
                  />
                  {errors.bills?.[index]?.hoursPerDay && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.bills[index].hoursPerDay.message}
                    </p>
                  )}
                </div>

                {/* Rate */}
                <div>
                  <label className="label label-required">Rate (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IndianRupee className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      {...register(`bills.${index}.rate`, {
                        valueAsNumber: true,
                      })}
                      className="input pl-10"
                      min="0"
                      disabled={isReadOnly}
                    />
                  </div>
                  {errors.bills?.[index]?.rate && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.bills[index].rate.message}
                    </p>
                  )}
                </div>

                {/* Calculated Amount */}
                <div className="md:col-span-2">
                  <label className="label">Calculated Amount</label>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    <span className="text-2xl font-bold text-indigo-900">
                      ₹{' '}
                      {calculateBillAmount(index).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Bill Button */}
      {!isReadOnly && (
        <button
          type="button"
          onClick={addNewBill}
          className="btn btn-outline w-full">
          <Plus className="w-5 h-5 mr-2" />
          Add Another Bill Entry
        </button>
      )}

      {/* Total Amount */}
      <div className="card bg-indigo-50 border-indigo-200">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-700 font-medium">
                Total Amount
              </p>
              <p className="text-xs text-indigo-600 mt-1">
                {fields.length} bill entr{fields.length === 1 ? 'y' : 'ies'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-900">
                ₹{' '}
                {calculateTotal().toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {!isReadOnly && (
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={handleSubmit(handleSaveDraft)}
            disabled={isSaving || !isDirty}
            className="btn btn-secondary">
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save as Draft
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting || state !== 'Draft'}
            className="btn btn-primary">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit for Review
              </>
            )}
          </button>
        </div>
      )}
    </form>
  );
}
