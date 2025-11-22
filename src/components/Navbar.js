// imports
import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/images/Logo.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="GoLocal Logo" />
          </Link>
        </div>

        {/* Hidden checkbox to control menu
        shows all nav when hamburger is clicked */}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />

        {/* Hamburger menu ,shows the icon*/}
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Navigation links */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/contact">Contact</Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;
