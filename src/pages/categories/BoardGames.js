import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/BoardGames.css"; 

function BoardGames() {
  const places = placesData.filter(place => place.category === "Board Games");

  return (
    <div className="boardgames-page">
      <h1>Board Games</h1>
      <div className="boardgames-grid">
        {places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="boardgames-card">
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

export default BoardGames;
