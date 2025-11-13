import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Standard', 'Delivery', 'Admin'],
      required: true,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    location: {
      type: String,
      trim: true,
    },
    deliveryCenterId: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'offices',
  }
);

officeSchema.index({ type: 1, active: 1 });
officeSchema.index({ deliveryCenterId: 1 });

export const Office =
  mongoose.models.Office || mongoose.model('Office', officeSchema);
