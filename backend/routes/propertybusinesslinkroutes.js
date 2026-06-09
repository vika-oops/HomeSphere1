import express from "express";
import { protect, authorize } from "../middlewares/authmiddleware.js";

import {
  linkBusinessToProperty,
  getPropertyBusinesses,
  removeBusinessFromProperty,
} from "../controllers/propertybusinesscontroller.js";

const router = express.Router();

// Only admin or seller can link
router.post("/", protect, authorize("admin", "seller"), linkBusinessToProperty);

// Public view (any user can see services on property)
router.get("/:propertyId", getPropertyBusinesses);

// Only admin can remove links
router.delete("/:id", protect, authorize("admin"), removeBusinessFromProperty);

export default router;