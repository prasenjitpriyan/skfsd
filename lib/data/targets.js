export const targets = [
  // Financial Year 2024-25 targets
  {
    id: 'target-fy-2024-25',
    financialYear: '2024-25',
    period: {
      startDate: '2024-04-01',
      endDate: '2025-03-31',
    },

    // Division-level targets
    division: {
      posb: {
        accountsOpened: 4800, // Per year
        monthlyTarget: 400,
        dailyTarget: 13,
      },
      booking: {
        articles: 120000,
        monthlyTarget: 10000,
        dailyTarget: 330,
        revenue: 6000000, // ₹60 lakhs
      },
      ippb: {
        accounts: 2400,
        monthlyTarget: 200,
        dailyTarget: 7,
        premiumAccounts: 720,
      },
      pliRpli: {
        policies: 1200,
        monthlyTarget: 100,
        dailyTarget: 3,
        sumAssured: 30000000, // ₹3 crore
      },
      delivery: {
        rate: 96, // 96% delivery rate target
      },
    },

    // Office-specific targets
    officeTargets: [
      {
        officeId: 'std-1', // Ballygunge
        posb: { daily: 10, monthly: 300 },
        booking: { daily: 230, monthly: 6900, revenue: 150000 },
        ippb: { daily: 6, monthly: 180 },
        pliRpli: { daily: 2, monthly: 60 },
      },
      {
        officeId: 'std-12', // Gariahat Market (larger office)
        posb: { daily: 15, monthly: 450 },
        booking: { daily: 350, monthly: 10500, revenue: 250000 },
        ippb: { daily: 10, monthly: 300 },
        pliRpli: { daily: 4, monthly: 120 },
      },
      {
        officeId: 'std-7', // Dhakuria
        posb: { daily: 12, monthly: 360 },
        booking: { daily: 280, monthly: 8400, revenue: 180000 },
        ippb: { daily: 7, monthly: 210 },
        pliRpli: { daily: 3, monthly: 90 },
      },
      // ... targets for other offices
    ],

    // Delivery center targets
    deliveryTargets: [
      {
        officeId: 'del-1',
        deliveryRate: 96,
        averageArticlesPerDay: 1200,
      },
      {
        officeId: 'del-2',
        deliveryRate: 96,
        averageArticlesPerDay: 1100,
      },
    ],

    createdBy: 'user-1',
    createdAt: '2024-03-15T00:00:00Z',
  },
];

export const getTargetForOffice = (officeId, fy = '2024-25') => {
  const fyTarget = targets.find((t) => t.financialYear === fy);
  return fyTarget?.officeTargets.find((ot) => ot.officeId === officeId);
};

export const getDivisionTarget = (fy = '2024-25') => {
  return targets.find((t) => t.financialYear === fy)?.division;
};
