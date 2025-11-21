'use client';

import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      const isAdmin = session?.user?.roles?.includes('Admin');
      const isAuditAdmin = session?.user?.roles?.includes('AuditAdmin');

      if (!isAdmin && !isAuditAdmin) {
        router.push('/dashboard');
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (
    !session?.user?.roles?.includes('Admin') &&
    !session?.user?.roles?.includes('AuditAdmin')
  ) {
    return null; // Will redirect
  }

  return <div className="admin-layout">{children}</div>;
}
