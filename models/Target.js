import mongoose from 'mongoose';

const TargetSchema = new mongoose.Schema(
  {
    officeName: {
      type: String,
      required: true,
    },
    financialYear: {
      type: String,
      required: true,
    },
    accountOpen: Number,
    netAccountOpen: Number,
    bookingArticleAmount: Number,
    postalLifeInsuranceSumAssured: Number,
    firstYearPremiumCollection: Number,
    philatelyCollected: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Target || mongoose.model('Target', TargetSchema);
