import express from "express";
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  togglePublish,
  updateBlog,
  currentUserBlog,
} from "../controllers/blog.controller.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.middleware.js";
import blogGen from "../controllers/blog.gemini.js";

const blogRouter = express.Router();

// Public routes
blogRouter.get("/all", getAllBlogs);

// Protected routes (require authentication) - MUST BE BEFORE /:id
blogRouter.get("/my-blogs", auth, currentUserBlog);

// More routes
blogRouter.post("/generate",  blogGen);
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.delete("/:id", auth, deleteBlog);
blogRouter.patch("/:id/toggle-publish", auth, togglePublish);
blogRouter.put("/:id", auth, updateBlog);

// Public routes - MUST BE LAST
blogRouter.get("/:id", getBlogById);

export default blogRouter;
