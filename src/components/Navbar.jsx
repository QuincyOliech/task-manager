import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaBars } from "react-icons/fa";
import { SiGoogletranslate } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { useAuth } from "./AuthContext";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="top-0 bg-white shadow z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="">
            <Link
              to="/"
              className="flex items-center text-custom-blue font-bold text-4xl"
            >
              TaskFlow
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center justify-center">
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="flex items-center ml-4 text-custom-blue hover:text-white border border-custom-blue hover:bg-custom-blue px-4 py-2 rounded-md text-m font-medium"
                >
                  <MdLogout className="mr-2" /> Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center text-white bg-custom-blue hover:bg-custom-blue px-4 py-2 rounded-md text-m font-medium mr-2"
                  >
                    <FaUserPlus className="mr-2" /> Register
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center ml-2 text-custom-blue hover:text-custom-blue border border-custom-blue hover:border-custom-blue px-4 py-2 rounded-md text-m font-medium"
                  >
                    <FaSignInAlt className="mr-2" /> Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:block mt-10">
            <div
              className=" flex items-center text-custom-blue space-x-2"
              id="google_translate_element"
            >
              <SiGoogletranslate className=" -mt-10 text-xl" />
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="text-custom-blue hover:text-black focus:outline-none"
              onClick={toggleMenu}
            >
              <FaBars className="text-4xl" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className=" md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-black hover:text-custom-blue flex items-center px-3 py-2 rounded-md text-base font-medium"
              >
                <MdLogout className="mr-2" /> Logout
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-black flex items-center hover:text-custom-blue px-3 py-2 rounded-md text-base font-medium"
                >
                  <FaUserPlus className="mr-2" /> Register
                </Link>
                <Link
                  to="/login"
                  className="text-black hover:text-custom-blue flex items-center px-3 py-2 rounded-md text-base font-medium"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
