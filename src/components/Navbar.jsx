import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white w-full shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="md:hidden w-full flex items-center justify-between">

            <a href='/' className="text-custom-blue text-4xl font-bold ">TaskFlow</a>

            <button
              onClick={toggleMenu}
              className="p-4 text-custom-blue hover:text-gray-300 focus:outline-none"
            >
              <FaBars className="text-4xl" />
            </button>
          </div>

          <a href='/' className="hidden md:flex text-custom-blue text-4xl font-bold">TaskFlow</a>

          {isMenuOpen && (
            <div className="md:hidden py-4 flex flex-col">
              <div className="text-center">
                <a href="/register" className="block text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover:bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300">
                  Register
                </a>
                <a href="/login" className="block text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover:bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300">
                  Login
                </a>
              </div>
            </div>
          )}

          <div className="hidden md:flex space-x-4">
            <a href="/register" className="text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover:bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300">
              Register
            </a>
            <a href="/login" className="text-custom-blue p-2 border-2 border-custom-blue hover:text-white hover:bg-custom-blue bg-white rounded-md hover-bg-custom-blue transition duration-300">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
