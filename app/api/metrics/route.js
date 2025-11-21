import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DailyMetric } from '@/lib/db/models/DailyMetric';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { date, data, officeId, officeType } = body;

    if (!date || !data || !officeId || !officeType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if metric already exists for this date and office
    const existingMetric = await DailyMetric.findOne({
      officeId,
      date: new Date(date),
    });

    if (existingMetric) {
      return NextResponse.json(
        { error: 'Metrics for this date already exist' },
        { status: 409 }
      );
    }

    const newMetric = await DailyMetric.create({
      officeId,
      officeType,
      date: new Date(date),
      data,
      submittedBy: session.user.id,
      status: 'Editable',
    });

    return NextResponse.json(
      { message: 'Metrics submitted successfully', metric: newMetric },
      { status: 201 }
    );
  } catch (error) {
    console.error('Metrics submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const officeId = searchParams.get('officeId');

    await connectDB();

    let query = {};
    if (date) {
      query.date = new Date(date);
    }
    if (officeId) {
      query.officeId = officeId;
    }

    // If user is not admin, restrict to their office(s)
    if (!session.user.roles.includes('Admin')) {
      // If officeId is provided, ensure user has access
      if (officeId && !session.user.officeIds.includes(officeId)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      // If no officeId, filter by user's offices
      if (!officeId) {
        query.officeId = { $in: session.user.officeIds };
      }
    }

    const metrics = await DailyMetric.find(query).sort({ date: -1 });

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Metrics fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
