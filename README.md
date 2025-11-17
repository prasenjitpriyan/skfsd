opdms/
├── app/
│ ├── (auth)/ # Authentication routes (public)
│ │ ├── login/
│ │ │ └── page.jsx # Login form & logic
│ │ ├── signup/
│ │ │ └── page.jsx # User registration
│ │ ├── forgot-password/
│ │ │ └── page.jsx # Password recovery
│ │ ├── reset-password/
│ │ │ └── page.jsx # Reset with token
│ │ └── layout.jsx # Auth layout (no sidebar)
│ │
│ ├── (protected)/ # All authenticated routes
│ │ ├── layout.jsx # Main layout with sidebar/navbar
│ │ │
│ │ ├── dashboard/
│ │ │ ├── page.jsx # Role-aware dashboard
│ │ │ ├── layout.jsx
│ │ │ └── error.jsx
│ │ │
│ │ ├── metrics/ # Daily metrics management
│ │ │ ├── page.jsx # View all metrics
│ │ │ ├── [date]/
│ │ │ │ └── page.jsx # Edit/add metrics for specific date
│ │ │ ├── layout.jsx
│ │ │ └── error.jsx
│ │ │
│ │ ├── drm/ # DRM workflow management
│ │ │ ├── page.jsx # List all DRM entries
│ │ │ ├── new/
│ │ │ │ └── page.jsx # Create new DRM bill
│ │ │ ├── [id]/
│ │ │ │ ├── page.jsx # View/edit specific DRM
│ │ │ │ ├── approve/
│ │ │ │ │ └── page.jsx # Admin approval interface
│ │ │ │ └── layout.jsx
│ │ │ ├── layout.jsx
│ │ │ └── error.jsx
│ │ │
│ │ ├── reports/ # Analytics & reporting
│ │ │ ├── page.jsx # Reports dashboard
│ │ │ ├── daily/
│ │ │ │ └── page.jsx # Daily report view with filters
│ │ │ ├── monthly/
│ │ │ │ └── page.jsx # Monthly aggregated report
│ │ │ ├── financial-year/
│ │ │ │ └── page.jsx # FY summary with trends
│ │ │ └── layout.jsx
│ │ │
│ │ ├── (supervisor-only)/ # Supervisor role routes
│ │ │ ├── supervisor/
│ │ │ │ ├── page.jsx # Supervisor dashboard
│ │ │ │ ├── queue/
│ │ │ │ │ └── page.jsx # DRM approval queue
│ │ │ │ └── layout.jsx
│ │ │ ├── layout.jsx # Supervisor permission check
│ │ │ └── error.jsx
│ │ │
│ │ ├── (admin-only)/ # Admin role routes
│ │ │ ├── admin/
│ │ │ │ ├── page.jsx # Admin dashboard/home
│ │ │ │ ├── offices/
│ │ │ │ │ ├── page.jsx # Office list & CRUD
│ │ │ │ │ ├── [id]/
│ │ │ │ │ │ ├── page.jsx # View office details
│ │ │ │ │ │ └── edit/
│ │ │ │ │ │ └── page.jsx # Edit office
│ │ │ │ │ └── new/
│ │ │ │ │ └── page.jsx # Create new office
│ │ │ │ ├── users/
│ │ │ │ │ ├── page.jsx # User management
│ │ │ │ │ ├── [id]/
│ │ │ │ │ │ ├── page.jsx # User details
│ │ │ │ │ │ └── edit/
│ │ │ │ │ │ └── page.jsx # Edit user roles
│ │ │ │ │ └── new/
│ │ │ │ │ └── page.jsx # Create new user
│ │ │ │ ├── drm-approval/
│ │ │ │ │ ├── page.jsx # Approval queue
│ │ │ │ │ └── [id]/
│ │ │ │ │ └── page.jsx # Review & approve/reject DRM
│ │ │ │ ├── targets/
│ │ │ │ │ ├── page.jsx # Manage FY targets
│ │ │ │ │ ├── [id]/
│ │ │ │ │ │ └── edit/
│ │ │ │ │ │ └── page.jsx # Edit target
│ │ │ │ │ └── import/
│ │ │ │ │ └── page.jsx # Bulk import targets
│ │ │ │ ├── unlock-requests/
│ │ │ │ │ ├── page.jsx # Backdate unlock requests
│ │ │ │ │ └── [id]/
│ │ │ │ │ └── page.jsx # Review unlock request
│ │ │ │ ├── pdf-management/
│ │ │ │ │ ├── page.jsx # PDF generation/reprint
│ │ │ │ │ ├── bulk-generate/
│ │ │ │ │ │ └── page.jsx # Bulk PDF generation
│ │ │ │ │ └── history/
│ │ │ │ │ └── page.jsx # PDF generation history
│ │ │ │ ├── audit-logs/
│ │ │ │ │ ├── page.jsx # View audit trail
│ │ │ │ │ └── [id]/
│ │ │ │ │ └── page.jsx # Audit details
│ │ │ │ ├── system-config/
│ │ │ │ │ ├── page.jsx # System settings
│ │ │ │ │ └── backup/
│ │ │ │ │ └── page.jsx # Database backup
│ │ │ │ └── layout.jsx # Admin layout
│ │ │ ├── (audit-admin-only)/ # Audit admin role
│ │ │ │ ├── audit/
│ │ │ │ │ ├── page.jsx # Audit dashboard (read-only)
│ │ │ │ │ ├── logs/
│ │ │ │ │ │ ├── page.jsx # Complete audit logs
│ │ │ │ │ │ └── [id]/
│ │ │ │ │ │ └── page.jsx # Log details
│ │ │ │ │ ├── compliance/
│ │ │ │ │ │ ├── page.jsx # Compliance reports
│ │ │ │ │ │ └── export/
│ │ │ │ │ │ └── page.jsx # Export compliance data
│ │ │ │ │ └── layout.jsx
│ │ │ │ └── layout.jsx # Audit admin permission
│ │ │ ├── layout.jsx # Admin permission check
│ │ │ └── error.jsx
│ │ │
│ │ └── settings/ # User settings
│ │ ├── page.jsx # Profile settings
│ │ ├── 2fa/
│ │ │ ├── page.jsx # 2FA setup
│ │ │ └── verify/
│ │ │ └── page.jsx # Verify TOTP
│ │ ├── password/
│ │ │ └── page.jsx # Change password
│ │ └── layout.jsx
│ │
│ ├── api/ # API routes
│ │ ├── auth/
│ │ │ ├── [...nextauth]/
│ │ │ │ └── route.js # NextAuth.js handler
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
│ │ │ ├── route.js # GET list, POST create
│ │ │ ├── submit/
│ │ │ │ └── route.js # Submit metrics (with IST cutoff check)
│ │ │ ├── [id]/
│ │ │ │ ├── route.js # GET, PATCH, DELETE single metric
│ │ │ │ └── lock/
│ │ │ │ └── route.js # Admin manual lock
│ │ │ ├── bulk/
│ │ │ │ └── route.js # Bulk operations
│ │ │ └── export/
│ │ │ └── route.js # CSV/Excel export
│ │ │
│ │ ├── drm/
│ │ │ ├── route.js # GET list
│ │ │ ├── create/
│ │ │ │ └── route.js # Create DRM entry
│ │ │ ├── [id]/
│ │ │ │ ├── route.js # GET, PATCH, DELETE
│ │ │ │ ├── submit/
│ │ │ │ │ └── route.js # User submit
│ │ │ │ ├── approve/
│ │ │ │ │ └── route.js # Admin approve
│ │ │ │ ├── reject/
│ │ │ │ │ └── route.js # Admin reject
│ │ │ │ ├── finalize/
│ │ │ │ │ └── route.js # Admin finalize
│ │ │ │ └── reopen/
│ │ │ │ └── route.js # Admin reopen
│ │ │ └── export/
│ │ │ └── route.js # Export as PDF/CSV
│ │ │
│ │ ├── pdf/
│ │ │ ├── [id]/
│ │ │ │ ├── route.js # GET PDF (protected)
│ │ │ │ ├── download/
│ │ │ │ │ └── route.js # Download with logging
│ │ │ │ ├── preview/
│ │ │ │ │ └── route.js # Preview before print
│ │ │ │ └── regenerate/
│ │ │ │ └── route.js # Admin regenerate
│ │ │ └── bulk-generate/
│ │ │ └── route.js
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
│ │ │ │ ├── route.js # CRUD offices
│ │ │ │ └── [id]/route.js
│ │ │ ├── users/
│ │ │ │ ├── route.js
│ │ │ │ ├── [id]/route.js
│ │ │ │ ├── [id]/roles/route.js
│ │ │ │ └── seed-admins/route.js
│ │ │ ├── targets/
│ │ │ │ ├── route.js
│ │ │ │ ├── [id]/route.js
│ │ │ │ └── import/route.js
│ │ │ ├── unlock-requests/
│ │ │ │ ├── route.js
│ │ │ │ ├── [id]/approve/route.js
│ │ │ │ └── [id]/reject/route.js
│ │ │ ├── adjustments/
│ │ │ │ ├── route.js
│ │ │ │ └── [id]/route.js
│ │ │ └── audit-logs/
│ │ │ ├── route.js
│ │ │ └── export/route.js
│ │ │
│ │ ├── health/route.js # Health check
│ │ └── ping/route.js # Uptime ping
│ │
│ ├── error.jsx # Global error boundary
│ ├── not-found.jsx # 404 page
│ ├── layout.jsx # Root layout
│ └── page.jsx # Landing page / redirect
│
├── data/
│ └── index.js # All static data & configurations
│
├── lib/
│ ├── auth.js # Auth utilities
│ ├── db.js # MongoDB connection
│ ├── validators.js # Zod validation schemas
│ ├── errors.js # Error handling utilities
│ ├── istTime.js # IST timezone utilities
│ └── permissions.js # RBAC helper functions
│
├── models/
│ ├── User.js # User schema
│ ├── Office.js # Office schema
│ ├── DeliveryCenter.js # Delivery center schema
│ ├── DailyMetric.js # Daily metrics schema
│ ├── DRMEntry.js # DRM billing schema
│ ├── AuditLog.js # Audit log schema
│ ├── Target.js # FY targets schema
│ └── PDFRecord.js # PDF metadata schema
│
├── components/
│ ├── forms/
│ │ ├── MetricsForm.jsx # Daily metrics entry form
│ │ ├── DRMForm.jsx # DRM bill entry form
│ │ ├── LoginForm.jsx # Login form
│ │ ├── OfficeForm.jsx # Office management form
│ │ └── TargetForm.jsx # Target management form
│ ├── tables/
│ │ ├── MetricsTable.jsx # Metrics data table
│ │ ├── DRMTable.jsx # DRM entries table
│ │ ├── AuditLogTable.jsx # Audit log table
│ │ └── OfficeTable.jsx # Office listing table
│ ├── ui/
│ │ ├── Button.jsx # Reusable button component
│ │ ├── Modal.jsx # Modal/dialog component
│ │ ├── Sidebar.jsx # Navigation sidebar
│ │ ├── Navbar.jsx # Top navigation bar
│ │ ├── StatusBadge.jsx # Status indicator badge
│ │ ├── Loading.jsx # Loading skeleton
│ │ └── Toast.jsx # Toast notifications
│ ├── charts/
│ │ ├── TargetChart.jsx # Target achievement chart
│ │ ├── TrendChart.jsx # Trends over time
│ │ └── OfficeComparison.jsx # Multi-office comparison
│ └── layouts/
│ ├── AuthLayout.jsx # Auth pages layout
│ ├── ProtectedLayout.jsx # Protected pages layout
│ └── AdminLayout.jsx # Admin-specific layout
│
├── hooks/
│ ├── useAuth.js # Auth state & functions
│ ├── useMetrics.js # Metrics data fetching
│ ├── useDRM.js # DRM workflow logic
│ ├── useISTTime.js # IST time utilities
│ ├── useRolePermission.js # Permission checking
│ └── useLocalStorage.js # Local storage management
│
├── store/
│ ├── authStore.js # Zustand auth state
│ ├── uiStore.js # UI state (sidebar, modals)
│ ├── metricsStore.js # Metrics cache
│ └── drmStore.js # DRM workflow state
│
├── services/
│ ├── pdfService.js # PDF generation
│ ├── emailService.js # Email notifications
│ ├── auditService.js # Audit logging
│ ├── cronService.js # Scheduled jobs
│ └── reportService.js # Report generation
│
├── utils/
│ ├── api-client.js # Fetch wrapper with auth
│ ├── formatters.js # Date/number formatting
│ ├── validators.js # Client-side validation
│ ├── logger.js # Client-side logging
│ └── constants.js # App constants
│
├── public/
│ ├── logo.svg # Logo file
│ ├── favicon.ico # Favicon
│ └── images/
│ ├── hero.jpg
│ ├── dashboard-preview.png
│ └── features/
│
├── .env.local # Local environment variables
├── .env.example # Example env template
├── .gitignore # Git ignore rules
├── next.config.js # Next.js configuration
├── middleware.js # Next.js middleware
├── tsconfig.json # TypeScript config
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js # PostCSS config
├── package.json # Dependencies
├── docker-compose.yml # Docker services
├── Dockerfile # Production Docker image
├── .github/
│ └── workflows/
│ └── deploy.yml # CI/CD pipeline
└── README.md # Project documentation

