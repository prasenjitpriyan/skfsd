import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
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
    const { reason } = await request.json();

    if (!reason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
    }

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

    unlockRequest.status = 'Rejected';
    unlockRequest.rejectionReason = reason;
    unlockRequest.reviewedBy = session.user.id;
    unlockRequest.reviewedAt = new Date();
    await unlockRequest.save();

    return NextResponse.json({ success: true, request: unlockRequest });
  } catch (error) {
    console.error('Reject unlock request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
