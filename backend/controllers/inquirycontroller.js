import Inquiry from "../models/inquirymodel.js";
import Property from "../models/propertymodel.js";
import BusinessProfile from "../models/businessProfile.js";

// buyer sends inquiry
export const sendInquiry = async (req, res) => {
try {

const { propertyId, message } = req.body;
const property = await Property.findById(propertyId);

if (!property) {
  return res.status(404).json({
    success: false,
    message: "Property not found",
  });
}



const inquiry = await Inquiry.create({
  property: property._id,
  buyer: req.user._id,
  seller: property.seller,
  message,
});

res.status(201).json({
  success: true,
  message: "Inquiry sent successfully!",
  inquiry,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// business inquiry
export const sendBusinessInquiry = async (req, res) => {
try {
const { businessId, message } = req.body;


const business = await BusinessProfile.findById(businessId);

if (!business) {
  return res.status(404).json({
    success: false,
    message: "Business not found",
  });
}

const inquiry = await Inquiry.create({
  buyer: req.user._id,
  seller: business.user,
  business: business._id,
  message,
});

res.status(201).json({
  success: true,
  message: "Business inquiry sent successfully!",
  inquiry,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// seller view inquiries
export const getSellerInquiries = async (req, res) => {
try {

const inquiries = await Inquiry.find({ seller: req.user._id })
.populate("property", "title city price images")
.populate("buyer", "name phone email")
.sort({ createdAt: -1 });



res.json({
  success: true,
  count: inquiries.length,
  inquiries,
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// buyer view inquiries
export const getMyInquiries = async (req, res) => {
try {
const inquiries = await Inquiry.find({ buyer: req.user._id })
.populate("property", "title city price images")
.populate("business", "businessName businessType location")
.populate("seller", "name phone email")
.sort({ createdAt: -1 });

res.json({
  success: true,
  count: inquiries.length,
  inquiries,
});

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// mark inquiry read
export const markInquiryRead = async (req, res) => {
try {
const inquiry = await Inquiry.findById(req.params.id);


if (!inquiry) {
  return res.status(404).json({
    success: false,
    message: "Inquiry not found",
  });
}

inquiry.isRead = true;
await inquiry.save();

res.json({
  success: true,
  message: "Inquiry marked as read",
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// delete inquiry
export const deleteInquiry = async (req, res) => {
try {
const inquiry = await Inquiry.findById(req.params.id);


if (!inquiry) {
  return res.status(404).json({
    success: false,
    message: "Inquiry not found",
  });
}

if (
  inquiry.buyer.toString() !== req.user._id.toString() &&
  inquiry.seller.toString() !== req.user._id.toString()
) {
  return res.status(403).json({
    success: false,
    message: "Not authorized",
  });
}

await inquiry.deleteOne();

res.json({
  success: true,
  message: "Inquiry deleted successfully",
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};
