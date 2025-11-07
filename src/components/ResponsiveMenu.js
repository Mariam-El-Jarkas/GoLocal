import React from "react";
import "../styles/navbar.css";

function ResponsiveMenu({ isOpen, toggleMenu, links }) {
  return (
    <div className={`nav-links ${isOpen ? "open" : ""}`}>
      {links.map((link, idx) => (
        <a key={idx} href={link.path} onClick={toggleMenu}>
          {link.name}
        </a>
      ))}
    </div>
  );
}

export default ResponsiveMenu;
