import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { Office } from '@/lib/db/models/Office';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.roles.includes('Admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const offices = await Office.find({
      active: true,
      id: { $not: /^del-/i },
      name: { $not: /^del-/i },
    })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({ offices });
  } catch (error) {
    console.error('Fetch offices error:', error);
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
    const { id, name, type, location, pin, deliveryCenterId } = body;

    if (!id || !name || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if office exists
    const existingOffice = await Office.findOne({ id });
    if (existingOffice) {
      return NextResponse.json(
        { error: 'Office ID already exists' },
        { status: 409 }
      );
    }

    const newOffice = await Office.create({
      id,
      name,
      type,
      location,
      pin,
      deliveryCenterId,
      active: true,
    });

    return NextResponse.json({ success: true, office: newOffice });
  } catch (error) {
    console.error('Create office error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
