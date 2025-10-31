import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

// Import routes
import contentRoutes from "./routes/contentRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nepconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("📦 MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "नेपकनेक्ट ब्याकेन्ड सर्भर",
    version: "1.0.0",
    description: "गाउँघरलाई डिजिटल सँगै जोड्दै",
  });
});

// API routes
app.use("/api/content", contentRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/news", newsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "सर्भरमा त्रुटि भयो",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
});
