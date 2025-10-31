import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1
            style={{
              color: "var(--nepal-blue)",
              fontSize: "3rem",
              marginBottom: "1rem",
            }}
          >
            नेपकनेक्टमा स्वागत छ!
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#666",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            गाउँघरलाई डिजिटल सँगै जोड्दै। तपाईंको समुदायसँग जोडिन, जानकारी
            साट्न, र सामुदायिक विकासमा सहभागी हुन यो मंच प्रयोग गर्नुहोस्।
          </p>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Link
              to="/register"
              style={{
                backgroundColor: "var(--nepal-crimson)",
                color: "white",
                padding: "12px 30px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
              }}
            >
              सदस्य बन्नुहोस्
            </Link>
            <Link
              to="/login"
              style={{
                border: "2px solid var(--nepal-blue)",
                color: "var(--nepal-blue)",
                padding: "12px 30px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
              }}
            >
              लगइन गर्नुहोस्
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard for logged-in users
  return (
    <div style={{ padding: "2rem 0" }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            color: "var(--nepal-blue)",
            fontSize: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          नमस्ते, {user.name}! 👋
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          तपाईंको सामुदायिक ड्यासबोर्डमा स्वागत छ
        </p>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderLeft: "4px solid var(--nepal-blue)",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "var(--nepal-blue)",
            }}
          >
            ०
          </div>
          <div style={{ color: "#666", marginTop: "0.5rem" }}>पोस्टहरू</div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderLeft: "4px solid var(--terai-green)",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "var(--terai-green)",
            }}
          >
            ०
          </div>
          <div style={{ color: "#666", marginTop: "0.5rem" }}>टिप्पणीहरू</div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderLeft: "4px solid var(--nepal-crimson)",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "var(--nepal-crimson)",
            }}
          >
            ०
          </div>
          <div style={{ color: "#666", marginTop: "0.5rem" }}>अनुयायीहरू</div>
        </div>
      </div>

      {/* Quick Actions & Features */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "var(--nepal-blue)", marginBottom: "1.5rem" }}>
          छिटो कार्यहरू
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <Link to="/content" style={{ textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                border: "2px solid #e2e8f0",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = "var(--nepal-blue)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📝</div>
              <h3
                style={{ color: "var(--nepal-blue)", marginBottom: "0.5rem" }}
              >
                सामग्री सिर्जना गर्नुहोस्
              </h3>
              <p style={{ color: "#666", margin: 0 }}>
                नयाँ सामग्री, लेख, वा ब्लग पोस्ट सिर्जना गर्नुहोस्
              </p>
            </div>
          </Link>

          <Link to="/news" style={{ textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                border: "2px solid #e2e8f0",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = "var(--terai-green)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📰</div>
              <h3
                style={{ color: "var(--terai-green)", marginBottom: "0.5rem" }}
              >
                समाचार हेर्नुहोस्
              </h3>
              <p style={{ color: "#666", margin: 0 }}>
                नयाँ समाचार र अपडेटहरू पढ्नुहोस्
              </p>
            </div>
          </Link>

          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                border: "2px solid #e2e8f0",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = "var(--nepal-crimson)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>👤</div>
              <h3
                style={{
                  color: "var(--nepal-crimson)",
                  marginBottom: "0.5rem",
                }}
              >
                प्रोफाइल व्यवस्थापन
              </h3>
              <p style={{ color: "#666", margin: 0 }}>
                तपाईंको प्रोफाइल जानकारी अद्यावधिक गर्नुहोस्
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{ color: "var(--nepal-blue)", marginBottom: "1.5rem" }}>
          भर्खरको गतिविधि
        </h2>
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#666",
              padding: "3rem",
              border: "2px dashed #e2e8f0",
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
            <p style={{ margin: 0, fontSize: "1.1rem" }}>
              कुनै गतिविधि छैन। सामग्री सिर्जना गरेर सुरु गर्नुहोस्!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
