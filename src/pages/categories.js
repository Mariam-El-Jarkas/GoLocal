import React from "react";
import CategoryCard from "../components/CategoryCard.js";
import "../styles/categories.css";

function Categories() {
  const categories = [
    "Food",
    "Board Games",
    "Culture",
    "History",
    "Beaches",
    "Coffee Shops",
    "Shopping",
    "Parks",
  ];

  return (
    <div className="categories-page">
      <h1>All Categories</h1>
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <CategoryCard key={index} title={cat} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
