import { DashboardHeader } from '@/components/layout/dashboard-header';
import { DashboardNav } from '@/components/layout/dashboard-nav';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const session = await getSession(); // ✅ now async

  if (!session) redirect('/login'); // Not authenticated

  // Optional: Admin check (middleware should handle this already)
  if (
    session.role !== 'admin' &&
    globalThis?.location?.pathname?.startsWith('/admin')
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
