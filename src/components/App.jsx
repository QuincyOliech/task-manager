import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Register from "./Register";
import Login from "./Login";
import NavBar from "./Navbar";
import Footer from "./Footer";
import CreateTask from "./CreateTask"
import "../App.css"

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createtask" element={<CreateTask />} />
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
