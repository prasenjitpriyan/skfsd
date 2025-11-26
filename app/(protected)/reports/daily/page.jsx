'use client';

import { Calendar, IndianRupee, Loader2, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split('T')[0], // Last 30 days
    to: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(dateRange).toString();
      const res = await fetch(`/api/reports/daily?${query}`);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  // Prepare chart data
  const chartData = data?.metrics?.map((m) => ({
    date: new Date(m.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    }),
    Booking: m.data?.booking?.collectionOfAmount || 0,
    Aadhaar: m.data?.aadhaar?.collectionOfAmount || 0,
    PLI: m.data?.pli?.premiumCollection || 0,
  }));

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Performance Reports
          </h1>
          <p className="text-gray-600">Analytics for the selected period</p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
            className="text-sm border-none focus:ring-0 p-0 text-gray-600"
          />
          <span className="text-gray-400">-</span>
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
            className="text-sm border-none focus:ring-0 p-0 text-gray-600"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Total Booking
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      ₹
                      {data?.summary?.totalBooking?.toLocaleString('en-IN') ||
                        0}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-blue-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-linear-to-br from-green-50 to-green-100 border-green-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Total Aadhaar
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      ₹
                      {data?.summary?.totalAadhaar?.toLocaleString('en-IN') ||
                        0}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-green-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Total PLI
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      ₹{data?.summary?.totalPLI?.toLocaleString('en-IN') || 0}
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="card">
            <div className="card-header border-b">
              <h2 className="text-lg font-bold text-gray-900">
                Collection Trends
              </h2>
            </div>
            <div className="card-body h-[400px]">
              {chartData && chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    />
                    <Legend />
                    <Bar
                      dataKey="Booking"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Aadhaar"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar dataKey="PLI" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No data available for the selected period
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
