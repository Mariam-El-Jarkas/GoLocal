//imports
import React from "react";
import { Link } from "react-router-dom";
import placesData from "../../components/placesData";
import "../../styles/Shopping.css";

function Shopping() {

  // Filter all locations and return only those under the "Shopping" category
  const places = placesData.filter(place => place.category === "Shopping");

  return (
    <div className="shopping-page">
      <h1>Shopping</h1>

      {/* Grid layout that displays all shopping locations */}
      <div className="shopping-grid">
        {places.map(place => (
          
          /* Each item links to its detailed page */
          <Link 
            to={`/place/${place.id}`} 
            key={place.id} 
            className="shopping-card"
          >
            {/* Image of the shopping place */}
            <img src={place.image} alt={place.name} />

            {/* Basic info: name + address */}
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

export default Shopping;
