import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { Office } from '@/lib/db/models/Office';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const office = await Office.findOne({ id });

    if (!office) {
      return NextResponse.json({ error: 'Office not found' }, { status: 404 });
    }

    // Authorization check
    const isAdmin = session.user.roles.includes('Admin');
    const isAssigned = session.user.officeIds.includes(id);

    if (!isAdmin && !isAssigned) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ office });
  } catch (error) {
    console.error('Fetch office error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.roles.includes('Admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: officeId } = await params;
    const body = await request.json();
    const { name, type, location, pin, deliveryCenterId, active } = body;

    await connectDB();

    // Update by custom 'id' field since that's what's passed in the URL
    const office = await Office.findOneAndUpdate(
      { id: officeId },
      {
        name,
        type,
        location,
        pin,
        deliveryCenterId,
        active,
      },
      { new: true }
    );

    if (!office) {
      return NextResponse.json({ error: 'Office not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, office });
  } catch (error) {
    console.error('Update office error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
