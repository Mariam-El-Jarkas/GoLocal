//imports
import React from "react";
import { useParams } from "react-router-dom";
import placesData from "../components/placesData.js";
import "../styles/details.css";

function PlaceDetails() {
  // Extract the 'id' parameter from the URL
  const { id } = useParams();

  // Find the place with the matching id from the dataset
  const place = placesData.find((p) => p.id.toString() === id);

  // Render the details of the place
  return (
    <div className="details-page">
      {/* Display the place name */}
      <h1>{place.name}</h1>

      {/* Display the image of the place */}
      <img src={place.image} alt={place.name} className="place-image" />

      {/* Display the category */}
      <p className="place-category">
        <strong>Category:</strong> {place.category}
      </p>

      {/* Display the address */}
      <p className="place-address">
        <strong>Address:</strong> {place.address}
      </p>

      {/* Display the description */}
      <p className="place-description">{place.description}</p>
    </div>
  );
}

export default PlaceDetails;
