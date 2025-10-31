import React from "react";
import "./App.css";
import "./styles/nepali-theme.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Content from "./pages/Content/Content";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";

// Simple routing based on window location
function App() {
  const getCurrentPage = () => {
    const path = window.location.pathname;

    switch (path) {
      case "/":
        return <Home />;
      case "/news":
        return <News />;
      case "/content":
        return <Content />;
      case "/login":
        return <Login />;
      case "/register":
        return <Register />;
      case "/profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div
      className="app"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {getCurrentPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
