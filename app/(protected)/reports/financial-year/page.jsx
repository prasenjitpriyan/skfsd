'use client';
// Force rebuild

import { Calendar, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function FYReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/reports/fy?year=${year}`);
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (error) {
        console.error('Failed to fetch FY reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [year]);

  const COLORS = ['#3b82f6', '#22c55e', '#a855f7'];

  const pieData = data
    ? [
        { name: 'Booking', value: data.summary.totalBooking },
        { name: 'Aadhaar', value: data.summary.totalAadhaar },
        { name: 'PLI', value: data.summary.totalPLI },
      ]
    : [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Financial Year Report
          </h1>
          <p className="text-gray-600">
            Annual Overview (FY {year}-{year + 1})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="text-sm border-none focus:ring-0 p-0 text-gray-600 bg-transparent">
            <option value={2023}>2023-2024</option>
            <option value={2024}>2024-2025</option>
            <option value={2025}>2025-2026</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-blue-50 border-blue-200">
              <div className="card-body text-center">
                <p className="text-blue-600 font-medium">Total Booking</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{data?.summary?.totalBooking?.toLocaleString('en-IN') || 0}
                </h3>
              </div>
            </div>
            <div className="card bg-green-50 border-green-200">
              <div className="card-body text-center">
                <p className="text-green-600 font-medium">Total Aadhaar</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{data?.summary?.totalAadhaar?.toLocaleString('en-IN') || 0}
                </h3>
              </div>
            </div>
            <div className="card bg-purple-50 border-purple-200">
              <div className="card-body text-center">
                <p className="text-purple-600 font-medium">Total PLI</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{data?.summary?.totalPLI?.toLocaleString('en-IN') || 0}
                </h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quarterly Trends */}
            <div className="card">
              <div className="card-header border-b">
                <h2 className="text-lg font-bold text-gray-900">
                  Quarterly Performance
                </h2>
              </div>
              <div className="card-body h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data?.quarterly || []}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    />
                    <Legend />
                    <Bar
                      dataKey="totalBooking"
                      name="Booking"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="totalAadhaar"
                      name="Aadhaar"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="totalPLI"
                      name="PLI"
                      fill="#a855f7"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution Pie Chart */}
            <div className="card">
              <div className="card-header border-b">
                <h2 className="text-lg font-bold text-gray-900">
                  Revenue Distribution
                </h2>
              </div>
              <div className="card-body h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
