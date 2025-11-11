opdms/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.jsx
│ │ ├── signup/
│ │ │ └── page.jsx
│ │ ├── forgot-password/
│ │ │ └── page.jsx
│ │ ├── reset-password/
│ │ │ └── page.jsx
│ │ └── layout.jsx
│ │
│ ├── (protected)/
│ │ ├── layout.jsx # Layout with sidebar, auth check
│ │ │
│ │ ├── dashboard/
│ │ │ ├── page.jsx # Main dashboard (role-aware)
│ │ │ ├── layout.jsx
│ │ │ └── error.jsx
│ │ │
│ │ ├── metrics/
│ │ │ ├── page.jsx # Daily metrics list
│ │ │ ├── [date]/
│ │ │ │ └── page.jsx # Edit specific date metrics
│ │ │ ├── layout.jsx
│ │ │ └── error.jsx
│ │ │
│ │ ├── drm/
│ │ │ ├── page.jsx # DRM list with filters
│ │ │ ├── new/
│ │ │ │ └── page.jsx # Create new DRM
│ │ │ ├── [id]/
│ │ │ │ ├── page.jsx # View/Edit DRM
│ │ │ │ ├── approve/
│ │ │ │ │ └── page.jsx # Admin approval page
│ │ │ │ └── layout.jsx
│ │ │ ├── layout.jsx
│ │ │ └── error.jsx
│ │ │
│ │ ├── reports/
│ │ │ ├── page.jsx # Reports dashboard
│ │ │ ├── daily/
│ │ │ │ └── page.jsx # Daily report with filters
│ │ │ ├── monthly/
│ │ │ │ └── page.jsx # Monthly report
│ │ │ ├── financial-year/
│ │ │ │ └── page.jsx # FY summary report
│ │ │ └── layout.jsx
│ │ │
│ │ ├── (supervisor-only)/
│ │ │ ├── supervisor/
│ │ │ │ ├── page.jsx # Supervisor dashboard
│ │ │ │ ├── queue/
│ │ │ │ │ └── page.jsx # DRM review queue
│ │ │ │ └── layout.jsx
│ │ │ ├── layout.jsx # Supervisor access check
│ │ │ └── error.jsx
│ │ │
│ │ ├── (admin-only)/
│ │ │ ├── admin/
│ │ │ │ ├── page.jsx # Admin dashboard
│ │ │ │ ├── offices/
│ │ │ │ │ ├── page.jsx # Manage offices
│ │ │ │ │ ├── [id]/
│ │ │ │ │ │ ├── page.jsx
│ │ │ │ │ │ └── edit/page.jsx
│ │ │ │ │ └── new/page.jsx
│ │ │ │ ├── users/
│ │ │ │ │ ├── page.jsx # User management
│ │ │ │ │ ├── [id]/
│ │ │ │ │ │ ├── page.jsx
│ │ │ │ │ │ └── edit/page.jsx
│ │ │ │ │ └── new/page.jsx
│ │ │ │ ├── drm-approval/
│ │ │ │ │ ├── page.jsx # DRM approval queue
│ │ │ │ │ └── [id]/page.jsx
│ │ │ │ ├── targets/
│ │ │ │ │ ├── page.jsx # Manage FY targets
│ │ │ │ │ ├── [id]/edit/page.jsx
│ │ │ │ │ └── import/page.jsx
│ │ │ │ ├── unlock-requests/
│ │ │ │ │ ├── page.jsx # Backdate unlock requests
│ │ │ │ │ └── [id]/page.jsx
│ │ │ │ ├── pdf-management/
│ │ │ │ │ ├── page.jsx # Generate/reprint PDFs
│ │ │ │ │ ├── bulk-generate/page.jsx
│ │ │ │ │ └── history/page.jsx
│ │ │ │ ├── audit-logs/
│ │ │ │ │ ├── page.jsx # View audit trail
│ │ │ │ │ └── [id]/page.jsx
│ │ │ │ ├── system-config/
│ │ │ │ │ ├── page.jsx # Global system settings
│ │ │ │ │ └── backup/page.jsx
│ │ │ │ └── layout.jsx
│ │ │ ├── (audit-admin-only)/
│ │ │ │ ├── audit/
│ │ │ │ │ ├── page.jsx # Audit dashboard (read-only)
│ │ │ │ │ ├── logs/
│ │ │ │ │ │ ├── page.jsx
│ │ │ │ │ │ └── [id]/page.jsx
│ │ │ │ │ ├── compliance/
│ │ │ │ │ │ ├── page.jsx
│ │ │ │ │ │ └── export/page.jsx
│ │ │ │ │ └── layout.jsx
│ │ │ │ └── layout.jsx # Audit admin access check
│ │ │ ├── layout.jsx # Admin access check
│ │ │ └── error.jsx
│ │ │
│ │ └── settings/
│ │ ├── page.jsx # User settings/profile
│ │ ├── 2fa/
│ │ │ ├── page.jsx # 2FA setup
│ │ │ └── verify/page.jsx
│ │ ├── password/page.jsx # Change password
│ │ └── layout.jsx
│ │
│ ├── api/
│ │ ├── auth/
│ │ │ ├── [...nextauth]/
│ │ │ │ └── route.js # NextAuth.js configuration
│ │ │ ├── login/
│ │ │ │ └── route.js # Custom login endpoint
│ │ │ ├── logout/
│ │ │ │ └── route.js
│ │ │ ├── verify-2fa/
│ │ │ │ └── route.js
│ │ │ ├── setup-2fa/
│ │ │ │ └── route.js
│ │ │ ├── password-reset/
│ │ │ │ └── route.js
│ │ │ └── refresh-token/
│ │ │ └── route.js
│ │ │
│ │ ├── metrics/
│ │ │ ├── route.js # GET /api/metrics (list)
│ │ │ ├── submit/route.js # POST /api/metrics/submit
│ │ │ ├── [id]/
│ │ │ │ ├── route.js # GET, PATCH, DELETE single metric
│ │ │ │ └── lock/route.js # Admin manual lock
│ │ │ ├── bulk/route.js # Bulk operations
│ │ │ └── export/route.js # CSV/Excel export
│ │ │
│ │ ├── drm/
│ │ │ ├── route.js # GET /api/drm (list)
│ │ │ ├── create/route.js # POST /api/drm/create
│ │ │ ├── [id]/
│ │ │ │ ├── route.js # GET, PATCH, DELETE DRM entry
│ │ │ │ ├── submit/route.js # User submit workflow
│ │ │ │ ├── approve/route.js # Admin approve
│ │ │ │ ├── reject/route.js # Admin reject with comments
│ │ │ │ ├── finalize/route.js # Admin finalize
│ │ │ │ └── reopen/route.js # Admin reopen (with audit)
│ │ │ └── export/route.js # Export DRM as PDF/CSV
│ │ │
│ │ ├── pdf/
│ │ │ ├── [id]/
│ │ │ │ ├── route.js # GET PDF (protected)
│ │ │ │ ├── download/route.js # Download with logging
│ │ │ │ ├── preview/route.js # HTML preview before print
│ │ │ │ └── regenerate/route.js # Admin regenerate
│ │ │ └── bulk-generate/route.js # Bulk PDF generation
│ │ │
│ │ ├── reports/
│ │ │ ├── daily/route.js
│ │ │ ├── monthly/route.js
│ │ │ ├── financial-year/route.js
│ │ │ ├── office-summary/route.js
│ │ │ ├── dc-summary/route.js
│ │ │ └── export/route.js
│ │ │
│ │ ├── admin/
│ │ │ ├── offices/
│ │ │ │ ├── route.js # CRUD operations
│ │ │ │ └── [id]/route.js
│ │ │ ├── users/
│ │ │ │ ├── route.js
│ │ │ │ ├── [id]/route.js
│ │ │ │ ├── [id]/roles/route.js # Update roles
│ │ │ │ └── seed-admins/route.js # Initialize 3 default admins
│ │ │ ├── targets/
│ │ │ │ ├── route.js
│ │ │ │ ├── [id]/route.js
│ │ │ │ └── import/route.js
│ │ │ ├── unlock-requests/
│ │ │ │ ├── route.js
│ │ │ │ ├── [id]/approve/route.js
│ │ │ │ └── [id]/reject/route.js
│ │ │ ├── adjustments/
│ │ │ │ ├── route.js # Create adjustment records
│ │ │ │ └── [id]/route.js
│ │ │ └── audit-logs/
│ │ │ ├── route.js
│ │ │ └── export/route.js
│ │ │
│ │ ├── health/route.js # Health check endpoint
│ │ └── ping/route.js # Simple ping for uptime monitoring
│ │
│ ├── error.jsx # Global error boundary
│ ├── not-found.jsx # 404 page
│ ├── layout.jsx # Root layout
│ └── page.jsx # Root / redirect to login or dashboard
│
├── middleware.ts # NextAuth middleware + rate limiting
├── lib/
│ ├── auth.ts # Auth utilities
│ ├── db.ts # MongoDB connection
│ ├── validators.ts # Zod schemas
│ ├── errors.ts # Error handling
│ ├── istTime.ts # IST timezone utilities
│ └── permissions.ts # RBAC helper functions
│
├── components/
│ ├── forms/
│ │ ├── MetricsForm.jsx
│ │ ├── DRMForm.jsx
│ │ ├── LoginForm.jsx
│ │ └── OfficeForm.jsx
│ ├── tables/
│ │ ├── MetricsTable.jsx
│ │ ├── DRMTable.jsx
│ │ └── AuditLogTable.jsx
│ ├── ui/
│ │ ├── Button.jsx
│ │ ├── Modal.jsx
│ │ ├── Sidebar.jsx
│ │ ├── Navbar.jsx
│ │ └── StatusBadge.jsx
│ ├── charts/
│ │ ├── TargetChart.jsx
│ │ ├── TrendChart.jsx
│ │ └── OfficeComparison.jsx
│ └── layouts/
│ ├── AuthLayout.jsx
│ ├── ProtectedLayout.jsx
│ └── AdminLayout.jsx
│
├── hooks/
│ ├── useAuth.js
│ ├── useMetrics.js
│ ├── useDRM.js
│ ├── useISTTime.js
│ └── useRolePermission.js
│
├── store/
│ ├── authStore.js # Zustand auth state
│ ├── uiStore.js # UI state (sidebar, modals)
│ ├── metricsStore.js # Metrics cache
│ └── drmStore.js # DRM workflow state
│
├── utils/
│ ├── api-client.js # Fetch wrapper
│ ├── formatters.js # Date, number formatting
│ ├── validators.js # Client-side validation
│ └── logger.js # Client logging
│
├── public/
│ ├── logo.svg
│ ├── favicon.ico
│ └── images/
│
├── .env.local # Environment variables (local)
├── .env.example
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── package.json
