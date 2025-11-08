import React from "react";
import IntroSection from "../components/IntroSection.js";
import CategoryCard from "../components/CategoryCard.js";
import PlaceCard from "../components/PlaceCard.js";
import placesData from "../components/placesData.js";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <IntroSection />

      <section className="categories-preview">
        <h2>Explore by Category</h2>
        <div className="category-cards">
          <CategoryCard title="Food" />
          <CategoryCard title="Board Games" />
          <CategoryCard title="Culture" />
          <CategoryCard title="History" />
          <CategoryCard title="Beaches" />
        </div>
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
