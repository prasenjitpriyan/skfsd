'use client';

import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  IndianRupee,
  Users,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Overview } from '../../components/dashboard/overview';
import { RecentSales } from '../../components/dashboard/recent-sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingDRM, setPendingDRM] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(updateTimeRemaining, 60000);
    updateTimeRemaining();

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error

      const response = await fetch('/api/dashboard');

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();

      setStats(data.stats);
      setRecentActivity(data.recentActivity || []);
      setPendingDRM(data.pendingDRM || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError(error.message);

      // Set default/empty data on error
      setStats({
        todayCollection: 0,
        targetAchievement: 0,
        pendingDRM: 0,
        activeOffices: 0,
      });
      setRecentActivity([]);
      setPendingDRM([]);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeRemaining = () => {
    const now = new Date();
    const istTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );
    const hours = 23 - istTime.getHours();
    const minutes = 59 - istTime.getMinutes();
    setTimeRemaining(`${hours}h ${minutes}m remaining`);
  };

  // Check user roles
  const isAdmin = session?.user?.roles?.some(
    (r) => r && r.toLowerCase() === 'admin'
  );
  const isOfficeUser = session?.user?.roles?.includes('OfficeUser');
  const isDeliveryCenterUser =
    session?.user?.roles?.includes('DeliveryCenterUser');
  const isSupervisor = session?.user?.roles?.includes('Supervisor');
  const isAuditAdmin = session?.user?.roles?.includes('AuditAdmin');

  // Admin redirect effect
  useEffect(() => {
    if (status === 'authenticated' && isAdmin) {
      router.push('/admin');
    }
  }, [status, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="shimmer w-full max-w-6xl h-96 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card max-w-md">
          <div className="card-body text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Unable to Load Dashboard
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={fetchDashboardData} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session?.user?.name || 'User'}
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Asia/Kolkata',
            })}
          </p>
        </div>

        {/* IST Time & Cutoff Countdown */}
        <div className="mt-4 md:mt-0">
          <div className="card glass border-indigo-200 p-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <Clock className="w-5 h-5" />
              <div>
                <div className="text-sm font-medium">Submission Window</div>
                <div className="text-xs">{timeRemaining}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Achievement */}
        <Card className="hover:shadow-indigo transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ₹{stats?.totalRevenue?.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        {/* Target Achievement */}
        <div className="card hover:shadow-indigo transition-all">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Target Achievement</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.targetAchievement || 87}%
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-indigo h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats?.targetAchievement || 87}%`,
                    }}></div>
                </div>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Pending DRM */}
        <div className="card hover:shadow-indigo transition-all">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending DRM</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.pendingDRM || 12}
                </h3>
                <p className="text-xs text-orange-600 mt-1">
                  {stats?.draftDRM || 5} drafts • {stats?.submittedDRM || 7}{' '}
                  submitted
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Offices */}
        <Card className="hover:shadow-indigo transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats?.activeUsers || '0'}
            </div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header border-b">
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/metrics/2025-11-18"
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Enter Daily Metrics
                    </h3>
                    <p className="text-sm text-gray-600">
                      Submit today&apos;s performance
                    </p>
                  </div>
                  <ArrowRight className="ml-auto w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                </Link>

                <Link
                  href="/drm/new"
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Create DRM Entry
                    </h3>
                    <p className="text-sm text-gray-600">New billing record</p>
                  </div>
                  <ArrowRight className="ml-auto w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </Link>

                <Link
                  href="/reports"
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      View Reports
                    </h3>
                    <p className="text-sm text-gray-600">
                      Analytics & insights
                    </p>
                  </div>
                  <ArrowRight className="ml-auto w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Profile Settings
                    </h3>
                    <p className="text-sm text-gray-600">Manage your account</p>
                  </div>
                  <ArrowRight className="ml-auto w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Pending Items & Notifications */}
        <div className="space-y-6">
          {/* Pending DRM Items */}
          <div className="card">
            <div className="card-header border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Pending DRM</h2>
              <span className="badge badge-warning">{pendingDRM.length}</span>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {pendingDRM.length > 0 ? (
                  pendingDRM.slice(0, 5).map((drm, index) => (
                    <Link
                      key={index}
                      href={`/drm/${drm.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {drm.officeName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {drm.month}/{drm.year}
                          </p>
                        </div>
                        <span
                          className={`badge ${
                            drm.state === 'Draft'
                              ? 'badge-info'
                              : drm.state === 'Submitted'
                              ? 'badge-warning'
                              : 'badge-success'
                          }`}>
                          {drm.state}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">All caught up!</p>
                  </div>
                )}
              </div>

              {pendingDRM.length > 5 && (
                <Link
                  href="/drm"
                  className="block text-center text-sm text-indigo-600 hover:text-indigo-700 mt-4 pt-4 border-t">
                  View all {pendingDRM.length} items →
                </Link>
              )}
            </div>
          </div>

          {/* System Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>

          {/* Admin Quick Stats (Admin only) */}
          {isAdmin && (
            <div className="card bg-gradient-indigo text-white">
              <div className="card-body">
                <h3 className="font-bold mb-4">Admin Overview</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Total Users</span>
                    <span className="font-bold">
                      {stats?.totalUsers || 156}
                    </span>
                  </div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Pending Approvals
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {stats?.pendingApprovals || '0'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">System Health</span>
                    <span className="badge badge-success text-xs">
                      Excellent
                    </span>
                  </div>
                  <Link
                    href="/admin"
                    className="btn btn-outline text-white border-white hover:bg-white hover:text-indigo-700 w-full mt-4">
                    Go to Admin Panel
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
