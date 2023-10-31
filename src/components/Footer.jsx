import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white  text-custom-blue py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="border-t border-2 border-custom-blue my-4"></div>
          <p>&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
