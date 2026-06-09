import BusinessProfile from "../models/businessProfile.js";

export const createBusinessProfile = async (req, res) => {
  try {
    const {
      businessType,
      businessName,
      description,
      phone,
      location,
      profileImage,
      documents,
    } = req.body;

    const profile = await BusinessProfile.create({
      user: req.user._id,
      businessType,
      businessName,
      description,
      phone,
      location,
      profileImage,
      documents,
    });

    res.status(201).json({
      success: true,
      message: "Business profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBusinessProfiles = async (req, res) => {
  try {
    const profiles = await BusinessProfile.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBusinessProfileById = async (req, res) => {
  try {
    const profile = await BusinessProfile.findById(req.params.id).populate(
      "user",
      "name email role"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found",
      });
    }

    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found",
      });
    }

    if (profile.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this profile",
      });
    }

    const updated = await BusinessProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found",
      });
    }

    if (
      profile.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this profile",
      });
    }

    await profile.deleteOne();

    res.json({
      success: true,
      message: "Business profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};