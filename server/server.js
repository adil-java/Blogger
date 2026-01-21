import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/admin.routes.js";
import blogRouter from "./routes/blog.routes.js";
import authRouter from "./routes/auth.routes.js";
import commentRouter from "./routes/comment.routes.js";

const app = express();

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Blogger API");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
