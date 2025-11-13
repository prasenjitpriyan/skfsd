import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
    },
    roles: [
      {
        type: String,
        enum: [
          'Admin',
          'OfficeUser',
          'DeliveryUser',
          'Supervisor',
          'AuditAdmin',
        ],
        required: true,
      },
    ],
    officeIds: [
      {
        type: String,
        index: true,
      },
    ],
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
      index: true,
    },
    mustChangePassword: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    totpSecret: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    canBeDeleted: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

userSchema.index({ roles: 1 });
userSchema.index({ status: 1 });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
