import User from '../models/user model.js';
import Property from '../models/propertymodel.js';
import Inquiry from '../models/inquirymodel.js';
import BusinessProfile from '../models/businessProfile.js';

//view all users
export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password");
        res.json({
            success: true,
            count: users.length,
            users
        });
    }

    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//Block a particular user
export const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({
            success: true,
            message: user.isBlocked ? "User Blocked" : "User blocked successfully",
            isBlocked: user.isBlocked
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
       
//to delete a particular user 
export const deleteUser = async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "User deleted successfully!"
        })
    }
catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//view all properties
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate("seller", "name email");
        res.json({
            success: true,
            count: properties.length,
            properties
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// to delete a particular property
export const deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Property deleted successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//view all inquiries
export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find()
        .populate("property", "title price")
        .populate("buyer", "name email")
        .populate("seller", "name email")
        .sort({ createdAt: -1 });
        res.json({
            success: true,
            count: inquiries.length,
            inquiries
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// Dashboard analytics
export const getDashboardAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProperties = await Property.countDocuments();
        const totalInquiries = await Inquiry.countDocuments();
        const activeListings = await Property.countDocuments({
            status: "For_sale"
        });

        const soldProperties = await Property.countDocuments({
            status: "sold"
        });

        res.json({
            success: true,
            analytics: {
                totalUsers,
                totalProperties,
                totalInquiries,
                activeListings,
                soldProperties
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// to get pending seller account
export const getPendingSellers = async (req, res) => {
    try{
        const pendingSellers = await User.find({ role: "seller", isApproved: false }) .select("-password");
        //if you are the seller you will get approval from the admin panel
        res.json({
            success: true,
            count: pendingSellers.length,
            pendingSellers
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// to approve a seller
export const approveSeller = async (req, res) => {
    try {
        const seller = await User.findByIdAndUpdate(req.params.id);
            if (!seller || seller.role !== "seller") {
            return res.status(400).json({ 
            success:false,
            message: "User is not a seller or seller not found." 
            });
        }
        seller.isApproved = true;
        await seller.save();

        res.json({
            success: true,
            message: "Seller approved successfully!",
            seller
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// to delete a particular inquiry
export const deleteInquiry = async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Inquiry deleted successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//Unblock a particular user
export const unblockUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.isBlocked = false;
        await user.save();

        res.json({
            success: true,
            message: "User unblocked successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
// to approve business
export const approveBusiness = async (req, res) => {
  const business = await BusinessProfile.findById(req.params.id);

  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }

  business.status = "approved";
  await business.save();

  res.json({
    success: true,
    message: "Business approved"
  });
};

/// to reject business
export const rejectBusiness = async (req, res) => {
  const business = await BusinessProfile.findById(req.params.id);

  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }

  business.status = "rejected";
  await business.save();

  res.json({
    success: true,
    message: "Business rejected"
  });
};
 
//to block a business
export const blockBusiness = async (req, res) => {
  const business = await BusinessProfile.findById(req.params.id);

  if (!business) {
    return res.status(404).json({ message: "Business not found" });
  }

  business.status = "blocked";
  await business.save();

  res.json({
    success: true,
    message: "Business blocked"
  });
};