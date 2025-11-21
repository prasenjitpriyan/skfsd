import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { Target } from '@/lib/db/models/Target';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.roles.includes('Admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear());
    const officeId = searchParams.get('officeId');

    await connectDB();

    let query = { year };
    if (officeId) query.officeId = officeId;

    const targets = await Target.find(query).sort({ officeId: 1 }).lean();

    return NextResponse.json({ targets });
  } catch (error) {
    console.error('Fetch targets error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.roles.includes('Admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { officeId, year, targets } = body;

    if (!officeId || !year || !targets) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedTarget = await Target.findOneAndUpdate(
      { officeId, year },
      {
        officeId,
        year,
        targets,
        setBy: session.user.id,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, target: updatedTarget });
  } catch (error) {
    console.error('Set target error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
