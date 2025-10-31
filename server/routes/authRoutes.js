import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register - User registration
router.post("/register", register);

// POST /api/auth/login - User login
router.post("/login", login);

// GET /api/auth/profile - Get user profile (protected)
router.get("/profile", protect, getProfile);

// PUT /api/auth/profile - Update user profile (protected)
router.put("/profile", protect, updateProfile);

export default router;
