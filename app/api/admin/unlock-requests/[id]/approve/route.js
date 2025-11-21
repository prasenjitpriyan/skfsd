import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DailyMetric } from '@/lib/db/models/DailyMetric';
import { UnlockRequest } from '@/lib/db/models/UnlockRequest';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.roles.includes('Admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await connectDB();

    const unlockRequest = await UnlockRequest.findById(id);
    if (!unlockRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (unlockRequest.status !== 'Pending') {
      return NextResponse.json(
        { error: 'Request already processed' },
        { status: 400 }
      );
    }

    // Approve request
    unlockRequest.status = 'Approved';
    unlockRequest.reviewedBy = session.user.id;
    unlockRequest.reviewedAt = new Date();
    await unlockRequest.save();

    // Unlock the metric
    // We need to find the metric for that office and date and set status to 'Editable'
    // Note: Date in UnlockRequest is a Date object, likely with time.
    // We should match by day.
    const startOfDay = new Date(unlockRequest.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(unlockRequest.date);
    endOfDay.setHours(23, 59, 59, 999);

    await DailyMetric.findOneAndUpdate(
      {
        officeId: unlockRequest.officeId,
        date: { $gte: startOfDay, $lte: endOfDay },
      },
      { status: 'Editable' }
    );

    return NextResponse.json({ success: true, request: unlockRequest });
  } catch (error) {
    console.error('Approve unlock request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
