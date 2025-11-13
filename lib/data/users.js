// User roles enum
export const UserRole = {
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  OPERATOR: 'OPERATOR', // Data entry user
  AUDIT_ADMIN: 'AUDIT_ADMIN',
};

// Role configuration
export const roleConfig = {
  [UserRole.ADMIN]: {
    label: 'Administrator',
    icon: '👑',
    color: 'red',
    permissions: ['all'],
    level: 4,
  },
  [UserRole.SUPERVISOR]: {
    label: 'Supervisor',
    icon: '👔',
    color: 'purple',
    permissions: ['view_all', 'approve_drm', 'view_reports'],
    level: 3,
  },
  [UserRole.OPERATOR]: {
    label: 'Operator',
    icon: '👤',
    color: 'blue',
    permissions: ['submit_metrics', 'create_drm', 'view_own'],
    level: 1,
  },
  [UserRole.AUDIT_ADMIN]: {
    label: 'Audit Admin',
    icon: '🔍',
    color: 'orange',
    permissions: ['view_all', 'export_audit', 'compliance'],
    level: 3,
  },
};

// Mock users
export const users = [
  // Admin users
  {
    id: 'user-1',
    employeeId: 'EMP001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@indiapost.gov.in',
    phone: '+91-98300-12345',
    role: UserRole.ADMIN,
    officeId: 'adm-1',
    designation: 'Superintendent',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: '2024-12-15T08:30:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
  },
  {
    id: 'user-2',
    employeeId: 'EMP002',
    name: 'Priya Sharma',
    email: 'priya.sharma@indiapost.gov.in',
    phone: '+91-98300-12346',
    role: UserRole.ADMIN,
    officeId: 'adm-1',
    designation: 'Assistant Superintendent',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: '2024-12-15T09:00:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: false, push: true },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
  },

  // Supervisor
  {
    id: 'user-3',
    employeeId: 'EMP003',
    name: 'Amit Banerjee',
    email: 'amit.banerjee@indiapost.gov.in',
    phone: '+91-98300-12347',
    role: UserRole.SUPERVISOR,
    officeId: 'adm-1',
    designation: 'Inspector of Posts',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
    lastLogin: '2024-12-15T08:45:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: true, push: false },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
  },

  // Operators (Standard offices)
  {
    id: 'user-4',
    employeeId: 'EMP101',
    name: 'Ramesh Mukherjee',
    email: 'ramesh.m@indiapost.gov.in',
    phone: '+91-98300-12401',
    role: UserRole.OPERATOR,
    officeId: 'std-1', // Ballygunge
    designation: 'Postmaster',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
    lastLogin: '2024-12-15T09:15:00Z',
    createdAt: '2023-02-01T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: false, push: true },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
    stats: {
      onTimeSubmissions: 145,
      totalSubmissions: 148,
      onTimePercentage: 98,
    },
  },
  {
    id: 'user-5',
    employeeId: 'EMP102',
    name: 'Sneha Das',
    email: 'sneha.das@indiapost.gov.in',
    phone: '+91-98300-12402',
    role: UserRole.OPERATOR,
    officeId: 'std-7', // Dhakuria
    designation: 'Postmaster',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
    lastLogin: '2024-12-14T17:30:00Z', // Hasn't logged in today
    createdAt: '2023-02-15T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: true, push: false },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
    stats: {
      onTimeSubmissions: 132,
      totalSubmissions: 148,
      onTimePercentage: 89,
    },
  },
  {
    id: 'user-6',
    employeeId: 'EMP103',
    name: 'Sunil Chatterjee',
    email: 'sunil.c@indiapost.gov.in',
    phone: '+91-98300-12403',
    role: UserRole.OPERATOR,
    officeId: 'std-12', // Gariahat Market
    designation: 'Postmaster',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: '2024-12-15T08:50:00Z',
    createdAt: '2023-03-01T00:00:00Z',
    preferences: {
      theme: 'dark',
      notifications: { email: true, sms: true, push: true },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
    stats: {
      onTimeSubmissions: 148,
      totalSubmissions: 148,
      onTimePercentage: 100,
    },
  },
  {
    id: 'user-7',
    employeeId: 'EMP104',
    name: 'Anita Roy',
    email: 'anita.roy@indiapost.gov.in',
    phone: '+91-98300-12404',
    role: UserRole.OPERATOR,
    officeId: 'std-16', // Golpark
    designation: 'Postmaster',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
    lastLogin: '2024-12-15T09:00:00Z',
    createdAt: '2023-03-15T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: false, push: true },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
    stats: {
      onTimeSubmissions: 140,
      totalSubmissions: 148,
      onTimePercentage: 95,
    },
  },

  // Delivery Center Operators
  {
    id: 'user-8',
    employeeId: 'EMP201',
    name: 'Kaushik Ghosh',
    email: 'kaushik.g@indiapost.gov.in',
    phone: '+91-98300-12501',
    role: UserRole.OPERATOR,
    officeId: 'del-1', // Ballygunge DC
    designation: 'Delivery Supervisor',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
    lastLogin: '2024-12-15T08:40:00Z',
    createdAt: '2023-04-01T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: true, push: true },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
    stats: {
      onTimeSubmissions: 146,
      totalSubmissions: 148,
      onTimePercentage: 99,
    },
  },
  {
    id: 'user-9',
    employeeId: 'EMP202',
    name: 'Dipak Sen',
    email: 'dipak.sen@indiapost.gov.in',
    phone: '+91-98300-12502',
    role: UserRole.OPERATOR,
    officeId: 'del-2', // Jadavpur University DC
    designation: 'Delivery Supervisor',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
    lastLogin: '2024-12-15T09:10:00Z',
    createdAt: '2023-04-15T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: false, push: false },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
    stats: {
      onTimeSubmissions: 143,
      totalSubmissions: 148,
      onTimePercentage: 97,
    },
  },

  // Audit Admin
  {
    id: 'user-10',
    employeeId: 'EMP301',
    name: 'Sabyasachi Mitra',
    email: 'sabyasachi.m@indiapost.gov.in',
    phone: '+91-98300-12601',
    role: UserRole.AUDIT_ADMIN,
    officeId: 'adm-1',
    designation: 'Audit Officer',
    avatar: null,
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: true,
    lastLogin: '2024-12-15T08:00:00Z',
    createdAt: '2023-05-01T00:00:00Z',
    preferences: {
      theme: 'light',
      notifications: { email: true, sms: false, push: true },
      language: 'en',
      timezone: 'Asia/Kolkata',
    },
  },
];

// Helper functions
export const getUserById = (id) => users.find((u) => u.id === id);
export const getUsersByRole = (role) => users.filter((u) => u.role === role);
export const getUsersByOffice = (officeId) =>
  users.filter((u) => u.officeId === officeId);
export const getActiveUsers = () => users.filter((u) => u.isActive);
