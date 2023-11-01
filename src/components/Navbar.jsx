import React, { useState } from "react";
import { FaUserPlus, FaSignInAlt, FaBars } from "react-icons/fa";
import { SiGoogletranslate } from "react-icons/si";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white w-full shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="md:hidden w-full flex items-center justify-between">
            <a href="/" className="text-custom-blue text-4xl font-bold">
              TaskFlow
            </a>

            <button
              onClick={toggleMenu}
              className="p-4 text-custom-blue hover:text-gray-300 focus:outline-none"
            >
              <FaBars className="text-4xl" />
            </button>
          </div>

          <a
            href="/"
            className="hidden md:flex text-custom-blue text-4xl font-bold"
          >
            TaskFlow
          </a>
          <div className="hidden justify-end md:flex space-x-4">
            <a
              href="/register"
              className="flex items-center text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover-bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300"
            >
              <FaUserPlus className="mr-2" /> Register
            </a>
            <a
              href="/login"
              className="flex items-center text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover-bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300"
            >
              <FaSignInAlt className="mr-2"/> Login
            </a>
          </div>

          <div className="mt-4 md:mt-0 flex items-center text-custom-blue  space-x-2">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="text-custom-blue border-2 p-2 border-custom-blue  bg-white rounded-md  m-2 transition duration-300"
            >
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
            <SiGoogletranslate className="text-4xl" />
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 flex flex-col">
              <div className="text-center">
                <a
                  href="/register"
                  className="block text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover-bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300"
                >
                  Register
                </a>
                <a
                  href="/login"
                  className="block text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover-bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300"
                >
                  Login
                </a>
              </div>
            </div>
          )}


        </div>
      </div>
    </nav>
  );
}

export default Navbar;
