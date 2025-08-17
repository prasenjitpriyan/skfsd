'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DailyReportForm({ officeName }) {
  const [formData, setFormData] = useState({
    totalAccountOpened: 0,
    totalAccountClosed: 0,
    numberOfArticleBooked: 0,
    collectionAmount: 0,
    ippbAccountOpened: 0,
    ippbPremiumAccountOpened: 0,
    generalInsurancePolicyAcquired: 0,
    numberOfNewPolicyIndexed: 0,
    sumAssured: 0,
    amountFirstYearPremium: 0,
    amountRenewalPremium: 0,
    totalAadhaarTransactions: 0,
    collectionAmountAadhaar: 0,
    numberOfPhilately: 0,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/reports/daily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          officeName,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Report submitted successfully!');
        setIsSubmitted(true);
        // Redirect to download page after successful submission
        setTimeout(() => {
          router.push('/download-report');
        }, 2000);
      } else {
        setMessage(data.message || 'Failed to submit report');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'totalAccountOpened', label: 'Total Account Opened' },
    { name: 'totalAccountClosed', label: 'Total Account Closed' },
    { name: 'numberOfArticleBooked', label: 'Number of Article Booked' },
    { name: 'collectionAmount', label: 'Collection of Amount' },
    { name: 'ippbAccountOpened', label: 'IPPB Account Opened' },
    { name: 'ippbPremiumAccountOpened', label: 'IPPB Premium Account Opened' },
    {
      name: 'generalInsurancePolicyAcquired',
      label: 'General Insurance Policy Acquired',
    },
    { name: 'numberOfNewPolicyIndexed', label: 'Number of New Policy Indexed' },
    { name: 'sumAssured', label: 'Sum Assured' },
    { name: 'amountFirstYearPremium', label: 'Amount of First Year Premium' },
    { name: 'amountRenewalPremium', label: 'Amount of Renewal Premium' },
    {
      name: 'totalAadhaarTransactions',
      label: 'Total Number of Aadhaar Transactions',
    },
    {
      name: 'collectionAmountAadhaar',
      label: 'Collection of Amount (Aadhaar)',
    },
    { name: 'numberOfPhilately', label: 'Number of Philately' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Daily Report - {officeName}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
        </div>

        {message && (
          <div
            className={`text-center p-3 rounded ${
              isSubmitted
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
            {message}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || isSubmitted}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}
