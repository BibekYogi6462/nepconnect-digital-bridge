import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Content = () => {
  const { user } = useAuth();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    titleEnglish: "",
    description: "",
    type: "article",
    category: "कृषि",
    level: "सुरुआती",
    fileUrl: "",
  });
  const [creating, setCreating] = useState(false);

  const API_URL = "http://localhost:5000/api";

  const categories = [
    { value: "कृषि", label: "कृषि" },
    { value: "शिक्षा", label: "शिक्षा" },
    { value: "स्वास्थ्य", label: "स्वास्थ्य" },
    { value: "रोजगारी", label: "रोजगारी" },
    { value: "प्रविधि", label: "प्रविधि" },
  ];

  const contentTypes = [
    { value: "article", label: "लेख", icon: "📖" },
    { value: "video", label: "भिडियो", icon: "🎬" },
    { value: "audio", label: "अडियो", icon: "🎵" },
    { value: "document", label: "कागजात", icon: "📄" },
  ];

  const levels = [
    { value: "सुरुआती", label: "सुरुआती" },
    { value: "मध्यम", label: "मध्यम" },
    { value: "उन्नत", label: "उन्नत" },
  ];

  useEffect(() => {
    fetchContent();
  }, [selectedCategory]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_URL}/content`;
      if (selectedCategory !== "all") {
        url = `${API_URL}/content/category/${selectedCategory}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setContent(result.data || []);
      } else {
        throw new Error(result.message || "सामग्री लोड गर्न असफल");
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContent = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Add new content to the list
        setContent((prevContent) => [result.data, ...prevContent]);
        // Reset form
        setFormData({
          title: "",
          titleEnglish: "",
          description: "",
          type: "article",
          category: "कृषि",
          level: "सुरुआती",
          fileUrl: "",
        });
        setShowCreateForm(false);
        alert("सामग्री सफलतापूर्वक सिर्जना गरियो!");
      } else {
        throw new Error(result.message || "सामग्री सिर्जना गर्न असफल");
      }
    } catch (err) {
      setError(err.message);
      console.error("Create content failed:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleDownload = async (contentId) => {
    try {
      const response = await fetch(`${API_URL}/content/${contentId}/download`, {
        method: "POST",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update download count in local state
          setContent((prevContent) =>
            prevContent.map((item) =>
              item._id === contentId
                ? { ...item, downloadCount: result.downloadCount }
                : item
            )
          );
          alert("डाउनलोड सुरु भयो!");
        }
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("डाउनलोड असफल भयो");
    }
  };

  const getTypeInfo = (type) => {
    const typeMap = {
      video: { icon: "🎬", label: "भिडियो", color: "#ff6b6b" },
      audio: { icon: "🎵", label: "अडियो", color: "#4ecdc4" },
      document: { icon: "📄", label: "कागजात", color: "#45b7d1" },
      article: { icon: "📖", label: "लेख", color: "#96ceb4" },
    };
    return typeMap[type] || { icon: "📁", label: type, color: "#666" };
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
        सामग्री लोड हुँदैछ...
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

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setSelectedCategory("all")}
              style={{
                backgroundColor:
                  selectedCategory === "all" ? "var(--terai-green)" : "white",
                color:
                  selectedCategory === "all" ? "white" : "var(--terai-green)",
                border: "2px solid var(--terai-green)",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              सबै सामग्री
            </button>
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
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Create Content Button */}
          {user && (
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
              ➕ नयाँ सामग्री
            </button>
          )}
        </div>
      </div>

      {/* Create Content Form */}
      {showCreateForm && user && (
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            marginBottom: "2rem",
            border: "2px solid var(--nepal-blue)",
          }}
        >
          <h3 style={{ color: "var(--nepal-blue)", marginBottom: "1.5rem" }}>
            नयाँ सामग्री सिर्जना गर्नुहोस्
          </h3>

          <form onSubmit={handleCreateContent}>
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
                विवरण *
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
                placeholder="सामग्रीको विवरण लेख्नुहोस्"
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
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
                  प्रकार *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
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
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
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
                  {categories.map((cat) => (
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
                  स्तर *
                </label>
                <select
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
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
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                }}
              >
                फाइल लिंक (वैकल्पिक)
              </label>
              <input
                type="url"
                value={formData.fileUrl}
                onChange={(e) =>
                  setFormData({ ...formData, fileUrl: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "1rem",
                }}
                placeholder="https://example.com/file.pdf"
              />
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
                  backgroundColor: "var(--terai-green)",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  cursor: creating ? "not-allowed" : "pointer",
                  opacity: creating ? 0.7 : 1,
                }}
              >
                {creating ? "सिर्जना हुँदैछ..." : "सामग्री सिर्जना गर्नुहोस्"}
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

      {/* Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {content.map((item) => {
          const typeInfo = getTypeInfo(item.type);
          return (
            <div
              key={item._id}
              style={{
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                padding: "1.5rem",
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Type and Level Badges */}
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
                    backgroundColor: typeInfo.color,
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
                  {typeInfo.icon} {typeInfo.label}
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

              {/* Content Details */}
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

              {/* Download Section */}
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
                  onClick={() => handleDownload(item._id)}
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
                  }}
                >
                  📥 डाउनलोड गर्नुहोस्
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {content.length === 0 && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#666",
            fontSize: "1.1rem",
          }}
        >
          {selectedCategory === "all"
            ? "कुनै सामग्री भेटिएन। पहिलो सामग्री सिर्जना गर्नुहोस्!"
            : "यो श्रेणीमा कुनै सामग्री भेटिएन।"}
        </div>
      )}
    </div>
  );
};

export default Content;
