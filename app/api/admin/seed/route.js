import { allOffices } from '@/app/data/offices';
import { connectDB } from '@/lib/db/connect';
import { Office } from '@/lib/db/models/Office';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await connectDB();

    // Optional: Clear existing offices to avoid duplicates if running multiple times
    // await Office.deleteMany({});

    const results = {
      inserted: 0,
      updated: 0,
      errors: 0,
    };

    for (const officeData of allOffices) {
      try {
        const { id, ...rest } = officeData;

        // Upsert: Update if exists, Insert if not
        const result = await Office.updateOne(
          { id: id },
          { $set: { id, ...rest } },
          { upsert: true }
        );

        if (result.upsertedCount > 0) {
          results.inserted++;
        } else if (result.modifiedCount > 0) {
          results.updated++;
        }
      } catch (err) {
        console.error(`Error processing office ${officeData.id}:`, err);
        results.errors++;
      }
    }

    return NextResponse.json({
      message: 'Database seeding completed',
      results,
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
