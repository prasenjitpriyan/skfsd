import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'office', 'delivery'],
      required: true,
    },
    officeName: {
      type: String,
      required: function () {
        return this.role === 'office' || this.role === 'delivery';
      },
    },
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
