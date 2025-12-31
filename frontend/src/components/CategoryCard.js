
import React from "react";
import { Link } from "react-router-dom";
import "../styles/categorycard.css";

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      {/* Material Icon Display */}
      <div 
        className="material-icon-wrapper"
        style={{
          width: "100px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          margin: "0 auto 15px",
          backgroundColor: "#e8f5e9",
          border: "3px solid #2e7d32",
          boxShadow: "0 4px 8px rgba(46, 125, 50, 0.2)"
        }}
      >
        <span 
          className="material-icons"
          style={{
            fontSize: "48px",
            color: "#2e7d32"
          }}
        >
          {category.icon || 'category'}
        </span>
      </div>
      
      <h3 style={{ 
        margin: "0 0 10px 0", 
        color: "#333",
        fontSize: "1.2rem",
        textAlign: "center"
      }}>
        {category.name}
      </h3>
      
      <Link 
        to={`/category/${category.id}`}
        style={{
          display: "block",
          padding: "10px 20px",
          backgroundColor: "#2e7d32",
          color: "white",
          textDecoration: "none",
          borderRadius: "25px",
          textAlign: "center",
          fontWeight: "500",
          transition: "all 0.3s",
          border: "2px solid #2e7d32"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#2e7d32";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#2e7d32";
          e.target.style.color = "white";
        }}
      >
        View Details
      </Link>
    </div>
  );
};

export default CategoryCard;