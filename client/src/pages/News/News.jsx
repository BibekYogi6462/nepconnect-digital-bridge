import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const News = () => {
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    titleEnglish: "",
    description: "",
    descriptionEnglish: "",
    category: "रोजगारी",
    date: getCurrentNepaliDate(),
  });
  const [creating, setCreating] = useState(false);

  const API_URL = "http://localhost:5000/api";

  const categories = [
    { value: "all", label: "सबै समाचार" },
    { value: "रोजगारी", label: "रोजगारी" },
    { value: "कृषि", label: "कृषि" },
    { value: "स्वास्थ्य", label: "स्वास्थ्य" },
    { value: "शिक्षा", label: "शिक्षा" },
    { value: "अन्य", label: "अन्य" },
  ];

  // Helper function to get current Nepali date (simplified)
  function getCurrentNepaliDate() {
    const today = new Date();
    const year = today.getFullYear() - 57; // Convert to Nepali year (approx)
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year} ${getNepaliMonth(month)} ${day}`;
  }

  function getNepaliMonth(month) {
    const months = [
      "बैशाख",
      "जेठ",
      "असार",
      "श्रावण",
      "भाद्र",
      "आश्विन",
      "कार्तिक",
      "मंसिर",
      "पुष",
      "माघ",
      "फागुन",
      "चैत्र",
    ];
    return months[month - 1] || "चैत्र";
  }

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_URL}/news`;
      if (selectedCategory !== "all") {
        url = `${API_URL}/news/category/${selectedCategory}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setNews(result.data || []);
      } else {
        throw new Error(result.message || "समाचार लोड गर्न असफल");
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          createdBy: user?.name || "प्रयोगकर्ता",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Add new news to the list
        setNews((prevNews) => [result.data, ...prevNews]);
        // Reset form
        setFormData({
          title: "",
          titleEnglish: "",
          description: "",
          descriptionEnglish: "",
          category: "रोजगारी",
          date: getCurrentNepaliDate(),
        });
        setShowCreateForm(false);
        alert("समाचार सफलतापूर्वक सिर्जना गरियो!");
      } else {
        throw new Error(result.message || "समाचार सिर्जना गर्न असफल");
      }
    } catch (err) {
      setError(err.message);
      console.error("Create news failed:", err);
    } finally {
      setCreating(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      रोजगारी: "var(--nepal-crimson)",
      कृषि: "var(--terai-green)",
      स्वास्थ्य: "var(--nepal-blue)",
      शिक्षा: "var(--hill-green)",
      अन्य: "var(--soil-brown)",
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
          color: "#666",
        }}
      >
        समाचार लोड हुँदैछ...
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem 0" }}>
      {/* Header */}
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

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Category Filter */}
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
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Create News Button (for authorized users) */}
          {user &&
            (user.role === "admin" ||
              user.role === "community_coordinator") && (
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                style={{
                  backgroundColor: "var(--nepal-crimson)",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ➕ नयाँ समाचार
              </button>
            )}
        </div>
      </div>

      {/* Create News Form */}
      {showCreateForm &&
        user &&
        (user.role === "admin" || user.role === "community_coordinator") && (
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              marginBottom: "2rem",
              border: "2px solid var(--nepal-crimson)",
            }}
          >
            <h3
              style={{ color: "var(--nepal-crimson)", marginBottom: "1.5rem" }}
            >
              नयाँ समाचार सिर्जना गर्नुहोस्
            </h3>

            <form onSubmit={handleCreateNews}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    शीर्षक (नेपाली) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                    placeholder="नेपाली शीर्षक लेख्नुहोस्"
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleEnglish}
                    onChange={(e) =>
                      setFormData({ ...formData, titleEnglish: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                    placeholder="English title"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  विवरण (नेपाली) *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                  placeholder="समाचारको विवरण लेख्नुहोस्"
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  Description (English)
                </label>
                <textarea
                  value={formData.descriptionEnglish}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      descriptionEnglish: e.target.value,
                    })
                  }
                  rows="2"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                  placeholder="English description (optional)"
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    श्रेणी *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                  >
                    {categories
                      .filter((cat) => cat.value !== "all")
                      .map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    मिति *
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "1rem",
                    }}
                    placeholder="२०८० पुष १५"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  style={{
                    backgroundColor: "#666",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  रद्द गर्नुहोस्
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  style={{
                    backgroundColor: "var(--nepal-crimson)",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    cursor: creating ? "not-allowed" : "pointer",
                    opacity: creating ? 0.7 : 1,
                  }}
                >
                  {creating ? "सिर्जना हुँदैछ..." : "समाचार सिर्जना गर्नुहोस्"}
                </button>
              </div>
            </form>
          </div>
        )}

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

      {/* News Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {news.map((newsItem) => (
          <div
            key={newsItem._id}
            style={{
              border: "2px solid #e2e8f0",
              borderRadius: "12px",
              padding: "1.5rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              position: "relative",
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
            fontSize: "1.1rem",
          }}
        >
          {selectedCategory === "all"
            ? "कुनै समाचार भेटिएन। पहिलो समाचार सिर्जना गर्नुहोस्!"
            : "यो श्रेणीमा कुनै समाचार भेटिएन।"}
        </div>
      )}
    </div>
  );
};

export default News;
