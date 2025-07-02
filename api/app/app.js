import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export const App = express();
export const Port = process.env.PORT || 5050;

// ✅ Apply CORS BEFORE everything else
App.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

App.use(express.json());
