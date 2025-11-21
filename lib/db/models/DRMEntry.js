import mongoose from 'mongoose';

const drmEntrySchema = new mongoose.Schema(
  {
    officeId: {
      type: String,
      required: true,
      index: true,
    },
    officeName: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    utilizationPeriod: {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
    },
    numberOfDaysUtilized: {
      type: Number,
      required: true,
    },
    hoursPerDay: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
      default: 'Draft',
      index: true,
    },
    rejectionReason: {
      type: String,
    },
    submittedAt: {
      type: Date,
    },
    approvedAt: {
      type: Date,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one DRM entry per office per month/year (unless we want multiple?)
// Assuming one bill per month for now, but let's keep it flexible or enforce uniqueness if required.
// For now, let's index for faster queries.
drmEntrySchema.index({ officeId: 1, month: 1, year: 1 });

export const DRMEntry =
  mongoose.models.DRMEntry || mongoose.model('DRMEntry', drmEntrySchema);
