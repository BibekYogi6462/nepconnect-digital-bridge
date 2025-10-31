import React, { useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import { useAuth } from "../../context/AuthContext"; // Fix the import path

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "var(--nepal-crimson)",
        color: "white",
        padding: "1rem 2rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "700" }}>
              नेपकनेक्ट
            </h1>
          </Link>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.9 }}>
            गाउँघरलाई डिजिटल सँगै जोड्दै
          </p>
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")
            }
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            गृहपृष्ठ
          </Link>

          <Link
            to="/news"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")
            }
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            समाचार
          </Link>

          <Link
            to="/content"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")
            }
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            सामग्री
          </Link>

          {/* User Menu */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: "600",
                }}
              >
                👤 {user.name}
              </button>

              {isMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "white",
                    color: "var(--text-dark)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                    minWidth: "150px",
                  }}
                >
                  <Link
                    to="/profile"
                    style={{
                      display: "block",
                      padding: "0.75rem 1rem",
                      color: "var(--text-dark)",
                      textDecoration: "none",
                      borderRadius: "4px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f7fafc")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    प्रोफाइल
                  </Link>
                  <button
                    onClick={logout}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      border: "none",
                      padding: "0.75rem 1rem",
                      color: "var(--nepal-crimson)",
                      cursor: "pointer",
                      borderRadius: "4px",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#fed7d7")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    लगआउट
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: "2px solid white",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "var(--nepal-crimson)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "white";
                }}
              >
                लगइन
              </Link>

              <Link
                to="/register"
                style={{
                  backgroundColor: "white",
                  color: "var(--nepal-crimson)",
                  textDecoration: "none",
                  fontWeight: "600",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "var(--nepal-blue)";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "var(--nepal-crimson)";
                }}
              >
                दर्ता
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
