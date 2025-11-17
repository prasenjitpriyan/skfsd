export const officeTypes = {
  STANDARD: 'Standard',
  DELIVERY: 'Delivery',
  ADMIN: 'Admin',
};

export const allOffices = [
  // Administrative Office
  {
    id: 'adm-1',
    name: 'South Kolkata First Sub Division',
    type: officeTypes.ADMIN,
    active: true,
    timezone: 'Asia/Kolkata',
  },

  // Delivery Centers (4 total)
  {
    id: 'del-1',
    name: 'Ballygunge DC',
    type: officeTypes.DELIVERY,
    active: true,
  },
  {
    id: 'del-2',
    name: 'Jadavpur University DC',
    type: officeTypes.DELIVERY,
    active: true,
  },
  {
    id: 'del-3',
    name: 'Panchasayar DC',
    type: officeTypes.DELIVERY,
    active: true,
  },
  {
    id: 'del-4',
    name: 'Sarat Bose Road DC',
    type: officeTypes.DELIVERY,
    active: true,
  },

  // Standard Offices (40 total)
  {
    id: 'std-1',
    name: 'Ballygunge',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-2',
    name: 'Ballygunge SC',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-3',
    name: 'Ballygunge RS',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-4',
    name: 'Bijoygargh',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-5',
    name: 'Baghajatin',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-6',
    name: 'BG Patuli Township',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-7',
    name: 'Dhakuria',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-8',
    name: 'Doverlane',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-9',
    name: 'East Kolkata Township',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-10',
    name: 'Garfa',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-11',
    name: 'Garcha Road',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-12',
    name: 'Gariahat Market',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-13',
    name: 'Garia BT',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-14',
    name: 'Ganguly Bagan',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-15',
    name: 'Golfgreen',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-16',
    name: 'Golpark',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-17',
    name: 'Haltu',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-18',
    name: 'Jadavgargh',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-19',
    name: 'Jodhpur Park',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-20',
    name: 'Jadavpur University',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-21',
    name: 'Kalikapur',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-22',
    name: 'K P Roy Lane',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-23',
    name: 'Kasba',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-24',
    name: 'Lake Gardens',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-25',
    name: 'Lake Market',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-26',
    name: 'Madurdaha',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-27',
    name: 'Mukundapur',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-28',
    name: 'Naktala',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-29',
    name: 'PGH Shah Road',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-30',
    name: 'Purbachal Main Road',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-31',
    name: 'Panchasayar',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-32',
    name: 'Raipur Jorabagan',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-33',
    name: 'Rash Behari Avenue',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-2',
    active: true,
  },
  {
    id: 'std-34',
    name: 'R K Seva Pratisthan',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-35',
    name: 'Regent Estate',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
  {
    id: 'std-36',
    name: 'Sarat Bose Road',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-37',
    name: 'Santoshpur DSO',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-38',
    name: 'Santoshpur Avenue',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-4',
    active: true,
  },
  {
    id: 'std-39',
    name: 'Sammilani Mahavidyalaya',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-3',
    active: true,
  },
  {
    id: 'std-40',
    name: 'Viveknagar',
    type: officeTypes.STANDARD,
    deliveryCenterId: 'del-1',
    active: true,
  },
];

// ============================================================================
// OFFICE HELPERS
// ============================================================================

export function getOfficeById(id) {
  return allOffices.find((office) => office.id === id);
}

export function getDeliveryCenters() {
  return allOffices.filter((office) => office.type === officeTypes.DELIVERY);
}

export function getStandardOffices() {
  return allOffices.filter((office) => office.type === officeTypes.STANDARD);
}

export function getOfficesByDeliveryCenter(deliveryCenterId) {
  return allOffices.filter(
    (office) => office.deliveryCenterId === deliveryCenterId
  );
}

// ============================================================================
// DRM BILL TEMPLATE
// ============================================================================

export const drmBillTemplate = {
  serialNumber: 0,
  officeName: '',
  utilizationPeriod: {
    fromDate: null,
    toDate: null,
  },
  numberOfDaysUtilized: 0,
  hoursPerDay: 0,
  rate: 0,
};

// ============================================================================
// DAILY OFFICE DATA TEMPLATE
// ============================================================================

export const dailyOfficeDataTemplate = {
  serial: 0,
  officeName: '',
  posb: {
    totalPosbAccountOpened: 0,
    totalPosbAccountClosed: 0,
  },
  booking: {
    numberOfArticlesBooked: 0,
    collectionOfAmount: 0,
  },
  ippb: {
    ippbAccountOpen: 0,
    ippbPremiumAccountOpen: 0,
    giInsurance: 0,
  },
  pliRpli: {
    numberOfNewPolicyIndexed: 0,
    sumAssured: 0,
    amountOfFirstYearPremium: 0,
    amountOfRenewalPremium: 0,
  },
  aadhaar: {
    numberOfTotalTransaction: 0,
    collectionOfAmount: 0,
  },
  philately: {
    myStampProcurement: 0,
  },
};

// ============================================================================
// DELIVERY OFFICE DATA TEMPLATE
// ============================================================================

export const deliveryOfficeDataTemplate = {
  serial: 0,
  officeName: '',
  delivery: {
    totalNumberOfArticlesIssuedToBeats: 0,
    totalNumberOfArticleDelivered: 0,
  },
};

// ============================================================================
// STORED DATA INITIAL STATE
// ============================================================================

export const initialData = {
  drmBills: [],
  dailyReports: [],
  deliveryReports: [],
};

// ============================================================================
// METRICS DEFINITIONS
// ============================================================================

export const metricsDefinitions = {
  posb_accounts_opened: {
    label: 'POSB Accounts Opened',
    unit: 'count',
    category: 'POSB',
  },
  posb_accounts_closed: {
    label: 'POSB Accounts Closed',
    unit: 'count',
    category: 'POSB',
  },
  booking_articles_booked: {
    label: 'Articles Booked',
    unit: 'count',
    category: 'Booking',
  },
  booking_collection_amount: {
    label: 'Collection Amount',
    unit: 'amount',
    category: 'Booking',
  },
  ippb_account_open: {
    label: 'IPPB Accounts Opened',
    unit: 'count',
    category: 'IPPB',
  },
  ippb_premium_account_open: {
    label: 'IPPB Premium Accounts Opened',
    unit: 'count',
    category: 'IPPB',
  },
  gi_insurance: {
    label: 'GI Insurance',
    unit: 'count',
    category: 'IPPB',
  },
  pli_new_policy_indexed: {
    label: 'New Policies Indexed',
    unit: 'count',
    category: 'PLI/RPLI',
  },
  pli_sum_assured: {
    label: 'Sum Assured',
    unit: 'amount',
    category: 'PLI/RPLI',
  },
  pli_first_year_premium: {
    label: 'First Year Premium',
    unit: 'amount',
    category: 'PLI/RPLI',
  },
  pli_renewal_premium: {
    label: 'Renewal Premium',
    unit: 'amount',
    category: 'PLI/RPLI',
  },
  aadhaar_transactions: {
    label: 'Aadhaar Transactions',
    unit: 'count',
    category: 'Aadhaar',
  },
  aadhaar_collection_amount: {
    label: 'Aadhaar Collection Amount',
    unit: 'amount',
    category: 'Aadhaar',
  },
  philately_my_stamp_procurement: {
    label: 'My Stamp Procurement',
    unit: 'amount',
    category: 'Philately',
  },
  delivery_articles_issued: {
    label: 'Articles Issued to Beats',
    unit: 'count',
    category: 'Delivery',
  },
  delivery_articles_delivered: {
    label: 'Articles Delivered',
    unit: 'count',
    category: 'Delivery',
  },
};

// ============================================================================
// FINANCIAL YEAR CONFIG
// ============================================================================

export const financialYearConfig = {
  startMonth: 4,
  startDay: 1,
  endMonth: 3,
  endDay: 31,
  currencySymbol: '₹',
  currencyCode: 'INR',
};

export function getCurrentFinancialYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let fyYear = currentYear;
  if (currentMonth < 3) {
    fyYear = currentYear - 1;
  }

  return {
    year: fyYear,
    fyStart: new Date(fyYear, 3, 1),
    fyEnd: new Date(fyYear + 1, 2, 31),
    label: `FY ${fyYear}-${fyYear + 1}`,
  };
}

// ============================================================================
// EXPORT ALL
// ============================================================================

const opdmsData = {
  officeTypes,
  allOffices,
  getOfficeById,
  getDeliveryCenters,
  getStandardOffices,
  getOfficesByDeliveryCenter,
  drmBillTemplate,
  dailyOfficeDataTemplate,
  deliveryOfficeDataTemplate,
  initialData,
  metricsDefinitions,
  financialYearConfig,
  getCurrentFinancialYear,
};

export default opdmsData;
