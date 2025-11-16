import React from "react";
import PlaceCard from "../components/PlaceCard.js";
import CategoryCard from "../components/CategoryCard.js";
import placesData from "../components/placesData.js";
import { FaUtensils, FaChess, FaLandmark, FaHistory, FaCoffee, FaShoppingBag, FaTree } from "react-icons/fa";
import "../styles/home.css"; 

function Home() {
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
    <div className="home-page">
      {/* Saida intro section */}
      <section className="saida-intro">
        <div className="intro-container">
          <img 
            src={require("../assets/images/saida.png")} 
            alt="Saida" 
            className="intro-image" 
          />
          <div className="intro-text">
            <h1>Welcome to Saida</h1>
            {/* <h2 className="intro-subtitle">About Saida</h2> */}
            <p>
              Saida (Sidon) is one of Lebanon’s oldest and most historic cities, dating back thousands of years. 
              It played a vital role as a Phoenician port, later flourishing under Crusaders and Ottoman rule. 
              Today, the city is known for its magnificent sea castle, traditional souks, and vibrant culture, 
              offering visitors a unique blend of history, cuisine, and seaside charm.
            </p>
          </div>
        </div>
      </section>


      {/* Top Places */}
      <section className="places-preview">
        <h2>Top Places</h2>
        <div className="place-cards">
          {placesData.slice(0, 6).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

            {/* Categories Section (above Top Places) */}
      {/* <section className="categories-preview">
        <h2>Explore by Category</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <CategoryCard key={index} title={cat.title} icon={cat.icon}>
              <a href={cat.path} className="view-button">View</a>
            </CategoryCard>
          ))}
        </div>
        <a href="/categories" className="see-all-btn">See All Categories</a>
      </section> */}

    </div>
  );
}

export default Home;
