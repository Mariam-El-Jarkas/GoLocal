import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  // ADD THIS: Use full backend URL
  const getImageUrl = () => {
    if (!category.image) {
      return "https://via.placeholder.com/150";
    }
    
    // If it's already a full URL, use it
    if (category.image.startsWith('http')) {
      return category.image;
    }
    
    // Otherwise, prepend the backend URL
    return `http://localhost:5000${category.image}`;
  };

  return (
    <div className="category-card">
      <img 
        src={getImageUrl()}  // USE THE FUNCTION HERE
        alt={category.name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
          border: "2px solid #2e7d32"
        }}
        onError={(e) => {
          console.error("Failed to load image:", getImageUrl());
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
      <h3>{category.name}</h3>
      <Link 
        to={`/categories/${category.id}`}
        style={{
          display: "inline-block",
          padding: "8px 16px",
          backgroundColor: "#2e7d32",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          marginTop: "10px"
        }}
      >
        View Details
      </Link>
    </div>
  );
};

export default CategoryCard;