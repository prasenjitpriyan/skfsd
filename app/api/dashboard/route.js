import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DailyMetric } from '@/lib/db/models/DailyMetric';
import { Office } from '@/lib/db/models/Office';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // 1. Calculate Today's Collection
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter based on user role
    let metricQuery = { date: { $gte: today } };
    let officeQuery = { active: true };

    if (!session.user.roles.includes('Admin')) {
      metricQuery.officeId = { $in: session.user.officeIds };
      officeQuery.id = { $in: session.user.officeIds };
    }

    const todayMetrics = await DailyMetric.find(metricQuery);

    const todayCollection = todayMetrics.reduce((acc, metric) => {
      const booking = metric.data?.booking?.collectionOfAmount || 0;
      const aadhaar = metric.data?.aadhaar?.collectionOfAmount || 0;
      return acc + booking + aadhaar;
    }, 0);

    // 2. Active Offices
    const activeOfficesCount = await Office.countDocuments(officeQuery);
    const totalOfficesCount = await Office.countDocuments({}); // Total in system

    // 3. Recent Activity (Last 5 submissions)
    // We need to fetch office names for these
    let activityQuery = {};
    if (!session.user.roles.includes('Admin')) {
      activityQuery.officeId = { $in: session.user.officeIds };
    }

    const recentMetrics = await DailyMetric.find(activityQuery)
      .sort({ submittedAt: -1 })
      .limit(5)
      .lean();

    // Get unique office IDs from recent metrics
    const recentOfficeIds = [...new Set(recentMetrics.map((m) => m.officeId))];
    const recentOffices = await Office.find({
      id: { $in: recentOfficeIds },
    }).lean();
    const officeMap = recentOffices.reduce((acc, off) => {
      acc[off.id] = off.name;
      return acc;
    }, {});

    const recentActivity = recentMetrics.map((metric) => ({
      type: 'success',
      title: 'Daily metrics submitted',
      description: `${
        officeMap[metric.officeId] || metric.officeId
      } - ${new Date(metric.date).toLocaleDateString()}`,
      time: new Date(metric.submittedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    // 4. Pending DRM (Mock for now as DRM is not implemented)
    const pendingDRM = [];

    const dashboardData = {
      stats: {
        todayCollection,
        targetAchievement: 0, // Placeholder
        pendingDRM: 0,
        activeOffices: activeOfficesCount,
        totalUsers: 0, // Placeholder
        pendingApprovals: 0,
      },
      recentActivity,
      pendingDRM,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
