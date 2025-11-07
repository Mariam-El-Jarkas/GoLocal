import React from "react";
import "../styles/placecard.css";

function PlaceCard({ name, image, description }) {
  return (
    <div className="place-card">
      <img src={image} alt={name} className="place-img" />
      <div className="place-content">
        <h3 className="place-name">{name}</h3>
        <p className="place-desc">{description}</p>
        <a href="/details" className="place-btn">View Details</a>
      </div>
    </div>
  );
}

export default PlaceCard;
