import mongoose from 'mongoose';

const UnlockRequestSchema = new mongoose.Schema(
  {
    officeId: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
      index: true,
    },
    requestedBy: {
      type: String, // User ID
      required: true,
    },
    reviewedBy: {
      type: String, // Admin User ID
    },
    reviewedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UnlockRequest =
  mongoose.models.UnlockRequest ||
  mongoose.model('UnlockRequest', UnlockRequestSchema);
