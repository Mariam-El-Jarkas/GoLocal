import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/CoffeeShops.css"; 

function CoffeeShops() {
  const places = placesData.filter(place => place.category === "Coffee Shops");

  return (
    <div className="coffeeshops-page">
      <h1>Coffee Shops</h1>
      <div className="coffeeshops-grid">
        {places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="coffeeshops-card">
            <img src={place.image} alt={place.name} />
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
