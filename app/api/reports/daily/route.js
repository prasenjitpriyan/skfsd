import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DailyMetric } from '@/lib/db/models/DailyMetric';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const officeId = searchParams.get('officeId');

    await connectDB();

    let query = {};

    // Date range filter
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    // Role-based filtering
    if (!session.user.roles.includes('Admin')) {
      query.officeId = { $in: session.user.officeIds };
    }

    // Optional office filter (if Admin or allowed)
    if (officeId) {
      if (
        !session.user.roles.includes('Admin') &&
        !session.user.officeIds.includes(officeId)
      ) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      query.officeId = officeId;
    }

    const metrics = await DailyMetric.find(query).sort({ date: 1 }).lean();

    // Aggregate data
    const aggregated = metrics.reduce(
      (acc, curr) => {
        const booking = curr.data?.booking?.collectionOfAmount || 0;
        const aadhaar = curr.data?.aadhaar?.collectionOfAmount || 0;
        const pli = curr.data?.pli?.premiumCollection || 0;

        acc.totalBooking += booking;
        acc.totalAadhaar += aadhaar;
        acc.totalPLI += pli;
        acc.count += 1;
        return acc;
      },
      { totalBooking: 0, totalAadhaar: 0, totalPLI: 0, count: 0 }
    );

    return NextResponse.json({
      metrics, // Return raw data for charts
      summary: aggregated,
    });
  } catch (error) {
    console.error('Reports API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
