'use client';

import { Calendar, Loader2 } from 'lucide-react';
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

export default function MonthlyReportsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchReports();
  }, [year]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      // If current month is Jan-Mar, default to previous year for FY start
      // But for simplicity, let's just use the selected year as start of FY
      const res = await fetch(`/api/reports/monthly?year=${year}`);
      if (res.ok) {
        const result = await res.json();
        processData(result.monthlyData);
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const processData = (rawData) => {
    const months = [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
    ];

    // Map mongo month (1-12) to our FY order
    // Mongo: 1=Jan, 2=Feb... 12=Dec
    // FY: 4=Apr... 12=Dec, 1=Jan... 3=Mar

    const formattedData = months.map((month, index) => {
      // Calculate expected mongo month number
      // Index 0 (Apr) -> 4
      // Index 8 (Dec) -> 12
      // Index 9 (Jan) -> 1
      let mongoMonth = index + 4;
      if (mongoMonth > 12) mongoMonth -= 12;

      const found = rawData.find((d) => d._id === mongoMonth);
      return {
        name: month,
        Booking: found?.totalBooking || 0,
        Aadhaar: found?.totalAadhaar || 0,
        PLI: found?.totalPLI || 0,
      };
    });

    setData(formattedData);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Monthly Performance
          </h1>
          <p className="text-gray-600">
            Financial Year Overview ({year}-{year + 1})
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
        <div className="card">
          <div className="card-header border-b">
            <h2 className="text-lg font-bold text-gray-900">
              Monthly Collection Trends
            </h2>
          </div>
          <div className="card-body h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                />
                <Legend />
                <Bar dataKey="Booking" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Aadhaar" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="PLI" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
