import mongoose from 'mongoose';

const dailyOfficeDataSchema = new mongoose.Schema(
  {
    serial: { type: Number, required: true },
    officeName: { type: String, required: true },
    posb: {
      totalPosbAccountOpened: { type: Number, default: 0 },
      totalPosbAccountClosed: { type: Number, default: 0 },
    },
    booking: {
      numberOfArticlesBooked: { type: Number, default: 0 },
      collectionOfAmount: { type: Number, default: 0 },
    },
    ippb: {
      ippbAccountOpen: { type: Number, default: 0 },
      ippbPremiumAccountOpen: { type: Number, default: 0 },
      giInsurance: { type: Number, default: 0 },
    },
    pliRpli: {
      numberOfNewPolicyIndexed: { type: Number, default: 0 },
      sumAssured: { type: Number, default: 0 },
      amountOfFirstYearPremium: { type: Number, default: 0 },
      amountOfRenewalPremium: { type: Number, default: 0 },
    },
    aadhaar: {
      numberOfTotalTransaction: { type: Number, default: 0 },
      collectionOfAmount: { type: Number, default: 0 },
    },
    philately: {
      myStampProcurement: { type: Number, default: 0 },
    },
  },
  { _id: false }
);

const dailyDeliveryDataSchema = new mongoose.Schema(
  {
    serial: { type: Number, required: true },
    officeName: { type: String, required: true },
    delivery: {
      totalNumberOfArticlesIssuedToBeats: { type: Number, default: 0 },
      totalNumberOfArticleDelivered: { type: Number, default: 0 },
    },
  },
  { _id: false }
);

const dailyMetricSchema = new mongoose.Schema(
  {
    officeId: {
      type: String,
      required: true,
      index: true,
    },
    officeType: {
      type: String,
      enum: ['Standard', 'Delivery', 'Admin'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['Editable', 'Locked', 'Adjusted'],
      default: 'Editable',
      index: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    lockedAt: {
      type: Date,
    },
    submittedBy: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    adjustmentOf: {
      type: String,
      index: true,
    },
    adjustmentReason: {
      type: String,
    },
    adjustmentApprovedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'daily_metrics',
  }
);

dailyMetricSchema.index({ officeId: 1, date: 1 }, { unique: true });
dailyMetricSchema.index({ status: 1, date: 1 });

export const DailyMetric =
  mongoose.models.DailyMetric ||
  mongoose.model('DailyMetric', dailyMetricSchema);
