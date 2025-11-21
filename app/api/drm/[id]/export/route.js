import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db/connect';
import { DRMEntry } from '@/lib/db/models/DRMEntry';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// Since we can't easily use jspdf on serverless functions without canvas issues,
// we'll generate a simple HTML that the client can print or use a lightweight PDF generator.
// For a robust solution, we'd use a dedicated service or puppeteer, but for this scope,
// we'll return the data structure optimized for a "Print View" on the frontend,
// or generate a simple text-based representation if needed.
//
// BETTER APPROACH: Create a dedicated "Print/Export" page that auto-opens print dialog,
// or use a library like `react-to-print` on the client side.
//
// However, the requirement implies an API or backend generation.
// Let's stick to a client-side print friendly page for simplicity and reliability in this environment,
// but expose this route to fetch the specific "bill data" if needed separately.
//
// Actually, let's make this route return the data specifically formatted for the bill,
// and we'll add a "Download PDF" button on the frontend that uses `window.print()` on a clean page.

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

    // Check permissions
    if (
      !session.user.roles.includes('Admin') &&
      !session.user.roles.includes('AuditAdmin') &&
      !session.user.officeIds.includes(entry.officeId)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ entry });
  } catch (error) {
    console.error('Export DRM error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
