import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    businessType: {
      type: String,
      enum: [
        "interior_designer",
        "airbnb_host",
        "architect",
        "landlord",
        "real_estate_agent",
        "property_manager",
        "construction_company",
        "skilled_worker",
        "furniture_decor_business",
        "moving_transport_service",
        "internet_utilities_provider",
      ],
      required: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    phone: {
      type: String,
    },

    location: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    documents: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "blocked"],
      default: "pending",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BusinessProfile", businessProfileSchema);