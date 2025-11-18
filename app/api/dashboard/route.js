import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get authenticated session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock data for now - replace with actual database queries
    const dashboardData = {
      stats: {
        todayCollection: 45200,
        targetAchievement: 87,
        pendingDRM: 12,
        draftDRM: 5,
        submittedDRM: 7,
        activeOffices: 40,
        totalUsers: 156,
        pendingApprovals: 7,
      },
      recentActivity: [
        {
          type: 'success',
          title: 'Daily metrics submitted',
          description: 'Ballygunge office - November 17, 2025',
          time: '2 hours ago',
        },
        {
          type: 'warning',
          title: 'DRM pending approval',
          description: 'Jadavpur University DC - October 2025',
          time: '5 hours ago',
        },
        {
          type: 'info',
          title: 'Target updated',
          description: 'Q2 FY 2025-26 targets revised',
          time: '1 day ago',
        },
        {
          type: 'success',
          title: 'DRM finalized',
          description: 'Gariahat Market - September 2025',
          time: '2 days ago',
        },
      ],
      pendingDRM: [
        {
          id: 'drm-1',
          officeName: 'Ballygunge',
          month: 11,
          year: 2025,
          state: 'Draft',
        },
        {
          id: 'drm-2',
          officeName: 'Jadavpur University',
          month: 10,
          year: 2025,
          state: 'Submitted',
        },
        {
          id: 'drm-3',
          officeName: 'Gariahat Market',
          month: 10,
          year: 2025,
          state: 'Submitted',
        },
        {
          id: 'drm-4',
          officeName: 'Dhakuria',
          month: 11,
          year: 2025,
          state: 'Draft',
        },
        {
          id: 'drm-5',
          officeName: 'Panchasayar',
          month: 10,
          year: 2025,
          state: 'Submitted',
        },
      ],
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
