import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
      enum: [
        'buyer',
        'seller',
        'admin',
        'Interior Designer',
        'AirBnB',
        'Architect',
        'Landlord',
        'Real Estate Agents',
        'Property Managers',
        'Construction Companies',
        'skilled workers',
        'Furniture and decor business',
        'Moving and Transport Servies',
        'Internet and Utilities Service Providers',
      ],
      default: 'buyer',
    },
    phone: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
    },
    address: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // verification token
    verificationToken: {
      type: String,
    },

    // password reset
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;

