import express from 'express';
import { authorize, protect } from '../middlewares/authmiddleware.js';

import {
  sendInquiry,
  sendBusinessInquiry,
  getSellerInquiries,
  getMyInquiries,
  markInquiryRead,
  deleteInquiry,
} from '../controllers/inquirycontroller.js';

const inquiryRouter = express.Router();

// buyer sends property inquiry
inquiryRouter.post("/", protect, authorize("buyer"), sendInquiry);

// buyer sends business inquiry
inquiryRouter.post(
  "/business",
  protect,
  authorize("buyer"),
  sendBusinessInquiry
);

// seller views received inquiries
inquiryRouter.get(
  "/seller",
  protect,
  authorize("seller"),
  getSellerInquiries
);

inquiryRouter.get("/my", protect, getMyInquiries);
inquiryRouter.patch("/:id/read", protect, markInquiryRead);
inquiryRouter.delete("/:id", protect, deleteInquiry);

export default inquiryRouter;