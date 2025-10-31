import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--nepal-blue)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p style={{ margin: 0, fontSize: "1rem", marginBottom: "0.5rem" }}>
          © २०२४ नेपकनेक्ट - सबै नेपालीको लागि डिजिटल पहुँच
        </p>
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          सम्पर्क: info@nepconnect.org | +९७७-९८XXXXXXXX
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/about"
            style={{ color: "white", textDecoration: "none", opacity: 0.8 }}
          >
            हाम्रो बारेमा
          </a>
          <a
            href="/privacy"
            style={{ color: "white", textDecoration: "none", opacity: 0.8 }}
          >
            गोपनीयता नीति
          </a>
          <a
            href="/terms"
            style={{ color: "white", textDecoration: "none", opacity: 0.8 }}
          >
            सेवा सर्तहरू
          </a>
          <a
            href="/contact"
            style={{ color: "white", textDecoration: "none", opacity: 0.8 }}
          >
            सम्पर्क गर्नुहोस्
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
