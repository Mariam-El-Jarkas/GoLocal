import React from "react";
import "../styles/introsection.css";

function IntroSection() {
  return (
    <section className="intro-section">
      <div className="intro-container">
        <h1 className="intro-title">Discover Saida Like a Local</h1>
        <p className="intro-subtitle">
          Find the city’s top food, fun, and culture spots  all recommended by locals.
        </p>
        <a href="/categories" className="intro-btn">Explore Now</a>
      </div>
    </section>
  );
}

export default IntroSection;
