'use client';

import { AlertCircle, TrendingUp, Users } from 'lucide-react';

export default function SupervisorDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Supervisor Dashboard
        </h1>
        <p className="text-gray-600">Overview of team performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">My Offices</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
              </div>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Performance
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">94%</h3>
              </div>
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-orange-50 border-orange-200">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">
                  Pending Reviews
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
              </div>
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body text-center py-12 text-gray-500">
          <p>Detailed team metrics coming soon...</p>
        </div>
      </div>
    </div>
  );
}
