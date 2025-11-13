export const DRMStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  SUPERVISOR_APPROVED: 'SUPERVISOR_APPROVED',
  ADMIN_APPROVED: 'ADMIN_APPROVED',
  REJECTED: 'REJECTED',
  FINALIZED: 'FINALIZED',
};

export const DRMType = {
  INCIDENT: 'INCIDENT',
  MAINTENANCE: 'MAINTENANCE',
  UTILIZATION: 'UTILIZATION',
  GENERAL: 'GENERAL',
};

export const drmStatusConfig = {
  [DRMStatus.DRAFT]: {
    label: 'Draft',
    icon: '📝',
    color: 'gray',
  },
  [DRMStatus.SUBMITTED]: {
    label: 'Pending Review',
    icon: '⏳',
    color: 'yellow',
  },
  [DRMStatus.SUPERVISOR_APPROVED]: {
    label: 'Supervisor Approved',
    icon: '✓',
    color: 'blue',
  },
  [DRMStatus.ADMIN_APPROVED]: {
    label: 'Admin Approved',
    icon: '✅',
    color: 'green',
  },
  [DRMStatus.REJECTED]: {
    label: 'Rejected',
    icon: '❌',
    color: 'red',
  },
  [DRMStatus.FINALIZED]: {
    label: 'Finalized',
    icon: '🔒',
    color: 'green',
  },
};

export const drmTypeConfig = {
  [DRMType.INCIDENT]: { label: 'Incident', icon: '⚠️', color: 'red' },
  [DRMType.MAINTENANCE]: { label: 'Maintenance', icon: '🔧', color: 'blue' },
  [DRMType.UTILIZATION]: { label: 'Utilization', icon: '📊', color: 'green' },
  [DRMType.GENERAL]: { label: 'General', icon: '📋', color: 'gray' },
};

export const drmBills = [
  {
    id: 'drm-001',
    serialNumber: 'DRM/2024/001',
    officeId: 'std-1',
    type: DRMType.UTILIZATION,
    status: DRMStatus.FINALIZED,

    utilizationPeriod: {
      fromDate: '2024-12-12',
      toDate: '2024-12-14',
    },
    numberOfDaysUtilized: 3,
    hoursPerDay: 8,
    rate: 150,
    totalCost: 3600, // 3 days * 8 hrs * 150

    subject: 'Generator Utilization - Power Backup',
    description:
      'Diesel generator used during scheduled power maintenance by CESC. Main supply was disrupted from 9 AM to 5 PM daily.',

    submittedBy: 'user-4',
    submittedAt: '2024-12-14T16:00:00Z',

    supervisorApprovedBy: 'user-3',
    supervisorApprovedAt: '2024-12-14T18:00:00Z',
    supervisorComments: 'Verified. Usage justified due to power outage.',

    adminApprovedBy: 'user-1',
    adminApprovedAt: '2024-12-15T08:00:00Z',
    adminComments: 'Approved. Please ensure regular generator maintenance.',

    finalizedBy: 'user-1',
    finalizedAt: '2024-12-15T08:00:00Z',

    attachments: [],

    createdAt: '2024-12-14T15:00:00Z',
    updatedAt: '2024-12-15T08:00:00Z',
  },

  {
    id: 'drm-002',
    serialNumber: 'DRM/2024/002',
    officeId: 'std-12',
    type: DRMType.INCIDENT,
    status: DRMStatus.SUBMITTED,

    subject: 'System Downtime - Counter Operations',
    description:
      'POS system crash at counter 2 and 3 from 11:30 AM to 1:00 PM. Manual operations conducted. Issue resolved after server restart.',

    submittedBy: 'user-6',
    submittedAt: '2024-12-15T14:00:00Z',

    attachments: [],

    createdAt: '2024-12-15T13:30:00Z',
    updatedAt: '2024-12-15T14:00:00Z',
  },

  {
    id: 'drm-003',
    serialNumber: 'DRM/2024/003',
    officeId: 'std-7',
    type: DRMType.MAINTENANCE,
    status: DRMStatus.SUPERVISOR_APPROVED,

    subject: 'AC Maintenance - Server Room',
    description:
      'Annual maintenance of server room AC unit. Service completed by authorized vendor.',

    submittedBy: 'user-5',
    submittedAt: '2024-12-13T10:00:00Z',

    supervisorApprovedBy: 'user-3',
    supervisorApprovedAt: '2024-12-13T15:00:00Z',
    supervisorComments:
      'Maintenance records verified. Forwarding to admin for approval.',

    attachments: [
      {
        id: 'att-001',
        name: 'AC_Maintenance_Invoice.pdf',
        size: 245000,
        type: 'application/pdf',
        uploadedAt: '2024-12-13T10:05:00Z',
      },
    ],

    createdAt: '2024-12-13T09:30:00Z',
    updatedAt: '2024-12-13T15:00:00Z',
  },

  {
    id: 'drm-004',
    serialNumber: 'DRM/2024/004',
    officeId: 'std-16',
    type: DRMType.UTILIZATION,
    status: DRMStatus.ADMIN_APPROVED,

    utilizationPeriod: {
      fromDate: '2024-12-10',
      toDate: '2024-12-11',
    },
    numberOfDaysUtilized: 2,
    hoursPerDay: 6,
    rate: 150,
    totalCost: 1800,

    subject: 'Temporary Staff Utilization - Pension Day',
    description:
      'Additional counter staff hired for pension distribution day to handle increased footfall.',

    submittedBy: 'user-7',
    submittedAt: '2024-12-11T17:00:00Z',

    supervisorApprovedBy: 'user-3',
    supervisorApprovedAt: '2024-12-12T09:00:00Z',
    supervisorComments: 'Pension day support justified.',

    adminApprovedBy: 'user-2',
    adminApprovedAt: '2024-12-12T14:00:00Z',
    adminComments: 'Approved. Ensure time sheets are attached.',

    attachments: [],

    createdAt: '2024-12-11T16:30:00Z',
    updatedAt: '2024-12-12T14:00:00Z',
  },
];

export const getDRMByOffice = (officeId) =>
  drmBills.filter((d) => d.officeId === officeId);
export const getDRMByStatus = (status) =>
  drmBills.filter((d) => d.status === status);
export const getPendingDRMs = () =>
  drmBills.filter((d) => d.status === DRMStatus.SUBMITTED);
