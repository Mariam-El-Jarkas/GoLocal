import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/Beaches.css";

function Beaches() {
  const places = placesData.filter(place => place.category === "Beaches");

  return (
    <div className="beaches-page">
      <h1>Beaches</h1>
      <div className="beaches-grid">
        {places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="beaches-card">
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

export default Beaches;
