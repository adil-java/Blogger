import express from "express";
import auth from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

// Admin routes are now handled by /api/auth routes
// This router can be used for admin-specific operations

// Example: Admin-only dashboard stats (protected)
adminRouter.get("/stats", auth, (req, res) => {
  res.json({ success: true, message: "Admin stats endpoint" });
});

export default adminRouter;
