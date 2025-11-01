import express from "express";
import {
  getNews,
  getNewsByCategory,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/news - Get all news
router.get("/", getNews);

// GET /api/news/category/:category - Get news by category
router.get("/category/:category", getNewsByCategory);

// GET /api/news/:id - Get single news
router.get("/:id", getNewsById);

// POST /api/news - Create new news (protected)
router.post("/", protect, createNews);

// PUT /api/news/:id - Update news (protected)
router.put("/:id", protect, updateNews);

// DELETE /api/news/:id - Delete news (protected)
router.delete("/:id", protect, deleteNews);

export default router;
