//imports
import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/Culture.css";

function Culture() {

  // Filter all places to include only those in the "Culture" category
  const places = placesData.filter(place => place.category === "Culture");

  return (
    <div className="culture-page">
      <h1>Culture</h1>

      {/* Grid layout displaying all cultural locations */}
      <div className="culture-grid">
        {places.map(place => (

          // Each cultural location is a clickable card linking to its details page
          <Link 
            to={`/place/${place.id}`} 
            key={place.id} 
            className="culture-card"
          >
            {/* Image of the cultural site */}
            <img src={place.image} alt={place.name} />

            {/* Name and address of the cultural place */}
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
