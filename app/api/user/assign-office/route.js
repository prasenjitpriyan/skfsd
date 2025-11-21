import { connectDB } from '@/lib/db/connect';
import { User } from '@/lib/db/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const { office } = await req.json();

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  await User.findByIdAndUpdate(session.user.id, {
    officeIds: [office],
    status: 'active',
  });

  return Response.json({ success: true });
}
