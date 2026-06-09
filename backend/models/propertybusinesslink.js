import mongoose from "mongoose";

const propertyBusinessLinkSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessProfile",
      required: true,
    },

    role: {
      type: String,
      enum: [
        "interior_designer",
        "cleaner",
        "mover",
        "agent",
        "security",
        "property_manager",
        "other",
      ],
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

const PropertyBusinessLink = mongoose.model(
  "PropertyBusinessLink",
  propertyBusinessLinkSchema
);

export default PropertyBusinessLink;