import express from "express";
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  togglePublish,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.middleware.js";

const blogRouter = express.Router();

// Public routes
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:id", getBlogById);

// Protected routes (require authentication)
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.delete("/:id", auth, deleteBlog);
blogRouter.patch("/:id/toggle-publish", auth, togglePublish);
blogRouter.put("/:id", auth, updateBlog);

export default blogRouter;
