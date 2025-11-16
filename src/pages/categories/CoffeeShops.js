//import
import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/CoffeeShops.css";

function CoffeeShops() {

  // Filter all locations to include only those categorized as "Coffee Shops"
  const places = placesData.filter(place => place.category === "Coffee Shops");

  return (
    <div className="coffeeshops-page">
      <h1>Coffee Shops</h1>

      {/* Grid layout displaying all coffee shop locations */}
      <div className="coffeeshops-grid">
        {places.map(place => (

          // Each coffee shop is a clickable card linking to its detail page
          <Link 
            to={`/place/${place.id}`} 
            key={place.id} 
            className="coffeeshops-card"
          >
            {/* Coffee shop image */}
            <img src={place.image} alt={place.name} />

            {/* Name and address */}
            <div className="place-info">
              <h4>{place.name}</h4>
              <p>{place.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CoffeeShops;
