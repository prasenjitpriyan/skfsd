'use client';

import { Loader2, Printer } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BillPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntry();
  }, []);

  const fetchEntry = async () => {
    try {
      const res = await fetch(`/api/drm/${id}/export`);
      if (res.ok) {
        const data = await res.json();
        setEntry(data.entry);
        // Auto-print after a short delay to ensure rendering
        setTimeout(() => {
          window.print();
        }, 1000);
      } else {
        alert('Failed to load bill');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!entry) return <div>Bill not found</div>;

  return (
    <div className="min-h-screen bg-white p-8 text-black">
      {/* Print Button (Hidden in print mode) */}
      <div className="print:hidden mb-6 flex justify-end">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>

      {/* Bill Content */}
      <div className="max-w-3xl mx-auto border border-gray-300 p-8">
        <div className="text-center border-b border-gray-300 pb-6 mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            Department of Posts, India
          </h1>
          <h2 className="text-xl font-semibold mt-2">
            Delivery Revenue Management Bill
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {entry.officeName} ({entry.officeId})
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Bill Number</p>
            <p className="font-mono font-medium">{entry.serialNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">
              {new Date(entry.createdAt).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Billing Period</p>
            <p className="font-medium">
              {new Date(entry.year, entry.month - 1).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Status</p>
            <span className="font-medium uppercase">{entry.status}</span>
          </div>
        </div>

        <table className="w-full mb-8 border-collapse">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-300">
              <th className="py-3 text-left text-sm font-semibold">
                Description
              </th>
              <th className="py-3 text-right text-sm font-semibold">Details</th>
              <th className="py-3 text-right text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-4 text-sm">Utilization Period</td>
              <td className="py-4 text-right text-sm">
                {new Date(entry.utilizationPeriod.from).toLocaleDateString()} -{' '}
                {new Date(entry.utilizationPeriod.to).toLocaleDateString()}
              </td>
              <td className="py-4 text-right text-sm">-</td>
            </tr>
            <tr>
              <td className="py-4 text-sm">Number of Days Utilized</td>
              <td className="py-4 text-right text-sm">
                {entry.numberOfDaysUtilized} days
              </td>
              <td className="py-4 text-right text-sm">-</td>
            </tr>
            <tr>
              <td className="py-4 text-sm">Hours per Day</td>
              <td className="py-4 text-right text-sm">
                {entry.hoursPerDay} hours
              </td>
              <td className="py-4 text-right text-sm">-</td>
            </tr>
            <tr>
              <td className="py-4 text-sm font-medium">Rate per Hour</td>
              <td className="py-4 text-right text-sm">-</td>
              <td className="py-4 text-right text-sm">
                ₹{entry.rate.toLocaleString('en-IN')}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300">
              <td className="py-4 text-base font-bold">Total Amount</td>
              <td className="py-4"></td>
              <td className="py-4 text-right text-base font-bold">
                ₹{entry.totalAmount.toLocaleString('en-IN')}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-12 pt-8 border-t border-gray-300 flex justify-between items-end">
          <div className="text-center">
            <div className="h-16"></div>
            <p className="text-sm font-medium border-t border-gray-400 px-8 pt-2">
              Signature of Postmaster
            </p>
          </div>
          <div className="text-center">
            {entry.approvedBy && (
              <div className="mb-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Digitally Approved
                </span>
              </div>
            )}
            <p className="text-sm font-medium border-t border-gray-400 px-8 pt-2">
              Signature of Approving Authority
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400">
          Generated by SKFSD OPDMS on {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}
