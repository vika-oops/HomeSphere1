import express from 'express';
import { protect } from '../middlewares/authmiddleware.js';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlistcontroller.js';

const wishlistRouter = express.Router();

wishlistRouter.post("/:propertyId", protect, addToWishlist);
wishlistRouter.get("/", protect, getWishlist);
wishlistRouter.delete("/:propertyId", protect, removeFromWishlist);

export default wishlistRouter;