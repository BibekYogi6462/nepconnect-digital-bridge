import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    district: "",
    village: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData);
      // Redirect will be handled by context
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const districts = [
    "काठमाडौं",
    "ललितपुर",
    "भक्तपुर",
    "पोखरा",
    "बिराटनगर",
    "बुटवल",
    "धरान",
    "नेपालगञ्ज",
  ];

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "2rem",
        border: "2px solid var(--nepal-blue)",
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "var(--nepal-blue)",
          marginBottom: "2rem",
        }}
      >
        नयाँ खाता दर्ता गर्नुहोस्
      </h2>

      {error && (
        <div
          style={{
            backgroundColor: "#fed7d7",
            color: "#c53030",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            पूरा नाम
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            इमेल ठेगाना
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            फोन नम्बर
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            जिल्ला
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          >
            <option value="">जिल्ला छान्नुहोस्</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            गाउँ/नगर
          </label>
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "var(--text-dark)",
            }}
          >
            पासवर्ड
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: loading ? "#ccc" : "var(--nepal-blue)",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {loading ? "दर्ता हुँदै..." : "दर्ता गर्नुहोस्"}
        </button>
      </form>

      <div
        style={{
          textAlign: "center",
          marginTop: "1.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <p style={{ margin: 0, color: "#666" }}>
          पहिले नै खाता छ?{" "}
          <a
            href="/login"
            style={{
              color: "var(--nepal-blue)",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            लगइन गर्नुहोस्
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
