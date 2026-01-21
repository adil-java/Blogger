import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/blog.model.js";

// Add a new blog
export const addBlog = async (req, res) => {
  try {
    const { title, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );
    const imageFile = req.file;

    // Check required fields
    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizeImage = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280 },
      ],
    });

    const image = optimizeImage;
    const blog = await Blog.create({
      authorId: req.user.id,
      title,
      description,
      category,
      isPublished,
      image,
      author: req.user?.name || "Anonymous",
    });

    // Clean up temp file
    fs.unlinkSync(imageFile.path);

    res
      .status(201)
      .json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Add blog error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle publish status
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: `Blog ${blog.isPublished ? "published" : "unpublished"} successfully`,
      blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, isPublished } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, description, category, isPublished },
      { new: true },
    );

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const currentUserBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user.id }).sort({
      createdAt: -1,
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    res.json({
      success: true,
      blogs: blogs, // ← Return array, not single blog
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
