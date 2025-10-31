import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import "./styles/nepali-theme.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Content from "./pages/Content/Content";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>लोड हुँदैछ...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div
      className="app"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/content" element={<Content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
