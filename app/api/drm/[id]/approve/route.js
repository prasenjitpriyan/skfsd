import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DRMEntry } from '@/lib/db/models/DRMEntry';
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

    const entry = await DRMEntry.findById(id);

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    if (entry.status !== 'Submitted') {
      return NextResponse.json(
        { error: 'Only submitted entries can be approved' },
        { status: 400 }
      );
    }

    entry.status = 'Approved';
    entry.approvedBy = session.user.id;
    entry.approvedAt = new Date();
    await entry.save();

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Approve DRM error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
