import express from "express";
import mongoose from "mongoose";
import noteRoutes from "./routes/noteRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use("/api", noteRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "your_default_mongo_uri")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

export default app;
