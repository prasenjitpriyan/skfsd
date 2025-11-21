'use client';

import { FileText, Lock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AuditDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Dashboard</h1>
        <p className="text-gray-600">
          System compliance and security monitoring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/audit-logs"
          className="card hover:shadow-md transition-all">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Logs</p>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  View Activity
                </h3>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-indigo-600 hover:underline">
              Access Logs →
            </div>
          </div>
        </Link>

        <div className="card bg-gray-50 border-gray-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Security Status
                </p>
                <h3 className="text-lg font-bold text-green-600 mt-1">
                  Secure
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gray-50 border-gray-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Unlock Requests
                </p>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  Monitor
                </h3>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-b">
          <h3 className="text-lg font-bold text-gray-900">
            Compliance Overview
          </h3>
        </div>
        <div className="card-body">
          <p className="text-gray-500">
            Compliance reports and export functionality will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}
