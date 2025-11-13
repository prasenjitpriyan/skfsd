export const AuditAction = {
  METRIC_CREATED: 'METRIC_CREATED',
  METRIC_UPDATED: 'METRIC_UPDATED',
  METRIC_SUBMITTED: 'METRIC_SUBMITTED',
  METRIC_LOCKED: 'METRIC_LOCKED',
  DRM_CREATED: 'DRM_CREATED',
  DRM_APPROVED: 'DRM_APPROVED',
  DRM_REJECTED: 'DRM_REJECTED',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  UNLOCK_APPROVED: 'UNLOCK_APPROVED',
};

export const auditLogs = [
  {
    id: 'audit-001',
    userId: 'user-4',
    action: AuditAction.METRIC_SUBMITTED,
    resource: 'Metric',
    resourceId: 'metric-std-1-2024-12-14',
    details: {
      officeId: 'std-1',
      date: '2024-12-14',
    },
    ipAddress: '103.xxx.xxx.xxx',
    userAgent: 'Mozilla/5.0...',
    timestamp: '2024-12-14T09:42:00Z',
  },
  {
    id: 'audit-002',
    userId: 'user-1',
    action: AuditAction.DRM_APPROVED,
    resource: 'DRM',
    resourceId: 'drm-001',
    details: {
      serialNumber: 'DRM/2024/001',
      comments: 'Approved. Please ensure regular generator maintenance.',
    },
    ipAddress: '103.xxx.xxx.xxx',
    userAgent: 'Mozilla/5.0...',
    timestamp: '2024-12-15T08:00:00Z',
  },
];
