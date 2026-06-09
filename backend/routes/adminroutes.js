import express from 'express'
import { authorize, protect } from '../middlewares/authmiddleware.js';
import {
  getAllUsers,
  blockUser,
  deleteUser,
  getAllProperties,
  deleteProperty,
  getAllInquiries,
  getDashboardAnalytics,
  getPendingSellers,
  approveSeller
} from '../controllers/admincontroller.js';
import {
  approveBusiness,
  rejectBusiness,
  blockBusiness
} from "../controllers/admincontroller.js";

const adminRouter = express.Router();

adminRouter.use(protect, authorize("admin"));

adminRouter.get("/users", getAllUsers);
adminRouter.patch("/users/:id/block", blockUser);

adminRouter.delete("/users/:id", deleteUser);
adminRouter.get("/properties", getAllProperties);

adminRouter.delete("/properties/:id", deleteProperty);
adminRouter.get("/inquiries", getAllInquiries);

adminRouter.get("/stats", getDashboardAnalytics);
adminRouter.get("/pending-sellers", getPendingSellers);
adminRouter.patch("/approve-seller/:id", approveSeller);

adminRouter.patch("/business/:id/approve", approveBusiness);
adminRouter.patch("/business/:id/reject", rejectBusiness);
adminRouter.patch("/business/:id/block", blockBusiness);


export default adminRouter;