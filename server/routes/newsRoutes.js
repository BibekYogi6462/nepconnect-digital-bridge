import express from "express";
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getNewsByCategory,
} from "../controllers/newsController.js";

const router = express.Router();

// GET /api/news - Get all news
router.get("/", getNews);

// GET /api/news/category/:category - Get news by category
router.get("/category/:category", getNewsByCategory);

// GET /api/news/:id - Get single news
router.get("/:id", getNewsById);

// POST /api/news - Create new news (for admin/coordinators)
router.post("/", createNews);

// PUT /api/news/:id - Update news
router.put("/:id", updateNews);

// DELETE /api/news/:id - Delete news
router.delete("/:id", deleteNews);

export default router;
