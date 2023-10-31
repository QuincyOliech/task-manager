import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Register from "./Register";
import Login from "./Login";
import NavBar from "./Navbar";
import Footer from "./Footer";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ConditionalFooter />
    </div>
  );
};

function ConditionalFooter() {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return <Footer />;
}

export default App;
