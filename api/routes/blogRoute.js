// import express from "express";
// import { getAuth, requireAuth } from "@clerk/express";
// import { createBlog, listBlogs } from "../services/blogService.js";

// const router = express.Router();

// /** GET /api/blogs  – public list */
// router.get("/", async (_, res) => {
//   const blogs = await listBlogs();
//   res.json(blogs);
// });

// /** POST /api/blogs – logged‑in users only */
// router.post("/", requireAuth(), async (req, res, next) => {
//   try {
//     const { userId } = getAuth(req);
//     const { title, description } = req.body;

//     const newBlog = await createBlog({ title, description, createdBy: userId });
//     res.status(201).json(newBlog);
//   } catch (err) {
//     next(err);
//   }
// });

// export default router;
