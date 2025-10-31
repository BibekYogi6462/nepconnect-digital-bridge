import React, { useState, useEffect } from "react";
import { newsAPI } from "../../services/api";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "सबै समाचार" },
    { value: "रोजगारी", label: "रोजगारी" },
    { value: "कृषि", label: "कृषि" },
    { value: "स्वास्थ्य", label: "स्वास्थ्य" },
    { value: "शिक्षा", label: "शिक्षा" },
  ];

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      let response;
      if (selectedCategory === "all") {
        response = await newsAPI.getAll();
      } else {
        response = await newsAPI.getByCategory(selectedCategory);
      }
      setNews(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      रोजगारी: "var(--nepal-crimson)",
      कृषि: "var(--terai-green)",
      स्वास्थ्य: "var(--nepal-blue)",
      शिक्षा: "var(--hill-green)",
    };
    return colors[category] || "var(--soil-brown)";
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
        समाचार लोड हुँदैछ...
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
            color: "var(--nepal-crimson)",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            margin: 0,
          }}
        >
          📢 समाचार र सूचनाहरू
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
                    ? "var(--nepal-blue)"
                    : "white",
                color:
                  selectedCategory === cat.value
                    ? "white"
                    : "var(--nepal-blue)",
                border: "2px solid var(--nepal-blue)",
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
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {news.map((newsItem) => (
          <div
            key={newsItem._id || newsItem.id}
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: "12px",
              padding: "1.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              position: "relative",
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
            {newsItem.isNew && (
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                नयाँ
              </span>
            )}

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
                  backgroundColor: getCategoryColor(newsItem.category),
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                {newsItem.category}
              </span>
              <span
                style={{
                  color: "#718096",
                  fontSize: "0.9rem",
                }}
              >
                {newsItem.date}
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
              {newsItem.title}
            </h3>

            <p
              style={{
                margin: "0",
                color: "#666",
                fontSize: "0.95rem",
                lineHeight: "1.5",
              }}
            >
              {newsItem.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1.5rem",
              }}
            >
              <span
                style={{
                  color: "#718096",
                  fontSize: "0.8rem",
                }}
              >
                {newsItem.views || 0} पटक हेरिएको
              </span>

              <button
                style={{
                  backgroundColor: "transparent",
                  color: "var(--nepal-blue)",
                  border: "1px solid var(--nepal-blue)",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "var(--nepal-blue)";
                  e.target.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "var(--nepal-blue)";
                }}
              >
                पूरै पढ्नुहोस्
              </button>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#666",
          }}
        >
          कुनै समाचार भेटिएन
        </div>
      )}
    </div>
  );
};

export default News;
