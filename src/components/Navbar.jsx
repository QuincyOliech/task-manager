// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { FaUserPlus, FaSignInAlt, FaBars } from "react-icons/fa";
// import { SiGoogletranslate } from "react-icons/si";
// import { MdLogout } from "react-icons/md";
// // import { AuthContext, useAuth } from './AuthContext';

// function Navbar() {
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const [language, setLanguage] = useState("English");
//   // const { user, logout } = useContext(AuthContext);

//   const handleLanguageChange = (event) => {
//     setLanguage(event.target.value);
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="top-0 bg-white shadow z-50">
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="">
//             <Link
//               to="/"
//               className="flex items-center text-custom-blue font-bold text-4xl"
//             >
//               TaskFlow
//             </Link>
//           </div>

//           <div className="hidden md:block">
//             <div className="flex items-center justify-center">
//               {/* {!Boolean(user) ? ( */}
//               <>
//                 <Link
//                   to="/register"
//                   className="flex items-center text-white bg-custom-blue hover:bg-custom-blue px-4 py-2 rounded-md text-m font-medium mr-2"
//                 >
//                   <FaUserPlus className="mr-2" /> Register
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="flex items-center ml-2 text-custom-blue hover:text-custom-nlue border border-custom-blue hover:custom-blue px-4 py-2 rounded-md text-m font-medium"
//                 >
//                   <FaSignInAlt className="mr-2" /> Login
//                 </Link>
//               </>
//               {/* ) : ( */}
//               <button
//                 onClick={() => logout()}
//                 className="flex items-center ml-4 text-custom-blue hover:text-white border border-custom-blue hover:bg-custom-blue px-4 py-2 rounded-md text-m font-medium"
//               >
//                 <MdLogout className="mr-2" /> Logout
//               </button>
//               {/* )} */}
//             </div>
//           </div>
//           <div className="hidden md:block">
//             <div className=" mt-4 md:mt-0 flex items-center text-custom-blue space-x-2" id="google_translate_element">
//               <select
//                 value={language}
//                 onChange={handleLanguageChange}
//                 className="text-custom-blue border-2 p-2 border-custom-blue  bg-white rounded-md  m-2 transition duration-300"
//               >
//                 <option value="English">English</option>
//                 <option value="French">French</option>
//               </select>
//               <SiGoogletranslate className="text-3xl" />
//             </div>
//           </div>
//           <div className="md:hidden">
//             <button
//               className="text-custom-blue hover:text-black focus:outline-none"
//               onClick={toggleMenu}
//             >
//               <FaBars className="text-4xl" />
//             </button>
//           </div>
//         </div>
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               {/* {!Boolean(user) ? ( */}
//               <>
//                 <Link
//                   to="/register"
//                   className="text-black flex items-center  hover:text-custom-blue  px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   <FaUserPlus className="mr-2" /> Register
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="text-black hover:text-custom-blue flex items-center  px-3 py-2 rounded-md text-base font-medium"
//                 >
//                   <FaSignInAlt className="mr-2" /> Login
//                 </Link>
//               </>
//               {/* ) : ( */}
//               <button
//                 onClick={() => logout()}
//                 className="text-black hover:text-custom-blue flex items-center  px-3 py-2 rounded-md text-base font-medium"
//               >
//                 <MdLogout className="mr-2" /> Logout
//               </button>
//               <div className="mt-4 md:mt-0 flex items-center text-custom-blue space-x-2">
//                 <div className="relative" id="google_translate_element">
//                   <select
//                     value={language}
//                     onChange={handleLanguageChange}
//                     className="text-black hover:text-custom-blue  border-2 p-2 border-custom-blue bg-white rounded-md m-2 transition duration-300 pl-8"
//                   >
//                     <option value="English">English</option>
//                     <option value="French">French</option>
//                   </select>
//                   <SiGoogletranslate className="text-4xl absolute left-2 top-2 p-2" />
//                 </div>
//               </div>

//               {/* )} */}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaBars } from "react-icons/fa";
import { SiGoogletranslate } from "react-icons/si";
import { MdLogout } from "react-icons/md";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <Link to="/" className="flex items-center text-custom-blue font-bold text-4xl">
              TaskFlow
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center justify-center">
              {!isLoggedIn ? (
                <>
                  <Link to="/register" className="flex items-center text-white bg-custom-blue hover:bg-custom-blue px-4 py-2 rounded-md text-m font-medium mr-2">
                    <FaUserPlus className="mr-2" /> Register
                  </Link>
                  <Link to="/login" className="flex items-center ml-2 text-custom-blue hover:text-custom-blue border border-custom-blue hover:border-custom-blue px-4 py-2 rounded-md text-m font-medium">
                    <FaSignInAlt className="mr-2" /> Login
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="flex items-center ml-4 text-custom-blue hover:text-white border border-custom-blue hover:bg-custom-blue px-4 py-2 rounded-md text-m font-medium"
                >
                  <MdLogout className="mr-2" /> Logout
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="mt-4 md:mt-0 flex items-center text-custom-blue space-x-2" id="google_translate_element">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="text-custom-blue border-2 p-2 border-custom-blue bg-white rounded-md m-2 transition duration-300"
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
              <SiGoogletranslate className="text-3xl" />
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-custom-blue hover:text-black focus:outline-none" onClick={toggleMenu}>
              <FaBars className="text-4xl" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/register" className="text-black flex items-center hover:text-custom-blue px-3 py-2 rounded-md text-base font-medium">
                    <FaUserPlus className="mr-2" /> Register
                  </Link>
                  <Link to="/login" className="text-black hover:text-custom-blue flex items-center px-3 py-2 rounded-md text-base font-medium">
                    <FaSignInAlt className="mr-2" /> Login
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="text-black hover:text-custom-blue flex items-center px-3 py-2 rounded-md text-base font-medium"
                >
                  <MdLogout className="mr-2" /> Logout
                </button>
              )}

              <div className="mt-4 md:mt-0 flex items-center text-custom-blue space-x-2">
                <div className="relative" id="google_translate_element">
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="text-black hover:text-custom-blue border-2 p-2 border-custom-blue bg-white rounded-md m-2 transition duration-300 pl-8"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                  </select>
                  <SiGoogletranslate className="text-4xl absolute left-2 top-2 p-2" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
