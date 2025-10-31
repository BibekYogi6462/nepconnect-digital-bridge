import React, { useState, useEffect } from "react";
import { contentAPI } from "../../services/api";

const Content = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "सबै सामग्री" },
    { value: "कृषि", label: "कृषि" },
    { value: "शिक्षा", label: "शिक्षा" },
    { value: "स्वास्थ्य", label: "स्वास्थ्य" },
    { value: "रोजगारी", label: "रोजगारी" },
    { value: "प्रविधि", label: "प्रविधि" },
  ];

  useEffect(() => {
    fetchContent();
  }, [selectedCategory]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getAll();
      let filteredContent = response.data;

      if (selectedCategory !== "all") {
        filteredContent = response.data.filter(
          (item) => item.category === selectedCategory
        );
      }

      setContent(filteredContent);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      video: "🎬",
      audio: "🎵",
      document: "📄",
      article: "📖",
    };
    return icons[type] || "📁";
  };

  const getTypeColor = (type) => {
    const colors = {
      video: "#ff6b6b",
      audio: "#4ecdc4",
      document: "#45b7d1",
      article: "#96ceb4",
    };
    return colors[type] || "#666";
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "1.2rem",
        }}
      >
        सामग्री लोड हुँदैछ...
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            color: "var(--nepal-blue)",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: 0,
          }}
        >
          📚 शैक्षिक सामग्री
        </h1>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              style={{
                backgroundColor:
                  selectedCategory === cat.value
                    ? "var(--terai-green)"
                    : "white",
                color:
                  selectedCategory === cat.value
                    ? "white"
                    : "var(--terai-green)",
                border: "2px solid var(--terai-green)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

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
          त्रुटि: {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {content.map((item) => (
          <div
            key={item._id || item.id}
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: "12px",
              padding: "1.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow = "0 8px 15px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  backgroundColor: getTypeColor(item.type),
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {getTypeIcon(item.type)} {item.type}
              </span>

              <span
                style={{
                  backgroundColor: "var(--nepal-blue)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                }}
              >
                {item.level || "सुरुआती"}
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                margin: "0 0 1rem 0",
                color: "var(--text-dark)",
                lineHeight: "1.4",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                margin: "0 0 1.5rem 0",
                color: "#666",
                fontSize: "0.95rem",
                lineHeight: "1.5",
              }}
            >
              {item.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#718096",
                  fontSize: "0.8rem",
                }}
              >
                {item.downloadCount || 0} डाउनलोड
              </span>

              <button
                style={{
                  backgroundColor: "var(--terai-green)",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1e7e34";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "var(--terai-green)";
                }}
              >
                📥 डाउनलोड गर्नुहोस्
              </button>
            </div>
          </div>
        ))}
      </div>

      {content.length === 0 && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#666",
          }}
        >
          कुनै सामग्री भेटिएन
        </div>
      )}
    </div>
  );
};

export default Content;
