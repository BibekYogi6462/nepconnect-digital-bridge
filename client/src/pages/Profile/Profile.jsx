import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Fix import path

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    district: user?.district || "",
    village: user?.village || "",
  });

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: user.name,
      phone: user.phone,
      district: user.district,
      village: user.village,
    });
  };

  const handleSave = () => {
    // TODO: Add update profile API call
    setIsEditing(false);
    // Update user context with new data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user.name,
      phone: user.phone,
      district: user.district,
      village: user.village,
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            color: "var(--nepal-blue)",
            fontSize: "2rem",
            margin: 0,
          }}
        >
          👤 तपाईंको प्रोफाइल
        </h1>

        {!isEditing && (
          <button
            onClick={handleEdit}
            style={{
              backgroundColor: "var(--nepal-blue)",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ✏️ सम्पादन गर्नुहोस्
          </button>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Personal Information Card */}
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

          {!isEditing ? (
            // Display Mode
            <>
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
            </>
          ) : (
            // Edit Mode
            <>
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
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
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
                <input
                  type="text"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
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
                <select
                  value={editData.district}
                  onChange={(e) =>
                    setEditData({ ...editData, district: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                >
                  <option value="kathmandu">काठमाडौं</option>
                  <option value="lalitpur">ललितपुर</option>
                  <option value="bhaktapur">भक्तपुर</option>
                  <option value="kavre">काभ्रेपलाञ्चोक</option>
                  <option value="dhading">धादिङ</option>
                </select>
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
                <input
                  type="text"
                  value={editData.village}
                  onChange={(e) =>
                    setEditData({ ...editData, village: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div
                style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}
              >
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    backgroundColor: "var(--terai-green)",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  💾 सेभ गर्नुहोस्
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    backgroundColor: "#666",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  ❌ रद्द गर्नुहोस्
                </button>
              </div>
            </>
          )}
        </div>

        {/* Activity Card - Same as before */}
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
