import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import DailyReport from '@/models/DailyReport';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const reportData = await request.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if report already exists for today
    const existingReport = await DailyReport.findOne({
      officeName: reportData.officeName,
      date: today,
    });

    if (existingReport && existingReport.isSubmitted) {
      return NextResponse.json(
        { message: 'Report already submitted for today' },
        { status: 400 }
      );
    }

    const report =
      existingReport ||
      new DailyReport({
        officeName: reportData.officeName,
        date: today,
      });

    // Update report fields
    Object.keys(reportData).forEach((key) => {
      if (key !== 'officeName' && key !== 'date') {
        report[key] = reportData[key];
      }
    });

    report.isSubmitted = true;
    report.submittedAt = new Date();

    await report.save();

    return NextResponse.json({
      message: 'Report submitted successfully',
      report,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const officeName = searchParams.get('officeName');
    const date = searchParams.get('date');

    const query = {};
    if (officeName) query.officeName = officeName;
    if (date) query.date = new Date(date);

    const reports = await DailyReport.find(query).sort({ date: -1 });

    return NextResponse.json({ reports });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
