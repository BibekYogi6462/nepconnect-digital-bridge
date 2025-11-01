import express from "express";
import {
  getContent,
  getContentByCategory,
  getContentById,
  downloadContent,
  createContent,
} from "../controllers/contentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/content - Get all content
router.get("/", getContent);

// GET /api/content/category/:category - Get content by category
router.get("/category/:category", getContentByCategory);

// GET /api/content/:id - Get single content
router.get("/:id", getContentById);

// POST /api/content/:id/download - Track download
router.post("/:id/download", downloadContent);

// POST /api/content - Create new content (protected)
router.post("/", protect, createContent);

export default router;
