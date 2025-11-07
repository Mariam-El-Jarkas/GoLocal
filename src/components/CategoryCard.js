import React from "react";
import "../styles/categorycard.css";

function CategoryCard({ title, image }) {
  return (
    <div className="category-card">
      <img src={image} alt={title} className="category-img" />
      <h3 className="category-title">{title}</h3>
    </div>
  );
}

export default CategoryCard;
