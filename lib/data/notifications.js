export const NotificationType = {
  DEADLINE_REMINDER: 'DEADLINE_REMINDER',
  SUBMISSION_SUCCESS: 'SUBMISSION_SUCCESS',
  DRM_APPROVAL: 'DRM_APPROVAL',
  DRM_REJECTION: 'DRM_REJECTION',
  UNLOCK_APPROVED: 'UNLOCK_APPROVED',
  UNLOCK_REJECTED: 'UNLOCK_REJECTED',
  SYSTEM_ALERT: 'SYSTEM_ALERT',
};

export const notifications = [
  {
    id: 'notif-1',
    userId: 'user-4',
    type: NotificationType.DEADLINE_REMINDER,
    title: 'Submission Deadline Approaching',
    message:
      "Submit today's metrics before 10:00 AM IST (45 minutes remaining)",
    isRead: false,
    priority: 'high',
    actionUrl: '/metrics/submit',
    actionLabel: 'Submit Now',
    createdAt: '2024-12-15T09:15:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-4',
    type: NotificationType.DRM_APPROVAL,
    title: 'DRM Approved',
    message: 'Your DRM #DRM/2024/001 has been approved by Admin',
    isRead: false,
    priority: 'medium',
    actionUrl: '/drm/drm-001',
    actionLabel: 'View Details',
    createdAt: '2024-12-15T08:00:00Z',
  },
  {
    id: 'notif-3',
    userId: 'user-3', // Supervisor
    type: NotificationType.SYSTEM_ALERT,
    title: '3 DRMs Pending Review',
    message: 'You have 3 DRM bills awaiting your approval',
    isRead: false,
    priority: 'high',
    actionUrl: '/supervisor/queue',
    actionLabel: 'Review Now',
    createdAt: '2024-12-15T09:00:00Z',
  },
  {
    id: 'notif-4',
    userId: 'user-1', // Admin
    type: NotificationType.SYSTEM_ALERT,
    title: "15 Offices Haven't Submitted",
    message: 'Submission deadline in 45 minutes. 15 offices pending.',
    isRead: true,
    priority: 'high',
    actionUrl: '/admin/dashboard',
    actionLabel: 'View Details',
    createdAt: '2024-12-15T09:15:00Z',
  },
];

export const getNotificationsByUser = (userId) =>
  notifications.filter((n) => n.userId === userId);

export const getUnreadCount = (userId) =>
  notifications.filter((n) => n.userId === userId && !n.isRead).length;
