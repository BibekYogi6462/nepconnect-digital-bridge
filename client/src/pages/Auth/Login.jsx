import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      // Redirect will be handled by context
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
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
        लगइन गर्नुहोस्
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
            इमेल ठेगाना
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--nepal-blue)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--nepal-blue)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
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
          {loading ? "लगइन हुँदै..." : "लगइन गर्नुहोस्"}
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
          खाता छैन?{" "}
          <a
            href="/register"
            style={{
              color: "var(--nepal-blue)",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            दर्ता गर्नुहोस्
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
