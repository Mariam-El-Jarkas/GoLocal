//imports
import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.js";
import "../styles/categories.css";
import { FaUtensils, FaChess, FaLandmark, FaHistory, FaCoffee, FaShoppingBag, FaTree } from "react-icons/fa";

function Categories() {

  // All the category options shown on this page.
  // Each one has a title, an icon, and the route it links to.
  //array of objects
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


      <div className="categories-grid">

        {/*Loop through the categories array and create a CategoryCard for each item.
      - `category` is the current object in the array (with title, icon, path)
      - `index` is used as a unique key for React to track the list efficiently
      - The card receives title and icon as props
      - Inside each card, we render a Link button that goes to the category's path*/}

        {categories.map((category, index) => (
          <CategoryCard key={index} title={category.title} icon={category.icon}>

            {/* Button that takes the user to the selected category page */}
            <Link to={category.path} className="view-button">View</Link>
          </CategoryCard>
        ))}
      </div>
    </div>
  );
}

export default Categories;
