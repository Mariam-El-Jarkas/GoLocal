//imports
import React from "react";
import "../styles/categorycard.css";

function CategoryCard({ title, icon, children }) {
//used in category page
  return (
    <div className="category-card">

      {/* Icon representing the category */}
      <div className="category-icon">{icon}</div>

      {/* Category title */}
      <h3 className="category-title">{title}</h3>
{/* 
      child elements (like buttons or links) */}
      {children}
    </div>
  );
}

export default CategoryCard;

