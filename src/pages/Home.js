import React from "react";
import IntroSection from "../components/IntroSection.js";
import CategoryCard from "../components/CategoryCard.js";
import PlaceCard from "../components/PlaceCard.js";
import placesData from "../components/placesData.js";
import { Link } from "react-router-dom";
import "../styles/home.css"; 

import { 
  FaUtensils, FaChess, FaLandmark, FaHistory, 
  FaUmbrellaBeach, FaCoffee, FaShoppingBag, FaTree 
} from "react-icons/fa";

function Home() {
  const categories = [
    { title: "Food", icon: <FaUtensils />, path: "/category/food" },
    { title: "Board Games", icon: <FaChess />, path: "/category/board-games" },
    { title: "Culture", icon: <FaLandmark />, path: "/category/culture" },
    { title: "History", icon: <FaHistory />, path: "/category/history" },
    { title: "Beaches", icon: <FaUmbrellaBeach />, path: "/category/beaches" },
    { title: "Coffee Shops", icon: <FaCoffee />, path: "/category/coffee-shops" },
    { title: "Shopping", icon: <FaShoppingBag />, path: "/category/shopping" },
    { title: "Parks", icon: <FaTree />, path: "/category/parks" },
  ];

  return (
    <div className="home-page">
      <IntroSection />

   
      <section className="categories-preview">
        <h2>Explore by Category</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <CategoryCard key={index} title={cat.title} icon={cat.icon}>
              <Link to={cat.path} className="view-button">
                View
              </Link>
            </CategoryCard>
          ))}
        </div>
        <Link to="/categories" className="see-all-btn">See All Categories</Link>
      </section>

      <section className="places-preview">
        <h2>Top Places</h2>
        <div className="place-cards">
          {placesData.slice(0, 4).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

