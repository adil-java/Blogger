import express from "express";
import {
  addComment,
  getAllComments,
  getCommentsByBlogId,
  deleteComment,
  toggleApproval,
} from "../controllers/comment.controller.js";
import auth from "../middleware/auth.middleware.js";

const commentRouter = express.Router();

// Public routes
commentRouter.post("/add", addComment);
commentRouter.get("/blog/:blogId", getCommentsByBlogId);

// Protected routes (admin/writer only)
commentRouter.get("/all", auth, getAllComments);
commentRouter.delete("/:id", auth, deleteComment);
commentRouter.patch("/:id/toggle-approval", auth, toggleApproval);

export default commentRouter;
