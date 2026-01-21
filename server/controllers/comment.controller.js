import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";

// Add a comment to a blog
export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    if (!blogId || !name || !content) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const comment = await Comment.create({
      blog: blogId,
      name,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blog", "title")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get comments for a specific blog
export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle comment approval
export const toggleApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    comment.isApproved = !comment.isApproved;
    await comment.save();

    res.json({
      success: true,
      message: `Comment ${comment.isApproved ? "approved" : "hidden"}`,
      comment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
