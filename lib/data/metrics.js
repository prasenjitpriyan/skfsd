import { format, subDays } from 'date-fns';

// Metric status enum
export const MetricStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  LOCKED: 'LOCKED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

// Status configuration
export const metricStatusConfig = {
  [MetricStatus.DRAFT]: {
    label: 'Draft',
    icon: '📝',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
  [MetricStatus.SUBMITTED]: {
    label: 'Submitted',
    icon: '📤',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  [MetricStatus.LOCKED]: {
    label: 'Locked',
    icon: '🔒',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  [MetricStatus.APPROVED]: {
    label: 'Approved',
    icon: '✅',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  [MetricStatus.REJECTED]: {
    label: 'Rejected',
    icon: '❌',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
};

// Generate metrics for past 30 days
const generateMetrics = () => {
  const metrics = [];
  const today = new Date();

  // Standard offices metrics
  const standardOfficeIds = [
    'std-1',
    'std-2',
    'std-7',
    'std-12',
    'std-16',
    'std-24',
    'std-33',
    'std-36',
  ];

  standardOfficeIds.forEach((officeId) => {
    for (let i = 0; i < 15; i++) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const isToday = i === 0;
      const isYesterday = i === 1;

      // Random data with some variation
      const baseMultiplier = officeId === 'std-12' ? 1.5 : 1; // Gariahat Market is busier

      metrics.push({
        id: `metric-${officeId}-${dateStr}`,
        officeId,
        date: dateStr,
        submittedBy: getUserForOffice(officeId),
        submittedAt: isToday ? null : `${dateStr}T09:${10 + i}:00Z`,
        status: isToday
          ? MetricStatus.DRAFT
          : isYesterday
          ? MetricStatus.SUBMITTED
          : MetricStatus.APPROVED,
        isLocked: !isToday,
        lockedAt: isToday ? null : `${dateStr}T10:00:00Z`,

        // POSB data
        posb: {
          totalAccountsOpened: Math.floor(
            (8 + Math.random() * 8) * baseMultiplier
          ),
          totalAccountsClosed: Math.floor(1 + Math.random() * 4),
          netChange: 0, // Calculated
        },

        // Booking data
        booking: {
          numberOfArticles: Math.floor(
            (200 + Math.random() * 100) * baseMultiplier
          ),
          collectionAmount: Math.floor(
            (15000 + Math.random() * 10000) * baseMultiplier
          ),
        },

        // IPPB data
        ippb: {
          accountsOpened: Math.floor((4 + Math.random() * 6) * baseMultiplier),
          premiumAccountsOpened: Math.floor(
            (1 + Math.random() * 3) * baseMultiplier
          ),
          giInsurance: Math.floor(Math.random() * 2),
        },

        // PLI/RPLI data
        pliRpli: {
          numberOfNewPolicies: Math.floor(
            (1 + Math.random() * 3) * baseMultiplier
          ),
          sumAssured: Math.floor(
            (200000 + Math.random() * 500000) * baseMultiplier
          ),
          firstYearPremium: Math.floor(
            (8000 + Math.random() * 8000) * baseMultiplier
          ),
          renewalPremium: Math.floor(
            (5000 + Math.random() * 8000) * baseMultiplier
          ),
        },

        // Aadhaar data
        aadhaar: {
          numberOfTransactions: Math.floor(
            (25 + Math.random() * 20) * baseMultiplier
          ),
          collectionAmount: 0, // Calculated as 50 * transactions
        },

        // Philately data
        philately: {
          myStampProcurement: Math.floor(
            (300 + Math.random() * 500) * baseMultiplier
          ),
        },

        remarks: i % 7 === 0 ? 'Heavy rush due to pension distribution' : null,

        // Metadata
        createdAt: `${dateStr}T08:00:00Z`,
        updatedAt: isToday
          ? `${dateStr}T09:00:00Z`
          : `${dateStr}T09:${10 + i}:00Z`,
      });
    }
  });

  // Calculate derived fields
  metrics.forEach((m) => {
    m.posb.netChange = m.posb.totalAccountsOpened - m.posb.totalAccountsClosed;
    m.aadhaar.collectionAmount = m.aadhaar.numberOfTransactions * 50;
  });

  return metrics;
};

// Helper to get user for office
const getUserForOffice = (officeId) => {
  const mapping = {
    'std-1': 'user-4',
    'std-2': 'user-5',
    'std-7': 'user-5',
    'std-12': 'user-6',
    'std-16': 'user-7',
  };
  return mapping[officeId] || 'user-4';
};

export const dailyMetrics = generateMetrics();

// Helper functions
export const getMetricsByOffice = (officeId) =>
  dailyMetrics.filter((m) => m.officeId === officeId);

export const getMetricsByDate = (date) =>
  dailyMetrics.filter((m) => m.date === date);

export const getMetricByOfficeAndDate = (officeId, date) =>
  dailyMetrics.find((m) => m.officeId === officeId && m.date === date);

export const getTodayMetrics = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return getMetricsByDate(today);
};

export const getSubmittedMetricsForDate = (date) =>
  dailyMetrics.filter(
    (m) => m.date === date && m.status !== MetricStatus.DRAFT
  );
