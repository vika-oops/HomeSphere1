import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      enum: [
        'house',
        'apartment',
        'land',
        'office',
        'flat',
        'villa',
        'studio',
        'AirBnB',
        'penthouse',
        'townhouse',
        'plot',
        'commercial',
      ],
      required: true,
    },

    bedrooms: {
      type: Number,
    },

    bathrooms: {
      type: Number,
    },

    bhk: {
      type: String,
    },

    areaSize: {
      type: Number,
    },

    furnishing: {
      type: String,
      enum: ['furnished', 'semi-furnished', 'unfurnished'],
    },

    amenities: [{ type: String }],

    images: [{ type: String }],

    status: {
      type: String,
      enum: ['for_sale', 'for_rent', 'sold', 'rented'],
      default: 'for_sale',
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    viewedBy: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;