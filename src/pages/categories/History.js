//imports
import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/History.css";

function History() {

  // Filter the data and keep only places under the "History" category
  const places = placesData.filter(place => place.category === "History");

  return (
    <div className="history-page">
      <h1>History</h1>

      {/* Grid layout displaying all historical locations */}
      <div className="history-grid">
        {places.map(place => (

          /* Each card links to the detailed page of that historical place */
          <Link 
            to={`/place/${place.id}`} 
            key={place.id} 
            className="history-card"
          >

            {/* Historical site image */}
            <img src={place.image} alt={place.name} />

            {/* Name and address of the location */}
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
