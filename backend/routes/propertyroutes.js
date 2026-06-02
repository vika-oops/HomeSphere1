import express from 'express';
import {
  addProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getMyProperties,
  updatePropertyStatus,
  getPropertyDetails,
  getSellerDashboard,
  getPropertyCountsByType
} from '../controllers/propertycontroller.js';
import { authorize, protect } from '../middlewares/authmiddleware.js';
import upload from '../middlewares/uploadmiddleware.js'; 

const propertyRouter = express.Router();

propertyRouter.get("/", getAllProperties);

//protect the routes that the seller can do these works
propertyRouter.post("/", protect, authorize("seller"), upload.array("images", 10), addProperty);
propertyRouter.get("/my", protect,authorize("seller"), getMyProperties);
propertyRouter.put("/:id", protect, authorize("seller"),upload.array("images",10), updateProperty);

propertyRouter.delete("/:id",protect, authorize("seller"), deleteProperty);
propertyRouter.patch("/:id/status",protect, authorize("seller"), updatePropertyStatus);

propertyRouter.get("/counts", getPropertyCountsByType);
propertyRouter.get("/:id",getPropertyDetails);

propertyRouter.get("/seller/dashboard",protect,authorize("seller"), getSellerDashboard);

export default propertyRouter;
