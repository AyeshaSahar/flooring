import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // Make sure to use the correct path to your logo

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="First Class Flooring" className="h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          <Link
            to="/upload"
            className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:font-bold hover:underline transition duration-300 ease-in-out"
          >
            UPLOAD PHOTO
          </Link>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:font-bold hover:underline transition duration-300 ease-in-out">
            NEW SCENE
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:font-bold hover:underline transition duration-300 ease-in-out">
            SAVE
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:font-bold hover:underline transition duration-300 ease-in-out">
            MY PROJECTS
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:font-bold hover:underline transition duration-300 ease-in-out">
            PRINT
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:font-bold hover:underline transition duration-300 ease-in-out">
            FEEDBACK
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="hidden lg:flex space-x-2">
          <a
            href="#facebook"
            className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            <FaFacebookF />
          </a>
          <a
            href="#twitter"
            className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            <FaTwitter />
          </a>
          <a
            href="#pinterest"
            className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            <FaPinterestP />
          </a>
          <a
            href="#email"
            className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-600 hover:text-gray-800"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white p-4 space-y-4 items-center">
          <Link
            to="/upload"
            className="block text-sm font-medium text-gray-600 hover:text-gray-800 hover:underline"
            onClick={toggleMenu}
          >
            UPLOAD PHOTO
          </Link>
          <button className="block text-sm font-medium text-gray-600 hover:text-gray-800">
            NEW SCENE
          </button>
          <button className="block text-sm font-medium text-gray-600 hover:text-gray-800">
            SAVE
          </button>
          <button className="block text-sm font-medium text-gray-600 hover:text-gray-800">
            MY PROJECTS
          </button>
          <button className="block text-sm font-medium text-gray-600 hover:text-gray-800">
            PRINT
          </button>
          <button className="block text-sm font-medium text-gray-600 hover:text-gray-800">
            FEEDBACK
          </button>
          {/* Mobile Social Media Icons */}
          <div className="flex space-x-2 justify-center">
            <a
              href="#facebook"
              className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
            >
              <FaFacebookF />
            </a>
            <a
              href="#twitter"
              className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
            >
              <FaTwitter />
            </a>
            <a
              href="#pinterest"
              className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
            >
              <FaPinterestP />
            </a>
            <a
              href="#email"
              className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
