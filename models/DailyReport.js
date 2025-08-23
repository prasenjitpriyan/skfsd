import mongoose from 'mongoose';

const DailyReportSchema = new mongoose.Schema(
  {
    officeName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalAccountOpened: Number,
    totalAccountClosed: Number,
    numberOfArticleBooked: Number,
    collectionAmount: Number,
    ippbAccountOpened: Number,
    ippbPremiumAccountOpened: Number,
    generalInsurancePolicyAcquired: Number,
    numberOfNewPolicyIndexed: Number,
    sumAssured: Number,
    amountFirstYearPremium: Number,
    amountRenewalPremium: Number,
    totalAadhaarTransactions: Number,
    collectionAmountAadhaar: Number,
    numberOfPhilately: Number,
    isSubmitted: {
      type: Boolean,
      default: false,
    },
    submittedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.DailyReport ||
  mongoose.model('DailyReport', DailyReportSchema);
