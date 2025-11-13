'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Fingerprint,
  Loader2,
  Package,
  Save,
  Shield,
  Stamp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validation schema for Standard Office
const standardOfficeSchema = z.object({
  posb: z.object({
    totalPosbAccountOpened: z.number().min(0, 'Must be 0 or greater'),
    totalPosbAccountClosed: z.number().min(0, 'Must be 0 or greater'),
  }),
  booking: z.object({
    numberOfArticlesBooked: z.number().min(0, 'Must be 0 or greater'),
    collectionOfAmount: z.number().min(0, 'Must be 0 or greater'),
  }),
  ippb: z.object({
    ippbAccountOpen: z.number().min(0, 'Must be 0 or greater'),
    ippbPremiumAccountOpen: z.number().min(0, 'Must be 0 or greater'),
    giInsurance: z.number().min(0, 'Must be 0 or greater'),
  }),
  pliRpli: z.object({
    numberOfNewPolicyIndexed: z.number().min(0, 'Must be 0 or greater'),
    sumAssured: z.number().min(0, 'Must be 0 or greater'),
    amountOfFirstYearPremium: z.number().min(0, 'Must be 0 or greater'),
    amountOfRenewalPremium: z.number().min(0, 'Must be 0 or greater'),
  }),
  aadhaar: z.object({
    numberOfTotalTransaction: z.number().min(0, 'Must be 0 or greater'),
    collectionOfAmount: z.number().min(0, 'Must be 0 or greater'),
  }),
  philately: z.object({
    myStampProcurement: z.number().min(0, 'Must be 0 or greater'),
  }),
});

// Validation schema for Delivery Center
const deliveryCenterSchema = z.object({
  delivery: z.object({
    totalNumberOfArticlesIssuedToBeats: z
      .number()
      .min(0, 'Must be 0 or greater'),
    totalNumberOfArticleDelivered: z.number().min(0, 'Must be 0 or greater'),
  }),
});

