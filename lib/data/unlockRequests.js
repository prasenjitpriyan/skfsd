export const UnlockRequestStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
};

export const unlockRequests = [
  {
    id: 'unlock-001',
    requestedBy: 'user-5', // Sneha Das
    officeId: 'std-7',
    dateToUnlock: '2024-12-14',
    reason: 'I was on field duty and forgot to submit before leaving office',
    status: UnlockRequestStatus.PENDING,
    requestedAt: '2024-12-15T09:30:00Z',
  },
  {
    id: 'unlock-002',
    requestedBy: 'user-4',
    officeId: 'std-1',
    dateToUnlock: '2024-12-10',
    reason: 'System was down, unable to login',
    status: UnlockRequestStatus.APPROVED,
    requestedAt: '2024-12-11T08:00:00Z',
    reviewedBy: 'user-1',
    reviewedAt: '2024-12-11T09:00:00Z',
    reviewComments:
      'Approved. System downtime verified in logs. Unlock valid until 12:00 PM.',
    unlockExpiresAt: '2024-12-11T12:00:00Z',
  },
];

export const getPendingUnlockRequests = () =>
  unlockRequests.filter((r) => r.status === UnlockRequestStatus.PENDING);
