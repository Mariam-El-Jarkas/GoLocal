//imports
import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/Parks.css";

function Parks() {

  // Retrieve only locations categorized as "Parks"
  const places = placesData.filter(place => place.category === "Parks");

  return (
    <div className="parks-page">
      <h1>Parks</h1>

      {/* Grid that displays all parks */}
      <div className="parks-grid">
        {places.map(place => (

          /* Each park is displayed as a clickable card linking to its details */
          <Link 
            to={`/place/${place.id}`} 
            key={place.id} 
            className="parks-card"
          >
            {/* Park image */}
            <img src={place.image} alt={place.name} />

            {/* Park name + address */}
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
