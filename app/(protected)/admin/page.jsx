'use client';

import { Building2, Loader2, Shield, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    offices: 0,
    pendingDRM: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // We can reuse the dashboard API or create a specific admin stats API
      // For now, let's assume the main dashboard API provides enough info or we fetch separately
      // Actually, let's fetch from the dashboard API which we already updated to include some admin stats
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const data = await res.json();
        setStats({
          users: data.stats.totalUsers || 0,
          offices: data.stats.activeOffices || 0,
          pendingDRM: data.stats.pendingApprovals || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Management Card */}
        <Link
          href="/admin/users"
          className="card hover:shadow-md transition-all">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.users}
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-600 hover:underline">
              Manage Users →
            </div>
          </div>
        </Link>

        {/* Office Management Card */}
        <Link
          href="/admin/offices"
          className="card hover:shadow-md transition-all">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Offices
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.offices}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 hover:underline">
              Manage Offices →
            </div>
          </div>
        </Link>

        {/* DRM Approval Card */}
        <Link
          href="/admin/drm-approval"
          className="card hover:shadow-md transition-all">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Approvals
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.pendingDRM}
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-orange-600 hover:underline">
              Review Requests →
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Links / Recent Admin Actions could go here */}
    </div>
  );
}
