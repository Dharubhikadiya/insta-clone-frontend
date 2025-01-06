import React, { useContext, useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/Logincontext";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

export default function Navbar({ login }) {
  const { setmodalOpen } = useContext(LoginContext);
  const [isOpen, setIsOpen] = useState(false);

  const loginstatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <li className="text-lg pb-4 md:pb-0">
            <Link to="/profile" className="text-gray-600 hover:text-gray-800">
              Profile
            </Link>
          </li>
          <li className="text-lg pb-4 md:pb-0">
            <Link
              to="/createpost"
              className="text-gray-600 hover:text-gray-800"
            >
              Create Post
            </Link>
          </li>
          <li className="text-lg pb-6 md:pb-0">
            <Link
              to="/myfollowingpost"
              className="text-gray-600 hover:text-gray-800"
            >
              My Following
            </Link>
          </li>
          <li className="text-lg pb-4 md:pb-0">
            <button
              className="text-white py-2 rounded-lg px-3 hover:bg-blue-800 bg-blue-900 font-semibold"
              onClick={() => setmodalOpen(true)}
            >
              Log out
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="text-lg">
            <Link to="/signup" className="text-gray-600 hover:text-gray-800">
              SignUp
            </Link>
          </li>
          <li className="text-lg">
            <Link to="/signin" className="text-gray-600 hover:text-gray-800">
              SignIn
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <div>
      <nav className="shadow-lg flex items-center py-1 h-16 w-full bg-white">
        <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12 md:h-20 mt-1" />
            </Link>
          </div>

          {/* Toggle Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <HiMiniBars3BottomRight className="text-black text-xl" />
          </button>

          {/* Menu */}
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex flex-col md:flex-row z-10  md:items-center gap-6 md:gap-8 absolute md:static bg-white w-full md:w-auto top-16 left-0 md:top-auto md:left-auto md:bg-transparent transition-all duration-300 p-4`}
          >
            {loginstatus()}
          </ul>
        </div>
      </nav>
    </div>
  );
}
