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
    const year = parseInt(searchParams.get('year') || new Date().getFullYear());
    const officeId = searchParams.get('officeId');

    await connectDB();

    let matchStage = {
      date: {
        $gte: new Date(`${year}-04-01`), // Start of FY (April)
        $lte: new Date(`${year + 1}-03-31`), // End of FY (March)
      },
    };

    // Role-based filtering
    if (!session.user.roles.includes('Admin')) {
      matchStage.officeId = { $in: session.user.officeIds };
    } else if (officeId) {
      matchStage.officeId = officeId;
    }

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: { $month: '$date' },
          totalBooking: { $sum: '$data.booking.collectionOfAmount' },
          totalAadhaar: { $sum: '$data.aadhaar.collectionOfAmount' },
          totalPLI: { $sum: '$data.pli.premiumCollection' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const monthlyData = await DailyMetric.aggregate(pipeline);

    // Format for frontend (ensure all months are present or handle there)
    // We'll return the raw aggregation and let frontend map it to months
    return NextResponse.json({ year, monthlyData });
  } catch (error) {
    console.error('Monthly reports error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
