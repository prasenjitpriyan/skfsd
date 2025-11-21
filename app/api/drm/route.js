import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DRMEntry } from '@/lib/db/models/DRMEntry';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      officeId,
      officeName,
      month,
      year,
      serialNumber,
      utilizationPeriod,
      numberOfDaysUtilized,
      hoursPerDay,
      rate,
      totalAmount,
    } = body;

    // Validation
    if (!officeId || !month || !year || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user is authorized for this office
    if (
      !session.user.roles.includes('Admin') &&
      !session.user.officeIds.includes(officeId)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const newEntry = await DRMEntry.create({
      officeId,
      officeName,
      month,
      year,
      serialNumber,
      utilizationPeriod: {
        from: new Date(utilizationPeriod.from),
        to: new Date(utilizationPeriod.to),
      },
      numberOfDaysUtilized,
      hoursPerDay,
      rate,
      totalAmount,
      submittedBy: session.user.id,
      status: 'Draft', // Default to Draft
    });

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('Create DRM error:', error);
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
    const status = searchParams.get('status');
    const officeId = searchParams.get('officeId');

    await connectDB();

    let query = {};

    // Role-based filtering
    if (!session.user.roles.includes('Admin')) {
      query.officeId = { $in: session.user.officeIds };
    }

    // Optional filters
    if (status) query.status = status;
    if (officeId) {
      // If user is not admin, ensure they can only query their own offices
      if (
        !session.user.roles.includes('Admin') &&
        !session.user.officeIds.includes(officeId)
      ) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      query.officeId = officeId;
    }

    const entries = await DRMEntry.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Fetch DRM error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
