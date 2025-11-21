import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DailyMetric } from '@/lib/db/models/DailyMetric';
import { Office } from '@/lib/db/models/Office';
import { Building2, Calendar, Plus } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function MetricsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await connectDB();

  // Fetch metrics based on role
  let query = {};
  if (!session.user.roles.includes('Admin')) {
    query.officeId = { $in: session.user.officeIds };
  }

  const metrics = await DailyMetric.find(query)
    .sort({ date: -1 })
    .limit(50)
    .lean();

  // Fetch office names for display
  const officeIds = [...new Set(metrics.map((m) => m.officeId))];
  const offices = await Office.find({ id: { $in: officeIds } }).lean();
  const officeMap = offices.reduce((acc, office) => {
    acc[office.id] = office.name;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Metrics</h1>
          <p className="text-gray-600">
            View and manage daily performance metrics
          </p>
        </div>
        <Link href="/metrics/new" className="btn btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          New Entry
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Office</th>
                <th>Status</th>
                <th>Submitted By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {metrics.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No metrics found. Click &quot;New Entry&quot; to get
                    started.
                  </td>
                </tr>
              ) : (
                metrics.map((metric) => (
                  <tr key={metric._id.toString()}>
                    <td>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(metric.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {officeMap[metric.officeId] || metric.officeId}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          metric.status === 'Locked'
                            ? 'badge-warning'
                            : 'badge-success'
                        }`}>
                        {metric.status}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm text-gray-600">User</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-ghost">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
