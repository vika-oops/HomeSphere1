import express from "express";
import { getProfile, getPublicProfile, updateProfile} from "../controllers/userController.js";
import { protect } from "../middlewares/authmiddleware.js";
import upload from "../middlewares/uploadmiddleware.js";

const userRouter = express.Router();

userRouter.get("/profile", protect, getProfile);
userRouter.put("/profile/", protect, upload.single("profilePic"), updateProfile);
userRouter.get("/profile/:id", getPublicProfile);

export default userRouter;
