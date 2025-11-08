import React from "react";
import "../styles/categorycard.css";

function CategoryCard({ title, icon, children }) {
  return (
    <div className="category-card">
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{title}</h3>
      {children} {}
    </div>
  );
}

export default CategoryCard;
