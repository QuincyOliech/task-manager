import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import LandingPage from "../pages/LandingPage";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TaskList from "./TaskList";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {isLoggedIn ? (
          <Route path="/tasklist" element={<TaskList />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
      </Routes>

      <ConditionalFooter />
    </div>
  );
}

function ConditionalFooter() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return <Footer />;
}

function TaskRoute() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const logout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <TaskList onLogout={logout} />;
}

export default App;
