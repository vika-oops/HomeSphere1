import Property from "../models/propertymodel.js";
import inquiry from "../models/inquirymodel.js";
import { uploadToCloudinary } from "../utils/uploadtoCloudinary.js";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
 
 
// Add a property
export const addProperty = async (req, res) => {
  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }
 
    const property = await Property.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
      area: req.body.area,
      propertyType: req.body.propertyType,
      bhk: req.body.bhk ? Number(req.body.bhk) : undefined,
      bathroom: req.body.bathroom ? Number(req.body.bathroom) : undefined,
      areaSize: req.body.areaSize ? Number(req.body.areaSize) : undefined,
      furnishing: req.body.furnishing,
      status: req.body.status,
      images: imageUrls,
      seller: req.user._id,
      amenities: req.body.amenities
        ? Array.isArray(req.body.amenities)
          ? req.body.amenities
          : (() => {
              try {
                return JSON.parse(req.body.amenities);
              } catch (e) {
                return req.body.amenities.split(",");
              }
            })()
        : [],
    });
 
    res.json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("ADD_PROPERTY_ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error while adding property",
    });
  }
};
 
// to get my properties
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      seller: req.user._id,
    });
    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
// update a property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
 
    const fields = [
      "title",
      "description",
      "price",
      "city",
      "area",
      "propertyType",
      "bhk",
      "bathroom",
      "areaSize",
      "furnishing",
      "status",
      "amenities",
    ];
 
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "amenities" && typeof req.body[field] === "string") {
          try {
            property[field] = JSON.parse(req.body[field]);
          } catch (e) {
            property[field] = req.body[field].split(",");
          }
        } else {
          property[field] = req.body[field];
        }
      }
    });
 
    if (req.body.existingImages) {
      try {
        const existing = JSON.parse(req.body.existingImages);
        property.images = Array.isArray(existing) ? existing : property.images;
      } catch (e) {
        console.error("failed to parse existingImages:", e);
      }
    }
 
    if (req.files && req.files.length > 0) {
      let newImages = [];
      for (let file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "properties");
        newImages.push(result.secure_url);
      }
      property.images = [...property.images, ...newImages];
    }
 
    await property.save();
 
    res.json({
      success: true,
      message: "Property updated",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
// to delete a property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found", // FIX: was "messasge"
      });
    }
 
    // check the ownership
    if (property.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized", // FIX: was "messasge"
      });
    }
 
    // delete image from cloudinary
    for (let imageUrl of property.images) {
      const publicId = imageUrl.split("/").pop().split(",")[0];
      await cloudinary.uploader.destroy("properties/" + publicId);
    }
 
    await property.deleteOne();
    res.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
// update property status
export const updatePropertyStatus = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found", // FIX: was "messasge"
      });
    }
 
    // check the ownership
    if (property.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized", // FIX: was "messasge"
      });
    }
 
    property.status = req.body.status;
    await property.save();
    res.json({ // FIX: was res.JSON
      success: true,
      message: "Property status updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
// to get all properties
export const getAllProperties = async (req, res) => {
  try {
    const {
      city,
      area,
      propertyType,
      furnishing,
      status,
      minPrice, // FIX: was minprice
      maxPrice, // FIX: was maxprice
      amenities,
      sort,
      seller,
    } = req.query;
 
    let query = {
      status: "for_sale",
    };
 
    if (seller) query.seller = seller;
    if (city) query.city = new RegExp(city, "i");
    if (area) query.area = new RegExp(area, "i");
    if (propertyType) query.propertyType = propertyType;
 
    if (furnishing) {
      const furnishingArray = furnishing.split(",");
      query.furnishing = {
        $in: furnishingArray.map((f) => new RegExp(`^${f.trim()}$`, "i")), // FIX: was '^$(f.trim())$' (not a template literal)
      };
    }
    if (status) query.status = status;
 
    if (minPrice || maxPrice) { // FIX: was minprice/maxprice
      query.price = {};
      if (minPrice && !isNaN(minPrice)) query.price.$gte = Number(minPrice);
      if (maxPrice && !isNaN(maxPrice)) query.price.$lte = Number(maxPrice);
      if (Object.keys(query.price).length === 0) delete query.price;
    }
 
    if (amenities) {
      query.amenities = {
        $in: amenities.split(",").map((a) => a.trim()),
      };
    }
 
    let sortOption = { createdAt: -1 };
    if (sort === "priceLow") sortOption = { price: 1 };
    if (sort === "priceHigh") sortOption = { price: -1 };
    if (sort === "newest") sortOption = { createdAt: -1 };
 
    const properties = await Property.find({})
      .populate("seller", "name phone profilePic email")
      .sort(sortOption);
 
    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching properties",
      error: error.message,
    });
  }
};
 
// to get property details
export const getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "seller",
      "name email phone profilePic"
    );
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found", // FIX: was "messasge"
      });
    }
 
    // unique view tracking by Id
    let visitorId = req.ip; // FIX: was visitoId
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) { // FIX: was authheader
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        visitorId = decoded.id; // FIX: was decode.id
      } catch (err) {
        // ignore
      }
    }
 
    const isSellerChecking = visitorId === property.seller._id.toString(); // FIX: was isSellingChecking
    // only increment the view if not seller
    if (!isSellerChecking && !property.viewedBy.includes(visitorId)) {
      property.views += 1; // FIX: was property.views == 1
      property.viewedBy.push(visitorId);
      await property.save();
    }
 
    const similarProperties = await Property.find({
      _id: { $ne: property._id }, // FIX: was _.id
      city: property.city,
      area: property.area,
      propertyType: property.propertyType,
      status: property.status, // FIX: was "property.status" (string literal)
    })
      .limit(4)
      .select("title price images city area propertyType bhk areaSize status");
 
    res.json({
      success: true,
      property,
      similarProperties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
// seller dashboard
export const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id; // FIX: was req.user_id
 
    const totalProperties = await Property.countDocuments({ seller: sellerId });
    const activeListings = await Property.countDocuments({
      seller: sellerId,
      status: "for_sale",
    });
    const soldProperties = await Property.countDocuments({
      seller: sellerId,
      status: "sold",
    });
 
    const totalInquiries = await inquiry.countDocuments({ seller: sellerId }); // FIX: was Inquiry (wrong casing)
 
    // calculate total views for all properties
    const viewData = await Property.aggregate([ // FIX: was .aggregate({ — must be array
      { $match: { seller: sellerId } }, // FIX: was (seller: sellerId)
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);
    const totalViews = viewData.length > 0 ? viewData[0].totalViews : 0;
 
    res.json({
      success: true,
      stats: {
        totalProperties,
        activeListings,
        soldProperties,
        totalInquiries, // FIX: was totalInquires (typo)
        totalViews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
// get property counts by type
export const getPropertyCountsByType = async (req, res) => {
  try {
    const counts = await Property.aggregate([
      { $match: { status: "for_sale" } },
      { $group: { _id: "$propertyType", count: { $sum: 1 } } },
    ]);
 
    const formattedCounts = counts.reduce((acc, curr) => { // FIX: was ({acc, curr} => — missing parentheses
      acc[curr._id] = curr.count;
      return acc; // FIX: was "return: acc"
    }, {});
 
    res.status(200).json({
      success: true,
      counts: formattedCounts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching counts",
      error: error.message, // FIX: was err.message
    });
  }
};
 