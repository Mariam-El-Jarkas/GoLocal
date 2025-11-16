//imports
import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/BoardGames.css";

function BoardGames() {

  // Filter all places to include only those categorized as "Board Games"
  const places = placesData.filter(place => place.category === "Board Games");

  return (
    <div className="boardgames-page">
      <h1>Board Games</h1>

      {/* Grid layout showing all board game venues */}
      <div className="boardgames-grid">
        {places.map(place => (

          // Each board game place is a clickable card linking to its detail page
          <Link 
            to={`/place/${place.id}`} 
            key={place.id} 
            className="boardgames-card"
          >
            {/* Venue image */}
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

export default BoardGames;

