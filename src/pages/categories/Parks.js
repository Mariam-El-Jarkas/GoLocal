import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/Parks.css"; 
function Parks() {
  const places = placesData.filter(place => place.category === "Parks");

  return (
    <div className="parks-page">
      <h1>Parks</h1>
      <div className="parks-grid">
        {places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="parks-card">
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

export default Parks;