export default function MetricsForm({
  officeType = 'Standard',
  initialData = null,
  onSubmit,
  isLocked = false,
  autoSave = false,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const schema =
    officeType === 'Delivery' ? deliveryCenterSchema : standardOfficeSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      initialData ||
      (officeType === 'Delivery'
        ? {
            delivery: {
              totalNumberOfArticlesIssuedToBeats: 0,
              totalNumberOfArticleDelivered: 0,
            },
          }
        : {
            posb: { totalPosbAccountOpened: 0, totalPosbAccountClosed: 0 },
            booking: { numberOfArticlesBooked: 0, collectionOfAmount: 0 },
            ippb: {
              ippbAccountOpen: 0,
              ippbPremiumAccountOpen: 0,
              giInsurance: 0,
            },
            pliRpli: {
              numberOfNewPolicyIndexed: 0,
              sumAssured: 0,
              amountOfFirstYearPremium: 0,
              amountOfRenewalPremium: 0,
            },
            aadhaar: { numberOfTotalTransaction: 0, collectionOfAmount: 0 },
            philately: { myStampProcurement: 0 },
          }),
  });

  useState(() => {
    if (!autoSave || isLocked) return;

    const subscription = watch(() => {
      const timer = setTimeout(() => {
        if (isDirty) {
          handleSubmit(handleFormSubmit)();
        }
      }, 30000);
      return () => clearTimeout(timer);
    });

    return () => subscription.unsubscribe();
  }, [autoSave, isDirty, isLocked, watch]);

  const handleFormSubmit = async (data) => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      await onSubmit(data);
      setSuccess('Metrics saved successfully!');
      setLastSaved(new Date());
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save metrics');
    } finally {
      setIsSaving(false);
    }
  };

  if (officeType === 'Delivery') {
    return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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

        {isLocked && (
          <div className="alert alert-warning flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>This metric is locked and cannot be edited</span>
          </div>
        )}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Delivery Metrics
              </h3>
            </div>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label label-required">
                  Total Articles Issued to Beats
                </label>
                <input
                  type="number"
                  {...register('delivery.totalNumberOfArticlesIssuedToBeats', {
                    valueAsNumber: true,
                  })}
                  className="input"
                  disabled={isLocked}
                  min="0"
                />
                {errors.delivery?.totalNumberOfArticlesIssuedToBeats && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.delivery.totalNumberOfArticlesIssuedToBeats.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label label-required">
                  Total Articles Delivered
                </label>
                <input
                  type="number"
                  {...register('delivery.totalNumberOfArticleDelivered', {
                    valueAsNumber: true,
                  })}
                  className="input"
                  disabled={isLocked}
                  min="0"
                />
                {errors.delivery?.totalNumberOfArticleDelivered && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.delivery.totalNumberOfArticleDelivered.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {!isLocked && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {lastSaved && (
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={isSaving || !isDirty}
              className="btn btn-primary">
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Metrics
                </>
              )}
            </button>
          </div>
        )}
      </form>
    );
  }

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

      {isLocked && (
        <div className="alert alert-warning flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>This metric is locked and cannot be edited</span>
        </div>
      )}

      {/* POSB Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              POSB Accounts
            </h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label label-required">Accounts Opened</label>
              <input
                type="number"
                {...register('posb.totalPosbAccountOpened', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.posb?.totalPosbAccountOpened && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.posb.totalPosbAccountOpened.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">Accounts Closed</label>
              <input
                type="number"
                {...register('posb.totalPosbAccountClosed', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.posb?.totalPosbAccountClosed && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.posb.totalPosbAccountClosed.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Booking</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label label-required">Number of Articles</label>
              <input
                type="number"
                {...register('booking.numberOfArticlesBooked', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.booking?.numberOfArticlesBooked && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.booking.numberOfArticlesBooked.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">
                Collection Amount (₹)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('booking.collectionOfAmount', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.booking?.collectionOfAmount && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.booking.collectionOfAmount.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* IPPB Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">IPPB</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label label-required">Accounts Opened</label>
              <input
                type="number"
                {...register('ippb.ippbAccountOpen', { valueAsNumber: true })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.ippb?.ippbAccountOpen && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.ippb.ippbAccountOpen.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">Premium Accounts</label>
              <input
                type="number"
                {...register('ippb.ippbPremiumAccountOpen', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.ippb?.ippbPremiumAccountOpen && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.ippb.ippbPremiumAccountOpen.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">GI Insurance</label>
              <input
                type="number"
                {...register('ippb.giInsurance', { valueAsNumber: true })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.ippb?.giInsurance && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.ippb.giInsurance.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PLI/RPLI Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">PLI/RPLI</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label label-required">
                New Policies Indexed
              </label>
              <input
                type="number"
                {...register('pliRpli.numberOfNewPolicyIndexed', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.pliRpli?.numberOfNewPolicyIndexed && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.pliRpli.numberOfNewPolicyIndexed.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">Sum Assured (₹)</label>
              <input
                type="number"
                step="0.01"
                {...register('pliRpli.sumAssured', { valueAsNumber: true })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.pliRpli?.sumAssured && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.pliRpli.sumAssured.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">
                First Year Premium (₹)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('pliRpli.amountOfFirstYearPremium', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.pliRpli?.amountOfFirstYearPremium && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.pliRpli.amountOfFirstYearPremium.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">
                Renewal Premium (₹)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('pliRpli.amountOfRenewalPremium', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.pliRpli?.amountOfRenewalPremium && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.pliRpli.amountOfRenewalPremium.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Aadhaar Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Aadhaar</h3>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label label-required">Total Transactions</label>
              <input
                type="number"
                {...register('aadhaar.numberOfTotalTransaction', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.aadhaar?.numberOfTotalTransaction && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.aadhaar.numberOfTotalTransaction.message}
                </p>
              )}
            </div>

            <div>
              <label className="label label-required">
                Collection Amount (₹)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('aadhaar.collectionOfAmount', {
                  valueAsNumber: true,
                })}
                className="input"
                disabled={isLocked}
                min="0"
              />
              {errors.aadhaar?.collectionOfAmount && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.aadhaar.collectionOfAmount.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Philately Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-2">
            <Stamp className="w-5 h-5 text-pink-600" />
            <h3 className="text-lg font-semibold text-gray-900">Philately</h3>
          </div>
        </div>
        <div className="card-body">
          <div>
            <label className="label label-required">
              My Stamp Procurement (₹)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('philately.myStampProcurement', {
                valueAsNumber: true,
              })}
              className="input"
              disabled={isLocked}
              min="0"
            />
            {errors.philately?.myStampProcurement && (
              <p className="text-xs text-red-600 mt-1">
                {errors.philately.myStampProcurement.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {!isLocked && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-600">
            {lastSaved && (
              <span>
                Last saved:{' '}
                {lastSaved.toLocaleTimeString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                })}
              </span>
            )}
            {autoSave && (
              <span className="ml-4 text-indigo-600">
                Auto-save enabled (every 30s)
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
              disabled={!isDirty || isSaving}>
              Reset
            </button>
            <button
              type="submit"
              disabled={isSaving || !isDirty}
              className="btn btn-primary">
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Metrics
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
