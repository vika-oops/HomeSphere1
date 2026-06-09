import express from "express";
import {
  createBusinessProfile,
  getAllBusinessProfiles,
  getBusinessProfileById,
  updateBusinessProfile,
  deleteBusinessProfile,
} from "../controllers/businessprofilecontroller.js";

import { protect, authorize } from "../middlewares/authmiddleware.js";

const router = express.Router();

// CREATE BUSINESS PROFILE (logged-in user only)
router.post("/", protect, createBusinessProfile);

// GET ALL BUSINESS PROFILES (public marketplace)
router.get("/", getAllBusinessProfiles);

// GET SINGLE BUSINESS PROFILE
router.get("/:id", getBusinessProfileById);

// UPDATE BUSINESS PROFILE (owner only)
router.put("/:id", protect, updateBusinessProfile);

// DELETE BUSINESS PROFILE (owner or admin)
router.delete("/:id", protect, authorize("admin", "seller"), deleteBusinessProfile);

export default router;