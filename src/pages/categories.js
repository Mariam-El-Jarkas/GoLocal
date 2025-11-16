//imports
import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.js";
import "../styles/categories.css";
import {  FaUtensils, FaChess, FaLandmark, FaHistory, FaCoffee, FaShoppingBag, FaTree } from "react-icons/fa";

function Categories() {

  // All the category options shown on this page.
  // Each one has a title, an icon, and the route it links to.
  const categories = [
    { title: "Food", icon: <FaUtensils />, path: "/category/food" },
    { title: "Board Games", icon: <FaChess />, path: "/category/board-games" },
    { title: "Culture", icon: <FaLandmark />, path: "/category/culture" },
    { title: "History", icon: <FaHistory />, path: "/category/history" },
    { title: "Coffee Shops", icon: <FaCoffee />, path: "/category/coffee-shops" },
    { title: "Shopping", icon: <FaShoppingBag />, path: "/category/shopping" },
    { title: "Parks", icon: <FaTree />, path: "/category/parks" },
  ];

  return (
    <div className="categories-page">
      <h1>Categories</h1>

      {/* I loop through the list above and create a card for each category */}
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <CategoryCard key={index} title={cat.title} icon={cat.icon}>
            
            {/* Button that takes the user to the selected category page */}
            <Link to={cat.path} className="view-button">
              View
            </Link>

          </CategoryCard>
        ))}
      </div>
    </div>
  );
}

export default Categories;
