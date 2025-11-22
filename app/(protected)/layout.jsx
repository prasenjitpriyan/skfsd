'use client';

import {
  BarChart3,
  Bell,
  Calendar,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '../components/ui/sidebar';

export default function ProtectedLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="shimmer w-full max-w-6xl h-96 rounded-lg"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const isAdmin = session?.user?.roles?.includes('Admin');
  const isAuditAdmin = session?.user?.roles?.includes('AuditAdmin');
  const isSupervisor = session?.user?.roles?.includes('Supervisor');

  // Main navigation items
  const navItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Daily Metrics',
      url: '/metrics',
      icon: Calendar,
      items: [
        { title: 'Entry', url: '/metrics/2025-11-18' },
        { title: 'History', url: '/metrics' },
      ],
    },
    {
      title: 'DRM Management',
      url: '/drm',
      icon: FileText,
      items: [
        { title: 'All DRM', url: '/drm' },
        { title: 'Create New', url: '/drm/new' },
        { title: 'Pending', url: '/drm?filter=pending' },
      ],
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: BarChart3,
      items: [
        { title: 'Daily Report', url: '/reports/daily' },
        { title: 'Monthly Report', url: '/reports/monthly' },
        { title: 'Financial Year', url: '/reports/financial-year' },
      ],
    },
  ];

  // Admin navigation items
  const adminNavItems = [
    {
      title: 'Admin Panel',
      url: '/admin',
      icon: Shield,
      items: [
        { title: 'Overview', url: '/admin' },
        { title: 'Users', url: '/admin/users' },
        { title: 'Offices', url: '/admin/offices' },
        { title: 'DRM Approval', url: '/admin/drm-approval' },
        { title: 'Targets', url: '/admin/targets' },
        { title: 'Audit Logs', url: '/admin/audit-logs' },
        { title: 'PDF Management', url: '/admin/pdf-management' },
        { title: 'Unlock Requests', url: '/admin/unlock-requests' },
      ],
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="inset" collapsible="offcanvas">
        {/* Sidebar Header */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-indigo text-white">
                    <Home className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">OPDMS</span>
                    <span className="truncate text-xs">Performance System</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.url)}>
                          <Link href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}>
                        <Link href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Admin Navigation (Conditional) */}
          {(isAdmin || isAuditAdmin) && (
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNavItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.url)}>
                        <Link href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.items && (
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings className="size-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => signOut({ callbackUrl: '/login' })}>
                <LogOut className="size-4" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* User Profile Card */}
          <div className="mt-4 border-t border-indigo-800 pt-4">
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-indigo text-white font-semibold">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-xs text-indigo-200 truncate">
                  {session?.user?.roles?.[0] || 'User'}
                </p>
              </div>
            </div>
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Main Content Area */}
      <SidebarInset>
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
          <SidebarTrigger className="-ml-1" />

          <div className="h-6 w-px bg-gray-200" />

          {/* Search (Optional) */}
          <div className="flex-1">
            {/* You can add a search bar here if needed */}
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-2">
            {/* IST Time Display */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">
                {new Date().toLocaleTimeString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span className="text-xs">IST</span>
            </div>

            {/* Notifications (Optional) */}
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
