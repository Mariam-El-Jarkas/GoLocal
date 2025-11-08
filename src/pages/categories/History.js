import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/History.css"; 
function History() {
  const places = placesData.filter(place => place.category === "History");

  return (
    <div className="history-page">
      <h1>History</h1>
      <div className="history-grid">
        {places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id} className="history-card">
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

export default History;
