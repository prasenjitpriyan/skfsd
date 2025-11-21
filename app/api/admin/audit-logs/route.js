import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { AuditLog } from '@/lib/db/models/AuditLog';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session ||
      (!session.user.roles.includes('Admin') &&
        !session.user.roles.includes('AuditAdmin'))
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const logs = await AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(100) // Limit to last 100 for now
      .lean();

    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Fetch audit logs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
