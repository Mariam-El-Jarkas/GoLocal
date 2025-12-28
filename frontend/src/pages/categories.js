import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "../styles/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="categories-page">
      {/* Centered heading */}
      <div className="categories-title">
        <h1>Categories</h1>
      </div>

      {/* Dynamic categories */}
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
