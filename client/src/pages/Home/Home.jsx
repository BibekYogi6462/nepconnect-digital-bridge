import React from "react";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
