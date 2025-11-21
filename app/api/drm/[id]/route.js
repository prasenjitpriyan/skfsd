import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DRMEntry } from '@/lib/db/models/DRMEntry';
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

    const entry = await DRMEntry.findById(id);

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    // Authorization check
    if (
      !session.user.roles.includes('Admin') &&
      !session.user.officeIds.includes(entry.officeId)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ entry });
  } catch (error) {
    console.error('Fetch DRM entry error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const updates = await request.json();
    await connectDB();

    const entry = await DRMEntry.findById(id);

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    // Authorization check
    if (
      !session.user.roles.includes('Admin') &&
      !session.user.officeIds.includes(entry.officeId)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Only allow updating Drafts
    if (entry.status !== 'Draft') {
      return NextResponse.json(
        { error: 'Cannot update submitted entries' },
        { status: 400 }
      );
    }

    // Apply updates
    Object.assign(entry, updates);
    await entry.save();

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Update DRM entry error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await connectDB();

    const entry = await DRMEntry.findById(id);

    if (!entry) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    // Authorization check
    if (
      !session.user.roles.includes('Admin') &&
      !session.user.officeIds.includes(entry.officeId)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Only allow deleting Drafts
    if (entry.status !== 'Draft') {
      return NextResponse.json(
        { error: 'Cannot delete submitted entries' },
        { status: 400 }
      );
    }

    await entry.deleteOne();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete DRM entry error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
