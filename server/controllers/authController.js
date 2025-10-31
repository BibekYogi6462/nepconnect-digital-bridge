import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, district, village, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "यो इमेल ठेगाना पहिले नै दर्ता भइसकेको छ",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      district,
      village,
      role: role || "user",
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "सफलतापूर्वक दर्ता भयो",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district,
        village: user.village,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "दर्ता गर्न असफल",
      error: error.message,
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and password is correct
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "अमान्य इमेल वा पासवर्ड",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "सफलतापूर्वक लगइन भयो",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        district: user.district,
        village: user.village,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "लगइन गर्न असफल",
      error: error.message,
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        district: user.district,
        village: user.village,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "प्रोफाइल प्राप्त गर्न असफल",
      error: error.message,
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, district, village } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, district, village },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "प्रोफाइल सफलतापूर्वक अद्यावधिक गरियो",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        district: user.district,
        village: user.village,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "प्रोफाइल अद्यावधिक गर्न असफल",
      error: error.message,
    });
  }
};
