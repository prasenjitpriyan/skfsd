import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { UnlockRequest } from '@/lib/db/models/UnlockRequest';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    let query = {};
    if (!session.user.roles.includes('Admin')) {
      query.officeId = { $in: session.user.officeIds };
    }

    const requests = await UnlockRequest.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Fetch unlock requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { officeId, date, reason } = body;

    if (!officeId || !date || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify user belongs to office
    if (
      !session.user.roles.includes('Admin') &&
      !session.user.officeIds.includes(officeId)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const newRequest = await UnlockRequest.create({
      officeId,
      date: new Date(date),
      reason,
      requestedBy: session.user.id,
    });

    return NextResponse.json({ success: true, request: newRequest });
  } catch (error) {
    console.error('Create unlock request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
