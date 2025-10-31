import React from "react";
// import { useAuth } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "#666",
        }}
      >
        कृपया लगइन गर्नुहोस्
      </div>
    );
  }

  return (
    <div>
      <h1
        style={{
          color: "var(--nepal-blue)",
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        👤 तपाईंको प्रोफाइल
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            border: "2px solid var(--nepal-blue)",
          }}
        >
          <h3
            style={{
              color: "var(--nepal-blue)",
              marginBottom: "1.5rem",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "0.5rem",
            }}
          >
            व्यक्तिगत जानकारी
          </h3>

          <div style={{ marginBottom: "1rem" }}>
            <strong
              style={{
                color: "#666",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              नाम:
            </strong>
            <span style={{ fontSize: "1.1rem" }}>{user.name}</span>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong
              style={{
                color: "#666",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              इमेल:
            </strong>
            <span style={{ fontSize: "1.1rem" }}>{user.email}</span>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong
              style={{
                color: "#666",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              फोन:
            </strong>
            <span style={{ fontSize: "1.1rem" }}>{user.phone}</span>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong
              style={{
                color: "#666",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              जिल्ला:
            </strong>
            <span style={{ fontSize: "1.1rem" }}>{user.district}</span>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong
              style={{
                color: "#666",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              गाउँ/नगर:
            </strong>
            <span style={{ fontSize: "1.1rem" }}>{user.village}</span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            border: "2px solid var(--terai-green)",
          }}
        >
          <h3
            style={{
              color: "var(--terai-green)",
              marginBottom: "1.5rem",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "0.5rem",
            }}
          >
            गतिविधि
          </h3>

          <div
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              backgroundColor: "#f7fafc",
              borderRadius: "8px",
            }}
          >
            <strong
              style={{
                color: "#666",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              खाता प्रकार:
            </strong>
            <span
              style={{
                fontSize: "1.1rem",
                backgroundColor:
                  user.role === "community_coordinator"
                    ? "var(--nepal-crimson)"
                    : "var(--nepal-blue)",
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
              }}
            >
              {user.role === "community_coordinator"
                ? "सामुदायिक संयोजक"
                : "साधारण प्रयोगकर्ता"}
            </span>
          </div>

          <div
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              backgroundColor: "#f7fafc",
              borderRadius: "8px",
            }}
          >
            <strong
              style={{
                color: "#666",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              सदस्यता:
            </strong>
            <span style={{ fontSize: "1.1rem", color: "var(--terai-green)" }}>
              निःशुल्क
            </span>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={logout}
              style={{
                width: "100%",
                backgroundColor: "var(--nepal-crimson)",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#b01030";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "var(--nepal-crimson)";
              }}
            >
              लगआउट गर्नुहोस्
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
