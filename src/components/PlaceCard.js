//imports
import React from "react";
import { Link } from "react-router-dom";
import "../styles/placecard.css";

function PlaceCard({ place }) {

  return (
    <div className="place-card">

      {/* Image of the place */}
      <img src={place.image} alt={place.name} className="place-img" />

      {/* Content section: name, description, and link */}
      <div className="place-content">
        {/* Name of the place */}
        <h3 className="place-name">{place.name}</h3>

        {/* Short description */}
        <p className="place-desc">{place.description}</p>

        {/* Button linking to the detailed page of this place */}
        <Link to={`/place/${place.id}`} className="place-btn">
          View Details
        </Link>
      </div>

    </div>
  );
}

export default PlaceCard;
