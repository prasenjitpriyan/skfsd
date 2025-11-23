import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// PUT - Update user's office allocation
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.roles.includes('Admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { officeIds } = body;

    if (!Array.isArray(officeIds)) {
      return NextResponse.json(
        { error: 'officeIds must be an array' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.officeIds = officeIds;
    await user.save();

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        officeIds: user.officeIds,
      },
    });
  } catch (error) {
    console.error('Update office allocation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
