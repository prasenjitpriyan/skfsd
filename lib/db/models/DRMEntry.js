import mongoose from 'mongoose';

const drmBillSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, required: true },
    officeName: { type: String, required: true },
    utilizationPeriod: {
      fromDate: { type: Date, default: null },
      toDate: { type: Date, default: null },
    },
    numberOfDaysUtilized: { type: Number, default: 0 },
    hoursPerDay: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
  },
  { _id: false }
);

const drmEntrySchema = new mongoose.Schema(
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
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
      index: true,
    },
    year: {
      type: Number,
      required: true,
      index: true,
    },
    state: {
      type: String,
      enum: ['Draft', 'Submitted', 'Scrutinized', 'Finalized'],
      default: 'Draft',
      index: true,
    },
    bills: [drmBillSchema],
    totalAmount: {
      type: Number,
      default: 0,
    },
    submittedBy: String,
    submittedAt: Date,
    scrutinizedBy: String,
    scrutinizedAt: Date,
    scrutinyComments: String,
    finalizedBy: String,
    finalizedAt: Date,
    pdfVersion: {
      type: Number,
      default: 1,
    },
    pdfFilename: String,
  },
  {
    timestamps: true,
    collection: 'drm_entries',
  }
);

drmEntrySchema.index({ officeId: 1, month: 1, year: 1 }, { unique: true });
drmEntrySchema.index({ state: 1 });

drmEntrySchema.pre('save', function (next) {
  if (this.bills && this.bills.length > 0) {
    this.totalAmount = this.bills.reduce((sum, bill) => {
      return sum + bill.numberOfDaysUtilized * bill.hoursPerDay * bill.rate;
    }, 0);
  }
  next();
});

export const DRMEntry =
  mongoose.models.DRMEntry || mongoose.model('DRMEntry', drmEntrySchema);
