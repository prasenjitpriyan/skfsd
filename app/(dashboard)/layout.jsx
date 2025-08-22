import { DashboardHeader } from '@/components/layout/dashboard-header';
import { DashboardNav } from '@/components/layout/dashboard-nav';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={session.user} />
      <div className="flex">
        <DashboardNav userRole={session.user.role} />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
