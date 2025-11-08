import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
// import logo from "../assets/logo.png"; // for logo later

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            {/* <img src={logo} alt="GoLocal Logo" /> */}
            <div className="placeholder-logo">🌍</div>

            <span>GoLocal</span>
          </Link>
        </div>

        {}
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {}
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
