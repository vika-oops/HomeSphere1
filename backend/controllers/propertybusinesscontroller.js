import PropertyBusinessLink from "../models/propertybusinesslink.js";
import Property from "../models/propertymodel.js";
import BusinessProfile from "../models/businessProfile.js";

// Link business to property
export const linkBusinessToProperty = async (req, res) => {
  try {
    const { propertyId, businessId, role } = req.body;

    const property = await Property.findById(propertyId);
    const business = await BusinessProfile.findById(businessId);

    if (!property || !business) {
      return res.status(404).json({
        success: false,
        message: "Property or Business not found",
      });
    }

    const link = await PropertyBusinessLink.create({
      property: propertyId,
      business: businessId,
      role,
    });

    res.status(201).json({
      success: true,
      message: "Business linked to property successfully",
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all businesses for a property
export const getPropertyBusinesses = async (req, res) => {
  try {
    const links = await PropertyBusinessLink.find({
      property: req.params.propertyId,
    })
      .populate("business")
      .populate("property", "title city price");

    res.json({
      success: true,
      count: links.length,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove a business from property
export const removeBusinessFromProperty = async (req, res) => {
  try {
    await PropertyBusinessLink.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Link removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};