// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "", // Add this
    village: "", // Add this
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("पासवर्ड मेल खाँदैन");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("पासवर्ड कम्तिमा ६ वर्णको हुनुपर्छ");
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);

      if (result.success) {
        navigate("/profile");
      } else {
        setError(result.error || "दर्ता असफल भयो");
      }
    } catch (err) {
      setError("दर्ता प्रक्रिया असफल भयो");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "2rem" }}>
      <h2>खाता दर्ता</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="पुरा नाम"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="इमेल ठेगाना"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="tel"
            name="phone"
            placeholder="फोन नम्बर"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Add District Field */}
        <div style={{ marginBottom: "1rem" }}>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">जिल्ला छान्नुहोस्</option>
            <option value="kathmandu">काठमाडौं</option>
            <option value="lalitpur">ललितपुर</option>
            <option value="bhaktapur">भक्तपुर</option>
            <option value="kavre">काभ्रेपलाञ्चोक</option>
            <option value="dhading">धादिङ</option>
            <option value="nuwakot">नुवाकोट</option>
            <option value="sindhupalchok">सिन्धुपाल्चोक</option>
            <option value="rasuwa">रसुवा</option>
            <option value="dolakha">दोलखा</option>
            <option value="ramechhap">रामेछाप</option>
            <option value="sindhuli">सिन्धुली</option>
          </select>
        </div>

        {/* Add Village Field */}
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            name="village"
            placeholder="गाउँपालिका वा नगरपालिका"
            value={formData.village}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            name="password"
            placeholder="पासवर्ड"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="पासवर्ड पुष्टि गर्नुहोस्"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "दर्ता हुदैछ..." : "दर्ता गर्नुहोस्"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        पहिले नै खाता छ? <Link to="/login">लगइन गर्नुहोस्</Link>
      </p>
    </div>
  );
};

export default Register;
