import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/food.css";

function Food() {
  const foodPlaces = placesData.filter(place => place.category === "Food");

  
  const subCategories = {};
  foodPlaces.forEach(place => {
    const sub = place.subCategory || "General"; 
    if (!subCategories[sub]) {
      subCategories[sub] = [];
    }
    subCategories[sub].push(place);
  });

  return (
    <div className="food-page">
      <h1>Food Categories</h1>
      <div className="food-grid">
        {Object.keys(subCategories).map((sub, index) => (
          <div className="food-card" key={index}>
            <h2>{sub}</h2>
            <div className="store-list">
              {subCategories[sub].slice(0, 2).map(store => (
                <Link to={`/place/${store.id}`} key={store.id} className="store-card">
                  <img src={store.image} alt={store.name} />
                  <div className="store-info">
                    <h4>{store.name}</h4>
                    <p>{store.address}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Food;

