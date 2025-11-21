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

    // FY runs from April of `year` to March of `year + 1`
    const startDate = new Date(`${year}-04-01`);
    const endDate = new Date(`${year + 1}-03-31`);

    let matchStage = {
      date: {
        $gte: startDate,
        $lte: endDate,
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
          _id: null, // Group all to get grand total
          totalBooking: { $sum: '$data.booking.collectionOfAmount' },
          totalAadhaar: { $sum: '$data.aadhaar.collectionOfAmount' },
          totalPLI: { $sum: '$data.pli.premiumCollection' },
          // We can also group by quarter if needed, but let's do total first
        },
      },
    ];

    // Quarterly breakdown
    const quarterlyPipeline = [
      { $match: matchStage },
      {
        $project: {
          date: 1,
          booking: '$data.booking.collectionOfAmount',
          aadhaar: '$data.aadhaar.collectionOfAmount',
          pli: '$data.pli.premiumCollection',
          month: { $month: '$date' },
        },
      },
      {
        $project: {
          booking: 1,
          aadhaar: 1,
          pli: 1,
          quarter: {
            $switch: {
              branches: [
                { case: { $in: ['$month', [4, 5, 6]] }, then: 'Q1' },
                { case: { $in: ['$month', [7, 8, 9]] }, then: 'Q2' },
                { case: { $in: ['$month', [10, 11, 12]] }, then: 'Q3' },
                { case: { $in: ['$month', [1, 2, 3]] }, then: 'Q4' },
              ],
              default: 'Unknown',
            },
          },
        },
      },
      {
        $group: {
          _id: '$quarter',
          totalBooking: { $sum: '$booking' },
          totalAadhaar: { $sum: '$aadhaar' },
          totalPLI: { $sum: '$pli' },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const [totalResult, quarterlyResult] = await Promise.all([
      DailyMetric.aggregate(pipeline),
      DailyMetric.aggregate(quarterlyPipeline),
    ]);

    return NextResponse.json({
      year,
      summary: totalResult[0] || {
        totalBooking: 0,
        totalAadhaar: 0,
        totalPLI: 0,
      },
      quarterly: quarterlyResult,
    });
  } catch (error) {
    console.error('FY reports error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
