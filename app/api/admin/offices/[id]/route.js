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

    const { id } = params;
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
