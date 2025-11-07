import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© 2025 GoLocal — Explore Saida Like a Local</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/categories">Categories</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
