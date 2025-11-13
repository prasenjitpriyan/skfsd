// Main export file
export * from './auditLogs';
export * from './deliveryMetrics';
export * from './drmBills';
export * from './metrics';
export * from './notifications';
export * from './offices';
export * from './targets';
export * from './unlockRequests';
export * from './users';

// Current session mock
export const currentSession = {
  user: {
    id: 'user-4',
    name: 'Ramesh Mukherjee',
    email: 'ramesh.m@indiapost.gov.in',
    role: 'OPERATOR',
    officeId: 'std-1',
  },
  token: 'mock-jwt-token',
  expiresAt: '2024-12-15T18:00:00Z',
};

// System config
export const systemConfig = {
  submissionDeadline: '10:00',
  timezone: 'Asia/Kolkata',
  financialYearStart: '04-01',
  features: {
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    autoLock: true,
  },
};
