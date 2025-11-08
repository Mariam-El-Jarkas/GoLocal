import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/Shopping.css"; 
function Shopping() {
  const places = placesData.filter(place => place.category === "Shopping");

  return (
    <div className="shopping-page">
      <h1>Shopping</h1>
      <div className="shopping-grid">
        {places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="shopping-card">
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

export default Shopping;