┌─────────────────────────────────────────────────────────────┐
│ DATA LAYER (/data) │
│ • allOffices (40 standards + 4 DCs + 1 admin) │
│ • Daily/Delivery data templates │
│ • DRM bill template │
│ • Metrics definitions │
│ • Financial year config │
└──────────────┬──────────────────────────────────────────────┘
│
├─────────────┬──────────────┬────────────────┐
▼ ▼ ▼ ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Components│ │ API │ │ Hooks │ │ Store │
│ & Pages │ │ Routes │ │ (Zustand)│ │(Database)│
└─────┬────┘ └────┬─────┘ └────┬────┘ └─────┬────┘
│ │ │ │
└────────────┼─────────────┼────────────┘
▼
┌─────────────────┐
│ MongoDB DB │
│ (Persistent) │
└─────────────────┘

📋 OPDMS UX Files Available
I can generate complete, production-ready JSX code for any of these files. Just request them by name or category:

🏠 Core Pages
✅ Landing Page - app/page.jsx (Already provided)

Login Page - app/(auth)/login/page.jsx

Dashboard - app/(protected)/dashboard/page.jsx

Daily Metrics List - app/(protected)/metrics/page.jsx

Daily Metrics Entry - app/(protected)/metrics/[date]/page.jsx

DRM List - app/(protected)/drm/page.jsx

