import { DashboardHeader } from '@/components/layout/dashboard-header';
import { DashboardNav } from '@/components/layout/dashboard-nav';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const session = getSession(globalThis.cookies);

  if (!session) redirect('/login'); // Not authenticated

  // Admin access check
  if (
    globalThis.location?.pathname.startsWith('/admin') &&
    session.role !== 'admin'
  ) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1">
        <DashboardHeader user={session} />
        {children}
      </main>
    </div>
  );
}
