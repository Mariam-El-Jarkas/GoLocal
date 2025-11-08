import React from "react";
import { Link } from "react-router-dom";
import "../styles/placecard.css";

function PlaceCard({ place }) {
  return (
    <div className="place-card">
      <img src={place.image} alt={place.name} className="place-img" />
      <div className="place-content">
        <h3 className="place-name">{place.name}</h3>
        <p className="place-desc">{place.description}</p>
        <Link to={`/place/${place.id}`} className="place-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard;
