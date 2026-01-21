import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    img: {
      type: String, // Alias for frontend compatibility
    },
    author: {
      type: String,
      default: "Anonymous",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Virtual to ensure img field works (for backward compatibility)
blogSchema.virtual("displayImage").get(function () {
  return this.image || this.img;
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
