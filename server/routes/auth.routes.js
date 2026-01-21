import express from "express";
import {
  signup,
  login,
  googleAuth,
  getProfile,
} from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const authRouter = express.Router();

// Public routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/google", googleAuth);

// Protected routes
authRouter.get("/profile", auth, getProfile);

export default authRouter;
