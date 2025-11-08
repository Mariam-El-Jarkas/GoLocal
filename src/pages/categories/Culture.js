import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/Culture.css"; 

function Culture() {
  const places = placesData.filter(place => place.category === "Culture");

  return (
    <div className="culture-page">
      <h1>Culture</h1>
      <div className="culture-grid">
        {places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="culture-card">
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

export default Culture;
