export const officeTypes = {
  STANDARD: 'Standard',
  DELIVERY: 'Delivery',
  ADMIN: 'Admin',
};

export const allOffices = [
  {
    id: 'adm-1',
    name: 'South Kolkata First Sub Division',
    type: officeTypes.ADMIN,
  },
  { id: 'del-1', name: 'Ballygunge DC', type: officeTypes.DELIVERY },
  { id: 'del-2', name: 'Jadavpur University DC', type: officeTypes.DELIVERY },
  { id: 'del-3', name: 'Panchasayar DC', type: officeTypes.DELIVERY },
  { id: 'del-4', name: 'Sarat Bose Road DC', type: officeTypes.DELIVERY },
  { id: 'std-1', name: 'Ballygunge', type: officeTypes.STANDARD },
  { id: 'std-2', name: 'Ballygunge SC', type: officeTypes.STANDARD },
  { id: 'std-3', name: 'Ballygunge RS', type: officeTypes.STANDARD },
  { id: 'std-4', name: 'Bijoygargh', type: officeTypes.STANDARD },
  { id: 'std-5', name: 'Baghajatin', type: officeTypes.STANDARD },
  { id: 'std-6', name: 'BG Patuli Township', type: officeTypes.STANDARD },
  { id: 'std-7', name: 'Dhakuria', type: officeTypes.STANDARD },
  { id: 'std-8', name: 'Doverlane', type: officeTypes.STANDARD },
  { id: 'std-9', name: 'East Kolkata Township', type: officeTypes.STANDARD },
  { id: 'std-10', name: 'Garfa', type: officeTypes.STANDARD },
  { id: 'std-11', name: 'Garcha Road', type: officeTypes.STANDARD },
  { id: 'std-12', name: 'Gariahat Market', type: officeTypes.STANDARD },
  { id: 'std-13', name: 'Garia BT', type: officeTypes.STANDARD },
  { id: 'std-14', name: 'Ganguly Bagan', type: officeTypes.STANDARD },
  { id: 'std-15', name: 'Golfgreen', type: officeTypes.STANDARD },
  { id: 'std-16', name: 'Golpark', type: officeTypes.STANDARD },
  { id: 'std-17', name: 'Haltu', type: officeTypes.STANDARD },
  { id: 'std-18', name: 'Jadavgargh', type: officeTypes.STANDARD },
  { id: 'std-19', name: 'Jodhpur Park', type: officeTypes.STANDARD },
  { id: 'std-20', name: 'Jadavpur University', type: officeTypes.STANDARD },
  { id: 'std-21', name: 'Kalikapur', type: officeTypes.STANDARD },
  { id: 'std-22', name: 'K P Roy Lane', type: officeTypes.STANDARD },
  { id: 'std-23', name: 'Kasba', type: officeTypes.STANDARD },
  { id: 'std-24', name: 'Lake Gardens', type: officeTypes.STANDARD },
  { id: 'std-25', name: 'Lake Market', type: officeTypes.STANDARD },
  { id: 'std-26', name: 'Madurdaha', type: officeTypes.STANDARD },
  { id: 'std-27', name: 'Mukundapur', type: officeTypes.STANDARD },
  { id: 'std-28', name: 'Naktala', type: officeTypes.STANDARD },
  { id: 'std-29', name: 'PGH Shah Road', type: officeTypes.STANDARD },
  { id: 'std-30', name: 'Purbachal Main Road', type: officeTypes.STANDARD },
  { id: 'std-31', name: 'Panchasayar', type: officeTypes.STANDARD },
  { id: 'std-32', name: 'Raipur Jorabagan', type: officeTypes.STANDARD },
  { id: 'std-33', name: 'Rash Behari Avenue', type: officeTypes.STANDARD },
  { id: 'std-34', name: 'R K Seva Pratisthan', type: officeTypes.STANDARD },
  { id: 'std-35', name: 'Regent Estate', type: officeTypes.STANDARD },
  { id: 'std-36', name: 'Sarat Bose Road', type: officeTypes.STANDARD },
  { id: 'std-37', name: 'Santoshpur DSO', type: officeTypes.STANDARD },
  { id: 'std-38', name: 'Santoshpur Avenue', type: officeTypes.STANDARD },
  { id: 'std-39', name: 'Sammilani Mahavidyalaya', type: officeTypes.STANDARD },
  { id: 'std-40', name: 'Viveknagar', type: officeTypes.STANDARD },
];

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

export const deliveryOfficeDataTemplate = {
  serial: 0,
  officeName: '',
  delivery: {
    totalNumberOfArticlesIssuedToBeats: 0,
    totalNumberOfArticleDelivered: 0,
  },
};

export const drmBillsData = [];
export const dailyReportsData = [];
export const deliveryReportsData = [];
