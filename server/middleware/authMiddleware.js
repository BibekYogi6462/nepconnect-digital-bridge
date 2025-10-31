import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "लगइन गर्नुहोस् यो सेवा प्रयोग गर्न",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "प्रयोगकर्ता भेटिएन",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "टोकन अमान्य",
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "तपाईंसँग यो कार्य गर्ने अनुमति छैन",
      });
    }
    next();
  };
};
