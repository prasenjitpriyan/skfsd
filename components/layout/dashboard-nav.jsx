'use client';

import { cn } from '@/lib/utils';
import {
  BarChart3,
  Building,
  Calendar,
  FileText,
  LayoutDashboard,
  Mail,
  Target,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardNav({ userRole }) {
  const pathname = usePathname();

  const adminNavItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/offices', label: 'Offices', icon: Building },
    { href: '/admin/targets', label: 'Targets', icon: Target },
    { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { href: '/admin/letters', label: 'Letters', icon: Mail },
  ];

  const officeNavItems = [
    { href: '/office/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/office/daily-data', label: 'Daily Data', icon: Calendar },
    { href: '/office/targets', label: 'My Targets', icon: Target },
    { href: '/office/reports', label: 'Reports', icon: BarChart3 },
    { href: '/office/mazdoor-bill', label: 'Mazdoor Bill', icon: FileText },
  ];

  const deliveryNavItems = [
    { href: '/delivery/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/delivery/daily-data', label: 'Daily Data', icon: Calendar },
    { href: '/delivery/mazdoor-bill', label: 'Mazdoor Bill', icon: FileText },
  ];

  const getNavItems = () => {
    switch (userRole) {
      case 'ADMIN':
        return adminNavItems;
      case 'OFFICE':
        return officeNavItems;
      case 'DELIVERY_CENTER':
        return deliveryNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          SKFSD Portal
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
          {userRole.replace('_', ' ').toLowerCase()}
        </p>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  )}>
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
