//imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/images/Logo.png";

function Navbar() {

  // State to track whether the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the mobile menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu (used when a link is clicked)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* Container for the navbar content */}
      <div className="nav-container">

        {/* Logo and link to home page */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="GoLocal Logo" />
          </Link>
        </div>

        {/* Hamburger menu button for mobile */}
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation links */}
        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/categories" onClick={closeMenu}>Categories</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