DRM Details - app/(protected)/drm/[id]/page.jsx

DRM Create - app/(protected)/drm/new/page.jsx

Reports Dashboard - app/(protected)/reports/page.jsx

Profile/Settings - app/(protected)/settings/page.jsx

👨‍💼 Admin Pages
Admin Dashboard - app/(protected)/(admin-only)/admin/page.jsx

Office Management - app/(protected)/(admin-only)/admin/offices/page.jsx

User Management - app/(protected)/(admin-only)/admin/users/page.jsx

DRM Approval Queue - app/(protected)/(admin-only)/admin/drm-approval/page.jsx

Audit Logs - app/(protected)/(admin-only)/admin/audit-logs/page.jsx

🧩 Reusable Components
Sidebar Navigation - components/layouts/Sidebar.jsx

Navbar - components/layouts/Navbar.jsx

Protected Layout - components/layouts/ProtectedLayout.jsx

Metrics Form - components/forms/MetricsForm.jsx

DRM Form - components/forms/DRMForm.jsx

Status Badge - components/ui/StatusBadge.jsx

Button - components/ui/Button.jsx

Modal - components/ui/Modal.jsx

Loading Spinner - components/ui/Loading.jsx

Toast Notification - components/ui/Toast.jsx

📊 Data Tables
Metrics Table - components/tables/MetricsTable.jsx

DRM Table - components/tables/DRMTable.jsx

Office Table - components/tables/OfficeTable.jsx

Audit Log Table - components/tables/AuditLogTable.jsx

📈 Charts & Analytics
Target Chart - components/charts/TargetChart.jsx

Trend Chart - components/charts/TrendChart.jsx

Office Comparison - components/charts/OfficeComparison.jsx
