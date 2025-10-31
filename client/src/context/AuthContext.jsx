import React, { createContext, useState, useEffect, useContext } from "react"; // Add useContext import

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend API base URL - adjust port if different
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // FIX: Use the correct endpoint /auth/profile instead of /auth/me
        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.user); // FIX: Access user from result object
        } else {
          // Token is invalid
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Register function - FIXED to call backend API
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
        return { success: true, user: result.user };
      } else {
        return {
          success: false,
          error: result.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  // Login function - FIXED to call backend API
  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ADD THIS useAuth HOOK:
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };
