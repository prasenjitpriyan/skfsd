import mongoose from 'mongoose';

const TargetSchema = new mongoose.Schema(
  {
    officeId: {
      type: String,
      required: true,
      index: true,
    },
    year: {
      type: Number,
      required: true,
      index: true,
    },
    targets: {
      booking: { type: Number, default: 0 },
      aadhaar: { type: Number, default: 0 },
      pli: { type: Number, default: 0 },
    },
    setBy: {
      type: String, // User ID of admin who set it
    },
  },
  { timestamps: true }
);

// Compound index to ensure one target per office per year
TargetSchema.index({ officeId: 1, year: 1 }, { unique: true });

export const Target =
  mongoose.models.Target || mongoose.model('Target', TargetSchema);
