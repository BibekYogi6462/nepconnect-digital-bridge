import "./App.css";
import "./styles/nepali-theme.css";

function App() {
  // Sample news data - in real app, this would come from an API
  const newsItems = [
    {
      id: 1,
      title: "प्रधानमन्त्री रोजगारी कार्यक्रम - नयाँ आवेदन खुल्यो",
      date: "२०८० पुष १५",
      category: "रोजगारी",
      isNew: true,
    },
    {
      id: 2,
      title: "किसान क्रेडिट कार्ड योजना - ५ लाख सम्मको ऋण",
      date: "२०८० पुष १२",
      category: "कृषि",
      isNew: true,
    },
    {
      id: 3,
      title: "स्वास्थ्य बीमा - बुढापाको भत्ता बढ्यो",
      date: "२०८० पुष १०",
      category: "स्वास्थ्य",
      isNew: false,
    },
    {
      id: 4,
      title: "शिक्षा ऋण - विद्यार्थीहरूको लागि विशेष छूट",
      date: "२०८० पुष ८",
      category: "शिक्षा",
      isNew: false,
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      रोजगारी: "var(--nepal-crimson)",
      कृषि: "var(--terai-green)",
      स्वास्थ्य: "var(--nepal-blue)",
      शिक्षा: "var(--hill-green)",
    };
    return colors[category] || "var(--soil-brown)";
  };

  return (
    <div className="app">
      {/* Header with Nepali colors */}
      <header
        style={{
          backgroundColor: "var(--nepal-crimson)",
          color: "white",
          padding: "1rem",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>नेपकनेक्ट</h1>
        <p style={{ margin: 0, fontSize: "1.2rem", opacity: 0.9 }}>
          गाउँघरलाई डिजिटल सँगै जोड्दै
        </p>
      </header>

      {/* Main content */}
      <main
        style={{
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--nepal-blue), var(--terai-green))",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "15px",
            marginBottom: "3rem",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            नेपालको गाउँघरलाई डिजिटल संसारसँग जोडौं
          </h2>
          <p style={{ fontSize: "1.3rem", marginBottom: "2rem" }}>
            अफलाइन पनि सिक्नुहोस्, जान्नुहोस् र अगाडि बढ्नुहोस्
          </p>
          <button
            style={{
              backgroundColor: "var(--nepal-crimson)",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#b01030";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "var(--nepal-crimson)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            निःशुल्क सुरु गर्नुहोस्
          </button>
        </div>

        {/* Live News Section */}
        <section
          style={{
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                color: "var(--nepal-crimson)",
                fontSize: "1.8rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              📢 लाइव समाचार र सूचनाहरू
            </h2>
            <span
              style={{
                backgroundColor: "#ff4444",
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontWeight: "600",
                animation: "pulse 2s infinite",
              }}
            >
              LIVE
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {newsItems.map((news) => (
              <div
                key={news.id}
                style={{
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backgroundColor: "white",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  cursor: "pointer",
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
                {news.isNew && (
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
                      backgroundColor: getCategoryColor(news.category),
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    {news.category}
                  </span>
                  <span
                    style={{
                      color: "#718096",
                      fontSize: "0.9rem",
                    }}
                  >
                    {news.date}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    margin: "0",
                    color: "var(--text-dark)",
                    lineHeight: "1.5",
                  }}
                >
                  {news.title}
                </h3>

                <button
                  style={{
                    marginTop: "1rem",
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
            ))}
          </div>
        </section>

        {/* Features section */}
        <section>
          <h2
            style={{
              textAlign: "center",
              color: "var(--nepal-blue)",
              fontSize: "1.8rem",
              marginBottom: "2rem",
            }}
          >
            हाम्रो सेवाहरू
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                border: "2px solid var(--nepal-blue)",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              <h3>📚 अफलाइन सिकाइ</h3>
              <p>इन्टरनेट नभएको बेला पनि सिक्नुहोस्</p>
            </div>

            <div
              style={{
                border: "2px solid var(--terai-green)",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              <h3>🏛️ सरकारी सेवा</h3>
              <p>सजिलो भाषामा सरकारी योजनाहरू</p>
            </div>

            <div
              style={{
                border: "2px solid var(--nepal-crimson)",
                borderRadius: "12px",
                padding: "2rem",
                textAlign: "center",
                backgroundColor: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
                e.target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              <h3>🗣️ आवाज सहायक</h3>
              <p>"साथी" ले मद्धत गर्छ</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--nepal-blue)",
          color: "white",
          textAlign: "center",
          padding: "2rem",
          marginTop: "4rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "1rem" }}>
          © २०२४ नेपकनेक्ट - सबै नेपालीको लागि डिजिटल पहुँच
        </p>
        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", opacity: 0.8 }}>
          सम्पर्क: info@nepconnect.org | +९७७-९८XXXXXXXX
        </p>
      </footer>

      {/* Add some CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default App;
